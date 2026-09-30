import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  BrainCircuit,
  Check,
  Clock3,
  GitBranch,
  PlugZap,
  ShieldCheck,
  Sun,
  Waypoints,
  Workflow,
  Zap,
} from 'lucide-react';
import './roadmap.css';

export const metadata = {
  title: 'Development roadmap | EV Energy Twin AI EMS',
  description: 'See what works in the synthetic energy twin today and how it develops toward an explainable, safe, closed-loop EMS.',
};

const capabilities = [
  {
    icon: Activity,
    title: 'Replayable site twin',
    detail: 'A deterministic 24-hour workplace scenario with vehicles, charging, building demand, grid limits and a 3D campus.',
  },
  {
    icon: GitBranch,
    title: 'Six strategy baselines',
    detail: 'Immediate, Load balancing, Deadline-aware, Cheapest, Peak-aware and Total-cost-aware runs share the same scenario.',
  },
  {
    icon: Sun,
    title: 'Energy and weather views',
    detail: 'Synchronized site power, delivered energy, tariffs, regional comparisons and synthetic environmental conditions.',
  },
  {
    icon: BrainCircuit,
    title: 'Synthetic ML training lab',
    detail: 'A seeded set of 365 replayable days trains a small policy in the browser and exposes it as a seventh comparison run.',
  },
  {
    icon: Workflow,
    title: 'Inspectable control trace',
    detail: 'A synthetic trace shows signal assessment, dispatch, virtual acknowledgement, feedback and local fallback.',
  },
];

const phases = [
  {
    number: '00',
    status: 'complete',
    label: 'Delivered',
    title: 'Establish the twin and simulator baseline',
    summary: 'Keep the AI EMS as a standalone project and preserve the deterministic Energy Twin as its physics and comparison baseline.',
    items: [
      'Independent static site, simulator engine and six comparable strategies.',
      'Scenario controls, synchronized charts, replay, export and a 3D workplace view.',
      'Synthetic control-loop and full-year ML training demonstrations.',
    ],
    exit: 'The site builds under its own GitHub Pages path; existing simulator behavior and browser checks pass.',
    icon: Check,
  },
  {
    number: '01',
    status: 'review',
    label: 'Review gate',
    title: 'Confirm the domain and site scope',
    summary: 'The provider-neutral ontology baseline is in place. Review the coverage register against the intended site, equipment and service requirements before adding EMS runtime behavior.',
    items: [
      'Ontology v0.2, SHACL checks, semantic fixtures and pinned adapter profiles are present.',
      'Confirm quantities, provenance, missing/stale behavior, lifecycle states and required evidence for the target site.',
      'Add any uncovered site requirement and its positive/negative fixture to the register.',
    ],
    exit: 'The scope owner signs off the coverage register; all required concepts and external boundaries have an explicit contract or a documented reason to remain provider-neutral.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    status: 'next',
    label: 'Next build stage',
    title: 'Build deterministic input and event replay',
    summary: 'Start with synthetic adapters that turn weather, energy, market, site and charging information into a versioned input snapshot.',
    items: [
      'Normalize OpenADR-like events, tariffs, grid limits, PV, building load, storage, sessions and charger telemetry.',
      'Preserve source, event time, recorded time, validity, units, quality and revisions.',
      'Handle stale, revised, cancelled, duplicate and out-of-order events with a documented policy.',
    ],
    exit: 'A fixed seed and event stream reproduce the same snapshot and outcome; a correction changes only its valid time window.',
    icon: Waypoints,
  },
  {
    number: '03',
    status: 'planned',
    label: 'Planned',
    title: 'Add explainable signal assessment and recommendations',
    summary: 'Use deterministic rules first, then place a replaceable AI assessor behind the same structured interface.',
    items: [
      'Assess event urgency, impact, available flexibility and confidence.',
      'Recommend one of the existing strategies with evidence and a concise explanation.',
      'Keep schedule construction in the deterministic planner and hard-limit checks in a separate validator.',
    ],
    exit: 'Rules-only runs replay identically; unavailable, malformed or low-confidence AI assessments fall back safely and cannot bypass physical limits.',
    icon: BrainCircuit,
  },
  {
    number: '04',
    status: 'planned',
    label: 'Planned',
    title: 'Simulate protocol commands and measured feedback',
    summary: 'Exercise the asynchronous device boundary virtually before any real charger connection.',
    items: [
      'Create protocol-neutral command intents with target, expiry, correlation and lifecycle.',
      'Implement a deliberately selected OCPP 2.1 Edition 2 fixture subset.',
      'Simulate accepted, rejected, late, duplicate and missing acknowledgements plus meter, power, status and fault feedback.',
    ],
    exit: 'Every command traces to a plan and every feedback event traces to an asset/session; accepted power is never mistaken for delivered energy.',
    icon: PlugZap,
  },
  {
    number: '05',
    status: 'planned',
    label: 'Planned',
    title: 'Close the loop and prove resilience',
    summary: 'Reconcile plans with observed behavior, then replan when the scenario materially changes.',
    items: [
      'Replan on event updates, session changes, forecast error, faults and missed telemetry deadlines.',
      'Exercise stale inputs, low AI confidence, connection loss, recovery and infeasible demand.',
      'Compare service readiness, feasibility, limits, cost and delivered energy on identical replayed scenarios.',
    ],
    exit: 'Scenario evidence shows normal operation, event response, recovery and fallback without hiding shortfall or violating hard constraints.',
    icon: Activity,
  },
  {
    number: '06',
    status: 'later',
    label: 'Later',
    title: 'Package stable boundaries for reuse',
    summary: 'Version the vocabulary, contracts and neutral APIs only after the standalone EMS model has stabilized.',
    items: [
      'Publish independently versioned contracts, ontology, SHACL shapes and replay metadata.',
      'Assess an explicit ChargeWeave mapping as a separate proposal; keep this EMS repository independent.',
      'Treat replay, shadow and any live adapter as separate per-boundary operating modes with their own evidence and approval gates.',
    ],
    exit: 'A reviewed portability proposal and site-specific conformance evidence exist before any real-feed or dispatch scope is considered.',
    icon: BatteryCharging,
  },
];

const statusCopy: Record<string, string> = {
  complete: 'roadmap-status roadmap-status--complete',
  review: 'roadmap-status roadmap-status--review',
  next: 'roadmap-status roadmap-status--next',
  planned: 'roadmap-status roadmap-status--planned',
  later: 'roadmap-status roadmap-status--later',
};

export default function RoadmapPage() {
  return (
    <main className="roadmap-page">
      <header className="roadmap-header">
        <Link className="roadmap-brand" href="/">
          <span className="roadmap-brand-mark"><Waypoints size={19} /></span>
          <span>FUTURE <b>EV</b></span>
          <i />
          <strong>Energy Twin</strong>
        </Link>
        <nav className="roadmap-header-links" aria-label="Simulator pages">
          <Link href="/training/">ML training lab</Link>
          <Link className="roadmap-open-simulator" href="/"><ArrowLeft size={15} /> Back to simulator</Link>
        </nav>
      </header>

      <div className="roadmap-content">
        <section className="roadmap-hero">
          <div className="roadmap-hero-copy">
            <div className="roadmap-eyebrow"><span /> SIMULATOR DEVELOPMENT PLAN</div>
            <h1>From a replayable twin<br /><em>to a closed-loop EMS.</em></h1>
            <p>Build the system in evidence-led steps: normalize trusted inputs, produce safe recommendations, exercise protocol behavior, then reconcile commands with measured feedback.</p>
            <div className="roadmap-hero-actions">
              <Link className="roadmap-button roadmap-button--primary" href="/"><Activity size={17} /> Explore the simulator</Link>
              <a className="roadmap-text-link" href="#delivery-roadmap">View the delivery stages <ArrowRight size={16} /></a>
            </div>
          </div>

          <aside className="roadmap-current-card" aria-label="Current development status">
            <div className="roadmap-current-top"><span className="roadmap-pulse" /> CURRENT GATE <span>01 / 06</span></div>
            <h2>Domain scope review</h2>
            <p>The ontology and conformance baseline are in place. Confirm the target site and equipment scope before building new EMS runtime behavior.</p>
            <div className="roadmap-next-line"><span>Next build stage</span><b>Deterministic event replay</b></div>
            <div className="roadmap-progress" role="img" aria-label="Two foundation stages are represented; the first has been delivered and the second is at a review gate">
              <i className="is-done" /><i className="is-review" /><i /><i /><i /><i /><i />
            </div>
            <small>Stages describe capability gates, not calendar promises.</small>
          </aside>
        </section>

        <section className="roadmap-scope-note" role="note">
          <ShieldCheck size={21} />
          <div>
            <strong>What the demo does and does not represent</strong>
            <p>The simulator, control-loop trace and ML lab use synthetic or replayed data. They are not connected to live weather or grid feeds, OpenADR, real meters, chargers/OCPP or a production controller.</p>
          </div>
        </section>

        <section className="roadmap-today" aria-labelledby="roadmap-today-title">
          <div className="roadmap-section-heading">
            <div><div className="roadmap-eyebrow">AVAILABLE IN THE DEMO NOW</div><h2 id="roadmap-today-title">A useful simulator foundation is already here.</h2></div>
            <Link className="roadmap-text-link" href="/training/">Open the ML training lab <ArrowRight size={16} /></Link>
          </div>
          <div className="roadmap-capabilities">
            {capabilities.map(({ icon: Icon, title, detail }, index) => (
              <article className="roadmap-capability" key={title}>
                <div className="roadmap-capability-top"><Icon size={18} /><span>0{index + 1}</span></div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className="roadmap-year-note"><Clock3 size={16} /><p>The “365-day” training set is a set of seeded simulator replays across seasonal conditions. It is not a continuous year of site operation or real-world training data.</p></div>
        </section>

        <section className="roadmap-delivery" id="delivery-roadmap" aria-labelledby="roadmap-delivery-title">
          <div className="roadmap-section-heading roadmap-section-heading--delivery">
            <div><div className="roadmap-eyebrow">BUILD SEQUENCE</div><h2 id="roadmap-delivery-title">Move from simulation to evidence, one gate at a time.</h2></div>
            <div className="roadmap-key" aria-label="Roadmap status key">
              <span><i className="key-done" />Delivered</span>
              <span><i className="key-review" />Review gate</span>
              <span><i className="key-next" />Next</span>
              <span><i className="key-planned" />Planned</span>
            </div>
          </div>

          <div className="roadmap-phase-list">
            {phases.map(({ number, status, label, title, summary, items, exit, icon: Icon }) => (
              <article className={'roadmap-phase roadmap-phase--' + status} data-status={status} key={number}>
                <div className="roadmap-phase-marker"><Icon size={18} /><span>{number}</span></div>
                <div className="roadmap-phase-card">
                  <div className="roadmap-phase-meta"><span className={statusCopy[status]}>{label}</span>{status === 'next' && <span className="roadmap-next-badge">AFTER THE SCOPE GATE</span>}</div>
                  <h3>{title}</h3>
                  <p className="roadmap-phase-summary">{summary}</p>
                  <div className="roadmap-phase-build">
                    <span>Build slice</span>
                    <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
                  </div>
                  <div className="roadmap-exit">
                    <ShieldCheck size={17} />
                    <div><b>Exit evidence</b><p>{exit}</p></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="roadmap-guardrails" aria-labelledby="roadmap-guardrails-title">
          <div className="roadmap-guardrail-heading"><ShieldCheck size={21} /><div><div className="roadmap-eyebrow">SAFETY AND EVIDENCE THROUGHOUT</div><h2 id="roadmap-guardrails-title">Recommendations can guide the plan. They cannot bypass it.</h2></div></div>
          <div className="roadmap-guardrail-grid">
            <div><Zap size={17} /><b>Deterministic limits</b><p>The planner and validator enforce site, charger, battery and service constraints.</p></div>
            <div><BrainCircuit size={17} /><b>Traceable advice</b><p>Record the input snapshot, rules/model version, recommendation and explanation.</p></div>
            <div><Activity size={17} /><b>Observed outcomes</b><p>Keep requested, acknowledged and measured power and delivered energy distinct.</p></div>
            <div><Workflow size={17} /><b>Safe fallback</b><p>Stale inputs, unavailable assessment or lost communication must not create unsafe dispatch.</p></div>
          </div>
        </section>

        <footer className="roadmap-footer">
          <span>ROADMAP SOURCE · AI EMS BUILD PLAN</span>
          <div>
            <a href="https://github.com/pli-poc/ev-energy-twin-ai-ems/blob/main/docs/ai-ems-build-plan.md" target="_blank" rel="noreferrer">Build plan <ArrowRight size={13} /></a>
            <a href="https://github.com/pli-poc/ev-energy-twin-ai-ems/blob/main/docs/ontology-coverage.md" target="_blank" rel="noreferrer">Coverage register <ArrowRight size={13} /></a>
            <a href="https://github.com/pli-poc/ev-energy-twin-ai-ems/blob/main/docs/standards-and-adapters.md" target="_blank" rel="noreferrer">Adapter policy <ArrowRight size={13} /></a>
          </div>
        </footer>
      </div>
    </main>
  );
}
