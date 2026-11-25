import { useEffect, useState } from 'react';
import { competencies, journey, profile } from './content.js';
import { Arrow, ProjectDetail, ProjectsPage, SelectedWork } from './Work.jsx';
import { ContactPage } from './Contact.jsx';

const links = [['/projects', 'Projects'], ['/about', 'About'], ['/contact', 'Contact']];

function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.dataset.theme === 'light'), []);

  function toggle() {
    const theme = light ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* The current page still uses the chosen theme. */ }
    setLight(!light);
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}>
      <span aria-hidden="true">{light ? '☾' : '☀'}</span>
    </button>
  );
}

function SiteHeader({ path }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let pastThreshold;
    function updateHeader() {
      const next = window.scrollY > 50;
      if (next === pastThreshold) return;
      pastThreshold = next;
      setScrolled(next);
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  return (
    <header className={scrolled ? 'site-header site-header--floating' : 'site-header'}>
      <div className="wrap header-inner">
        <a href="/" className="site-logo" aria-current={path === '/' ? 'page' : undefined}>I’m Athul<span>.</span></a>
        <nav aria-label="Main navigation">
          {links.map(([href, name]) => <a key={href} href={href} aria-current={path === href ? 'page' : path.startsWith(href + '/') ? 'location' : undefined}>{name}</a>)}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>© 2026 {profile.name}</p>
        <nav aria-label="Footer navigation">{links.map(([href, name]) => <a key={href} href={href}>{name}</a>)}</nav>
        <nav aria-label="Social links"><a href={'mailto:' + profile.email}>Email</a><a href={profile.linkedin}>LinkedIn <Arrow external /></a><a href={profile.github}>GitHub <Arrow external /></a><a href={profile.twitter}>X <Arrow external /></a></nav>
      </div>
    </footer>
  );
}

function Competencies() {
  return (
    <dl className="competencies">
      {competencies.map(([name, technologies]) => <div key={name}><dt>{name}</dt><dd>{technologies}</dd></div>)}
    </dl>
  );
}

function ContactCallout() {
  return (
    <section className="wrap cta" id="contact">
      <h2>Let’s talk.</h2>
      <a className="button button--primary" href="/contact">Contact me <Arrow /></a>
    </section>
  );
}

function Home() {
  return (
    <>
      <section className="wrap hero" id="hero">
        <p className="eyebrow accent">Software engineer</p>
        <h1>Hi,<br />I’m Athul<span>.</span></h1>
        <div className="hero-bottom">
          <p>I build websites and web apps with React and Node.js. I’m from Kerala and live in Bengaluru.</p>
          <div className="actions"><a className="button button--primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a><a className="text-link" href={profile.resume} download>Download CV <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="hero-location"><span className="available-dot" /> Available for work <span className="eyebrow-rule" /> Bengaluru, India</div>
      </section>
      <SelectedWork />
      <section className="wrap section home-about" id="about">
        <div><p className="eyebrow accent">About</p><h2>What I work with</h2></div>
        <div><p>At Trigent, I’ve worked on a learning platform and updated the interface for a property management app.</p><a className="text-link" href="/about">More about me <Arrow /></a></div>
        <Competencies />
      </section>
      <ContactCallout />
    </>
  );
}

function About() {
  return (
    <>
      <div className="wrap page about-page">
        <header className="page-intro">
          <p className="eyebrow accent">About</p>
          <h1>I’m Athul.</h1>
          <p>I grew up in Kerala, studied computer science in Thalassery, and now build web applications from Bengaluru.</p>
          <div className="actions"><a className="button button--primary" href={profile.resume} download>Download CV <span aria-hidden="true">↓</span></a><a className="text-link" href="/contact">Get in touch <Arrow /></a></div>
        </header>
        <section className="about-row">
          <h2>Experience and education</h2>
          <ol className="timeline">
            {journey.map(([date, role, company, description]) => <li key={date}><p className="eyebrow">{date}</p><h3>{role}</h3><p className="company">{company}</p>{description ? <p>{description}</p> : null}</li>)}
          </ol>
        </section>
        <section className="about-row"><h2>Tools I use</h2><Competencies /></section>
        <section className="about-row">
          <h2>How I work</h2>
          <div className="prose">
            <p>I start with the task someone needs to finish. If I’m building a page, I check that they can finish that task on a phone as easily as on a desktop.</p>
            <p>I like working on both sides of a feature, from the React interface to the API and the database. I want to keep building tools people can use every day and other developers can maintain.</p>
          </div>
        </section>
      </div>
      <ContactCallout />
    </>
  );
}

export default function App({ route }) {
  let content;
  switch (route.page) {
    case 'home': content = <Home />; break;
    case 'projects': content = <ProjectsPage />; break;
    case 'detail': content = <ProjectDetail project={route.project} />; break;
    case 'about': content = <About />; break;
    case 'contact': content = <ContactPage />; break;
    default: content = <div className="wrap page page-intro"><p className="eyebrow accent">404</p><h1>Page not found</h1><a className="text-link" href="/">Back to home <Arrow /></a></div>;
  }
  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader path={route.path} />
      <main id="main" tabIndex={-1}>{content}</main>
      <SiteFooter />
    </div>
  );
}
