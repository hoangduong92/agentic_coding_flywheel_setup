"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Terminal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandCard } from "@/components/command-card";
import { AlertCard } from "@/components/alert-card";
import { cn } from "@/lib/utils";
import { markStepComplete } from "@/lib/wizardSteps";
import { useUserOS, useMounted } from "@/lib/userPreferences";

interface TerminalCardProps {
  name: string;
  description: string;
  href: string;
}

function TerminalCard({ name, description, href }: TerminalCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex items-center justify-between rounded-xl border p-4 transition-all duration-200",
        "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 hover:shadow-md"
      )}
    >
      <div>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
    </a>
  );
}

function MacContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Install <strong className="text-foreground">Ghostty</strong> or <strong className="text-foreground">WezTerm</strong> — either
          is a great choice. Open it once after installing to make sure it works.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <TerminalCard
            name="Ghostty"
            description="Fast, native terminal"
            href="https://ghostty.org/download"
          />
          <TerminalCard
            name="WezTerm"
            description="GPU-accelerated terminal"
            href="https://wezfurlong.org/wezterm/installation.html"
          />
        </div>
      </div>

      <AlertCard variant="success" icon={Check} title="SSH is already installed">
        macOS includes SSH by default, so you&apos;re ready to connect to
        your VPS.
      </AlertCard>
    </div>
  );
}

function WindowsContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Install <strong className="text-foreground">Windows Terminal</strong> from the Microsoft Store.
          Open it once after installing.
        </p>

        <TerminalCard
          name="Windows Terminal"
          description="Microsoft Store (free)"
          href="ms-windows-store://pdp/?ProductId=9N0DX20HK701"
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Verify SSH is available</h3>
        <p className="text-sm text-muted-foreground">
          Open Windows Terminal and run this command. You should see a version
          number.
        </p>
        <CommandCard
          command="ssh -V"
          description="Check SSH version"
          showCheckbox
          persistKey="verify-ssh-windows"
        />
      </div>
    </div>
  );
}

export default function InstallTerminalPage() {
  const router = useRouter();
  const [os] = useUserOS();
  const [isNavigating, setIsNavigating] = useState(false);
  const mounted = useMounted();

  // Redirect if no OS selected (after hydration)
  useEffect(() => {
    if (mounted && os === null) {
      router.push("/wizard/os-selection");
    }
  }, [mounted, os, router]);

  const handleContinue = useCallback(() => {
    markStepComplete(2);
    setIsNavigating(true);
    router.push("/wizard/generate-ssh-key");
  }, [router]);

  // Show loading state while detecting OS or during SSR
  if (!mounted || !os) {
    return (
      <div className="flex items-center justify-center py-12">
        <Terminal className="h-8 w-8 animate-pulse text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              Install a terminal you&apos;ll love
            </h1>
            <p className="text-sm text-muted-foreground">
              ~2 min
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">
          A good terminal makes everything easier.
        </p>
      </div>

      {/* OS-specific content */}
      {os === "mac" ? <MacContent /> : <WindowsContent />}

      {/* Continue button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleContinue} disabled={isNavigating} size="lg">
          {isNavigating ? "Loading..." : "I installed it, continue"}
        </Button>
      </div>
    </div>
  );
}
