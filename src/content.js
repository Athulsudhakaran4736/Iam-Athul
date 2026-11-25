export const profile = {
  name: 'Athul Sudhakaran',
  email: 'athulsudhakaran4736@gmail.com',
  linkedin: 'https://www.linkedin.com/in/athul-sudhakaran-07472b212/',
  github: 'https://github.com/Athulsudhakaran4736',
  twitter: 'https://x.com/AthulSudhakar11',
  resume: 'https://drive.google.com/uc?export=download&id=1uCOQaHG_9JxkiLcOl-QBo2HxeShDN1ZP',
};

const pern = ['PostgreSQL', 'Express.js', 'React.js', 'Node.js'];

export const projects = [
  {
    slug: 'neosport', name: 'NeoSport', category: 'Marketing website', status: 'In progress',
    summary: 'A responsive landing page for a flooring manufacturer based in the UAE.',
    contribution: 'Landing page development',
    stack: ['React.js', 'Tailwind CSS'],
    image: 'neosport', alt: 'NeoSport flooring website preview',
    challenge: 'Present a flooring manufacturer on a single page that works across screen sizes.',
    solution: 'Develop a responsive landing page as a dedicated web presence for the company.',
    implementation: 'The page uses React.js for the interface and Tailwind CSS for styling and responsive layouts.',
  },
  {
    slug: 'rknex', name: 'RKNEX', category: 'Learning management',
    summary: 'An administration interface for a learning management platform.',
    contribution: 'React admin panel development',
    stack: ['React.js'],
    image: 'rknex', alt: 'RKNEX project preview',
    live: 'https://rknex.in/',
    challenge: 'Give the learning management platform a dedicated interface for administration.',
    solution: 'Build an admin panel for the platform.',
    implementation: 'My contribution was developing the admin interface in React.js.',
  },
  {
    slug: 'zoommart', name: 'Zoommart', category: 'E-commerce',
    summary: 'An admin panel for a Singapore-based e-commerce web application.',
    contribution: 'Full-stack admin panel development',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    image: 'zoommart', alt: 'Zoommart project preview',
    challenge: 'Provide a dedicated admin interface for an e-commerce application.',
    solution: 'Develop the admin panel as a full-stack web application.',
    implementation: 'The panel uses the MERN stack, with React.js on the frontend and MongoDB, Express.js, and Node.js on the backend.',
  },
  {
    slug: 'trigent-lms', name: 'Learning Management System', category: 'Learning management',
    company: 'Trigent Software Inc',
    summary: 'Full-stack development on a learning management system at Trigent.',
    contribution: 'PERN stack development', stack: pern,
    implementation: 'The LMS was developed with PostgreSQL, Express.js, React.js, and Node.js.',
  },
  {
    slug: 'e-property-plus', name: 'E Property Plus', category: 'Property management',
    company: 'Trigent Software Inc',
    summary: 'A user interface revamp for a property management application.',
    contribution: 'Property management UI revamp',
    implementation: 'My work focused on updating the existing property management interface.',
  },
  {
    slug: 'timesheet-management', name: 'Timesheet Management', category: 'Internal tools',
    company: 'Whizlabs Software Pvt Ltd',
    summary: 'A full-stack timesheet management application built at Whizlabs.',
    contribution: 'PERN stack development', stack: pern,
    implementation: 'The application was built with PostgreSQL, Express.js, React.js, and Node.js.',
  },
];

export const selectedProjects = projects.filter((project) => project.image);

export const competencies = [
  ['Frontend engineering', 'React.js, Next.js, JavaScript (ES6+), Tailwind CSS, Redux Toolkit, responsive design'],
  ['Backend and APIs', 'Node.js, Express.js, REST APIs, MERN and PERN development'],
  ['Data and services', 'PostgreSQL, MongoDB, Knex.js, Firebase'],
];

export const journey = [
  ['Jun 2024 – Present', 'Software Engineer', 'Trigent Software Inc', 'Full-stack work on a learning management system and a UI revamp for E Property Plus.'],
  ['Apr 2023 – Mar 2024', 'Programmer Trainee', 'Whizlabs Software Pvt Ltd', 'Built a timesheet management application using the PERN stack.'],
  ['2018 – 2022', 'BTech, Computer Science and Engineering', 'College of Engineering Thalassery'],
];

const pages = {
  '/': ['home', 'Athul Sudhakaran | Software Engineer', 'Bengaluru-based software engineer building responsive React interfaces and full-stack web applications.'],
  '/projects': ['projects', 'Projects | Athul Sudhakaran', 'Explore Athul Sudhakaran’s frontend and full-stack projects across e-commerce, learning management, and more.'],
  '/about': ['about', 'About | Athul Sudhakaran', 'Career journey, technical expertise, and development approach of Athul Sudhakaran, a software engineer based in Bengaluru.'],
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
