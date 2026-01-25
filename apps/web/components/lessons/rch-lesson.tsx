'use client';

import { motion } from '@/components/motion';
import {
  Cpu,
  Terminal,
  Zap,
  Server,
  Settings,
  Activity,
  Play,
  Shield,
} from 'lucide-react';
import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Highlight,
  Divider,
  GoalBanner,
  CommandList,
  FeatureCard,
  FeatureGrid,
} from './lesson-components';

export function RchLesson() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Offload Rust builds to remote workers for faster compilation in multi-agent workflows.
      </GoalBanner>

      {/* Section 1: What Is RCH */}
      <Section title="What Is RCH?" icon={<Cpu className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>RCH (Remote Compilation Helper)</Highlight> transparently intercepts
          cargo commands and routes them to powerful remote build servers. Your local
          machine stays responsive while heavy Rust compilations run elsewhere.
        </Paragraph>
        <Paragraph>
          When running multiple AI agents that all trigger builds, your local CPU becomes
          a bottleneck. RCH solves this by syncing source to remote workers, building
          there, and streaming artifacts back.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Server className="h-5 w-5" />}
              title="Remote Workers"
              description="Build on powerful remote servers"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Transparent"
              description="Works via Claude Code hook"
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Activity className="h-5 w-5" />}
              title="Fast Sync"
              description="rsync + zstd compression"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Worker Pool"
              description="Priority-based scheduling"
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: How It Works */}
      <Section title="How It Works" icon={<Play className="h-5 w-5" />} delay={0.15}>
        <Paragraph>
          RCH intercepts cargo commands via a Claude Code hook and offloads them to
          remote workers.
        </Paragraph>

        <CodeBlock
          code={`# Local: You run cargo build
cargo build --release
         ↓
# RCH Hook intercepts the command
         ↓
# Source synced to worker via rsync
         ↓
# Remote: Build runs on powerful server
         ↓
# Artifacts synced back to local machine`}
          filename="Build Flow"
        />

        <TipBox variant="tip">
          The hook is transparent. You run normal cargo commands and RCH handles the rest.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 3: Quick Start */}
      <Section title="Quick Start" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <Paragraph>
          Get started with these essential commands.
        </Paragraph>

        <CommandList
          commands={[
            { command: 'rch hook install', description: 'Install the Claude Code hook' },
            { command: 'rch daemon start', description: 'Start the local daemon' },
            { command: 'rch workers add user@host', description: 'Add a remote worker' },
            { command: 'rch status', description: 'Check system status' },
          ]}
        />

        <TipBox variant="warning">
          Make sure SSH keys are set up for passwordless access to workers before adding them.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 4: Worker Management */}
      <Section title="Worker Management" icon={<Server className="h-5 w-5" />} delay={0.25}>
        <Paragraph>
          RCH supports multiple remote workers with priority-based scheduling.
        </Paragraph>

        <CommandList
          commands={[
            { command: 'rch workers add user@hostname', description: 'Add a new worker' },
            { command: 'rch workers list', description: 'List configured workers' },
            { command: 'rch workers status', description: 'Check worker connectivity' },
            { command: 'rch workers ping', description: 'Verify all workers are reachable' },
          ]}
        />

        <CodeBlock
          code={`# Workers are stored in ~/.config/rch/workers.toml
[[workers]]
name = "build-server-1"
host = "ubuntu@192.168.1.100"
slots = 48
priority = 100
tags = ["fast", "baremetal"]

[[workers]]
name = "build-server-2"
host = "ubuntu@192.168.1.101"
slots = 16
priority = 80
tags = ["secondary"]`}
          filename="~/.config/rch/workers.toml"
        />
      </Section>

      <Divider />

      {/* Section 5: Diagnostics */}
      <Section title="Diagnostics" icon={<Activity className="h-5 w-5" />} delay={0.3}>
        <Paragraph>
          RCH includes comprehensive diagnostics to troubleshoot issues.
        </Paragraph>

        <CommandList
          commands={[
            { command: 'rch doctor', description: 'Run full diagnostic check' },
            { command: 'rch doctor --fix', description: 'Auto-fix common issues' },
            { command: 'rch daemon status', description: 'Check if daemon is running' },
            { command: 'rch config show', description: 'View current configuration' },
          ]}
        />

        <TipBox variant="tip">
          Run <code>rch doctor</code> if builds aren&apos;t being offloaded. It checks
          prerequisites, configuration, and worker connectivity.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 6: Configuration */}
      <Section title="Configuration" icon={<Settings className="h-5 w-5" />} delay={0.35}>
        <Paragraph>
          RCH configuration lives in <code>~/.config/rch/</code>.
        </Paragraph>

        <CodeBlock
          code={`# View current config
rch config show

# Set default worker
rch config set default_worker=build-server-1

# Update RCH binaries on all workers
rch update --remote`}
          filename="Configuration Commands"
        />

        <TipBox variant="info">
          Keep workers in sync with <code>rch update --remote</code> after updating the local RCH binary.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 7: Integration */}
      <Section title="Tool Integration" icon={<Zap className="h-5 w-5" />} delay={0.4}>
        <Paragraph>
          RCH integrates seamlessly with other flywheel tools.
        </Paragraph>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="p-4 rounded-xl border border-border/50 bg-card/30"
          >
            <h4 className="font-semibold text-primary mb-2">RCH + NTM</h4>
            <p className="text-muted-foreground text-sm">
              Agents spawned by NTM automatically use RCH for their builds.
              Multiple agents can compile in parallel without overwhelming local CPU.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl border border-border/50 bg-card/30"
          >
            <h4 className="font-semibold text-primary mb-2">RCH + RU</h4>
            <p className="text-muted-foreground text-sm">
              RU syncs repos that RCH then builds remotely. Use{' '}
              <code className="text-primary">ru sync</code> to update sources,
              then build with RCH-accelerated cargo.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            className="p-4 rounded-xl border border-border/50 bg-card/30"
          >
            <h4 className="font-semibold text-primary mb-2">RCH + Beads</h4>
            <p className="text-muted-foreground text-sm">
              Track build-related tasks via beads. Create issues for build
              failures or optimization opportunities.
            </p>
          </motion.div>
        </div>
      </Section>

      <Divider />

      {/* Section 8: Best Practices */}
      <Section title="Best Practices" icon={<Shield className="h-5 w-5" />} delay={0.45}>
        <Paragraph>
          Get the most out of RCH with these recommendations.
        </Paragraph>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 font-semibold">SSH Keys</span>
            <p className="text-white/80 text-sm mt-1">Set up passwordless SSH access</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <span className="text-blue-400 font-semibold">Fast Workers</span>
            <p className="text-white/80 text-sm mt-1">Use servers with many CPU cores</p>
          </div>
          <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <span className="text-violet-400 font-semibold">Keep Synced</span>
            <p className="text-white/80 text-sm mt-1">Update workers with rch update --remote</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 font-semibold">Monitor Status</span>
            <p className="text-white/80 text-sm mt-1">Check rch status regularly</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
