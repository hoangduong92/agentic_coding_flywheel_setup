"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/lib/markdown-components";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  Home,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type Lesson,
  LESSONS,
  getNextLesson,
  getPreviousLesson,
  useCompletedLessons,
} from "@/lib/lessonProgress";
import {
  getStepBySlug,
  TOTAL_STEPS as TOTAL_WIZARD_STEPS,
  useCompletedSteps,
} from "@/lib/wizardSteps";
import {
  useConfetti,
  getCompletionMessage,
  CompletionToast,
  FinalCelebrationModal,
} from "@/components/learn/confetti-celebration";

interface Props {
  lesson: Lesson;
  content: string;
}

// Reading progress hook
function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}

// Premium glassmorphic sidebar with micro-interactions
function LessonSidebar({
  currentLessonId,
  completedLessons,
}: {
  currentLessonId: number;
  completedLessons: number[];
}) {
  const progressPercent = Math.round((completedLessons.length / LESSONS.length) * 100);

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 lg:block">
      {/* Glass panel */}
      <div className="h-full border-r border-white/[0.08] bg-gradient-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-xl">
        <div className="flex h-full flex-col">
          {/* Header with glow */}
          <div className="relative p-6 pb-4">
            {/* Ambient glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <Link
              href="/learn"
              className="group relative flex items-center gap-3 text-foreground/90 transition-all duration-300 hover:text-foreground"
            >
              {/* Glowing icon container */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary/40 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                  <GraduationCap className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
              <div>
                <span className="text-sm font-semibold tracking-tight block">
                  Learning Hub
                </span>
                <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                  ACFS Academy
                </span>
              </div>
            </Link>
          </div>

          {/* Premium progress section */}
          <div className="mx-6 mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-mono text-primary font-medium">{progressPercent}%</span>
            </div>
            {/* Glowing progress bar */}
            <div className="relative h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary to-emerald-400 transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
              {/* Glow effect */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-emerald-400 blur-sm opacity-60 transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
                style={{ animationDelay: '0.5s' }}
              />
            </div>
            <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground/60">
              <span>{completedLessons.length} completed</span>
              <span>{LESSONS.length - completedLessons.length} remaining</span>
            </div>
          </div>

          {/* Lesson list with connector lines */}
          <nav className="flex-1 overflow-y-auto px-4 scrollbar-hide">
            <ul className="relative space-y-1 py-2">
              {/* Vertical connector line */}
              <div className="absolute left-[30px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />

              {LESSONS.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isCurrent = lesson.id === currentLessonId;

                return (
                  <li key={lesson.id} className="relative">
                    <Link
                      href={`/learn/${lesson.slug}`}
                      className={`group relative flex items-center gap-4 rounded-xl px-3 py-3 transition-all duration-300 ${
                        isCurrent
                          ? "bg-primary/10 shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.3)]"
                          : "hover:bg-white/[0.04]"
                      }`}
                    >
                      {/* Node indicator */}
                      <div className="relative z-10">
                        {/* Glow for current/completed */}
                        {(isCurrent || isCompleted) && (
                          <div className={`absolute inset-0 rounded-full blur-md ${
                            isCompleted ? "bg-emerald-500/40" : "bg-primary/40"
                          }`} />
                        )}
                        <div
                          className={`relative flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium border transition-all duration-300 ${
                            isCompleted
                              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]"
                              : isCurrent
                                ? "bg-primary/20 border-primary/50 text-primary shadow-[0_0_15px_-3px_rgba(var(--primary-rgb),0.5)]"
                                : "bg-white/[0.05] border-white/[0.1] text-muted-foreground group-hover:border-white/20 group-hover:bg-white/[0.08]"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          ) : (
                            <span className="tabular-nums">{lesson.id + 1}</span>
                          )}
                        </div>
                      </div>

                      {/* Lesson title */}
                      <div className="flex-1 min-w-0">
                        <span className={`block truncate text-[13px] transition-colors duration-200 ${
                          isCurrent
                            ? "text-primary font-medium"
                            : isCompleted
                              ? "text-foreground/80"
                              : "text-muted-foreground group-hover:text-foreground"
                        }`}>
                          {lesson.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground/50 flex items-center gap-1 mt-0.5">
                          <Clock className="h-2.5 w-2.5" />
                          {lesson.duration}
                        </span>
                      </div>

                      {/* Arrow indicator on hover */}
                      <ChevronRight className={`h-4 w-4 transition-all duration-300 ${
                        isCurrent
                          ? "text-primary opacity-100"
                          : "text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/[0.06]">
            <Link
              href="/"
              className="group flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:text-foreground"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] transition-all duration-300 group-hover:scale-105 group-hover:border-white/20">
                <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function LessonContent({ lesson, content }: Props) {
  const router = useRouter();
  const [completedLessons, markComplete] = useCompletedLessons();
  const [completedSteps] = useCompletedSteps();
  const readingProgress = useReadingProgress();
  const isCompleted = completedLessons.includes(lesson.id);
  const prevLesson = getPreviousLesson(lesson.id);
  const nextLesson = getNextLesson(lesson.id);
  const isWizardComplete = completedSteps.length === TOTAL_WIZARD_STEPS;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showFinalCelebration, setShowFinalCelebration] = useState(false);
  const { celebrate } = useConfetti();

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const wizardStepSlugByLesson: Record<string, string> = {
    welcome: "launch-onboarding",
    "ssh-basics": "ssh-connect",
    "agent-commands": "accounts",
  };
  const wizardStepSlug = wizardStepSlugByLesson[lesson.slug] ?? "os-selection";
  const wizardStep = getStepBySlug(wizardStepSlug);
  const wizardStepTitle = wizardStep?.title ?? "Setup Wizard";

  const handleMarkComplete = useCallback(() => {
    if (isCompleted) {
      if (nextLesson) {
        router.push(`/learn/${nextLesson.slug}`);
      }
      return;
    }

    markComplete(lesson.id);
    const isFinalLesson = !nextLesson;

    celebrate(isFinalLesson);
    setToastMessage(getCompletionMessage(isFinalLesson));
    setShowToast(true);

    timeoutsRef.current.push(setTimeout(() => setShowToast(false), 2500));

    if (isFinalLesson) {
      timeoutsRef.current.push(setTimeout(() => setShowFinalCelebration(true), 500));
    } else {
      timeoutsRef.current.push(setTimeout(() => {
        router.push(`/learn/${nextLesson.slug}`);
      }, 1500));
    }
  }, [lesson.id, markComplete, nextLesson, router, celebrate, isCompleted]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
        case "h":
          if (prevLesson) router.push(`/learn/${prevLesson.slug}`);
          break;
        case "ArrowRight":
        case "l":
          if (nextLesson) router.push(`/learn/${nextLesson.slug}`);
          break;
        case "c":
          if (!isCompleted) handleMarkComplete();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevLesson, nextLesson, isCompleted, handleMarkComplete, router]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/[0.03] via-transparent to-transparent" />
      </div>

      {/* Premium reading progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1">
        <div className="h-full bg-black/20 backdrop-blur-sm" />
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-emerald-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
        {/* Glow */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-emerald-400 blur-sm opacity-80 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
        {/* Leading dot */}
        {readingProgress > 0 && readingProgress < 100 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-150"
            style={{ left: `calc(${readingProgress}% - 6px)` }}
          />
        )}
      </div>

      <CompletionToast message={toastMessage} isVisible={showToast} />
      <FinalCelebrationModal
        isOpen={showFinalCelebration}
        onClose={() => setShowFinalCelebration(false)}
        onGoToDashboard={() => {
          setShowFinalCelebration(false);
          router.push("/learn");
        }}
      />

      <div className="relative flex">
        <LessonSidebar
          currentLessonId={lesson.id}
          completedLessons={completedLessons}
        />

        <main className="flex-1 min-w-0">
          {/* Mobile header - glassmorphic */}
          <div className="sticky top-0 z-20 lg:hidden">
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/40 backdrop-blur-xl px-4 py-3">
              <Link
                href="/learn"
                className="flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Lessons</span>
              </Link>
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
                  <span className="text-primary font-medium tabular-nums">{lesson.id + 1}</span>
                  <span className="text-muted-foreground/60">/</span>
                  <span className="text-muted-foreground tabular-nums">{LESSONS.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-10 md:px-12 md:py-16 lg:px-20 lg:py-20">
            <div className="mx-auto max-w-[720px]">
              {/* Lesson header */}
              <header className="mb-14">
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
                    <span className="text-muted-foreground">Lesson</span>
                    <span className="font-mono text-primary font-medium">{lesson.id + 1}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{lesson.duration}</span>
                  </div>
                  {isCompleted && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                      <span>Complete</span>
                    </div>
                  )}
                </div>

                {/* Title with gradient */}
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
                  {lesson.title}
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {lesson.description}
                </p>
              </header>

              {/* Setup prompt - glassmorphic */}
              {!isWizardComplete && (
                <div className="group mb-12 relative overflow-hidden rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-amber-500/30 hover:bg-amber-500/[0.05]">
                  {/* Subtle glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-6 flex gap-5">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 transition-transform duration-300 group-hover:scale-110">
                        <Sparkles className="h-5 w-5 text-amber-400 transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1.5">
                        New to ACFS?
                      </p>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        Complete the setup wizard first to get the most from these lessons.
                      </p>
                      <Link
                        href={`/wizard/${wizardStepSlug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-all duration-300 group/link"
                      >
                        <span>Go to {wizardStepTitle}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Premium markdown content */}
              <article className="prose prose-neutral dark:prose-invert max-w-none
                prose-headings:font-semibold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-white/[0.06]
                prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
                prose-h4:text-lg prose-h4:mt-8 prose-h4:mb-3
                prose-p:text-muted-foreground prose-p:leading-[1.85] prose-p:mb-6
                prose-a:text-primary prose-a:font-medium prose-a:no-underline prose-a:transition-all prose-a:duration-200 hover:prose-a:text-primary/80 hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:text-[13px] prose-code:font-normal prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-primary/20
                prose-li:text-muted-foreground prose-li:leading-[1.85] prose-li:my-2
                prose-ul:my-6 prose-ol:my-6
                prose-blockquote:border-l-2 prose-blockquote:border-primary/40 prose-blockquote:bg-primary/[0.03] prose-blockquote:py-1 prose-blockquote:pl-5 prose-blockquote:pr-5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-muted-foreground/90
                prose-hr:border-white/[0.08] prose-hr:my-12
              ">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {content}
                </ReactMarkdown>
              </article>

              {/* Completion CTA - glassmorphic card */}
              <div className="mt-20 relative group">
                {/* Glow effect */}
                <div className={`absolute -inset-1 rounded-3xl blur-xl transition-opacity duration-500 ${
                  isCompleted
                    ? "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 opacity-100"
                    : "bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100"
                }`} />

                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8">
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                        isCompleted
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : "bg-primary/10 border-primary/30"
                      }`}>
                        {isCompleted ? (
                          <Check className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Zap className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-1">
                          {isCompleted ? "Lesson complete!" : "Ready to continue?"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {isCompleted
                            ? nextLesson
                              ? "Great progress! Move on when you're ready."
                              : "Congratulations! You've completed all lessons."
                            : "Mark this lesson complete to track your progress."}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handleMarkComplete}
                      disabled={isCompleted && !nextLesson}
                      size="lg"
                      className={`shrink-0 relative overflow-hidden transition-all duration-300 ${
                        isCompleted
                          ? "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]"
                          : "shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.4)] hover:shadow-[0_0_40px_-5px_rgba(var(--primary-rgb),0.5)]"
                      }`}
                    >
                      {/* Shimmer effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_1s_ease-in-out]" />

                      <span className="relative flex items-center gap-2">
                        {isCompleted ? (
                          nextLesson ? (
                            <>Next Lesson<ArrowRight className="h-4 w-4" /></>
                          ) : (
                            <>All Complete<Check className="h-4 w-4" /></>
                          )
                        ) : (
                          <>Mark Complete<Check className="h-4 w-4" /></>
                        )}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation cards */}
              <nav className="hidden lg:grid grid-cols-2 gap-4 mt-12">
                {prevLesson ? (
                  <Link
                    href={`/learn/${prevLesson.slug}`}
                    className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] transition-all duration-300 group-hover:scale-110 group-hover:bg-white/[0.08]">
                        <ChevronLeft className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-x-0.5" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground/60 mb-1 uppercase tracking-wider">Previous</div>
                        <div className="font-medium text-foreground transition-colors group-hover:text-primary">{prevLesson.title}</div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextLesson ? (
                  <Link
                    href={`/learn/${nextLesson.slug}`}
                    className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.12] text-right"
                  >
                    <div className="flex items-center justify-end gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground/60 mb-1 uppercase tracking-wider">Next</div>
                        <div className="font-medium text-foreground transition-colors group-hover:text-primary">{nextLesson.title}</div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] transition-all duration-300 group-hover:scale-110 group-hover:bg-white/[0.08]">
                        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            </div>
          </div>

          <div className="h-28 lg:hidden" />
        </main>
      </div>

      {/* Mobile navigation - glassmorphic */}
      <div className="fixed inset-x-0 bottom-0 z-30 lg:hidden pb-safe">
        <div className="border-t border-white/[0.08] bg-black/60 backdrop-blur-xl">
          <div className="flex items-center gap-3 p-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 hover:scale-105"
              disabled={!prevLesson}
              asChild={!!prevLesson}
            >
              {prevLesson ? (
                <Link href={`/learn/${prevLesson.slug}`} aria-label="Previous">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </Button>

            <Button
              className={`h-12 flex-1 rounded-xl font-medium transition-all duration-300 ${
                isCompleted
                  ? "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_25px_-5px_rgba(16,185,129,0.5)]"
                  : "shadow-[0_0_25px_-5px_rgba(var(--primary-rgb),0.5)]"
              }`}
              onClick={handleMarkComplete}
              disabled={isCompleted && !nextLesson}
            >
              {isCompleted ? (
                nextLesson ? (
                  <span className="flex items-center gap-2">Next<ArrowRight className="h-4 w-4" /></span>
                ) : (
                  <span className="flex items-center gap-2">Done<Check className="h-4 w-4" /></span>
                )
              ) : (
                <span className="flex items-center gap-2">Complete<Check className="h-4 w-4" /></span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 hover:scale-105"
              disabled={!nextLesson}
              asChild={!!nextLesson}
            >
              {nextLesson ? (
                <Link href={`/learn/${nextLesson.slug}`} aria-label="Next">
                  <ChevronRight className="h-5 w-5" />
                </Link>
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
