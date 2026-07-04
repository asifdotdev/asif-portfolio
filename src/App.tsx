import {
  BriefcaseBusiness,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Image,
  Link as LinkIcon,
  Menu,
  Pencil,
  Plus,
  Save,
  Server,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { FormEvent, useEffect, useState } from "react";

type Project = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  projectUrl: string;
  appStoreUrl: string;
  playStoreUrl: string;
  screenshots: string[];
  accent: string;
  year: string;
};

type OpenSourceProject = {
  title: string;
  eyebrow: string;
  description: string;
  repoUrl: string;
  year: string;
  accent: string;
  stack: string[];
  detailsLabel: string;
  details: string[];
  highlights: string[];
  preview: "statusline" | "figma" | "sop" | "background";
};

const STORAGE_KEY = "asif.awwwards.portfolio.projects.v17";
const RESUME_URL = "/Muhammad_Asif_Aqeel_Harvard_Resume_2026.docx";
const IMAGE_BASE = "https://raw.githubusercontent.com/asifdotdev/Portfolio-Images/main";
const imageUrl = (path: string) => `${IMAGE_BASE}/${path}`;

const openSourceProjects: OpenSourceProject[] = [
  {
    title: "Claude Code Statusline",
    eyebrow: "CLI Developer Tool",
    description:
      "A polished single-line Claude Code statusline with context usage, rate-limit reset times, session tokens, active compute time, RAM, model, and effort.",
    repoUrl: "https://github.com/asifdotdev/claude-code-statusline",
    year: "2026",
    accent: "#d97757",
    stack: ["Bash", "Claude Code", "jq", "Python", "macOS"],
    detailsLabel: "Status segments",
    details: ["Context bar", "5h and 7d limits", "Session tokens", "Active time", "RAM and model"],
    highlights: ["One settings line", "Incremental token counter", "Color-coded terminal UI"],
    preview: "statusline",
  },
  {
    title: "Figma MCP Link Bridge",
    eyebrow: "Figma Plugin",
    description:
      "A Figma plugin that retrieves page, frame, component, and selected-node links for Claude Code, Codex, FrameLink MCP, and design-to-code workflows.",
    repoUrl: "https://github.com/asifdotdev/figma-mcp-link-bridge",
    year: "2026",
    accent: "#9aa7ff",
    stack: ["Figma Plugin", "JavaScript", "HTML", "MCP Workflow"],
    detailsLabel: "Copy formats",
    details: ["Plain text", "Markdown", "CSV", "JSON", "Raven kickoff prompt"],
    highlights: ["Current page, selection, or all pages", "Preserves selection order", "Builds direct node URLs"],
    preview: "figma",
  },
  {
    title: "React Native Git SOP",
    eyebrow: "Engineering Playbook",
    description:
      "A practical Git and GitHub operating procedure for React Native Expo teams, covering branches, commits, PRs, Expo config, hotfixes, and release hygiene.",
    repoUrl: "https://github.com/asifdotdev/react-native-git-sop",
    year: "2026",
    accent: "#ffc46b",
    stack: ["React Native", "Expo", "Git", "GitHub", "SOP"],
    detailsLabel: "Covered areas",
    details: ["Branch strategy", "Conventional commits", "PR workflow", "Expo-specific rules", "Project setup checklist"],
    highlights: ["PR-first main branch", "Commitlint-ready conventions", "Expo CNG guidance"],
    preview: "sop",
  },
  {
    title: "Background Removal Toolkit",
    eyebrow: "Image Processing Utility",
    description:
      "An image-processing toolkit for removing backgrounds in React Native workflows, with multipart uploads, transparent PNG output, and base64 responses.",
    repoUrl: "https://github.com/asifdotdev/bg-removal",
    year: "2026",
    accent: "#7cffc4",
    stack: ["Node.js", "Express", "Multer", "CORS", "@imgly"],
    detailsLabel: "Processing routes",
    details: ["/health", "/api/remove-background", "/api/remove-background-base64"],
    highlights: ["JPEG, PNG, and WebP uploads", "10MB validation", "Transparent PNG output"],
    preview: "background",
  },
];

const demoProjects: Project[] = [
  {
    id: "velay",
    title: "Velay",
    eyebrow: "Sports Venue Discovery",
    description:
      "A discovery and booking app for players to find sports venues and gaming lounges near them, compare availability, and book faster.",
    projectUrl: "",
    appStoreUrl: "",
    playStoreUrl: "",
    screenshots: [
      imageUrl("velay/velay14.png"),
      imageUrl("velay/velay16.png"),
      imageUrl("velay/velay15.png"),
      imageUrl("velay/velay17.png"),
      imageUrl("velay/velay13.png"),
      imageUrl("velay/velay8.png"),
      imageUrl("velay/velay2.png"),
      imageUrl("velay/velay3.png"),
      imageUrl("velay/velay12.png"),
      imageUrl("velay/velay11.png"),
      imageUrl("velay/velay10.png"),
      imageUrl("velay/velay9.png"),
      imageUrl("velay/velay7.png"),
      imageUrl("velay/velay6.png"),
      imageUrl("velay/velay5.png"),
      imageUrl("velay/velay4.png"),
      imageUrl("velay/velay1.png"),
    ],
    accent: "#ffb86b",
    year: "2026",
  },
  {
    id: "tripativo",
    title: "Tripativo",
    eyebrow: "Travel Planning Platform",
    description:
      "Travel product experience for browsing destinations, shaping trip context, and moving users through a clean planning flow.",
    projectUrl: "https://tripativo.com/",
    appStoreUrl: "",
    playStoreUrl: "",
    screenshots: [
      imageUrl("tripativo/trip1.png"),
      imageUrl("tripativo/trip2.png"),
      imageUrl("tripativo/trip3.png"),
      imageUrl("tripativo/trip4.png"),
    ],
    accent: "#ff775d",
    year: "2024",
  },
  {
    id: "velay-pro",
    title: "Velay Pro",
    eyebrow: "Venue Operations Platform",
    description:
      "All-in-one management platform for sports venues and gaming lounges, built for booking control, facility workflows, and multi-venue operations.",
    projectUrl: "",
    appStoreUrl: "",
    playStoreUrl: "",
    screenshots: [
      imageUrl("velay-pro/velay-pro8.png"),
      imageUrl("velay-pro/velay-pro7.png"),
      imageUrl("velay-pro/velay-pro6.png"),
      imageUrl("velay-pro/velay-pro5.png"),
      imageUrl("velay-pro/velay-pro4.png"),
      imageUrl("velay-pro/velay-pro3.png"),
      imageUrl("velay-pro/velay-pro2.png"),
      imageUrl("velay-pro/velay-pro1.png"),
    ],
    accent: "#7cffc4",
    year: "2026",
  },
  {
    id: "radius-ireland",
    title: "Radius Ireland",
    eyebrow: "Contractor Ordering App",
    description:
      "Mobile ordering workflow for contractors to browse products, track stock in real time, and place orders without operational friction.",
    projectUrl: "",
    appStoreUrl: "https://apps.apple.com/kg/app/radius-ireland/id6740913966",
    playStoreUrl: "",
    screenshots: [
      imageUrl("radius/radius2.png"),
      imageUrl("radius/radius3.png"),
      imageUrl("radius/radius4.png"),
      imageUrl("radius/radius5.png"),
      imageUrl("radius/radius1.png"),
    ],
    accent: "#9df56d",
    year: "2025",
  },
  {
    id: "rankingbr",
    title: "RankingBR",
    eyebrow: "Sports Ranking App",
    description:
      "Competition ranking app for Brazilian sports communities with profiles, rankings, results, and tournament-style player discovery.",
    projectUrl: "",
    appStoreUrl: "",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.rankingbr&hl=en",
    screenshots: [
      imageUrl("rankingbr/rankingbr1.jpg"),
      imageUrl("rankingbr/rankingbr2.png"),
      imageUrl("rankingbr/rankingbr3.png"),
      imageUrl("rankingbr/rankingbr4.jpg"),
      imageUrl("rankingbr/rankingbr5.png"),
    ],
    accent: "#3ea7ff",
    year: "2024",
  },
  {
    id: "keyzi",
    title: "Keyzi",
    eyebrow: "QR Key Tracking",
    description:
      "QR-based key tracking app with real-time check-in, check-out, and accountability for property and operations teams.",
    projectUrl: "",
    appStoreUrl: "",
    playStoreUrl: "",
    screenshots: [
      imageUrl("keyzi/keyzi1.webp"),
      imageUrl("keyzi/keyzi2.webp"),
      imageUrl("keyzi/keyzi3.webp"),
      imageUrl("keyzi/keyzi4.png"),
      imageUrl("keyzi/keyzi5.png"),
      imageUrl("keyzi/keyzi6.png"),
      imageUrl("keyzi/keyzi7.png"),
    ],
    accent: "#ffd166",
    year: "2024",
  },
  {
    id: "apex-codegen",
    title: "Apex Codegen",
    eyebrow: "AI Code Generation Platform",
    description:
      "AI-powered app development automation platform for React Native UI, NestJS backends, API integration, automated testing, fixes, QA validation, and handoff.",
    projectUrl: "",
    appStoreUrl: "",
    playStoreUrl: "",
    screenshots: [
      imageUrl("apex/apex1.png"),
      imageUrl("apex/apex2.png"),
      imageUrl("apex/apex3.png"),
      imageUrl("apex/apex4.png"),
      imageUrl("apex/apex5.png"),
      imageUrl("apex/apex6.png"),
      imageUrl("apex/apex7.png"),
    ],
    accent: "#9aa7ff",
    year: "2026",
  },
  {
    id: "mckales-estates",
    title: "Mckales Estates",
    eyebrow: "Property Maintenance",
    description:
      "Tenant-facing property maintenance app for reporting repairs, tracking progress, and keeping maintenance communication structured.",
    projectUrl: "",
    appStoreUrl: "",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.reportarepair.mckales&hl=en",
    screenshots: [
      imageUrl("mckales/mckales1.png"),
      imageUrl("mckales/mckales2.png"),
      imageUrl("mckales/mckales3.png"),
      imageUrl("mckales/mckales4.png"),
      imageUrl("mckales/mckales5.png"),
    ],
    accent: "#c49cff",
    year: "2024",
  },
  {
    id: "justsell-go",
    title: "JustSell GO",
    eyebrow: "Commerce Management App",
    description:
      "Product and order management app for merchants to publish products, manage orders, create deals, and track business performance.",
    projectUrl: "",
    appStoreUrl: "https://apps.apple.com/kg/app/justsell-product-listing/id1540277387",
    playStoreUrl: "",
    screenshots: [
      imageUrl("justsell-go/go20.png"),
      imageUrl("justsell-go/go19.png"),
      imageUrl("justsell-go/go18.png"),
      imageUrl("justsell-go/go17.png"),
      imageUrl("justsell-go/go16.png"),
      imageUrl("justsell-go/go15.png"),
      imageUrl("justsell-go/go14.png"),
      imageUrl("justsell-go/go13.png"),
      imageUrl("justsell-go/go12.png"),
      imageUrl("justsell-go/go11.png"),
      imageUrl("justsell-go/go10.png"),
      imageUrl("justsell-go/go9.png"),
      imageUrl("justsell-go/go8.png"),
      imageUrl("justsell-go/go7.png"),
      imageUrl("justsell-go/go6.png"),
      imageUrl("justsell-go/go5.png"),
      imageUrl("justsell-go/go4.png"),
      imageUrl("justsell-go/go3.png"),
      imageUrl("justsell-go/go2.png"),
      imageUrl("justsell-go/go1.png"),
    ],
    accent: "#ff6b8f",
    year: "2025",
  },
  {
    id: "justsell-salesrep",
    title: "JustSell SalesRep",
    eyebrow: "Field Sales App",
    description:
      "Mobile app for sales representatives to manage leads, place orders, record payments, and keep sales workflows moving in the field.",
    projectUrl: "",
    appStoreUrl: "",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.justsell.salesrep&hl=en",
    screenshots: [
      imageUrl("justsell-salesrep/salesrep2.png"),
      imageUrl("justsell-salesrep/salesrep3.png"),
      imageUrl("justsell-salesrep/salesrep4.png"),
      imageUrl("justsell-salesrep/salesrep5.png"),
      imageUrl("justsell-salesrep/salesrep6.png"),
      imageUrl("justsell-salesrep/salesrep7.png"),
      imageUrl("justsell-salesrep/salesrep8.png"),
    ],
    accent: "#69ddff",
    year: "2025",
  },
];

const emptyProject: Project = {
  id: "",
  title: "",
  eyebrow: "",
  description: "",
  projectUrl: "",
  appStoreUrl: "",
  playStoreUrl: "",
  screenshots: [],
  accent: "#7cffc4",
  year: new Date().getFullYear().toString(),
};

function slugify(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") || crypto.randomUUID()
  );
}

function loadProjects() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return demoProjects;
    const parsed = JSON.parse(stored) as Project[];
    return Array.isArray(parsed) && parsed.length ? parsed : demoProjects;
  } catch {
    return demoProjects;
  }
}

function App() {
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (!window.location.hash) return;
    const targetId = window.location.hash.slice(1);
    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView();
    });
  }, []);

  function openNewProject() {
    setEditingProject(null);
    setDrawerOpen(true);
  }

  function openEditProject(project: Project) {
    setEditingProject(project);
    setDrawerOpen(true);
  }

  function saveProject(project: Project) {
    setProjects((current) => {
      const normalized = {
        ...project,
        id: project.id || slugify(project.title),
        projectUrl: project.projectUrl.trim(),
        appStoreUrl: project.appStoreUrl.trim(),
        playStoreUrl: project.playStoreUrl.trim(),
        screenshots: project.screenshots.filter(Boolean),
      };
      const exists = current.some((item) => item.id === normalized.id);
      if (exists) {
        return current.map((item) => (item.id === normalized.id ? normalized : item));
      }
      return [normalized, ...current];
    });
    setDrawerOpen(false);
    setEditingProject(null);
  }

  function deleteProject(id: string) {
    setProjects((current) => current.filter((project) => project.id !== id));
  }

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Navigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Hero />
      <ProjectShowcase
        projects={projects}
        onEdit={openEditProject}
        onDelete={deleteProject}
        onAdd={openNewProject}
      />
      <OpenSourceShowcase projects={openSourceProjects} />
      <Footer />
      <ProjectDrawer
        open={drawerOpen}
        project={editingProject}
        onClose={() => {
          setDrawerOpen(false);
          setEditingProject(null);
        }}
        onSave={saveProject}
      />
    </main>
  );
}

function Navigation({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const links = [
    ["Work", "#work"],
    ["Open Source", "#open-source"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="site-nav">
      <a className="nav-mark" href="#top" aria-label="Muhammad Asif Aqeel">
        <span>Asif</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <a className="ghost-btn compact" href={RESUME_URL} target="_blank" rel="noreferrer">
          <FileText size={16} />
          <span>Resume</span>
        </a>
        <button
          className="icon-btn mobile-menu-btn"
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a href={RESUME_URL} target="_blank" rel="noreferrer">
              Resume
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-layout">
        <div className="hero-content">
          <motion.p
            className="kicker"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Software Engineer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
          >
            <span>Muhammad</span>
            <span>Asif Aqeel</span>
          </motion.h1>
          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            <span>Based in Lahore, Pakistan.</span>
            <span>Building cool stuff.</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({
  projects,
  onEdit,
  onDelete,
  onAdd,
}: {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}) {
  return (
    <section className="projects-shell" id="work">
      <div className="work-heading">
        <h2>Work.</h2>
        <div className="section-actions">
          <button className="ghost-btn" type="button" onClick={onAdd}>
            <Plus size={17} />
            Add Project
          </button>
        </div>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectSection
            project={project}
            index={index}
            key={project.id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

function OpenSourceShowcase({ projects }: { projects: OpenSourceProject[] }) {
  return (
    <section className="open-source-shell" id="open-source">
      <div className="open-source-heading">
        <p className="kicker">Public code</p>
        <h2>Open Source.</h2>
      </div>

      <div className="open-source-list">
        {projects.map((project, index) => (
          <OpenSourceCard project={project} index={index} key={project.repoUrl} />
        ))}
      </div>
    </section>
  );
}

function OpenSourceCard({
  project,
  index,
}: {
  project: OpenSourceProject;
  index: number;
}) {
  return (
    <motion.article
      className="open-source-card"
      style={{ "--accent": project.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="open-source-copy">
        <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
        <p className="project-eyebrow">{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="repo-stack" aria-label={`${project.title} stack`}>
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="repo-actions">
          <a className="primary-btn" href={project.repoUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={18} />
            View GitHub
          </a>
          <span>{project.year}</span>
        </div>
      </div>

      <div className="repo-showcase" aria-label={`${project.title} preview`}>
        <OpenSourcePreview type={project.preview} />
        <div className="repo-details">
          <div>
            <OpenSourceDetailIcon type={project.preview} />
            <span>{project.detailsLabel}</span>
          </div>
          <ul>
            {project.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
        <div className="repo-highlights">
          {project.highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function OpenSourcePreview({ type }: { type: OpenSourceProject["preview"] }) {
  if (type === "statusline") return <StatuslineThumbnail />;
  if (type === "figma") return <FigmaPluginThumbnail />;
  if (type === "sop") return <SopThumbnail />;
  return <BgRemovalThumbnail />;
}

function OpenSourceDetailIcon({ type }: { type: OpenSourceProject["preview"] }) {
  if (type === "statusline") return <Server size={18} />;
  if (type === "figma") return <LinkIcon size={18} />;
  if (type === "sop") return <FileText size={18} />;
  return <Server size={18} />;
}

function StatuslineThumbnail() {
  return (
    <div className="statusline-thumb">
      <div className="thumb-toolbar">
        <span />
        <span />
        <span />
        <strong>claude-code-statusline</strong>
      </div>
      <div className="statusline-screen">
        <div className="statusline-terminal">
          <small>~/.claude/statusline.sh</small>
          <img
            src="https://raw.githubusercontent.com/asifdotdev/claude-code-statusline/main/preview.png"
            alt="Claude Code Statusline preview"
          />
        </div>
        <div className="statusline-mock">
          <span>Raven</span>
          <i />
          <strong>Context 88%</strong>
          <i />
          <em>5h 12% ↻10:20pm</em>
          <i />
          <b>RAM 77%</b>
          <i />
          <mark>Opus 4.8 · xhigh</mark>
        </div>
      </div>
    </div>
  );
}

function BgRemovalThumbnail() {
  return (
    <div className="bg-removal-thumb">
      <div className="thumb-toolbar">
        <span />
        <span />
        <span />
        <strong>remove-bg.png</strong>
      </div>
      <div className="thumb-stage">
        <div className="thumb-before">
          <small>Before</small>
          <div className="sample-photo">
            <div className="sample-sky" />
            <div className="sample-sun" />
            <div className="sample-person">
              <i />
              <span />
            </div>
            <div className="sample-ground" />
          </div>
        </div>
        <div className="thumb-divider">
          <Upload size={16} />
        </div>
        <div className="thumb-after">
          <small>After</small>
          <div className="checkerboard">
            <div className="cutout-person">
              <i />
              <span />
            </div>
          </div>
        </div>
      </div>
      <div className="thumb-footer">
        <div>
          <Image size={16} />
          <span>JPEG / PNG / WebP</span>
        </div>
        <strong>PNG</strong>
      </div>
    </div>
  );
}

function FigmaPluginThumbnail() {
  const frames = ["Splash", "Login", "Venue Details", "Checkout", "Profile"];

  return (
    <div className="figma-thumb">
      <div className="thumb-toolbar">
        <span />
        <span />
        <span />
        <strong>Figma MCP Link Bridge</strong>
      </div>
      <div className="figma-panel-preview">
        <div className="figma-preview-header">
          <div className="figma-logo-mark">
            <span />
            <span />
            <span />
            <span />
          </div>
          <strong>Bridge Figma to MCP</strong>
        </div>
        <div className="figma-tabs">
          <span>Current Page</span>
          <span>Selection</span>
          <span>All Pages</span>
        </div>
        <div className="figma-stats">
          <strong>05</strong>
          <span>frames found</span>
          <button type="button">Copy All</button>
        </div>
        <div className="figma-frame-list">
          {frames.map((frame) => (
            <div className="figma-frame-row" key={frame}>
              <i />
              <div>
                <strong>{frame}</strong>
                <span>figma.com/design/...node-id</span>
              </div>
              <LinkIcon size={14} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SopThumbnail() {
  return (
    <div className="sop-thumb">
      <div className="thumb-toolbar">
        <span />
        <span />
        <span />
        <strong>developer-sop.md</strong>
      </div>
      <div className="sop-doc-preview">
        <small>Developer SOP</small>
        <h4>Git & GitHub</h4>
        <div className="sop-branch-grid">
          <span>main</span>
          <span>dev</span>
          <span>feature/name</span>
          <span>hotfix/name</span>
        </div>
        <div className="sop-checklist">
          <p><Check size={14} /> Conventional commits</p>
          <p><Check size={14} /> PR-first production branch</p>
          <p><Check size={14} /> Expo CNG rules</p>
          <p><Check size={14} /> Release hygiene checklist</p>
        </div>
      </div>
    </div>
  );
}

function ProjectSection({
  project,
  index,
  onEdit,
  onDelete,
}: {
  project: Project;
  index: number;
  onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
}) {
  const isApex = project.id === "apex-codegen";
  const screenshots = project.screenshots.length
    ? project.screenshots
    : Array.from({ length: isApex ? 4 : 5 }, (_, itemIndex) => `mock:${project.id}:${itemIndex}`);

  return (
    <motion.article
      className="project-section"
      style={{ "--accent": project.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="project-meta">
        <div>
          <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
          <p className="project-eyebrow">{project.eyebrow}</p>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="store-row">
          <ProjectLinkBadge url={project.projectUrl} />
          <StoreBadge type="apple" url={project.appStoreUrl} />
          <StoreBadge type="play" url={project.playStoreUrl} />
        </div>
        <div className="project-admin">
          <button className="tiny-btn" type="button" onClick={() => onEdit(project)}>
            <Pencil size={15} />
            Edit
          </button>
          <button className="tiny-btn danger" type="button" onClick={() => onDelete(project.id)}>
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>

      <div
        className={isApex ? "screen-rail apex-rail" : "screen-rail"}
        aria-label={`${project.title} screenshots`}
      >
        {screenshots.map((screenshot, screenshotIndex) => (
          <motion.div
            className={isApex ? "web-card" : "phone-card"}
            key={`${project.id}-${screenshotIndex}-${screenshot}`}
            whileHover={{
              y: -14,
              rotate: isApex ? 0 : screenshotIndex % 2 ? 1.4 : -1.4,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {screenshot.startsWith("mock:") ? (
              isApex ? (
                <MockWebFrame project={project} index={screenshotIndex} />
              ) : (
                <MockPhone project={project} index={screenshotIndex} />
              )
            ) : isApex ? (
              <WebFrameImage
                src={screenshot}
                alt={`${project.title} screenshot ${screenshotIndex + 1}`}
              />
            ) : (
              <img src={screenshot} alt={`${project.title} screenshot ${screenshotIndex + 1}`} />
            )}
          </motion.div>
        ))}
      </div>
    </motion.article>
  );
}

function WebFrameImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="web-frame">
      <div className="web-frame-bar">
        <span />
        <span />
        <span />
      </div>
      <img src={src} alt={alt} />
    </div>
  );
}

function MockWebFrame({ project, index }: { project: Project; index: number }) {
  const labels = ["Generate", "Integrate", "Validate", "Handoff"];

  return (
    <div className="mock-web-frame">
      <div className="web-frame-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="mock-web-screen">
        <aside>
          <strong>{project.title}</strong>
          <i />
          <i />
          <i />
        </aside>
        <section>
          <small>Electron Tool</small>
          <h4>{labels[index % labels.length]}</h4>
          <div className="mock-web-grid">
            <span />
            <span />
            <span />
          </div>
          <div className="mock-web-lines">
            <i />
            <i />
            <i />
          </div>
        </section>
      </div>
    </div>
  );
}

function MockPhone({
  project,
  index,
  compact = false,
}: {
  project: Project;
  index: number;
  compact?: boolean;
}) {
  const labels = ["Home", "Flow", "Insights", "Orders", "Profile"];
  return (
    <div className={compact ? "mock-phone compact" : "mock-phone"}>
      <div className="phone-speaker" />
      <div className="mock-screen">
        <div className="mock-topbar">
          <span>{project.title}</span>
          <i />
        </div>
        <div className="mock-hero-card">
          <small>{labels[index % labels.length]}</small>
          <strong>{project.eyebrow}</strong>
        </div>
        <div className="mock-lines">
          <i />
          <i />
          <i />
        </div>
        <div className="mock-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="mock-bottom">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function StoreBadge({ type, url }: { type: "apple" | "play"; url: string }) {
  if (!url.trim()) return null;

  const label = type === "apple" ? "App Store" : "Google Play";
  const badge = (
    <>
      {type === "apple" ? <AppleLogo /> : <PlayLogo />}
      <span>
        <small>{type === "apple" ? "Download on the" : "Get it on"}</small>
        {label}
      </span>
    </>
  );

  return (
    <a className="store-badge" href={url} target="_blank" rel="noreferrer">
      {badge}
    </a>
  );
}

function ProjectLinkBadge({ url }: { url: string }) {
  if (!url.trim()) return null;

  return (
    <a className="project-link-badge" href={url} target="_blank" rel="noreferrer">
      <ExternalLink size={18} />
      <span>
        <small>Open</small>
        Project
      </span>
    </a>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.66 12.28c-.03-2.47 2.02-3.66 2.11-3.72-1.15-1.68-2.94-1.91-3.57-1.94-1.52-.15-2.96.89-3.73.89-.78 0-1.98-.86-3.25-.84-1.67.02-3.22.97-4.08 2.46-1.74 3.02-.45 7.49 1.25 9.94.83 1.2 1.82 2.55 3.12 2.5 1.25-.05 1.72-.81 3.24-.81 1.51 0 1.94.81 3.26.79 1.35-.03 2.2-1.22 3.02-2.42.95-1.39 1.34-2.74 1.36-2.81-.03-.01-2.62-1-2.65-3.97l-.08-.07ZM14.2 5.02c.68-.83 1.14-1.99 1.02-3.14-.98.04-2.16.65-2.86 1.48-.63.73-1.18 1.91-1.03 3.03 1.09.09 2.2-.55 2.87-1.37Z"
      />
    </svg>
  );
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.43 2.52c-.33.2-.54.58-.54 1.09v16.78c0 .51.21.89.54 1.09l9.42-9.48-9.42-9.48Zm10.46 8.43 2.44-2.45L6.05 2.1l8.84 8.85Zm2.44 4.55-2.44-2.45-8.84 8.85 11.28-6.4Zm1.18-5.79-2.67 2.29 2.67 2.29c.85-.48 1.35-.76 1.44-.82.79-.44.79-1.5 0-1.94-.09-.06-.59-.34-1.44-.82Z"
      />
    </svg>
  );
}

function ProjectDrawer({
  open,
  project,
  onClose,
  onSave,
}: {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}) {
  const [draft, setDraft] = useState<Project>(emptyProject);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDraft(project ? { ...project } : { ...emptyProject, id: crypto.randomUUID() });
    setCopied(false);
  }, [open, project]);

  function update<K extends keyof Project>(key: K, value: Project[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({
      ...draft,
      id: draft.id || slugify(draft.title),
      screenshots: draft.screenshots
        .map((url) => url.trim())
        .filter(Boolean),
    });
  }

  async function copyJson() {
    await navigator.clipboard.writeText(JSON.stringify(draft, null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            className="drawer-backdrop"
            aria-label="Close project editor"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="project-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
          >
            <div className="drawer-header">
              <div>
                <p className="kicker">Project Studio</p>
                <h2>{project ? "Edit project" : "Add project"}</h2>
              </div>
              <button className="icon-btn" type="button" onClick={onClose} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <form className="project-form" onSubmit={submit}>
              <label>
                Project title
                <input
                  required
                  value={draft.title}
                  onChange={(event) => update("title", event.target.value)}
                  placeholder="Velay Pro"
                />
              </label>
              <label>
                Short category
                <input
                  value={draft.eyebrow}
                  onChange={(event) => update("eyebrow", event.target.value)}
                  placeholder="Venue Operations Platform"
                />
              </label>
              <label>
                Description
                <textarea
                  required
                  value={draft.description}
                  onChange={(event) => update("description", event.target.value)}
                  placeholder="What the app does, who it is for, and what you built."
                />
              </label>
              <label>
                Project link
                <input
                  value={draft.projectUrl}
                  onChange={(event) => update("projectUrl", event.target.value)}
                  placeholder="https://example.com"
                />
              </label>
              <div className="form-grid">
                <label>
                  App Store link
                  <input
                    value={draft.appStoreUrl}
                    onChange={(event) => update("appStoreUrl", event.target.value)}
                    placeholder="https://apps.apple.com/..."
                  />
                </label>
                <label>
                  Play Store link
                  <input
                    value={draft.playStoreUrl}
                    onChange={(event) => update("playStoreUrl", event.target.value)}
                    placeholder="https://play.google.com/..."
                  />
                </label>
              </div>
              <div className="form-grid small">
                <label>
                  Accent color
                  <input
                    type="color"
                    value={draft.accent}
                    onChange={(event) => update("accent", event.target.value)}
                  />
                </label>
                <label>
                  Year
                  <input
                    value={draft.year}
                    onChange={(event) => update("year", event.target.value)}
                    placeholder="2026"
                  />
                </label>
              </div>
              <label>
                Screenshot image URLs
                <textarea
                  className="screenshot-input"
                  value={draft.screenshots.join("\n")}
                  onChange={(event) =>
                    update(
                      "screenshots",
                      event.target.value
                        .split("\n")
                        .map((url) => url.trim())
                        .filter(Boolean),
                    )
                  }
                  placeholder={"https://example.com/screen-1.png\nhttps://example.com/screen-2.png"}
                />
              </label>
              <div className="drawer-tools">
                <button className="tiny-btn" type="button" onClick={copyJson}>
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "Copied" : "Copy JSON"}
                </button>
                <span>Saved locally in this browser.</span>
              </div>
              <button className="save-btn" type="submit">
                <Save size={18} />
                Save Project
              </button>
            </form>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer id="contact">
      <div>
        <p className="kicker">Contact</p>
        <h2>Let's talk.</h2>
      </div>
      <div className="footer-links">
        <a href="mailto:asifaqeel50@gmail.com">
          <BriefcaseBusiness size={18} />
          asifaqeel50@gmail.com
        </a>
        <a href="https://www.linkedin.com/in/muhammad-asif-aqeel-70b788218/" target="_blank" rel="noreferrer">
          <LinkIcon size={18} />
          LinkedIn
          <ExternalLink size={14} />
        </a>
      </div>
    </footer>
  );
}

export default App;
