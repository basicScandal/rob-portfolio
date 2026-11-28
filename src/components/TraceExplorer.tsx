"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import type { Status, Trace, TraceEntry } from "@/lib/pssTraces";

const W = 720;
const H = 360;
const R = 17;
const RUNNING = "#4f8cff";

const statusLabel: Record<Status, string> = {
  open: "open",
  met: "met on evidence",
  recorded: "recorded",
  negative: "negative",
  reported: "reported, unverified",
  verified: "verified",
  pending: "pending",
  running: "running",
  held: "held for approval",
  done: "done",
  dropped: "dropped",
  hint: "from the operator",
};

function nodeStyle(status: Status) {
  switch (status) {
    case "verified":
    case "met":
      return { fill: "var(--accent)", stroke: "var(--accent)", text: "var(--bg)", dash: undefined };
    case "reported":
      return { fill: "var(--bg-card)", stroke: "var(--accent)", text: "var(--fg)", dash: "4 3" };
    case "negative":
      return { fill: "color-mix(in srgb, var(--fg-faint) 30%, var(--bg-card))", stroke: "var(--fg-faint)", text: "var(--fg-muted)", dash: undefined };
    case "running":
      return { fill: `color-mix(in srgb, ${RUNNING} 18%, var(--bg-card))`, stroke: RUNNING, text: "var(--fg)", dash: undefined };
    case "pending":
    case "open":
      return { fill: "var(--bg-card)", stroke: "var(--fg-muted)", text: "var(--fg)", dash: "4 3" };
    case "held":
    case "hint":
      return { fill: "color-mix(in srgb, var(--gold) 18%, var(--bg-card))", stroke: "var(--gold)", text: "var(--fg)", dash: undefined };
    case "dropped":
      return { fill: "var(--bg-card)", stroke: "var(--fg-faint)", text: "var(--fg-faint)", dash: "2 3" };
    default:
      return { fill: "var(--bg-card)", stroke: "var(--fg)", text: "var(--fg)", dash: undefined };
  }
}

function Shape({ entry, status }: { entry: TraceEntry; status: Status }) {
  const s = nodeStyle(status);
  const common = { fill: s.fill, stroke: s.stroke, strokeWidth: 1.75, strokeDasharray: s.dash, className: "pss-shape" };
  if (entry.kind === "fact") return <circle r={R} {...common} />;
  if (entry.kind === "intent")
    return <rect x={-R + 1} y={-R + 1} width={2 * R - 2} height={2 * R - 2} rx={3} {...common} />;
  if (entry.kind === "hint")
    return <rect x={-R + 3} y={-R + 3} width={2 * R - 6} height={2 * R - 6} rx={2} transform="rotate(45)" {...common} />;
  return <rect x={-R - 8} y={-R + 1} width={2 * R + 16} height={2 * R - 2} rx={R} {...common} />;
}

function current_add(trace: Trace, step: number) {
  return trace.steps[step].add ?? [];
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function TraceExplorer({ trace, label }: { trace: Trace; label: string }) {
  const last = trace.steps.length - 1;
  const [step, setStep] = useState(last);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!playing) return;
    if (step >= last) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 3200);
    return () => clearTimeout(t);
  }, [playing, step, last]);

  const { order, status, fresh } = useMemo(() => {
    const order: string[] = [];
    const status: Record<string, Status> = {};
    let fresh: string[] = [];
    trace.steps.slice(0, step + 1).forEach((s, i) => {
      s.add?.forEach((id) => order.push(id));
      Object.assign(status, s.set);
      if (i === step) fresh = [...(s.add ?? []), ...Object.keys(s.set ?? {})];
    });
    return { order, status, fresh };
  }, [trace, step]);

  const byId = useMemo(
    () => Object.fromEntries(trace.entries.map((e) => [e.id, e])),
    [trace]
  );
  const visible = new Set(order);
  const added = current_add(trace, step);
  // Entries written in this step stagger after each other. On first paint
  // the whole graph staggers in board order.
  const delayOf = (id: string, unit: number) => {
    const i = added.indexOf(id);
    return i >= 0 ? i * unit : order.indexOf(id) * 30;
  };
  const current = trace.steps[step];

  const go = (n: number) => {
    setPlaying(false);
    setStep(Math.max(0, Math.min(last, n)));
  };
  const play = () => {
    if (step >= last) setStep(0);
    setPlaying(true);
  };

  const btn =
    "inline-flex items-center justify-center h-9 min-w-9 px-2 rounded border border-border text-fg-muted hover:text-accent hover:border-accent transition-colors disabled:opacity-30 disabled:hover:text-fg-muted disabled:hover:border-border";

  return (
    <figure className="mt-8 border border-border rounded-lg bg-bg-card overflow-hidden">
      {/* Controls + narration */}
      <div className="p-4 sm:p-5 border-b border-border">
        <div className="flex items-center gap-2 flex-wrap">
          <button type="button" className={btn} onClick={() => go(step - 1)} disabled={step === 0} aria-label="Previous step">
            <ChevronLeft size={16} />
          </button>
          <button type="button" className={btn} onClick={() => go(step + 1)} disabled={step === last} aria-label="Next step">
            <ChevronRight size={16} />
          </button>
          <button
            type="button"
            className={`${btn} gap-1.5 px-3 font-meta`}
            onClick={() => (playing ? setPlaying(false) : play())}
          >
            <span className="grid" aria-hidden="true">
              <Play size={14} className="pss-icon col-start-1 row-start-1" data-on={!playing} />
              <Pause size={14} className="pss-icon col-start-1 row-start-1" data-on={playing} />
            </span>
            {playing ? "Pause" : step >= last ? "Replay" : "Play"}
          </button>
          <button type="button" className={btn} onClick={() => go(0)} disabled={step === 0} aria-label="Back to the start">
            <RotateCcw size={14} />
          </button>
          <div className="relative flex items-center gap-1 ml-auto" role="tablist" aria-label={`${label} steps`}>
            <span
              aria-hidden="true"
              className="pss-pill absolute left-0 top-0 h-6 w-3 flex items-center justify-center pointer-events-none"
              style={{ transform: `translateX(${step * 16}px)` }}
            >
              <span className="block h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            {trace.steps.map((s, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === step}
                aria-label={`Step ${i + 1}: ${s.title}`}
                onClick={() => go(i)}
                className="h-6 w-3 flex items-center justify-center"
              >
                <span
                  className={`block h-2 w-2 rounded-full transition-colors ${
                    i < step ? "bg-fg-muted" : "bg-border"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 min-h-[12rem] sm:min-h-[8rem]" aria-live="polite">
          <p className="font-meta text-accent">
            Step {step + 1} of {last + 1}
          </p>
          <div key={step}>
            <h3 className="pss-rise font-editorial text-xl text-fg mt-1">{current.title}</h3>
            <p className="pss-rise text-base text-fg leading-relaxed mt-1.5 max-w-[68ch]" style={delay(40)}>
              {current.text}
            </p>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="overflow-x-auto border-b border-border">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block w-full min-w-[640px]"
          role="img"
          aria-label={`${label}: graph of board entries at step ${step + 1}`}
        >
          {trace.entries.flatMap((to) =>
            to.from
              .filter((f) => visible.has(f) && visible.has(to.id))
              .map((f) => {
                const a = byId[f];
                const dx = to.x - a.x;
                const dy = to.y - a.y;
                const len = Math.hypot(dx, dy);
                const pad = (e: TraceEntry) => (e.kind === "goal" ? R + 12 : R + 4);
                const hot = selected === f || selected === to.id;
                const dim = status[f] === "dropped" || status[to.id] === "dropped";
                const x2 = to.x - (dx / len) * pad(to);
                const y2 = to.y - (dy / len) * pad(to);
                const color = hot ? "var(--accent)" : "var(--fg-faint)";
                const d = delayOf(to.id, 70) + 80;
                return (
                  <g key={`${f}-${to.id}-${dim ? "dim" : "live"}`} opacity={dim ? 0.5 : 1}>
                    <line
                      {...(dim
                        ? { className: "pss-fade" }
                        : { pathLength: 1, className: "pss-edge", style: delay(d) })}
                      x1={a.x + (dx / len) * pad(a)}
                      y1={a.y + (dy / len) * pad(a)}
                      x2={x2 - (dx / len) * 5}
                      y2={y2 - (dy / len) * 5}
                      stroke={color}
                      strokeWidth={hot ? 2 : 1.25}
                      strokeDasharray={dim ? "2 4" : undefined}
                    />
                    <path
                      className="pss-fade"
                      style={{ animationDelay: `${dim ? 0 : d + 250}ms` }}
                      d="M0 0 L-8 -4 L-8 4 z"
                      fill={color}
                      transform={`translate(${x2} ${y2}) rotate(${(Math.atan2(dy, dx) * 180) / Math.PI})`}
                    />
                  </g>
                );
              })
          )}
          {trace.entries
            .filter((e) => visible.has(e.id))
            .map((e) => {
              const st = status[e.id];
              const s = nodeStyle(st);
              const isSel = selected === e.id;
              return (
                <g
                  key={e.id}
                  transform={`translate(${e.x} ${e.y})`}
                  onClick={() => setSelected(isSel ? null : e.id)}
                  className="cursor-pointer"
                  opacity={st === "dropped" ? 0.6 : 1}
                >
                  <title>{`${e.id}: ${e.text} (${statusLabel[st]})`}</title>
                  {(isSel || fresh.includes(e.id)) && (
                    <circle
                      className="pss-fade"
                      r={R + 8}
                      fill="none"
                      stroke={isSel ? "var(--accent)" : "var(--fg-faint)"}
                      strokeWidth={1}
                      opacity={isSel ? 0.9 : 0.5}
                    />
                  )}
                  <g className="pss-node" style={delay(delayOf(e.id, 70))}>
                    <g
                      key={st === "verified" || st === "met" ? "proved" : "open"}
                      className={st === "verified" || st === "met" ? "pss-bob" : undefined}
                      style={delay(Math.max(0, fresh.indexOf(e.id)) * 70)}
                    >
                      <Shape entry={e} status={st} />
                      {st === "dropped" && (
                        <line className="pss-fade" x1={-R + 3} y1={R - 3} x2={R - 3} y2={-R + 3} stroke="var(--fg-faint)" strokeWidth={1.5} />
                      )}
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={e.kind === "goal" ? 10.5 : 12}
                        fontWeight={600}
                        fontFamily="var(--font-mono)"
                        fill={s.text}
                      >
                        {e.kind === "goal" ? "GOAL" : e.id}
                      </text>
                    </g>
                  </g>
                  <text
                    className="pss-fade"
                    y={R + 15}
                    textAnchor="middle"
                    fontSize={12}
                    fontFamily="var(--font-sans)"
                    fill="color-mix(in srgb, var(--fg) 80%, var(--bg-card))"
                  >
                    {e.short}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>

      {/* Board */}
      <div className="p-4 sm:p-5">
        <p className="font-meta text-fg-muted mb-3">The board, in the order of writing</p>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
          {order.map((id) => {
            const e = byId[id];
            const st = status[id];
            const isSel = selected === id;
            const isNew = fresh.includes(id);
            return (
              <li key={id} className="pss-rise" style={delay(delayOf(id, 40))}>
                <button
                  type="button"
                  onClick={() => setSelected(isSel ? null : id)}
                  className={`w-full text-left rounded px-2.5 py-2 border transition-colors ${
                    isSel
                      ? "border-accent bg-accent/10"
                      : isNew
                        ? "border-border bg-fg/[0.04]"
                        : "border-transparent hover:border-border"
                  }`}
                >
                  <span className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-mono text-[13px] font-semibold text-fg">
                      {e.kind === "goal" ? "goal" : e.id}
                    </span>
                    <span className="font-meta text-[11px] text-fg-muted">
                      {e.kind} &middot; {e.by}
                    </span>
                    <span
                      className={`font-meta text-[11px] ml-auto ${
                        st === "verified" || st === "met"
                          ? "text-accent"
                          : st === "held" || st === "hint"
                            ? "text-gold"
                            : "text-fg-muted"
                      }`}
                    >
                      <span key={st} className="pss-swap">{statusLabel[st]}</span>
                    </span>
                  </span>
                  <span
                    className={`block text-[15px] leading-snug mt-0.5 ${
                      st === "dropped" ? "text-fg-faint line-through" : "text-fg"
                    }`}
                  >
                    {e.text}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}
