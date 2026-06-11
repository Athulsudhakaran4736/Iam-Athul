import { useEffect, useMemo, useRef } from "react";

const INTERNAL_ROUTES = new Set([
  "caixabank",
  "gymondo-premium",
  "gymondo-challenges",
  "zattoo",
  "neotaste-onboarding",
  "neotaste-quests",
]);

function normalizeAssetPath(value) {
  if (!value) {
    return value;
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("data:") ||
    value.startsWith("#") ||
    value.startsWith("/")
  ) {
    return value;
  }

  if (
    value.startsWith(
      "../cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
    )
  ) {
    return "/vendor/gsap/gsap.min.js";
  }

  if (
    value.startsWith(
      "../cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
    )
  ) {
    return "/vendor/gsap/ScrollTrigger.min.js";
  }

  if (value === "index.html") {
    return "/";
  }

  if (value.startsWith("index.html#")) {
    return `/${value.slice("index.html".length)}`;
  }

  if (value.startsWith("images/")) {
    return `/${value}`;
  }

  if (
    value.startsWith("favicon") ||
    value.startsWith("apple-touch-icon") ||
    value.endsWith(".pdf")
  ) {
    return `/${value}`;
  }

  if (INTERNAL_ROUTES.has(value)) {
    return `/${value}`;
  }

  return value;
}

function extractNavigationTarget(onclickValue) {
  if (!onclickValue) {
    return null;
  }

  const match = onclickValue.match(/window\.location\s*=\s*['"]([^'"]+)['"]/);
  return match?.[1] ? normalizeAssetPath(match[1]) : null;
}

function parseLegacyHtml(rawHtml) {
  const normalizedHtml = rawHtml.replaceAll("David Rodriguez", "I'm Athul");
  const parser = new DOMParser();
  const doc = parser.parseFromString(normalizedHtml, "text/html");

  const aboutBio = doc.querySelector("#about .about-bio");
  if (aboutBio) {
    aboutBio.innerHTML = `
      <p><strong>I'm Athul, a Bengaluru-based Software Engineer</strong> with 3 years of experience building responsive and high-performance web applications. I completed my BTech in Computer Science and Engineering from College of Engineering Thalassery between 2018 and 2022.</p>
      <p><strong>I build responsive websites and full-stack web applications,</strong> using React.js, MERN stack technologies, and modern JavaScript to deliver practical, fast, and maintainable products.</p>
      <p><strong>My recent work spans different business domains,</strong> including a UAE-based floor manufacturing landing page, a learning management system, and an ecommerce admin panel.</p>
      <p><strong>I care about implementation quality, responsiveness, and product usability,</strong> with a focus on shipping interfaces that work well in real-world use.</p>
      <a href="https://drive.google.com/file/d/1uCOQaHG_9JxkiLcOl-QBo2HxeShDN1ZP/view?usp=sharing" target="_blank" rel="noopener" class="cv-btn" style="margin-top:20px;">
        View CV
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 12L12 2M12 2H4M12 2V10"></path>
        </svg>
      </a>
    `;
  }

  const aboutSide = doc.querySelector("#about .about-side");
  if (aboutSide) {
    aboutSide.innerHTML = `
      <div>
        <h3 class="detail-h">Work Experience</h3>
        <ul class="exp-list">
          <li class="exp-item">
            <div class="ei-l">
              <span class="ei-co">Trigent Software Inc</span>
              <span class="ei-role">Software Engineer</span>
            </div>
            <span class="ei-yr">Jun 2024 - Present</span>
          </li>
          <li class="exp-item">
            <div class="ei-l">
              <span class="ei-co">Whizlabs Software Pvt Ltd</span>
              <span class="ei-role">Programmer Trainee</span>
            </div>
            <span class="ei-yr">Apr 2023 - Mar 2024</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="detail-h">Recent Work</h3>
        <ul class="exp-list">
          <li class="exp-item">
            <div class="ei-l">
              <span class="ei-co">NeoSport</span>
              <span class="ei-role">Landing Page Development</span>
            </div>
            <span class="ei-yr">In Progress</span>
          </li>
          <li class="exp-item">
            <div class="ei-l">
              <span class="ei-co">RKNEX</span>
              <span class="ei-role">Admin Panel with React.js</span>
            </div>
            <span class="ei-yr">LMS</span>
          </li>
          <li class="exp-item">
            <div class="ei-l">
              <span class="ei-co">Zoommart</span>
              <span class="ei-role">Admin Panel with MERN Stack</span>
            </div>
            <span class="ei-yr">Ecommerce</span>
          </li>
          <li class="exp-item">
            <div class="ei-l">
              <span class="ei-co">LMS</span>
              <span class="ei-role">Developed using PERN stack</span>
            </div>
            <span class="ei-yr">Trigent</span>
          </li>
          <li class="exp-item">
            <div class="ei-l">
              <span class="ei-co">E Property Plus</span>
              <span class="ei-role">Property management UI revamp</span>
            </div>
            <span class="ei-yr">Trigent</span>
          </li>
          <li class="exp-item">
            <div class="ei-l">
              <span class="ei-co">Timesheet Management</span>
              <span class="ei-role">Built with PERN stack</span>
            </div>
            <span class="ei-yr">Whizlabs</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="detail-h">Skills</h3>
        <div class="skills-row">
          <span class="skill-pill">React.js</span>
          <span class="skill-pill">JavaScript (ES6+)</span>
          <span class="skill-pill">Next.js</span>
          <span class="skill-pill">Node.js</span>
          <span class="skill-pill">Express.js</span>
          <span class="skill-pill">MongoDB</span>
          <span class="skill-pill">MERN Stack</span>
          <span class="skill-pill">Tailwind CSS</span>
          <span class="skill-pill">Redux Toolkit</span>
          <span class="skill-pill">REST APIs</span>
          <span class="skill-pill">Firebase</span>
          <span class="skill-pill">PostgreSQL</span>
          <span class="skill-pill">Knex.js</span>
          <span class="skill-pill">Responsive Design</span>
        </div>
      </div>
    `;
  }

  const workSection = doc.querySelector("#work");
  if (workSection) {
    workSection.insertAdjacentHTML(
      "afterend",
      `
        <section style="padding:0 44px 36px;">
          <div style="border:1px solid var(--border); border-radius:14px; padding:40px 36px; background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));">
            <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:24px; flex-wrap:wrap; margin-bottom:18px;">
              <div>
                <p style="margin:0 0 8px; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted);">Core Stack</p>
                <h2 style="margin:0; font-family:'Syne',sans-serif; font-size:clamp(32px,5vw,56px); line-height:0.95; letter-spacing:-0.04em;">Skills That I Use To Build</h2>
              </div>
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(120px, 1fr)); gap:16px;">
              <div style="border:1px solid var(--border); border-radius:14px; padding:18px 14px; text-align:center;">
                <div style="font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:12px;">React JS</div>
                <img src="/images/React.png" alt="React logo" style="height:44px; width:auto; max-width:100%; object-fit:contain; margin:0 auto;" />
              </div>
              <div style="border:1px solid var(--border); border-radius:14px; padding:18px 14px; text-align:center;">
                <div style="font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:12px;">Node.js</div>
                <img src="/images/Node.js.png" alt="Node.js logo" style="height:44px; width:auto; max-width:100%; object-fit:contain; margin:0 auto;" />
              </div>
              <div style="border:1px solid var(--border); border-radius:14px; padding:18px 14px; text-align:center;">
                <div style="font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:12px;">Express JS</div>
                <img src="/images/Express.png" alt="Express logo" style="height:44px; width:auto; max-width:100%; object-fit:contain; margin:0 auto;" />
              </div>
              <div style="border:1px solid var(--border); border-radius:14px; padding:18px 14px; text-align:center;">
                <div style="font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:12px;">MongoDB</div>
                <img src="/images/MongoDB.png" alt="MongoDB logo" style="height:44px; width:auto; max-width:100%; object-fit:contain; margin:0 auto;" />
              </div>
              <div style="border:1px solid var(--border); border-radius:14px; padding:18px 14px; text-align:center;">
                <div style="font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:12px;">Firebase</div>
                <img src="/images/Firebase.png" alt="Firebase logo" style="height:44px; width:auto; max-width:100%; object-fit:contain; margin:0 auto;" />
              </div>
              <div style="border:1px solid var(--border); border-radius:14px; padding:18px 14px; text-align:center;">
                <div style="font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:12px;">PostgreSQL</div>
                <img src="/images/PostgresSQL.png" alt="PostgreSQL logo" style="height:44px; width:auto; max-width:100%; object-fit:contain; margin:0 auto;" />
              </div>
            </div>
          </div>
        </section>
      `,
    );
  }

  const description =
    doc.querySelector('meta[name="description"]')?.getAttribute("content") ??
    "";
  const title = doc.title || "Portfolio";
  const styles = Array.from(doc.querySelectorAll("style")).map(
    (style) => style.textContent ?? "",
  );
  const scripts = Array.from(doc.querySelectorAll("script"))
    .map((script) => ({
      src: normalizeAssetPath(script.getAttribute("src") || ""),
      text: script.textContent ?? "",
    }))
    .filter(
      (script) =>
        script.src ||
        (script.text &&
          !script.text.includes("googletagmanager.com/gtag/js") &&
          !script.text.includes("gtag('config'")),
    );

  doc.querySelectorAll("script").forEach((script) => script.remove());

  doc.querySelectorAll("[src],[href],[poster]").forEach((element) => {
    ["src", "href", "poster"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (value) {
        element.setAttribute(attribute, normalizeAssetPath(value));
      }
    });
  });

  doc.querySelectorAll("[onclick]").forEach((element) => {
    const target = extractNavigationTarget(element.getAttribute("onclick"));
    element.removeAttribute("onclick");
    if (target) {
      element.setAttribute("data-nav", target);
      element.setAttribute("role", element.getAttribute("role") || "link");
      element.setAttribute("tabindex", element.getAttribute("tabindex") || "0");
    }
  });

  return {
    bodyHtml: doc.body.innerHTML,
    description,
    lang: doc.documentElement.lang || "en",
    scripts,
    styles,
    title,
  };
}

function setMetaDescription(content) {
  let element = document.querySelector('meta[name="description"]');
  if (!element) {
    element = document.createElement("meta");
    element.name = "description";
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

async function appendScript(script) {
  return new Promise((resolve, reject) => {
    const element = document.createElement("script");

    if (script.src) {
      element.setAttribute("data-react-legacy-script", "true");
      element.src = script.src;
      element.async = false;
      element.onload = resolve;
      element.onerror = reject;
      document.body.appendChild(element);
      return;
    }

    element.setAttribute("data-react-legacy-script", "true");
    element.text = `(function(){\n${script.text}\n})();`;
    document.body.appendChild(element);
    resolve();
  });
}

export default function LegacyPage({ page }) {
  const containerRef = useRef(null);
  const parsed = useMemo(() => parseLegacyHtml(page.html), [page.html]);

  useEffect(() => {
    document.documentElement.lang = parsed.lang;
    document.title = parsed.title;
    setMetaDescription(parsed.description);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const styleNodes = parsed.styles.map((text) => {
      const node = document.createElement("style");
      node.setAttribute("data-react-legacy-style", "true");
      node.textContent = text;
      document.head.appendChild(node);
      return node;
    });

    let cancelled = false;

    (async () => {
      for (const script of parsed.scripts) {
        if (cancelled) {
          break;
        }

        try {
          await appendScript(script);
        } catch (error) {
          console.error("Failed to load legacy script", error);
        }
      }
    })();

    return () => {
      cancelled = true;
      styleNodes.forEach((node) => node.remove());
      document
        .querySelectorAll("script[data-react-legacy-script]")
        .forEach((node) => node.remove());
    };
  }, [parsed]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) {
      return undefined;
    }

    const handleClick = (event) => {
      const link = event.target.closest("[data-nav]");
      if (!link) {
        return;
      }

      const target = link.getAttribute("data-nav");
      if (target) {
        window.location.assign(target);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      const link = event.target.closest("[data-nav]");
      if (!link) {
        return;
      }

      event.preventDefault();
      const target = link.getAttribute("data-nav");
      if (target) {
        window.location.assign(target);
      }
    };

    root.addEventListener("click", handleClick);
    root.addEventListener("keydown", handleKeyDown);

    return () => {
      root.removeEventListener("click", handleClick);
      root.removeEventListener("keydown", handleKeyDown);
    };
  }, [parsed.bodyHtml]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: parsed.bodyHtml }}
    />
  );
}
