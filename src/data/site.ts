export const site = {
  name: 'Joe Attardi',
  title: 'Joe Attardi | Senior Frontend Engineer & Author',
  description:
    'Joe Attardi is a senior frontend engineer and published author of books with Apress and O’Reilly.',
  url: 'https://joeattardi.com',
  email: 'hello@example.com',
};

export const nav = [
  { label: 'Books', href: '/books' },
  { label: 'Articles', href: '/articles' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'fa6-brands:github' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: 'fa6-brands:linkedin',
  },
  { label: 'X', href: 'https://x.com/', icon: 'fa6-brands:x-twitter' },
  { label: 'Email', href: `mailto:${site.email}`, icon: 'ph:envelope-simple' },
];
