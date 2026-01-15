'use client';

import {
  Search,
  Terminal,
  Zap,
  Database,
  Clock,
  FileText,
  Play,
  Archive,
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

export function XfLesson() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Search your X/Twitter archive with sub-millisecond queries using xf.
      </GoalBanner>

      {/* Section 1: What Is XF */}
      <Section title="What Is XF?" icon={<Archive className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>XF</Highlight> is an ultra-fast search tool for X/Twitter data archives.
          Built with Tantivy (Rust&apos;s answer to Lucene), it delivers sub-millisecond query
          times even on large archives.
        </Paragraph>
        <Paragraph>
          If you&apos;ve downloaded your Twitter archive, xf lets you search through years of
          tweets instantly. Great for finding old conversations, references, or building
          datasets.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Ultra-Fast"
              description="Sub-millisecond query times"
              gradient="from-slate-500/20 to-gray-500/20"
            />
            <FeatureCard
              icon={<Database className="h-5 w-5" />}
              title="Tantivy + SQLite"
              description="Full-text search with metadata"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<Clock className="h-5 w-5" />}
              title="Date Ranges"
              description="Filter by time periods"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title="Export"
              description="Output to JSON, CSV, or plain text"
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: Essential Commands */}
      <Section title="Essential Commands" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <CommandList
          commands={[
            { command: 'xf index <archive-path>', description: 'Index your Twitter archive' },
            { command: 'xf search <query>', description: 'Search your tweets' },
            { command: 'xf search --from 2023-01-01', description: 'Search with date filter' },
            { command: 'xf --help', description: 'Show all options' },
          ]}
        />

        <TipBox variant="info">
          Download your archive from X/Twitter settings, then run <code>xf index</code> once.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 3: Example Searches */}
      <Section title="Example Searches" icon={<Play className="h-5 w-5" />} delay={0.3}>
        <CodeBlock code={`# Index your archive (one-time)
xf index ~/Downloads/twitter-archive

# Search for a topic
xf search "machine learning"

# Search within a date range
xf search "rust" --from 2024-01-01 --to 2024-06-30

# Export results to JSON
xf search "AI" --format json > results.json`} />
      </Section>
    </div>
  );
}
