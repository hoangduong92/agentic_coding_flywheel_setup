#!/usr/bin/env bash
# ============================================================
# ACFS Dashboard - Static HTML Generation
#
# Generates a local HTML dashboard using `acfs info --html`.
#
# Usage:
#   acfs dashboard generate [--force]
# ============================================================

set -euo pipefail

ACFS_HOME="${ACFS_HOME:-$HOME/.acfs}"

dashboard_usage() {
    echo "Usage: acfs dashboard <command>"
    echo ""
    echo "Commands:"
    echo "  generate [--force]   Generate ~/.acfs/dashboard/index.html"
    echo "  help                Show this help"
}

find_info_script() {
    local script_dir
    script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

    if [[ -f "$ACFS_HOME/scripts/lib/info.sh" ]]; then
        echo "$ACFS_HOME/scripts/lib/info.sh"
        return 0
    fi

    # Dev / local checkout fallbacks
    if [[ -f "$script_dir/info.sh" ]]; then
        echo "$script_dir/info.sh"
        return 0
    fi
    if [[ -f "$script_dir/../scripts/lib/info.sh" ]]; then
        echo "$script_dir/../scripts/lib/info.sh"
        return 0
    fi

    return 1
}

dashboard_generate() {
    local force=false

    while [[ $# -gt 0 ]]; do
        case "$1" in
            --force)
                force=true
                ;;
            --help|-h)
                dashboard_usage
                return 0
                ;;
            *)
                echo "Unknown option: $1" >&2
                return 1
                ;;
        esac
        shift
    done

    local dashboard_dir="${ACFS_HOME}/dashboard"
    local html_file="${dashboard_dir}/index.html"
    local timestamp_file="${dashboard_dir}/.last_generated"

    mkdir -p "$dashboard_dir"

    if [[ "$force" != "true" && -f "$html_file" ]]; then
        local last_gen now age
        last_gen="$(cat "$timestamp_file" 2>/dev/null || echo 0)"
        if [[ ! "$last_gen" =~ ^[0-9]+$ ]]; then
            last_gen=0
        fi
        now="$(date +%s)"
        age=$((now - last_gen))

        if [[ $age -ge 0 && $age -lt 3600 ]]; then
            echo "Dashboard is recent ($((age / 60)) minutes old). Use --force to regenerate."
            echo "Dashboard path: $html_file"
            return 0
        fi
    fi

    local info_script
    if ! info_script="$(find_info_script)"; then
        echo "Error: info.sh not found" >&2
        echo "Re-run the ACFS installer to get the latest scripts." >&2
        return 1
    fi

    echo "Generating dashboard..."
    bash "$info_script" --html > "$html_file"
    date +%s > "$timestamp_file"

    echo "Dashboard generated: $html_file"
    echo "Open with: open \"$html_file\" (macOS) or xdg-open \"$html_file\" (Linux)"
}

dashboard_main() {
    local cmd="${1:-help}"
    shift 2>/dev/null || true

    case "$cmd" in
        generate)
            dashboard_generate "$@"
            ;;
        help|-h|--help)
            dashboard_usage
            ;;
        *)
            echo "Unknown command: $cmd" >&2
            dashboard_usage >&2
            return 1
            ;;
    esac
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    dashboard_main "$@"
fi
