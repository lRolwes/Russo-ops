"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { employerPages, industryPages, type ContentPage } from "./site-content";
import { useContact } from "./contact-context";
import { applyHref, formatDate, type Opportunity } from "@/lib/opportunities";
import { INQUIRY_LABELS } from "@/lib/inquiries";
import { submitInquiry, type InquiryState } from "./form-actions";

export type ShellProps =
  | { kind: "home" }
  | { kind: "content"; page: ContentPage }
  | { kind: "jobs"; jobs: Opportunity[] }
  | { kind: "job"; job: Opportunity }
  | { kind: "talent" }
  | { kind: "contact" }
  | { kind: "notfound" };

function Brand({ treatment = "mark" }: { treatment?: "mark" | "lockup" }) {
  return (
    <a className={`brand brand-${treatment}`} href="/" aria-label="Russo Operational Consulting home">
      <img
        src={treatment === "lockup" ? "/roc-logo-light.png" : "/roc-mark-light.png"}
        alt=""
        aria-hidden="true"
      />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand treatment="mark" />
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          <span /> <span /> <span />
          <b>{open ? "Close" : "Menu"}</b>
        </button>
        <nav id="site-navigation" className={open ? "nav open" : "nav"} aria-label="Primary navigation">
          <div className="nav-group">
            <a href="/employers/staffing-recruiting">Employers</a>
            <div className="nav-panel">
              <p>Workforce solutions</p>
              {employerPages.map((p) => (
                <a key={p.path} href={`/${p.path}`}>
                  {p.label}
                </a>
              ))}
            </div>
          </div>
          <div className="nav-group">
            <a href="/industries">Industries</a>
            <div className="nav-panel wide">
              <p>High-accountability environments</p>
              {industryPages.map((p) => (
                <a key={p.path} href={`/${p.path}`}>
                  {p.label}
                </a>
              ))}
            </div>
          </div>
          <a href="/federal-sdvosb">Federal &amp; SDVOSB</a>
          <div className="nav-group">
            <a href="/candidates">Candidates</a>
            <div className="nav-panel">
              <p>Career paths</p>
              <a href="/jobs">View Opportunities</a>
              <a href="/talent-network">Join Talent Network</a>
              <a href="/candidates#military-transition">Military Transition</a>
            </div>
          </div>
          <a href="/about">About</a>
          <a className="nav-cta" href="/contact?intent=hiring">
            Discuss a hiring need
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const contact = useContact();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Brand treatment="lockup" />
          <p>
            Professional staffing, veteran workforce pipelines, and workforce support for the industries
            America runs on.
          </p>
          <span className="cert-pill">SBA-Certified SDVOSB</span>
        </div>
        <div>
          <h2>Employers</h2>
          <a href="/employers/staffing-recruiting">Staffing &amp; Recruiting</a>
          <a href="/employers/veteran-workforce-skillbridge">Veteran Workforce &amp; SkillBridge</a>
          <a href="/employers/workforce-advisory">Workforce Advisory</a>
          <a href="/federal-sdvosb">Federal &amp; SDVOSB</a>
        </div>
        <div>
          <h2>Industries</h2>
          <a href="/industries/infrastructure-construction">Infrastructure &amp; Construction</a>
          <a href="/industries/energy-utilities">Energy &amp; Utilities</a>
          <a href="/industries/industrial-manufacturing">Industrial &amp; Manufacturing</a>
          <a href="/industries/logistics-operations">Logistics &amp; Operations</a>
          <a href="/industries/technology-cleared-programs">Technology &amp; Cleared Programs</a>
        </div>
        <div>
          <h2>Connect</h2>
          <a href="/candidates">Candidates</a>
          <a href="/jobs">Current Opportunities</a>
          <a href="/talent-network">Talent Network</a>
          <a href="/about">About ROC</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Based in the St. Louis region. Serving nationwide.</span>
        <div>
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
        <span>© 2026 Russo Operational Consulting Group</span>
      </div>
    </footer>
  );
}

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

function HeroVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "hero-visual compact" : "hero-visual"} aria-hidden="true">
      <div className="blueprint-grid" />
      <div className="beam beam-a" />
      <div className="beam beam-b" />
      <div className="visual-card">
        <span>Operating need</span>
        <strong>MISSION-CRITICAL ROLE</strong>
        <div className="visual-route">
          <i>01</i>
          <b>DEFINE</b>
          <em>Work + constraints</em>
          <i>02</i>
          <b>SOURCE</b>
          <em>Targeted market</em>
          <i>03</i>
          <b>QUALIFY</b>
          <em>Evidence + fit</em>
          <i>04</i>
          <b>SUPPORT</b>
          <em>Decision + start</em>
        </div>
      </div>
      <div className="coordinate">
        38.6270° N<br />
        90.1994° W
      </div>
      <div className="visual-stamp">ROC / WORKFORCE</div>
    </div>
  );
}

const services = [
  {
    n: "01",
    title: "Professional Staffing",
    text: "Direct-hire, contract, and project recruiting for specialized professional and leadership roles.",
    href: "/employers/staffing-recruiting",
  },
  {
    n: "02",
    title: "Veteran Workforce + SkillBridge",
    text: "Employer-ready pipelines, role mapping, program support, sourcing, and conversion planning.",
    href: "/employers/veteran-workforce-skillbridge",
  },
  {
    n: "03",
    title: "Federal + SDVOSB Partnering",
    text: "Staffing capacity and workforce support for primes, federal contractors, and agencies.",
    href: "/federal-sdvosb",
  },
  {
    n: "04",
    title: "Workforce Advisory",
    text: "Demand planning, skills mapping, hiring-process design, and pipeline strategy tied to execution.",
    href: "/employers/workforce-advisory",
  },
];

const processSteps = [
  ["01", "Define", "Scope, environment, authority, schedule, compensation, credentials, and constraints."],
  ["02", "Source", "A targeted strategy across veteran, industry, referral, and specialist networks."],
  ["03", "Qualify", "Technical fit, operating context, leadership, motivation, logistics, and conversion risk."],
  ["04", "Support", "Interview, offer, onboarding, and the agreed guarantee or assignment period."],
];

function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            SBA-Certified SDVOSB <span /> Nationwide workforce solutions
          </p>
          <h1>Professional talent for the industries America runs on.</h1>
          <p className="hero-lead">
            ROC helps construction, infrastructure, energy, industrial, logistics, and technology organizations
            fill critical professional roles, build veteran talent pipelines, and scale with confidence.
          </p>
          <div className="hero-actions">
            <a className="button gold" href="/contact?intent=hiring">
              Discuss a hiring need <Arrow />
            </a>
            <a className="text-link light" href="#capabilities">
              Explore our capabilities <Arrow />
            </a>
          </div>
          <a className="candidate-link" href="/candidates">
            Looking for your next role? <strong>View opportunities →</strong>
          </a>
        </div>
        <HeroVisual />
      </section>

      <section className="proof-strip" aria-label="ROC capabilities at a glance">
        <a href="/federal-sdvosb">
          <b>01</b>
          <span>
            SBA-Certified
            <br />
            SDVOSB
          </span>
        </a>
        <div>
          <b>02</b>
          <span>
            Direct Hire +<br />
            Contract Staffing
          </span>
        </div>
        <a href="/employers/veteran-workforce-skillbridge">
          <b>03</b>
          <span>
            Veteran +<br />
            SkillBridge Pipelines
          </span>
        </a>
        <div>
          <b>04</b>
          <span>
            Nationwide
            <br />
            Search Capability
          </span>
        </div>
      </section>

      <section className="risk-section section-pad">
        <div className="section-intro">
          <p className="eyebrow dark">The operating reality</p>
          <h2>An open role does not stay a recruiting problem.</h2>
          <p>
            In critical industries, the wrong vacancy becomes a schedule problem, a safety problem, a customer
            problem, or a growth constraint. ROC starts with the work that has to get done.
          </p>
          <strong>
            The goal is not more resumes. It is a qualified person who can perform in the environment you are
            actually hiring for.
          </strong>
        </div>
        <div className="risk-map">
          <div className="risk-core">
            <span>OPEN</span>
            <strong>ROLE</strong>
            <small>Operating exposure grows with time</small>
          </div>
          {[
            ["Schedule", "01"],
            ["Safety", "02"],
            ["Cost", "03"],
            ["Execution", "04"],
          ].map(([label, n]) => (
            <div key={label} className={`risk-node node-${n}`}>
              <b>{n}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="capabilities" className="services-section section-pad">
        <div className="section-heading light-heading">
          <div>
            <p className="eyebrow">Ways to engage ROC</p>
            <h2>Workforce solutions built around the mission.</h2>
          </div>
          <p>Four focused ways to solve the talent and readiness problems that directly affect delivery.</p>
        </div>
        <div className="service-grid">
          {services.map((s) => (
            <a key={s.title} className="service-card" href={s.href}>
              <span>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <b>
                Explore capability <Arrow />
              </b>
            </a>
          ))}
        </div>
      </section>

      <section className="industries-section section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Where we work</p>
            <h2>Built for complex, high-accountability work.</h2>
          </div>
          <p>
            Environments where technical competence, leadership, accountability, and the ability to operate
            under pressure determine the outcome.
          </p>
        </div>
        <div className="industry-list">
          {industryPages.map((p, i) => (
            <a key={p.path} href={`/${p.path}`}>
              <span>0{i + 1}</span>
              <h3>{p.label}</h3>
              <p>{p.intro}</p>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className="process-section section-pad">
        <div className="process-title">
          <p className="eyebrow dark">How ROC works</p>
          <h2>A search built from the work backward.</h2>
        </div>
        <div className="process-grid">
          {processSteps.map(([n, title, text]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <a className="text-link" href="/contact?intent=hiring">
          Start a search <Arrow />
        </a>
      </section>

      <section className="feature skillbridge-feature">
        <div className="feature-visual">
          <span>TRANSFERABLE CAPABILITY</span>
          <strong>Military experience</strong>
          <i>→</i>
          <strong>Civilian performance</strong>
        </div>
        <div className="feature-copy">
          <p className="eyebrow dark">Build the bench before the opening becomes urgent</p>
          <h2>Turn military transition into a workforce advantage.</h2>
          <p>
            ROC helps employers determine whether SkillBridge fits, map military experience to real roles,
            coordinate the pathway, prepare supervisors, and build a responsible conversion plan.
          </p>
          <small>
            Participation is mission-dependent, requires command approval, and must follow current Department
            of Defense and approved-provider requirements.
          </small>
          <div>
            <a className="button navy" href="/contact?intent=skillbridge">
              Assess SkillBridge fit <Arrow />
            </a>
            <a className="text-link" href="/employers/veteran-workforce-skillbridge">
              See veteran workforce solutions <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="federal-feature section-pad">
        <div>
          <p className="eyebrow">Certified. Specialized. Ready to support delivery.</p>
          <h2>More than a certification.</h2>
        </div>
        <div>
          <p>
            ROC gives prime contractors, federal contractors, and agencies a workforce partner that understands
            specialized recruiting, veteran talent, and mission-critical programs. Our SBA-certified SDVOSB
            status can support eligible acquisition and subcontracting strategies; our value begins with the
            work we can perform.
          </p>
          <a className="button outline" href="/contact?intent=teaming">
            Discuss a teaming opportunity <Arrow />
          </a>
        </div>
      </section>

      <section className="role-section section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark">Representative workforce needs</p>
            <h2>The kind of work we are built to support.</h2>
          </div>
          <p>
            Concrete role families, presented without implying client work or outcomes that have not been
            approved for public use.
          </p>
        </div>
        <div className="role-panels">
          <article>
            <span>01 / INFRASTRUCTURE</span>
            <h3>Project delivery</h3>
            <p>
              Project managers, construction managers, estimators, schedulers, safety leaders, BIM/VDC, project
              controls, and engineering talent.
            </p>
          </article>
          <article>
            <span>02 / FEDERAL TECHNOLOGY</span>
            <h3>Systems and mission</h3>
            <p>
              Systems engineering, DevOps, cloud, data, cybersecurity, scheduling, and clearance-sensitive roles.
            </p>
          </article>
          <article>
            <span>03 / INDUSTRIAL + LOGISTICS</span>
            <h3>Operations and output</h3>
            <p>
              FTZ and supply-chain leadership, operations, controls, automation, EHS, quality, maintenance, and
              reliability.
            </p>
          </article>
        </div>
      </section>

      <ClosingBand />
    </>
  );
}

function IndustryHub() {
  return (
    <section className="industry-hub section-pad">
      <div className="section-heading">
        <div>
          <p className="eyebrow dark">Five focused markets</p>
          <h2>Choose the environment. See the talent ROC supports.</h2>
        </div>
        <p>
          Each page connects buyer context, hiring triggers, representative roles, and the right next
          conversation.
        </p>
      </div>
      <div className="hub-grid">
        {industryPages.map((p, i) => (
          <a key={p.path} href={`/${p.path}`}>
            <span>0{i + 1}</span>
            <h3>{p.label}</h3>
            <p>{p.intro}</p>
            <b>
              Explore this industry <Arrow />
            </b>
          </a>
        ))}
      </div>
    </section>
  );
}

function ContentView({ page }: { page: ContentPage }) {
  return (
    <>
      <section className={`inner-hero theme-${page.theme ?? "navy"}`}>
        <div className="inner-hero-copy">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <div className="hero-actions">
            <a className="button gold" href={page.primaryCta.href}>
              {page.primaryCta.label} <Arrow />
            </a>
            {page.secondaryCta && (
              <a className="text-link light" href={page.secondaryCta.href}>
                {page.secondaryCta.label} <Arrow />
              </a>
            )}
          </div>
        </div>
        <HeroVisual compact />
      </section>

      {page.path === "industries" ? (
        <IndustryHub />
      ) : (
        <div className="content-sections">
          {page.sections.map((s, i) => (
            <section
              key={s.title}
              className={`content-section ${i % 2 ? "tint" : ""}`}
              id={
                s.roles
                  ? "roles"
                  : s.title.toLowerCase().includes("military")
                    ? "military-transition"
                    : undefined
              }
            >
              <div className="content-label">
                <span>0{i + 1}</span>
                <p>{s.eyebrow ?? "ROC capability"}</p>
              </div>
              <div className="content-main">
                <h2>{s.title}</h2>
                {s.body && <p className="section-lead">{s.body}</p>}
                {s.items && (
                  <div className="item-grid">
                    {s.items.map((item) => (
                      <article key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </article>
                    ))}
                  </div>
                )}
                {s.roles && (
                  <div className="role-tags">
                    {s.roles.map((r) => (
                      <span key={r}>{r}</span>
                    ))}
                  </div>
                )}
                {s.quote && <blockquote>{s.quote}</blockquote>}
              </div>
            </section>
          ))}
        </div>
      )}

      {page.closing && (
        <ClosingBand
          title={page.closing.title}
          body={page.closing.body}
          label={page.closing.cta}
          href={page.closing.href}
        />
      )}
    </>
  );
}

function ClosingBand({
  title = "Tell us what has to get done.",
  body = "Whether you need one difficult hire, project capacity, a veteran pipeline, or an SDVOSB staffing partner, start with the operating need. We will tell you directly where ROC can help.",
  label = "Discuss a hiring need",
  href = "/contact?intent=hiring",
}: {
  title?: string;
  body?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="closing-band">
      <div>
        <p className="eyebrow">Start the right conversation</p>
        <h2>{title}</h2>
      </div>
      <div>
        <p>{body}</p>
        <a className="button gold" href={href}>
          {label} <Arrow />
        </a>
      </div>
    </section>
  );
}

function jobFacts(job: Opportunity) {
  return [job.location, job.employment_type, job.work_model].filter(Boolean);
}

function JobList({ jobs }: { jobs: Opportunity[] }) {
  return (
    <section className="job-list-section section-pad">
      <div className="section-heading">
        <div>
          <p className="eyebrow dark">Public openings</p>
          <h2>
            {jobs.length} open {jobs.length === 1 ? "search" : "searches"}
          </h2>
        </div>
        <p>
          Each listing is a live search ROC owns. If none fits, the Talent Network keeps you in view for upcoming
          roles.
        </p>
      </div>
      <div className="job-list">
        {jobs.map((job) => (
          <a key={job.id} href={`/jobs/${job.slug}`}>
            <div>
              <h3>{job.title}</h3>
              <p className="job-facts">{jobFacts(job).join(" · ")}</p>
              {job.summary && <p>{job.summary}</p>}
            </div>
            <b>
              View role <Arrow />
            </b>
          </a>
        ))}
      </div>
      <a className="text-link" href="/talent-network">
        Join the ROC talent network <Arrow />
      </a>
    </section>
  );
}

function JobDetail({ job }: { job: Opportunity }) {
  const contact = useContact();
  const facts: [string, string][] = (
    [
      ["Location", job.location],
      ["Employment", job.employment_type],
      ["Work model", job.work_model],
      ["Travel", job.travel],
      ["Clearance", job.clearance],
      ["Compensation", job.compensation],
      ["Posted", formatDate(job.posted_on)],
      ["Apply by", job.closes_on ? formatDate(job.closes_on) : ""],
    ] as [string, string][]
  ).filter(([, v]) => v);
  const apply = applyHref(job, contact.email);
  return (
    <>
      <section className="inner-hero simple">
        <div className="inner-hero-copy">
          <p className="eyebrow">{jobFacts(job).join(" · ") || "Current opportunity"}</p>
          <h1>{job.title}</h1>
          {job.summary && <p>{job.summary}</p>}
          <div className="hero-actions">
            <a className="button gold" href={apply} {...(apply.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
              Apply for this role <Arrow />
            </a>
            <a className="text-link light" href="/jobs">
              All opportunities <Arrow />
            </a>
          </div>
        </div>
        <HeroVisual compact />
      </section>
      <section className="job-detail section-pad">
        <dl className="job-facts-list">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="job-body">
          {job.details
            .split(/\n\s*\n/)
            .filter((p) => p.trim())
            .map((p, i) => (
              <p key={i}>{p.trim()}</p>
            ))}
          <a className="button navy" href={apply} {...(apply.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
            Apply for this role <Arrow />
          </a>
          <p className="form-note">
            Not quite the right fit? <a href="/talent-network">Join the Talent Network</a> and ROC will keep you in
            view for upcoming searches.
          </p>
        </div>
      </section>
    </>
  );
}

function Jobs({ jobs }: { jobs: Opportunity[] }) {
  return (
    <>
      <section className="inner-hero simple">
        <div className="inner-hero-copy">
          <p className="eyebrow">Current opportunities</p>
          <h1>Find work that uses what you know.</h1>
          <p>
            ROC recruits veterans and experienced civilian professionals for technical, leadership, project, and
            mission-critical roles across the United States.
          </p>
        </div>
        <HeroVisual compact />
      </section>
      {jobs.length > 0 ? (
        <JobList jobs={jobs} />
      ) : (
      <section className="empty-jobs section-pad">
        <div className="empty-marker">00</div>
        <div>
          <p className="eyebrow dark">Public openings</p>
          <h2>No public openings match right now.</h2>
          <p>
            Join the Talent Network so ROC can consider you for upcoming searches. We will only contact you when
            a role or conversation aligns with the experience and constraints you share.
          </p>
          <a className="button navy" href="/talent-network">
            Join the ROC talent network <Arrow />
          </a>
        </div>
      </section>
      )}
      <section className="candidate-promise section-pad">
        <h2>What ROC will—and will not—do.</h2>
        <div>
          <p>
            <b>No candidate fees.</b> ROC is paid by the hiring organization.
          </p>
          <p>
            <b>No blind submissions.</b> We discuss the role and your interest before representation.
          </p>
          <p>
            <b>No fake listings.</b> This page shows only live, owned searches.
          </p>
        </div>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <>
      <section className="inner-hero simple">
        <div className="inner-hero-copy">
          <p className="eyebrow">Page not found</p>
          <h1>That page is not here.</h1>
          <p>The link may be out of date. These are the best places to pick up from.</p>
          <div className="hero-actions">
            <a className="button gold" href="/">
              ROC home <Arrow />
            </a>
            <a className="text-link light" href="/contact">
              Contact ROC <Arrow />
            </a>
          </div>
        </div>
        <HeroVisual compact />
      </section>
      <IndustryHub />
    </>
  );
}

function SmartForm({ mode }: { mode: "contact" | "talent" }) {
  const { email, phone, phoneHref } = useContact();
  const [intent, setIntent] = useState(mode === "talent" ? "candidate" : "hiring");
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiry, {});
  const [startedAt, setStartedAt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setStartedAt(Date.now());
    if (mode !== "contact") return;
    const q = new URLSearchParams(window.location.search).get("intent");
    if (q && q in INQUIRY_LABELS) setIntent(q);
  }, [mode]);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    fd.set("_mode", mode);
    fd.set("_page", window.location.pathname + window.location.search);
    fd.set("_t", String(startedAt));
    // Submitted manually (not via the action prop) so a server-side error never clears what was typed.
    startTransition(() => action(fd));
  }

  if (state.ok) {
    return (
      <div className="smart-form form-done" role="status">
        <p className="eyebrow dark">Message received</p>
        <h3>Thank you — your {mode === "talent" ? "profile" : "message"} is with ROC.</h3>
        <p>
          {mode === "talent"
            ? "ROC will reach out when a role or conversation fits the experience you shared."
            : "ROC will follow up by email or phone."}{" "}
          Need to add something? Email <a href={`mailto:${email}`}>{email}</a> or call{" "}
          <a href={phoneHref}>{phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="smart-form" onSubmit={onSubmit}>
      <div className="hp-field" aria-hidden="true">
        <label>
          Leave this empty <input name="_hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-grid">
        <label>
          <span>Name *</span>
          <input name="Name" required autoComplete="name" />
        </label>
        <label>
          <span>Email *</span>
          <input name="Email" required type="email" autoComplete="email" />
        </label>
        <label>
          <span>Phone</span>
          <input name="Phone" type="tel" autoComplete="tel" />
        </label>
        {mode === "contact" ? (
          <>
            <label>
              <span>Company</span>
              <input name="Company" autoComplete="organization" />
            </label>
            <label className="full">
              <span>What do you want to discuss? *</span>
              <select name="Inquiry type" value={intent} onChange={(e) => setIntent(e.target.value)} required>
                <option value="hiring">A hiring need</option>
                <option value="skillbridge">SkillBridge fit or pilot</option>
                <option value="veteran">Veteran hiring</option>
                <option value="teaming">Federal / prime teaming</option>
                <option value="advisory">A workforce challenge</option>
                <option value="general">Something else</option>
              </select>
            </label>
            <label>
              <span>Role, scope, or opportunity</span>
              <input name="Role or scope" />
            </label>
            <label>
              <span>Location</span>
              <input name="Location" />
            </label>
            <label>
              <span>Timing</span>
              <input name="Timing" placeholder="Immediate, 30 days, Q4…" />
            </label>
            <label>
              <span>Preferred next step</span>
              <select name="Preferred next step">
                <option>Short call</option>
                <option>Email response</option>
                <option>Capability information</option>
                <option>Not sure yet</option>
              </select>
            </label>
            <label className="full">
              <span>What has to get done? *</span>
              <textarea
                name="Operating need"
                required
                rows={6}
                placeholder="Describe the role, project, workforce need, constraints, and what happens if it is not solved."
              />
            </label>
          </>
        ) : (
          <>
            <label>
              <span>Current location *</span>
              <input name="Current location" required />
            </label>
            <label>
              <span>Target role families *</span>
              <input name="Target roles" required placeholder="Project management, controls, logistics…" />
            </label>
            <label>
              <span>Relocation / travel</span>
              <input name="Relocation and travel" />
            </label>
            <label>
              <span>Experience</span>
              <input name="Years and level" placeholder="Years, leadership level, technical focus" />
            </label>
            <label>
              <span>Military transition date</span>
              <input name="Transition date" placeholder="If applicable" />
            </label>
            <label>
              <span>Clearance / certifications</span>
              <input name="Clearance and certifications" />
            </label>
            <label>
              <span>LinkedIn URL</span>
              <input name="LinkedIn" type="url" />
            </label>
            <label>
              <span>Compensation target</span>
              <input name="Compensation target" />
            </label>
            <label className="full">
              <span>What work are you built for? *</span>
              <textarea
                name="Career summary"
                required
                rows={6}
                placeholder="Describe the outcomes you have owned, environments you know, and the work you want next."
              />
            </label>
          </>
        )}
        <label className="check full">
          <input name="Consent" type="checkbox" required />
          <span>
            I consent to ROC contacting me about this inquiry. Do not include medical, controlled, classified,
            export-controlled, or other sensitive information.
          </span>
        </label>
      </div>
      {state.error && (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      )}
      <button className="button gold" type="submit" disabled={pending}>
        {pending ? "Sending…" : mode === "talent" ? "Send my profile to ROC" : "Send to ROC"} <Arrow />
      </button>
      <p className="form-note">
        Your message goes directly to ROC.{" "}
        {mode === "talent" ? "If a role fits, ROC will ask for your résumé by email." : ""}
      </p>
    </form>
  );
}

function FormPage({ talent = false }: { talent?: boolean }) {
  const contact = useContact();
  return (
    <>
      <section className="form-hero">
        <div>
          <p className="eyebrow">{talent ? "ROC talent network" : "Start the right conversation"}</p>
          <h1>{talent ? "Put your experience on ROC's radar." : "Tell us what has to get done."}</h1>
          <p>
            {talent
              ? "The right opportunity may not be public today. Share the work you know, the constraints that matter, and what you want next."
              : "Hire talent, build a veteran pipeline, discuss a teaming opportunity, or bring ROC a workforce challenge."}
          </p>
        </div>
        <aside>
          <span>Direct contact</span>
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <small>
            St. Louis region
            <br />
            Serving clients and candidates nationwide
          </small>
        </aside>
      </section>
      <section className="form-section section-pad">
        <div className="form-context">
          <p className="eyebrow dark">{talent ? "Your profile" : "The useful first input"}</p>
          <h2>
            {talent
              ? "Give us enough context to recognize the right fit."
              : "Start with the operating need—not a generic message."}
          </h2>
          <p>
            {talent
              ? "Focus on the work you can perform, the environments you understand, and practical boundaries such as location, travel, timing, and compensation."
              : "Role, location, timing, constraints, and the consequence of delay help ROC give you a direct answer quickly."}
          </p>
        </div>
        <SmartForm mode={talent ? "talent" : "contact"} />
      </section>
    </>
  );
}

export function SiteShell(props: ShellProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        {props.kind === "home" && <Home />}
        {props.kind === "content" && <ContentView page={props.page} />}
        {props.kind === "jobs" && <Jobs jobs={props.jobs} />}
        {props.kind === "job" && <JobDetail job={props.job} />}
        {props.kind === "talent" && <FormPage talent />}
        {props.kind === "contact" && <FormPage />}
        {props.kind === "notfound" && <NotFound />}
      </main>
      <Footer />
    </>
  );
}
