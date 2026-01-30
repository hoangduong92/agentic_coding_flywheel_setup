#!/usr/bin/env bash
# ============================================================
# Lint: Pipefail Safety
#
# Under `set -o pipefail`, a pipeline like:
#   sha=$(echo "$x" | grep FOO | head -1 | sed ...)
# fails when grep matches nothing (exit 1), killing the whole
# command substitution and potentially the script.
#
# This linter detects $(...| grep ...| ...) patterns that are
# not protected by `|| true` or `{ grep ... || true; }`.
#
# Scope: scripts/lib/*.sh and scripts/generated/*.sh
#
# NOTE: This is a heuristic linter — it may have false positives.
# Use inline comments to suppress: # lint:pipefail-ok
# ============================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

warnings=0
checked=0

echo "=== Pipefail Safety Linter ==="
echo "Scanning for unprotected grep in pipelines..."
echo ""

scan_dir() {
    local dir="$1"
    local label="$2"

    [[ -d "$dir" ]] || return 0

    for file in "$dir"/*.sh; do
        [[ -f "$file" ]] || continue
        local basename_file
        basename_file="$(basename "$file")"

        # Skip test files
        if [[ "$basename_file" == test_* ]]; then
            continue
        fi

        ((checked++)) || true

        # Look for command substitutions containing unprotected grep in pipeline:
        # Pattern: $( ... | grep ... | ... ) without || true on the line
        # Also without a { grep ... || true; } wrapper
        while IFS= read -r match; do
            [[ -z "$match" ]] && continue
            local lineno="${match%%:*}"
            local line="${match#*:}"

            # Skip comments
            local stripped="${line#"${line%%[![:space:]]*}"}"
            [[ "$stripped" == \#* ]] && continue

            # Skip lines with lint suppression
            [[ "$line" == *"lint:pipefail-ok"* ]] && continue

            # Skip lines already protected with || true / || :
            [[ "$line" == *"|| true"* ]] && continue
            [[ "$line" == *"|| :"* ]] && continue

            # Skip lines where grep is wrapped in { grep ... || true; }
            [[ "$line" == *"{ grep"*"|| true"*"}"* ]] && continue

            # Skip lines where the whole $() is followed by || true
            # e.g., result=$(... | grep ... | ...) || true
            [[ "$line" == *') || true'* ]] && continue
            [[ "$line" == *') || :'* ]] && continue

            # Skip grep -q (used for conditionals, exit code is intentional)
            [[ "$line" == *"grep -q"* ]] && continue
            [[ "$line" == *"grep -cq"* ]] && continue

            # Skip if/while conditionals (exit code is intentional)
            [[ "$stripped" == if\ * ]] && continue
            [[ "$stripped" == while\ * ]] && continue
            [[ "$stripped" == elif\ * ]] && continue

            echo "WARN: $label/$basename_file:$lineno: grep in pipeline may fail under pipefail"
            echo "  $line"
            echo "  Fix: Add '|| true' after grep or wrap: { grep ... || true; }"
            echo ""
            ((warnings++)) || true
        done < <(grep -nE '\$\(.*\|\s*grep\s.*\|' "$file" || true)
    done
}

scan_dir "$REPO_ROOT/scripts/lib" "scripts/lib"
scan_dir "$REPO_ROOT/scripts/generated" "scripts/generated"

echo "---"
echo "Checked $checked files, found $warnings warnings."

if [[ $warnings -gt 0 ]]; then
    echo ""
    echo "WARN: $warnings potential pipefail-unsafe pattern(s) found."
    echo "These patterns may fail under 'set -o pipefail' when grep matches nothing."
    echo "Suppress false positives with: # lint:pipefail-ok"
    echo ""
    # Exit 0 for warnings (P1 linter, not blocking)
    # Change to 'exit 1' to make this a hard failure
    exit 0
fi

echo "PASS: No pipefail-unsafe patterns found."
exit 0
