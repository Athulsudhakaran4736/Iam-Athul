import { useState } from 'react';
import { projects, selectedProjects } from './content.js';

const categories = ['All', ...new Set(projects.map(({ category }) => category))];

export const projectHref = ({ slug }) => '/projects/' + slug;

export function Arrow({ external = false }) {
  return <span aria-hidden="true">{external ? '↗' : '→'}</span>;
}

function ProjectImage({ project, lead = false, detail = false }) {
  const base = '/images/projects/' + project.image;
  return (
    <picture className="project-image">
      <source type="image/webp" srcSet={base + '-640.webp 640w, ' + base + '-1280.webp 1280w'} sizes={detail ? '(max-width: 1280px) 92vw, 1160px' : lead ? '(max-width: 720px) 92vw, (max-width: 1250px) 58vw, 730px' : '(max-width: 720px) 92vw, (max-width: 1250px) 46vw, 570px'} />
      <img src={'/images/' + project.image + '.png'} alt={project.alt} width={1536} height={1024} loading={detail ? 'eager' : 'lazy'} decoding="async" />
    </picture>
  );
}

function ProjectMeta({ project }) {
  return <p className="eyebrow">{project.category}{project.status ? <span className="project-status">{project.status}</span> : null}</p>;
}

function Stack({ stack }) {
  return stack ? <ul className="stack" aria-label="Technology stack">{stack.map((tech) => <li key={tech}>{tech}</li>)}</ul> : null;
}

function ProjectFeature({ project, lead }) {
  return (
    <article className={'project-feature' + (lead ? ' project-feature--lead' : '')}>
      <a className="project-visual" href={projectHref(project)} tabIndex={-1} aria-hidden="true">
        <ProjectImage project={project} lead={lead} />
      </a>
      <div className="project-copy">
        <ProjectMeta project={project} />
        <h3><a href={projectHref(project)}>{project.name} <Arrow /></a></h3>
        <p>{project.summary}</p>
        <p className="contribution">{project.contribution}</p>
        <Stack stack={project.stack} />
        {project.live ? <a className="text-link project-live" href={project.live} target="_blank" rel="noopener">Live site <Arrow external /><span className="sr-only"> (opens in a new tab)</span></a> : null}
      </div>
    </article>
  );
}

function ProjectGrid({ items }) {
  return <div className="project-grid">{items.map((project, index) => <ProjectFeature key={project.slug} project={project} lead={index === 0} />)}</div>;
}

export function SelectedWork() {
  return (
    <section className="section wrap" id="work" aria-labelledby="selected-work">
      <header className="section-header">
        <h2 id="selected-work">Selected work</h2>
      </header>
      <ProjectGrid items={selectedProjects} />
      <div className="section-action"><a className="button button--primary" href="/projects">View all projects <Arrow /></a></div>
    </section>
  );
}

function ProfessionalWork({ items }) {
  if (!items.length) return null;
  return (
    <section className="professional" aria-labelledby="professional-title">
      <h2 id="professional-title">Professional work</h2>
      <ul className="project-list">
        {items.map((project) => (
          <li key={project.slug}>
            <div><ProjectMeta project={project} /><h3><a href={projectHref(project)}>{project.name} <Arrow /></a></h3><p className="company">{project.company}</p></div>
            <div><p>{project.summary}</p><Stack stack={project.stack} /></div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectsPage() {
  const [category, setCategory] = useState('All');
  const visible = category === 'All' ? projects : projects.filter((project) => project.category === category);
  const featured = visible.filter((project) => project.image);
  return (
    <div className="wrap page">
      <header className="page-intro">
        <h1>Projects</h1>
      </header>
      <div className="filters" role="group" aria-label="Filter projects by category">
        {categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <p className="sr-only" role="status">{visible.length} projects shown</p>
      {featured.length ? <section aria-labelledby="featured-title"><h2 className="listing-title" id="featured-title">Featured projects</h2><ProjectGrid items={featured} /></section> : null}
      <ProfessionalWork items={visible.filter((project) => !project.image)} />
    </div>
  );
}

export function ProjectDetail({ project }) {
  const next = projects[(projects.findIndex(({ slug }) => slug === project.slug) + 1) % projects.length];
  return (
    <article className="wrap page project-detail">
      <a href="/projects" className="text-link back-link"><span aria-hidden="true">←</span> All projects</a>
      <header className="page-intro">
        <ProjectMeta project={project} />
        <h1>{project.name}</h1>
        <p>{project.summary}</p>
        <div className="actions">
          {project.live ? <a className="button button--primary" href={project.live} target="_blank" rel="noopener">Visit live site <Arrow external /><span className="sr-only"> (opens in a new tab)</span></a> : null}
          {project.github ? <a className="button" href={project.github}>GitHub <Arrow external /></a> : null}
        </div>
      </header>
      {project.image ? <figure className="detail-figure"><ProjectImage project={project} detail /><figcaption>{project.alt}</figcaption></figure> : null}
      <div className="detail-grid">
        <aside className="project-facts" aria-label="Project facts">
          <dl>
            <div><dt>Contribution</dt><dd>{project.contribution}</dd></div>
            {project.company ? <div><dt>Company</dt><dd>{project.company}</dd></div> : null}
            {project.stack ? <div><dt>Technology</dt><dd>{project.stack.join(', ')}</dd></div> : null}
          </dl>
        </aside>
        <div className="detail-story">
          {project.implementation ? <section><h2>How I built it</h2><p>{project.implementation}</p></section> : null}
        </div>
      </div>
      <a className="next-project" href={projectHref(next)}><span><span className="eyebrow">Next project</span><strong>{next.name}</strong></span><Arrow /></a>
    </article>
  );
}
