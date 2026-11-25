export const profile = {
  name: 'Athul Sudhakaran',
  email: 'athulsudhakaran4736@gmail.com',
  linkedin: 'https://www.linkedin.com/in/athul-sudhakaran-07472b212/',
  github: 'https://github.com/Athulsudhakaran4736',
  twitter: 'https://x.com/AthulSudhakar11',
  resume: '/Athul-Sudhakaran-Resume.pdf',
};

const pern = ['PostgreSQL', 'Express.js', 'React.js', 'Node.js'];

export const projects = [
  {
    slug: 'neosport', name: 'NeoSport', category: 'Marketing website',
    summary: 'I built a landing page for a flooring manufacturer in the UAE.',
    contribution: 'Landing page development',
    stack: ['React.js', 'Tailwind CSS'],
    image: 'neosport', alt: 'NeoSport flooring website preview',
    live: 'https://www.neosports.ae/',
    implementation: 'The company needed a single page that works on phones and desktops. I built it with React and used Tailwind CSS for the responsive layout.',
  },
  {
    slug: 'rknex', name: 'RKNEX', category: 'Learning management',
    summary: 'I built the admin panel for the RKNEX learning platform.',
    contribution: 'React admin panel development',
    stack: ['React.js'],
    image: 'rknex', alt: 'RKNEX project preview',
    live: 'https://rknex.in/',
    implementation: 'I used React for the admin interface.',
  },
  {
    slug: 'zoommart', name: 'Zoommart', category: 'E-commerce',
    summary: 'I built the admin panel for an online store in Singapore.',
    contribution: 'Full-stack admin panel development',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    image: 'zoommart', alt: 'Zoommart project preview',
    implementation: 'I used React for the admin screens, Node.js and Express for the backend, and MongoDB for storage.',
  },
  {
    slug: 'trigent-lms', name: 'Learning Management System', category: 'Learning management',
    company: 'Trigent Software Inc',
    summary: 'I worked on a learning management system at Trigent.',
    contribution: 'PERN stack development', stack: pern,
    implementation: 'I worked across the React frontend, the Node.js and Express backend, and PostgreSQL.',
  },
  {
    slug: 'e-property-plus', name: 'E Property Plus', category: 'Property management',
    company: 'Trigent Software Inc',
    summary: 'I helped update a property management app at Trigent.',
    contribution: 'Property management UI revamp',
    implementation: 'My part was updating the existing interface.',
  },
  {
    slug: 'timesheet-management', name: 'Timesheet Management', category: 'Internal tools',
    company: 'Whizlabs Software Pvt Ltd',
    summary: 'I built a timesheet app at Whizlabs.',
    contribution: 'PERN stack development', stack: pern,
    implementation: 'I used React for the interface, Node.js and Express for the backend, and PostgreSQL for the timesheet data.',
  },
];

export const selectedProjects = projects.filter((project) => project.image);

export const competencies = [
  ['Frontend engineering', 'React.js, Next.js, JavaScript (ES6+), Tailwind CSS, Redux Toolkit, responsive design'],
  ['Backend and APIs', 'Node.js, Express.js, REST APIs, MERN and PERN development'],
  ['Data and services', 'PostgreSQL, MongoDB, Knex.js, Firebase'],
];

export const journey = [
  ['Since Jun 2024', 'Software Engineer', 'Trigent Software Inc', 'Worked on a learning management system and updated the interface for E Property Plus.'],
  ['Apr 2023 to Mar 2024', 'Programmer Trainee', 'Whizlabs Software Pvt Ltd', 'Built a timesheet app using the PERN stack.'],
  ['2018 to 2022', 'BTech, Computer Science and Engineering', 'College of Engineering Thalassery'],
];

const pages = {
  '/': ['home', 'Athul Sudhakaran | Software Engineer', 'Athul Sudhakaran is a software engineer in Bengaluru who builds websites and web apps with React and Node.js.'],
  '/projects': ['projects', 'Projects | Athul Sudhakaran', 'Web projects by Athul Sudhakaran, including NeoSport, RKNEX, and Zoommart.'],
  '/about': ['about', 'About | Athul Sudhakaran', 'Learn about Athul Sudhakaran’s work at Trigent and Whizlabs and the tools he uses to build web apps.'],
  '/contact': ['contact', 'Contact | Athul Sudhakaran', 'Get in touch with Athul Sudhakaran about an engineering role or a freelance project.'],
};

export function getRoute(pathname) {
  const path = pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
  const project = projects.find(({ slug }) => path === '/projects/' + slug);
  if (project) return { path, project, page: 'detail', title: project.name + ' | Athul Sudhakaran', description: project.summary };
  const [page, title, description] = Object.hasOwn(pages, path) ? pages[path] : ['missing', 'Page not found | Athul Sudhakaran', 'Find your way back to Athul Sudhakaran’s portfolio.'];
  return { path, page, title, description };
}

export const publicPaths = [...Object.keys(pages), ...projects.map(({ slug }) => '/projects/' + slug)];
export const archivePaths = ['/caixabank', '/gymondo-premium', '/gymondo-challenges', '/zattoo', '/neotaste-onboarding', '/neotaste-quests'];
