import { Fragment, useEffect, useMemo, useRef } from "react";

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
  const doc = new DOMParser().parseFromString(rawHtml, 'text/html');

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
    <Fragment>
      {parsed.styles.map((text, index) => (
        <style
          key={index}
          data-react-legacy-style="true"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ))}
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: parsed.bodyHtml }}
      />
    </Fragment>
  );
}
