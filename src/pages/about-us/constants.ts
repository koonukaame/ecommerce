import type { DeveloperInfo, Role, RoleDescription } from '../../app/types';

import { HEADER2 } from '../../shared/styles';
import { CARD } from '../catalog/constants';

export const TEAM_SLOGAN = '🚀 Rocket Team: We came. We coded. We conquered. 🌟';

export const RSS_LINK = 'https://rs.school/courses';

export const LABEL_RSS_LINK = 'Our alma mater:';

const ROLES: Record<Role, RoleDescription> = {
  testing: {
    label: '🧪 Testing',
    color: 'bg-red-200',
  },
  team_lead: {
    label: '👑 Team lead',
    color: 'bg-orange-200',
  },
  chores: {
    label: '🧹 Chores',
    color: 'bg-indigo-200',
  },
  api: {
    label: '🛠️ API',
    color: 'bg-lime-200',
  },
  sdc: {
    label: '🚀 CT-SDK',
    color: 'bg-sky-200',
  },
  ui: {
    label: '🎨 UI & Content',
    color: 'bg-pink-200',
  },
  routing: {
    label: '🚦 Routing',
    color: 'bg-fuchsia-200',
  },
  architecture: {
    label: '🏛️ Architecture',
    color: 'bg-rose-200',
  },
  mentoring: {
    label: '👨‍🏫 Mentoring',
    color: 'bg-green-200',
  },
  scrum: {
    label: '🎁 Scrum master',
    color: 'bg-cyan-200',
  },
};

export const DEVELOPERS: DeveloperInfo[] = [
  {
    photoURL: '/jpg/maria.jpg',
    name: 'Maria Lezhebokova',
    nic: 'koonukaame',
    roles: [ROLES.team_lead, ROLES.api, ROLES.architecture, ROLES.ui],
    description:
      'Zdravstvuyte!\n\n I’m Masha, 24 years old and I’m from Russia.\nGerman tutor and a passionate linguist. My first dive into coding was customizing a Hannibal Tumblr fanpage with HTML and CSS back in my teenage years. Years later, while writing my graduation thesis, I stumbled upon RSSchool courses and joined just for fun. Now I’m a code junkie - can’t go a day without tweaking, building, or breaking something in my apps.\n\nContribution:\n - Login page 🔑\n - Catalog page 🖼️\n - Cart page 🛒',
    github: 'https://github.com/koonukaame',
  },
  {
    photoURL: '/jpg/tanya.jpg',
    name: 'Tatiana Grosul',
    nic: 'Tanya-Gro',
    roles: [ROLES.chores, ROLES.routing, ROLES.ui, ROLES.testing],
    description: `O zi buna!\n\n I’m Tanya, 39 years old and I’m from Moldova.\n I graduated with a degree in engineering in 2007, worked as a software engineer for 5 years and then took a 10 year maternity leave. I believe that it is never too late to learn.\n This course has been a transformative journey: I have deepened my understanding of front-end development and worked side by side with a truly amazing team.\n\n Contribution:\n - Main page 🖥️\n - Product page 🃏\n - About page 🤝`,
    github: 'https://github.com/Tanya-Gro',
  },
  {
    photoURL: '/jpg/alex.jpg',
    name: 'Alexander Strelchenko',
    nic: 'alexspearsi',
    roles: [ROLES.sdc, ROLES.api, ROLES.testing, ROLES.ui],
    description:
      'Shalom!\n\n I’m Alex, 25 years old and I’m from Israel.\n Graduate in tourism business and accounting, who found a new passion in coding. I took my first coding steps during Stage#0 back in 2022. After a break of a couple of years, I decided to continue learning and exploring web development. \nI enjoy working with TypeScript, HTML, and CSS, and I’m discovering more and more interest in backend development.\n\nContribution:\n - Registration page 👨‍🏫\n - Profile page 📋',
    github: 'https://github.com/alexspearsi',
  },
];

export const MENTOR: DeveloperInfo = {
  photoURL: '/jpg/anna.jpg',
  name: 'Anna Zhuravleva',
  nic: 'ansivgit',
  roles: [ROLES.mentoring, ROLES.scrum],
  description:
    'A true problem solver and motivator. With a passion for teaching and a sharp eye for clean code, she’s guided us through the wilderness of frontend development and shared her expertise on how to work in a team and write more maintainable code.\n Thank you very much from all of us, your "pauchat🕷" ❤️🦜🌸',
  github: 'https://github.com/ansivgit',
};

export const ABOUT_TEAM =
  "RocketTeam is the epitome of true teamwork. Through seamless communication, mutual support, and a shared vision, we operate like a well-oiled machine – with each member bringing their own unique contribution to the overall goal. Whether solving complex problems or fine-tuning the smallest details, RocketTeam consistently demonstrates what it means to build with purpose, passion, and precision.\n What sets us apart is not just technical skill, but our unity. Every decision is a dialogue, every success a shared celebration. Together, we move faster, think bolder, and reach higher. We don't just write code—we launch ideas into reality.";

export const ABOUT_BASE_CLASSES = {
  container: ['flex', 'items-center', 'flex-wrap', 'justify-center'],
  logo: ['bg-no-repeat', 'bg-cover', 'inline-block'],
  link: ['flex', 'justify-evenly', 'bg-slate-200', 'rounded-md', 'p-1.5'],
  p: ['p-3', 'w-full', 'whitespace-pre-line'],
};
export const ABOUT_CLASSES = {
  cardsContainer: [...ABOUT_BASE_CLASSES.container, 'p-10', 'gap-4'],
  h2: [...HEADER2.general, 'px-3', 'text-center'],
  aboutTeamP: [...ABOUT_BASE_CLASSES.p, 'max-w-[600px]', 'text-justify', 'mb-[10px]'],
  developerPhoto: [
    'h-45',
    'w-35',
    'object-cover',
    'rounded-lg',
    'hover:scale-108',
    'transition-transform',
    'hover:shadow-lg',
  ],
  cardContainer: [
    'border',
    'border-[#252525]/10',
    'rounded-sm',
    'h-[630px]',
    'w-[350px]',
    'p-3',
    'overflow-hidden',
    'flex',
    'flex-col',
    'text-justify',
    'items-center',
    'justify-evenly',
    'bg-white',
    'content-between',
    ...CARD.layoutHover,
  ],
  biography: [...ABOUT_BASE_CLASSES.p, 'font-mono', 'text-xs'],
  gitLink: [...ABOUT_BASE_CLASSES.link, 'transition-transform', 'hover:shadow-lg', 'hover:bg-slate-300'],
  gitLogo: [...ABOUT_BASE_CLASSES.logo, 'bg-[url("/svg/github.svg")]', 'h-6', 'w-6', 'mx-1.5'],
  rssLogo: [...ABOUT_BASE_CLASSES.logo, 'bg-[url("/svg/rss.svg")]', 'h-25', 'w-45', 'mx-1.5'],
  rssLink: [
    ...ABOUT_BASE_CLASSES.link,
    'my-6',
    'items-center',
    'text-xl',
    'opacity-70',
    'hover:opacity-100',
    ...CARD.layoutHover,
  ],
  role: ['m-1', 'rounded-lg', 'px-2', 'py-0.5', 'font-mono', 'text-[12px]'],
};
