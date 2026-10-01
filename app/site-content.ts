// Approved ROC site copy. Edit text here; layout lives in site-shell.tsx.

export type Cta = { label: string; href: string };
export type Item = { title: string; text: string };
export type Section = {
  eyebrow?: string;
  title: string;
  body?: string;
  items?: Item[];
  roles?: string[];
  quote?: string;
};
export type ContentPage = {
  path: string;
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  theme?: "navy" | "steel" | "gold";
  sections: Section[];
  closing?: { title: string; body: string; cta: string; href: string };
};

export const SITE_URL = "https://www.russo-ops.com";
export const PHONE = "(636) 515-5645";
export const PHONE_HREF = "tel:+16365155645";
export const EMAIL = "ERusso@Russo-Ops.com";

export const employerPages: ContentPage[] = [
  {
    path: "employers/staffing-recruiting",
    label: "Staffing & Recruiting",
    eyebrow: "Professional staffing for critical industries",
    title: "Critical roles. Qualified people. Fewer misses.",
    intro:
      "ROC delivers direct-hire, contract, and project-based recruiting for professional and leadership roles that affect delivery, safety, schedule, customer performance, and growth.",
    metaTitle: "Professional Staffing & Recruiting | ROC Group",
    metaDescription:
      "Direct-hire, contract, and project-based recruiting for critical professional, technical, and leadership roles.",
    primaryCta: {
      label: "Discuss a hiring need",
      href: "/contact?intent=hiring",
    },
    secondaryCta: {
      label: "Explore industries",
      href: "/industries",
    },
    sections: [
      {
        eyebrow: "When ROC fits",
        title: "Bring ROC in when the role cannot stay open.",
        body: "A specialized search creates leverage when a vacancy is already creating operating risk—or when upcoming demand will outrun the internal team.",
        items: [
          {
            title: "The search is producing volume, not fit",
            text: "Your team has applicants, but not people who can perform in the real environment.",
          },
          {
            title: "Demand is arriving faster than capacity",
            text: "A project, award, expansion, or facility creates hiring pressure your team cannot absorb alone.",
          },
          {
            title: "The requirements intersect",
            text: "Technical depth, leadership, location, credentials, travel, or clearance sharply narrow the market.",
          },
          {
            title: "You need a practical staffing decision",
            text: "ROC helps first-time and experienced buyers choose the right model before launching the search.",
          },
        ],
      },
      {
        eyebrow: "Engagement models",
        title: "Choose the model that fits the work.",
        items: [
          {
            title: "Direct hire",
            text: "Targeted search for permanent professional, technical, and leadership roles, from intake through offer and the agreed placement guarantee.",
          },
          {
            title: "Contract staffing",
            text: "Flexible professional capacity for projects, workload surges, defined periods, or roles that require a working evaluation.",
          },
          {
            title: "Project-based recruiting",
            text: "A focused plan for multiple roles tied to an award, launch, expansion, build, shutdown, or mobilization.",
          },
          {
            title: "Specialty and leadership search",
            text: "High-touch market mapping for confidential, constrained, or business-critical roles.",
          },
        ],
      },
      {
        eyebrow: "Qualification standard",
        title: "What qualified means at ROC.",
        body: "A resume match is the start—not the submission standard. ROC qualifies the person against the work, the environment, and the practical conditions required to succeed.",
        items: [
          {
            title: "Technical alignment",
            text: "Evidence the person can perform the actual work, not merely repeat its keywords.",
          },
          {
            title: "Operating context",
            text: "Fit with project phase, regulated conditions, field reality, customer setting, and pace.",
          },
          {
            title: "Leadership and communication",
            text: "The judgment and coordination required at the level of the role.",
          },
          {
            title: "Practical alignment",
            text: "Compensation, location, travel, schedule, credentials, clearance, and start timing.",
          },
        ],
        quote:
          "The goal is fewer, better-aligned candidates—and a hiring decision that holds up after day one.",
      },
    ],
    closing: {
      title: "Start with the role creating the most risk.",
      body: "Send ROC the role, project, location, timing, and reason the search is difficult. We will give you a direct assessment of fit and next step.",
      cta: "Discuss a hiring need",
      href: "/contact?intent=hiring",
    },
  },
  {
    path: "employers/veteran-workforce-skillbridge",
    label: "Veteran Workforce & SkillBridge",
    eyebrow: "Veteran talent pipelines built for conversion",
    title: "Turn military transition into a workforce advantage.",
    intro:
      "ROC helps employers identify roles that fit military experience, build responsible SkillBridge and veteran-entry pathways, prepare managers, source candidates, and convert proven performers into long-term hires.",
    metaTitle: "SkillBridge & Veteran Workforce Solutions | ROC Group",
    metaDescription:
      "Build employer-ready veteran and SkillBridge talent pipelines with role mapping, program support, candidate sourcing, and conversion planning.",
    primaryCta: {
      label: "Assess SkillBridge fit",
      href: "/contact?intent=skillbridge",
    },
    secondaryCta: {
      label: "Talk about veteran hiring",
      href: "/contact?intent=veteran",
    },
    theme: "gold",
    sections: [
      {
        eyebrow: "The employer case",
        title: "Build talent before the vacancy becomes urgent.",
        items: [
          {
            title: "Early access",
            text: "Engage motivated talent before a service member reaches the open labor market.",
          },
          {
            title: "Real-world evaluation",
            text: "Observe performance, learning speed, leadership, and team fit in a civilian work environment.",
          },
          {
            title: "Role-specific transition",
            text: "Translate military capability into the employer's tools, standards, language, and operating procedures.",
          },
          {
            title: "A repeatable pipeline",
            text: "Turn one successful conversion into a deliberate source of future technical and leadership talent.",
          },
        ],
      },
      {
        eyebrow: "ROC's role",
        title: "From interest to an operating program.",
        items: [
          {
            title: "Readiness assessment",
            text: "Evaluate demand, supervisor capacity, location, training value, conversion potential, and program fit.",
          },
          {
            title: "Role mapping",
            text: "Identify where military experience transfers and define the gaps the training period must close.",
          },
          {
            title: "Program coordination",
            text: "Help structure the pathway with the applicable approved provider and current requirements.",
          },
          {
            title: "Candidate qualification",
            text: "Reach veteran networks and assess candidates against the employer's real work.",
          },
          {
            title: "Manager preparation",
            text: "Create a training plan, feedback cadence, responsibility map, and conversion criteria.",
          },
          {
            title: "Conversion measurement",
            text: "Track readiness, supervisor feedback, offer decisions, retention, and lessons for the next cohort.",
          },
        ],
      },
      {
        eyebrow: "Recommended first pilot",
        title: "Start narrow. Build what can repeat.",
        body: "Choose one function or role family, one accountable business leader, and one to three positions with a credible hiring path. A defined 90- to 120-day experience is often easier to supervise and evaluate than a loosely designed maximum-length placement.",
        quote:
          "SkillBridge is a training pathway—not free labor and not a promise of employment. Participation is mission-dependent, requires command approval, and must follow current requirements.",
      },
      {
        eyebrow: "Common questions",
        title: "Clear expectations protect the employer and participant.",
        items: [
          {
            title: "Does the employer pay military salary?",
            text: "Eligible participants continue receiving military pay and benefits during an approved experience. Employers remain responsible for legitimate training, supervision, and safety.",
          },
          {
            title: "Is employment guaranteed?",
            text: "No. ROC designs toward roles with genuine conversion potential and clear criteria, but SkillBridge remains a training opportunity.",
          },
          {
            title: "Can every service member participate?",
            text: "No. Eligibility, timing, acceptance, and release remain subject to current requirements and command approval.",
          },
          {
            title: "Does ROC only recruit veterans?",
            text: "No. Veteran pipelines are a specialty within ROC's broader staffing capability.",
          },
        ],
      },
    ],
    closing: {
      title: "Is SkillBridge right for your workforce?",
      body: "Start with the roles, locations, supervisor capacity, and real conversion demand. ROC will tell you directly whether the pathway fits.",
      cta: "Assess SkillBridge fit",
      href: "/contact?intent=skillbridge",
    },
  },
  {
    path: "employers/workforce-advisory",
    label: "Workforce Advisory",
    eyebrow: "Workforce planning tied to operating reality",
    title: "Build the workforce plan before you feel the shortage.",
    intro:
      "ROC helps organizations define critical roles, choose the right staffing model, improve hiring decisions, and build talent pipelines around upcoming projects, programs, and growth requirements.",
    metaTitle: "Workforce Planning & Hiring Advisory | ROC Group",
    metaDescription:
      "Plan critical roles, choose staffing models, improve hiring decisions, and build workforce pipelines around growth and project demand.",
    primaryCta: {
      label: "Discuss a workforce challenge",
      href: "/contact?intent=advisory",
    },
    secondaryCta: {
      label: "Explore staffing",
      href: "/employers/staffing-recruiting",
    },
    theme: "steel",
    sections: [
      {
        eyebrow: "Focused support",
        title: "Advisory that ends in an executable plan.",
        items: [
          {
            title: "Workforce demand planning",
            text: "Translate project, contract, expansion, succession, or operating demand into a phased role and hiring plan.",
          },
          {
            title: "Role and skills mapping",
            text: "Clarify outcomes, accountabilities, evidence, transferable skills, credentials, and market constraints.",
          },
          {
            title: "Staffing model decisions",
            text: "Determine where direct hire, contract, project recruiting, veteran pipelines, or internal development best fit.",
          },
          {
            title: "Hiring process design",
            text: "Identify unclear ownership, weak criteria, slow decisions, compensation gaps, and causes of repeated searches.",
          },
          {
            title: "Veteran pipeline strategy",
            text: "Create the path from military experience to defined civilian roles, manager readiness, and conversion.",
          },
          {
            title: "Talent risk review",
            text: "Identify roles where vacancy, retirement, location, clearance, or scarce skills create disproportionate execution risk.",
          },
        ],
      },
      {
        eyebrow: "What you receive",
        title: "Concrete outputs. Defined next moves.",
        body: "A focused engagement may produce a workforce demand map, priority-role matrix, role scorecards, search strategy, hiring-process recommendations, veteran-pipeline blueprint, or 30/60/90-day action plan.",
        quote:
          "Available as a working session, short diagnostic, project-based plan, or advisory support attached to a staffing engagement.",
      },
    ],
    closing: {
      title: "Turn workforce pressure into a decision plan.",
      body: "Bring the demand signal, upcoming work, and roles you cannot afford to discover too late.",
      cta: "Scope an advisory engagement",
      href: "/contact?intent=advisory",
    },
  },
];

export const industryPages: ContentPage[] = [
  {
    path: "industries/infrastructure-construction",
    label: "Infrastructure & Construction",
    eyebrow: "Infrastructure & construction staffing",
    title: "Keep projects staffed from preconstruction through closeout.",
    intro:
      "ROC recruits the professional and leadership talent contractors, engineering firms, developers, owners, and specialty partners need to estimate, plan, build, control, and safely deliver complex work.",
    metaTitle: "Construction & Infrastructure Staffing | ROC Group",
    metaDescription:
      "Recruit project managers, estimators, schedulers, safety leaders, BIM/VDC, engineering, and construction professionals.",
    primaryCta: {
      label: "Discuss a project hiring need",
      href: "/contact?intent=hiring",
    },
    secondaryCta: {
      label: "See representative roles",
      href: "#roles",
    },
    sections: [
      {
        eyebrow: "Who we support",
        title: "Talent across the project ecosystem.",
        items: [
          {
            title: "Contractors and construction managers",
            text: "General contractors, CMs, EPCs, specialty contractors, fabricators, and industrial builders.",
          },
          {
            title: "Engineering and program firms",
            text: "Architecture, engineering, inspection, program management, and owners' representation.",
          },
          {
            title: "Owners and project partners",
            text: "Developers, asset owners, utilities, investors, and federal infrastructure partners.",
          },
        ],
      },
      {
        eyebrow: "Representative roles",
        title: "The work that keeps delivery moving.",
        roles: [
          "Project Executive",
          "Program Manager",
          "Senior Project Manager",
          "Construction Manager",
          "Superintendent",
          "Estimator / Chief Estimator",
          "Scheduler",
          "Project Controls",
          "Cost Engineer",
          "Safety / EHS",
          "BIM / VDC",
          "Civil / Structural / MEP Engineering",
          "QA/QC / Inspection",
          "Contracts / Procurement",
          "Proposal / Pursuit Support",
        ],
      },
      {
        eyebrow: "Project pressure",
        title: "Hiring demand moves with the phase of work.",
        body: "A project can be fully funded and still lose time because the right estimator, project manager, scheduler, safety leader, or technical specialist is missing. ROC recruits against the delivery need—not only the job description.",
        quote:
          "Use direct hire for core leadership, contract staffing for project demand, multi-role recruiting for mobilization, and veteran pathways where experience transfers cleanly.",
      },
    ],
    closing: {
      title: "Tell us where the project is exposed.",
      body: "Share the phase, location, schedule, role, and consequence of delay. ROC will give you a direct view of the right search model.",
      cta: "Discuss a project hiring need",
      href: "/contact?intent=hiring",
    },
  },
  {
    path: "industries/energy-utilities",
    label: "Energy & Utilities",
    eyebrow: "Energy & utilities workforce solutions",
    title: "Build the team behind reliable, safe energy delivery.",
    intro:
      "ROC recruits project, engineering, construction, commissioning, safety, and operations talent for organizations developing, modernizing, and operating energy and utility assets.",
    metaTitle: "Energy & Utility Staffing Solutions | ROC Group",
    metaDescription:
      "Project, engineering, construction, commissioning, EHS, and operations talent for energy and utility organizations.",
    primaryCta: {
      label: "Discuss an energy hiring need",
      href: "/contact?intent=hiring",
    },
    theme: "steel",
    sections: [
      {
        eyebrow: "Operating environments",
        title: "From capital programs to asset reliability.",
        roles: [
          "Grid modernization",
          "Transmission & distribution",
          "Substations",
          "Hydropower & dams",
          "Water infrastructure",
          "Renewable development",
          "Construction & commissioning",
          "Data-center power",
          "Industrial energy",
          "Storage & emerging technology",
          "Federal energy programs",
        ],
      },
      {
        eyebrow: "Representative roles",
        title: "Specialized capability across the asset lifecycle.",
        roles: [
          "Project / Program Management",
          "Construction Management",
          "Owner's Representation",
          "Electrical Engineering",
          "Mechanical / Civil / Structural Engineering",
          "Controls & Field Engineering",
          "Commissioning / Startup",
          "Maintenance & Reliability",
          "Asset Operations",
          "EHS / Safety",
          "Quality & Compliance",
          "Estimating / Scheduling / Project Controls",
        ],
      },
      {
        eyebrow: "Search reality",
        title: "Specialized skills meet difficult constraints.",
        body: "Energy employers face long timelines, regulatory requirements, remote locations, and zero tolerance for shortcuts. ROC builds searches around that context and can add veteran pipelines where technical discipline, safety, operations, and leadership transfer well.",
      },
    ],
    closing: {
      title: "Start with the asset and the phase.",
      body: "Share the project, location, role family, and timing. ROC will help determine the right mix of permanent, contract, and pipeline talent.",
      cta: "Discuss an energy hiring need",
      href: "/contact?intent=hiring",
    },
  },
  {
    path: "industries/industrial-manufacturing",
    label: "Industrial & Manufacturing",
    eyebrow: "Industrial & advanced manufacturing talent",
    title: "Build the workforce that keeps production moving.",
    intro:
      "ROC helps manufacturers, fabricators, automation firms, and industrial operators recruit the technical and leadership talent required to improve output, launch projects, maintain reliability, and scale.",
    metaTitle: "Industrial & Manufacturing Staffing | ROC Group",
    metaDescription:
      "Recruit operations, controls, automation, engineering, maintenance, quality, and EHS talent for industrial employers.",
    primaryCta: {
      label: "Discuss an industrial hiring need",
      href: "/contact?intent=hiring",
    },
    theme: "gold",
    sections: [
      {
        eyebrow: "Representative roles",
        title: "Talent across operations, technology, and risk.",
        roles: [
          "Plant / Operations Manager",
          "Production Leadership",
          "Maintenance / Reliability",
          "Continuous Improvement",
          "Supply Chain / Materials",
          "Controls / Automation Engineer",
          "Electrical / Mechanical Engineer",
          "Manufacturing Engineer",
          "Project Engineer / Manager",
          "Quality Manager / Engineer",
          "EHS / Safety",
          "QA/QC",
          "Compliance",
          "Training / Readiness",
        ],
      },
      {
        eyebrow: "Qualification context",
        title: "Paper fit is not production fit.",
        body: "ROC screens for pace, shift and travel expectations, safety culture, hands-on versus design responsibility, equipment exposure, leadership scope, and the practical constraints that determine whether a hire lasts.",
      },
      {
        eyebrow: "Veteran pathway",
        title: "A strong environment for transferable experience.",
        body: "Military maintenance, operations, logistics, safety, technical, and leadership experience can convert into durable industrial capability when the role, training, and supervisor plan are built intentionally.",
        quote:
          "Start with the production constraint, project, or role family—not a generic job description.",
      },
    ],
    closing: {
      title: "What is holding production back?",
      body: "Bring ROC the constraint, role, location, shift, and technical environment. We will build the search around the real work.",
      cta: "Discuss an industrial hiring need",
      href: "/contact?intent=hiring",
    },
  },
  {
    path: "industries/logistics-operations",
    label: "Logistics & Operations",
    eyebrow: "Logistics & operations staffing",
    title: "Put proven operators where flow, service, and cost are decided.",
    intro:
      "ROC recruits leaders and specialists across supply chain, foreign-trade zones, distribution, transportation, program management, continuous improvement, and multi-site operations.",
    metaTitle: "Logistics & Operations Recruiting | ROC Group",
    metaDescription:
      "Specialized recruiting for supply chain, FTZ, distribution, program management, continuous improvement, and operations leadership.",
    primaryCta: {
      label: "Discuss an operations hiring need",
      href: "/contact?intent=hiring",
    },
    sections: [
      {
        eyebrow: "Representative roles",
        title: "Leadership and specialists across the operating network.",
        roles: [
          "Operations / Regional Leadership",
          "Site / Warehouse / Distribution Leadership",
          "Supply Chain",
          "Procurement / Sourcing",
          "Inventory / Materials",
          "Foreign-Trade Zone Leadership",
          "Trade Compliance",
          "Customs Operations",
          "Transportation / Fleet",
          "Network Operations",
          "Continuous Improvement",
          "Program Management",
          "Safety / Training / Readiness",
        ],
      },
      {
        eyebrow: "The operating context",
        title: "The same title can mean a different job.",
        body: "Scale, customer promise, labor model, site network, regulatory exposure, systems, peak periods, and decision authority define the role. ROC qualifies those variables before presenting candidates.",
      },
      {
        eyebrow: "Candidate market",
        title: "Civilian and military operating experience.",
        body: "ROC reaches experienced professionals and veterans whose backgrounds demonstrate planning, accountability, leadership, logistics, and performance under pressure.",
      },
    ],
    closing: {
      title: "Define the operation before the search.",
      body: "Share the scale, location, KPIs, leadership scope, and business problem the person must solve.",
      cta: "Discuss an operations hiring need",
      href: "/contact?intent=hiring",
    },
  },
  {
    path: "industries/technology-cleared-programs",
    label: "Technology & Cleared Programs",
    eyebrow: "Technology & cleared talent",
    title: "Technical talent for systems that have to work.",
    intro:
      "ROC recruits systems, cloud, DevOps, data, cybersecurity, and technical program talent for commercial, federal, and defense environments where technical fit, mission context, location, and clearance can all determine the search.",
    metaTitle: "Technology & Cleared Talent Recruiting | ROC Group",
    metaDescription:
      "Systems, DevOps, cloud, data, cyber, and technical program talent for commercial, federal, and defense environments.",
    primaryCta: {
      label: "Discuss a technical hiring need",
      href: "/contact?intent=hiring",
    },
    theme: "steel",
    sections: [
      {
        eyebrow: "Representative roles",
        title: "Technical capability aligned to the program.",
        roles: [
          "Systems Engineering",
          "Integration / Architecture",
          "DevOps / Platform",
          "Cloud Engineering",
          "Site Reliability",
          "Infrastructure Engineering",
          "Data Engineering / Analytics",
          "Data Science / MLOps",
          "Cybersecurity",
          "Information Assurance",
          "Technical Program Management",
          "Scheduling / Project Controls",
          "Mission Support",
        ],
      },
      {
        eyebrow: "Search constraints",
        title: "Design for the narrow market from the start.",
        body: "Clearance, on-site presence, unusual schedules, specialized domain experience, compensation, and work location are not afterthoughts. ROC treats them as search inputs and screens for both technical capability and program reality.",
      },
      {
        eyebrow: "Federal alignment",
        title: "Support for mission-sensitive work.",
        body: "ROC can support defined labor categories and technical searches as a specialized recruiting partner or within an agreed SDVOSB teaming structure.",
      },
    ],
    closing: {
      title: "Send the real technical constraints.",
      body: "Share the scope, location, work model, clearance, labor category if applicable, and target start date.",
      cta: "Discuss a technical hiring need",
      href: "/contact?intent=hiring",
    },
  },
];

export const otherPages: ContentPage[] = [
  {
    path: "industries",
    label: "Industries",
    eyebrow: "Specialized talent for high-accountability environments",
    title: "Talent for work that cannot slip.",
    intro:
      "ROC focuses on industries where workforce gaps quickly become delivery, safety, uptime, compliance, or customer problems. We recruit professionals who understand the stakes and can operate in the environment.",
    metaTitle: "Staffing for Critical Industries | ROC Group",
    metaDescription:
      "Specialized staffing for infrastructure, energy, manufacturing, logistics, operations, technology, and cleared programs.",
    primaryCta: {
      label: "Discuss a hiring need",
      href: "/contact?intent=hiring",
    },
    sections: [],
  },
  {
    path: "federal-sdvosb",
    label: "Federal & SDVOSB",
    eyebrow: "SBA-certified Service-Disabled Veteran-Owned Small Business",
    title: "Specialized workforce capacity. Certified SDVOSB partnership.",
    intro:
      "ROC supports prime contractors, federal contractors, engineering and construction partners, and government customers with professional staffing, veteran workforce pipelines, and targeted workforce support for mission-critical work.",
    metaTitle: "SDVOSB Staffing & Federal Teaming Partner | ROC Group",
    metaDescription:
      "SBA-certified SDVOSB supporting primes, federal contractors, and agencies with staffing, veteran pipelines, and workforce capability.",
    primaryCta: {
      label: "Discuss a teaming opportunity",
      href: "/contact?intent=teaming",
    },
    secondaryCta: {
      label: "Request capability information",
      href: "mailto:ERusso@Russo-Ops.com?subject=ROC%20Capability%20Information",
    },
    sections: [
      {
        eyebrow: "Ways to partner",
        title: "Built to fit the work and the pursuit.",
        items: [
          {
            title: "Staffing subcontractor",
            text: "Recruiting and support for defined professional or technical labor categories under the agreed prime-subcontractor structure.",
          },
          {
            title: "Project-specific recruiting",
            text: "Targeted pipelines for an award, mobilization, surge, remote location, or hard-to-fill role family.",
          },
          {
            title: "Veteran workforce partner",
            text: "Veteran and SkillBridge pathways aligned to program demand, conversion potential, and employer readiness.",
          },
          {
            title: "Pre-award alignment",
            text: "Selective participation where customer need, scope, labor categories, geography, compliance, and post-award workshare are clear.",
          },
        ],
      },
      {
        eyebrow: "Core capabilities",
        title: "A partner built around performance.",
        items: [
          {
            title: "Professional staffing",
            text: "Direct-hire, contract, and project recruiting across delivery, engineering, operations, logistics, safety, technology, systems, and program support.",
          },
          {
            title: "Veteran pipelines",
            text: "Veteran sourcing, military-to-civilian mapping, SkillBridge pathway support, supervisor preparation, and conversion planning.",
          },
          {
            title: "Workforce advisory",
            text: "Demand planning, role calibration, hiring-process design, pipeline strategy, and readiness tied to execution.",
          },
          {
            title: "Industry alignment",
            text: "Infrastructure, energy, industrial, logistics, operations, technology, and cleared programs.",
          },
        ],
        quote:
          "ROC's certification can matter in the acquisition strategy. Our performance must matter in the delivery strategy.",
      },
      {
        eyebrow: "Partner standard",
        title: "Defined work. Defined ownership.",
        body: "ROC pursues work where capability, responsibility, workshare, economics, compliance requirements, and delivery ownership are defined. Certification is not a pass-through relationship.",
      },
    ],
    closing: {
      title: "Bring ROC a defined opportunity.",
      body: "Share the customer, scope, stage, labor categories, geography, timeline, and the work ROC would own.",
      cta: "Discuss a teaming opportunity",
      href: "/contact?intent=teaming",
    },
  },
  {
    path: "candidates",
    label: "Candidates",
    eyebrow: "Careers with purpose, responsibility, and room to grow",
    title: "Your next role should use what you know—not make you start over.",
    intro:
      "ROC connects veterans and experienced civilian professionals with organizations that need leadership, technical capability, operational judgment, and people who follow through.",
    metaTitle: "Careers for Veterans & Experienced Professionals | ROC Group",
    metaDescription:
      "Explore career opportunities and join ROC's talent network for professional, technical, leadership, and mission-critical roles.",
    primaryCta: {
      label: "View current opportunities",
      href: "/jobs",
    },
    secondaryCta: {
      label: "Join the ROC talent network",
      href: "/talent-network",
    },
    sections: [
      {
        eyebrow: "Two ways to work with ROC",
        title: "A live role—or the right future match.",
        items: [
          {
            title: "Apply to an active opportunity",
            text: "Use the jobs page when your background aligns with a current client search.",
          },
          {
            title: "Join the talent network",
            text: "Tell us what work you are built for, your location and travel limits, target compensation, credentials, and timing.",
          },
        ],
      },
      {
        eyebrow: "What to expect",
        title: "A direct and respectful recruiting relationship.",
        items: [
          {
            title: "Candid conversation",
            text: "We discuss your experience, goals, constraints, and the opportunity before moving forward.",
          },
          {
            title: "No candidate fees",
            text: "ROC is paid by the hiring organization under the applicable staffing agreement.",
          },
          {
            title: "Authorized representation",
            text: "We submit only after the role and your interest are discussed and authorization is clear.",
          },
          {
            title: "Careful information handling",
            text: "Compensation, transition, clearance, and confidential details are treated with respect.",
          },
        ],
      },
      {
        eyebrow: "Military transition",
        title: "Translate outcomes—not acronyms.",
        body: "ROC focuses on the outcomes you owned, the conditions you operated in, the people and resources you led, the technical work you performed, and the civilian roles where that evidence matters.",
        quote:
          "When an employer has an appropriate approved pathway, ROC may help connect eligible service members to SkillBridge-aligned opportunities. Timing and approval remain subject to current requirements.",
      },
    ],
  },
  {
    path: "about",
    label: "About ROC",
    eyebrow: "Veteran-led. Operator-built. Mission-focused.",
    title: "Built by an operator. Focused on the people who deliver.",
    intro:
      "ROC was created to help organizations find professionals who can perform in complex, high-accountability environments—and to help veterans and other proven operators move into work worthy of their capabilities.",
    metaTitle: "About ROC Group | Veteran-Led Staffing & Workforce Solutions",
    metaDescription:
      "Meet ROC Group, an SBA-certified SDVOSB built to connect critical industries with proven professional and veteran talent.",
    primaryCta: {
      label: "Work with ROC",
      href: "/contact",
    },
    sections: [
      {
        eyebrow: "Our origin",
        title: "Execution begins with the people trusted to deliver it.",
        body: "Employers in infrastructure, energy, industry, logistics, and technology need more than applicants. They need professionals who understand accountability, adapt to changing conditions, communicate clearly, and take ownership of the outcome.",
      },
      {
        eyebrow: "The workforce gap",
        title: "Connect proven experience to real operating need.",
        body: "Employers value military leadership and technical experience, but many lack a reliable way to translate it into civilian roles, build an effective pathway, or evaluate performance before hiring. ROC connects those needs through specialized staffing, veteran workforce solutions, and practical advisory support.",
        quote:
          "ROC's mission is to help organizations build stronger teams and help proven professionals move into careers where their experience creates lasting value.",
      },
      {
        eyebrow: "Founder & CEO",
        title: "Edward Russo",
        body: "Ed is an Army veteran and former Psychological Operations and Special Operations professional whose service includes Iraq, Afghanistan, the Purple Heart, and the Defense Meritorious Service Medal. After the military, he built experience in operations, business development, account management, workforce strategy, and recruiting.",
        items: [
          {
            title: "Candor",
            text: "Tell clients and candidates what is true—even when a search, role, or partnership is not ready.",
          },
          {
            title: "Ownership",
            text: "Stay accountable for the part of the mission ROC accepts.",
          },
          {
            title: "Fit",
            text: "Match the person to the work, environment, and long-term opportunity.",
          },
          {
            title: "Service",
            text: "Treat a career move and a critical hire with the seriousness both deserve.",
          },
        ],
      },
    ],
    closing: {
      title: "Bring the mission. ROC will bring a direct answer.",
      body: "Start with the operating need, talent risk, or workforce plan you need to solve.",
      cta: "Start a conversation",
      href: "/contact",
    },
  },
];

export const contentPages: ContentPage[] = [
  ...employerPages,
  ...industryPages,
  ...otherPages,
];

/** Metadata for routes that are not content pages. */
export const specialMeta = {
  home: {
    title: "ROC Group | Professional Staffing & Veteran Workforce Solutions",
    description:
      "Professional staffing, veteran workforce pipelines, and SDVOSB partnerships for critical industries.",
  },
  jobs: {
    title: "Current Opportunities | ROC Group",
    description:
      "Explore current professional, technical, leadership, and mission-critical opportunities through ROC Group.",
  },
  "talent-network": {
    title: "Join the ROC Talent Network | ROC Group",
    description:
      "Share your experience and career interests with ROC for future professional and mission-critical opportunities.",
  },
  contact: {
    title: "Contact ROC Group | Hire Talent, Build Pipelines, or Team",
    description:
      "Talk with ROC about a hiring need, SkillBridge program, workforce challenge, or SDVOSB teaming opportunity.",
  },
} as const;
