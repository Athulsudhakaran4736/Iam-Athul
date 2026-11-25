import { useState } from 'react';
import { profile } from './content.js';
import { Arrow } from './Work.jsx';

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || '/api/contact';
const fields = [
  { name: 'name', label: 'Name', autoComplete: 'name', maxLength: 100 },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', maxLength: 254 },
  { name: 'subject', label: 'Subject', maxLength: 150 },
  { name: 'message', label: 'Message', maxLength: 3000 },
];

export function ContactPage() {
  const [status, setStatus] = useState({ kind: 'idle' });
  const [copyStatus, setCopyStatus] = useState('');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus('Email address copied.');
    } catch {
      setCopyStatus('Copy unavailable. You can select the address above.');
    }
  }

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(Array.from(new FormData(form), ([key, value]) => [key, value.trim()]));
    const empty = fields.find(({ name }) => !values[name]);
    if (empty) {
      const input = form.elements.namedItem(empty.name);
      input.setCustomValidity('Enter your ' + empty.label.toLowerCase() + '.');
      input.reportValidity();
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok || (endpoint === '/api/contact' && (await response.json()).sent !== true)) throw new Error('Contact endpoint returned ' + response.status);
      form.reset();
      setStatus({ kind: 'sent' });
    } catch {
      setStatus({ kind: 'error' });
    }
  }

  return (
    <div className="wrap page contact-page">
      <header className="page-intro">
        <p className="eyebrow accent">Contact</p>
        <h1>Let’s talk.</h1>
        <p>Have an engineering role or a project in mind? Tell me what you’re working on.</p>
      </header>
      <div className="contact-grid">
        <aside className="contact-details">
          <h2>Find me online</h2>
          <a className="text-link" href={'mailto:' + profile.email}>{profile.email}</a>
          <button type="button" className="copy-email" onClick={copyEmail}>Copy email</button>
          <p className="copy-feedback" role="status">{copyStatus}</p>
          <a className="text-link" href={profile.linkedin}>LinkedIn <Arrow external /></a>
          <a className="text-link" href={profile.github}>GitHub <Arrow external /></a>
          <p>Bengaluru, India</p>
        </aside>
        <form className="contact-form" onSubmit={submit} aria-label="Contact Athul" aria-busy={status.kind === 'sending'}>
          {fields.map(({ name, label, type, autoComplete, maxLength }) => {
            const props = { id: name, name, required: true, maxLength, onInput: (event) => event.currentTarget.setCustomValidity('') };
            return (
              <div className={'field field--' + name} key={name}>
                <label htmlFor={name}>{label}</label>
                {name === 'message' ? <textarea {...props} rows={6} /> : <input {...props} type={type || 'text'} autoComplete={autoComplete} />}
              </div>
            );
          })}
          <div className="form-action">
            <button className="button button--primary" type="submit" disabled={status.kind === 'sending'}>
              {status.kind === 'sending' ? 'Sending…' : 'Send message'} <Arrow />
            </button>
            <div role="status">
              {status.kind === 'sent' ? <p>Message sent. Thanks for getting in touch.</p> : null}
            </div>
            {status.kind === 'error' ? <p role="alert">Your message couldn’t be sent. Try again or <a className="text-link" href={'mailto:' + profile.email}>email me directly</a>.</p> : null}
          </div>
        </form>
      </div>
    </div>
  );
}
