'use client';

import { motion } from '@/components/motion';
import {
  FlaskConical,
  Terminal,
  Zap,
  BookOpen,
  Search,
  Settings,
  Play,
  Users,
  Lightbulb,
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

export function BrennerLesson() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Coordinate multi-agent AI research sessions with structured scientific methodology.
      </GoalBanner>

      {/* Section 1: What Is Brenner Bot */}
      <Section title="What Is Brenner Bot?" icon={<FlaskConical className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>Brenner Bot</Highlight> is a research orchestration platform inspired by
          Nobel laureate Sydney Brenner&apos;s scientific methodology. It coordinates multi-agent
          AI research sessions with systematic problem formulation and rigorous constraint-based
          reasoning.
        </Paragraph>
        <Paragraph>
          The system combines a curated corpus of 236 transcript sections with multi-model AI
          syntheses from Claude, GPT, and Gemini to enable collaborative scientific research
          conversations.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<BookOpen className="h-5 w-5" />}
              title="Primary Corpus"
              description="236 sections with §n citations"
              gradient="from-rose-500/20 to-pink-500/20"
            />
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title="Multi-Model"
              description="Claude, GPT, Gemini syntheses"
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Lightbulb className="h-5 w-5" />}
              title="Hypothesis Slates"
              description="Always includes third alternative"
              gradient="from-amber-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<Search className="h-5 w-5" />}
              title="Quote Bank"
              description="Searchable verbatim primitives"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: Scientific Methodology */}
      <Section title="Scientific Methodology" icon={<Lightbulb className="h-5 w-5" />} delay={0.15}>
        <Paragraph>
          Brenner Bot emphasizes rigorous scientific reasoning with these principles.
        </Paragraph>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30">
            <span className="text-rose-400 font-semibold">Problem Formulation</span>
            <p className="text-white/80 text-sm mt-1">Clear statement of what you&apos;re trying to understand</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <span className="text-amber-400 font-semibold">Discriminative Design</span>
            <p className="text-white/80 text-sm mt-1">Experiments that distinguish hypotheses</p>
          </div>
          <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <span className="text-violet-400 font-semibold">Third Alternative</span>
            <p className="text-white/80 text-sm mt-1">Always consider &quot;both hypotheses are wrong&quot;</p>
          </div>
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-emerald-400 font-semibold">Constraint Reasoning</span>
            <p className="text-white/80 text-sm mt-1">What data rules out, not just suggests</p>
          </div>
        </div>
      </Section>

      <Divider />

      {/* Section 3: Quick Start */}
      <Section title="Quick Start" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <Paragraph>
          Get started with these essential commands.
        </Paragraph>

        <CommandList
          commands={[
            { command: 'brenner --version', description: 'Check installation' },
            { command: 'brenner doctor', description: 'Run diagnostics' },
            { command: 'brenner corpus search "query"', description: 'Search transcripts' },
            { command: 'brenner session start "topic"', description: 'Start research session' },
          ]}
        />

        <TipBox variant="tip">
          Research sessions coordinate via Agent Mail. Make sure Agent Mail is running first.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 4: Corpus Search */}
      <Section title="Corpus Search" icon={<Search className="h-5 w-5" />} delay={0.25}>
        <Paragraph>
          Search the primary source corpus for relevant passages.
        </Paragraph>

        <CodeBlock
          code={`# Search the transcript corpus
brenner corpus search "experimental design"

# List available sections
brenner corpus list

# Build excerpts from specific sections
brenner excerpt build --sections 42,43,44

# Export with citations
brenner excerpt build --sections 42-50 --format markdown`}
          filename="Corpus Commands"
        />

        <TipBox variant="info">
          Citations use stable §n format (e.g., §42) for reliable referencing.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 5: Research Sessions */}
      <Section title="Research Sessions" icon={<Play className="h-5 w-5" />} delay={0.3}>
        <Paragraph>
          Launch multi-agent research workflows.
        </Paragraph>

        <CommandList
          commands={[
            { command: 'brenner session start "hypothesis"', description: 'Start new session' },
            { command: 'brenner session resume <id>', description: 'Resume existing session' },
            { command: 'brenner session list', description: 'List active sessions' },
          ]}
        />

        <Paragraph>
          Sessions produce structured artifacts:
        </Paragraph>

        <div className="grid gap-2 text-sm">
          <div className="p-2 rounded bg-card/30 border border-border/50">
            <span className="text-primary font-medium">Hypothesis Slates</span> — Multiple competing explanations
          </div>
          <div className="p-2 rounded bg-card/30 border border-border/50">
            <span className="text-primary font-medium">Discriminative Tests</span> — Experiments that distinguish hypotheses
          </div>
          <div className="p-2 rounded bg-card/30 border border-border/50">
            <span className="text-primary font-medium">Assumption Ledgers</span> — Explicit premises with verification
          </div>
          <div className="p-2 rounded bg-card/30 border border-border/50">
            <span className="text-primary font-medium">Adversarial Critiques</span> — Challenges to the framing itself
          </div>
        </div>
      </Section>

      <Divider />

      {/* Section 6: Tool Integration */}
      <Section title="Tool Integration" icon={<Zap className="h-5 w-5" />} delay={0.35}>
        <Paragraph>
          Brenner Bot integrates with other flywheel tools.
        </Paragraph>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl border border-border/50 bg-card/30"
          >
            <h4 className="font-semibold text-primary mb-2">Brenner + Agent Mail</h4>
            <p className="text-muted-foreground text-sm">
              Research sessions use Agent Mail for durable threads between agents.
              Each agent has an inbox/outbox with acknowledgment tracking.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="p-4 rounded-xl border border-border/50 bg-card/30"
          >
            <h4 className="font-semibold text-primary mb-2">Brenner + NTM</h4>
            <p className="text-muted-foreground text-sm">
              NTM spawns parallel agent sessions for research. Use NTM to manage
              the tmux layout while Brenner coordinates the research flow.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl border border-border/50 bg-card/30"
          >
            <h4 className="font-semibold text-primary mb-2">Brenner + CASS</h4>
            <p className="text-muted-foreground text-sm">
              Research session history is indexed by CASS. Search past sessions
              to build on previous research findings.
            </p>
          </motion.div>
        </div>
      </Section>

      <Divider />

      {/* Section 7: Web Interface */}
      <Section title="Web Interface" icon={<Settings className="h-5 w-5" />} delay={0.4}>
        <Paragraph>
          The web app at brennerbot.org provides additional features.
        </Paragraph>

        <div className="grid gap-2 text-sm">
          <div className="p-2 rounded bg-card/30 border border-border/50">
            <span className="text-primary font-medium">Corpus Browsing</span> — Full-text search with section navigation
          </div>
          <div className="p-2 rounded bg-card/30 border border-border/50">
            <span className="text-primary font-medium">Excerpt Composition</span> — Build cited passages from selections
          </div>
          <div className="p-2 rounded bg-card/30 border border-border/50">
            <span className="text-primary font-medium">Session Visualization</span> — View research session structure
          </div>
        </div>

        <TipBox variant="info">
          The CLI and web app complement each other—use CLI for automation and web for browsing.
        </TipBox>
      </Section>
    </div>
  );
}
