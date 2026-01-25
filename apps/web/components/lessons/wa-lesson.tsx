'use client';

import { motion } from '@/components/motion';
import {
  Monitor,
  Terminal,
  Zap,
  Eye,
  Settings,
  Activity,
  Play,
  Shield,
  Search,
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

export function WaLesson() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Coordinate multiple AI coding agents running in WezTerm with real-time observation and automation.
      </GoalBanner>

      {/* Section 1: What Is WA */}
      <Section title="What Is WA?" icon={<Monitor className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>WezTerm Automata (WA)</Highlight> is a terminal hypervisor that
          captures pane output in real-time, detects agent state transitions through
          pattern matching, and enables event-driven automation.
        </Paragraph>
        <Paragraph>
          When running multiple AI agents, you need to know when they hit rate limits,
          complete tasks, or need approval. WA observes all panes with sub-50ms latency
          and can trigger automated responses.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Eye className="h-5 w-5" />}
              title="Real-time Observation"
              description="Sub-50ms pane monitoring"
              gradient="from-cyan-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Pattern Detection"
              description="Recognizes agent state changes"
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Search className="h-5 w-5" />}
              title="Full-Text Search"
              description="FTS5 with BM25 ranking"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Safety Engine"
              description="Capability gates & audit trails"
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: How It Works */}
      <Section title="How It Works" icon={<Play className="h-5 w-5" />} delay={0.15}>
        <Paragraph>
          WA runs as a daemon that observes all WezTerm panes, detects patterns,
          and exposes a Robot Mode API for agent integration.
        </Paragraph>

        <CodeBlock
          code={`# WA observes terminal panes
Agent types: "Thinking..."
         ↓
# Pattern detection engine
         ↓
Agent completes: "Done!"
         ↓
# Event triggers automation
         ↓
WA notifies other agents via mail`}
          filename="Observation Flow"
        />

        <TipBox variant="tip">
          WA uses delta extraction instead of full buffer snapshots for minimal overhead.
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
            { command: 'wa daemon start', description: 'Start the observation daemon' },
            { command: 'wa daemon status', description: 'Check daemon status' },
            { command: 'wa robot state', description: 'View all panes as JSON' },
            { command: 'wa search "query"', description: 'Search captured output' },
          ]}
        />

        <TipBox variant="warning">
          WA requires WezTerm to be running. It won&apos;t work with other terminal emulators.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 4: Robot Mode */}
      <Section title="Robot Mode API" icon={<Activity className="h-5 w-5" />} delay={0.25}>
        <Paragraph>
          Robot Mode provides a JSON API for machine-to-machine communication.
        </Paragraph>

        <CommandList
          commands={[
            { command: 'wa robot state', description: 'Get all pane states as JSON' },
            { command: 'wa robot get-text <pane_id>', description: 'Get pane output' },
            { command: 'wa robot send <pane_id> "cmd"', description: 'Send input to pane' },
            { command: 'wa robot wait-for <pane_id> <pattern>', description: 'Wait for pattern' },
          ]}
        />

        <CodeBlock
          code={`# Example: Wait for agent completion
wa robot wait-for 42 "Task complete"

# Then trigger next action
wa robot send 43 "Start next task"`}
          filename="Robot Mode Example"
        />
      </Section>

      <Divider />

      {/* Section 5: Pattern Detection */}
      <Section title="Pattern Detection" icon={<Eye className="h-5 w-5" />} delay={0.3}>
        <Paragraph>
          WA detects state transitions for common AI agents.
        </Paragraph>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
            <span className="text-cyan-400 font-semibold">Claude Code</span>
            <p className="text-white/80 text-sm mt-1">Rate limits, approvals, completions</p>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 font-semibold">Codex CLI</span>
            <p className="text-white/80 text-sm mt-1">Task completion, errors, waiting</p>
          </div>
          <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <span className="text-violet-400 font-semibold">Gemini CLI</span>
            <p className="text-white/80 text-sm mt-1">Response completion, quota warnings</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 font-semibold">Custom Patterns</span>
            <p className="text-white/80 text-sm mt-1">Define your own detection rules</p>
          </div>
        </div>
      </Section>

      <Divider />

      {/* Section 6: Tool Integration */}
      <Section title="Tool Integration" icon={<Zap className="h-5 w-5" />} delay={0.35}>
        <Paragraph>
          WA integrates seamlessly with other flywheel tools.
        </Paragraph>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl border border-border/50 bg-card/30"
          >
            <h4 className="font-semibold text-primary mb-2">WA + NTM</h4>
            <p className="text-muted-foreground text-sm">
              WA automatically observes agents spawned by NTM. Use NTM to spawn
              agents and WA to monitor their state.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="p-4 rounded-xl border border-border/50 bg-card/30"
          >
            <h4 className="font-semibold text-primary mb-2">WA + Agent Mail</h4>
            <p className="text-muted-foreground text-sm">
              State changes detected by WA can trigger Agent Mail notifications.
              Coordinate agent handoffs through mail threads.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl border border-border/50 bg-card/30"
          >
            <h4 className="font-semibold text-primary mb-2">WA + Beads</h4>
            <p className="text-muted-foreground text-sm">
              When WA detects task completion, it can update bead status.
              Track agent progress through your issue tracker.
            </p>
          </motion.div>
        </div>
      </Section>

      <Divider />

      {/* Section 7: Diagnostics */}
      <Section title="Diagnostics" icon={<Settings className="h-5 w-5" />} delay={0.4}>
        <Paragraph>
          Troubleshoot issues with built-in diagnostics.
        </Paragraph>

        <CommandList
          commands={[
            { command: 'wa doctor', description: 'Run diagnostic checks' },
            { command: 'wa daemon status', description: 'Check daemon health' },
            { command: 'wa logs --tail 50', description: 'View recent logs' },
          ]}
        />

        <TipBox variant="info">
          Run <code>wa doctor</code> if pattern detection isn&apos;t working. It checks
          WezTerm connectivity and daemon status.
        </TipBox>
      </Section>
    </div>
  );
}
