import { getCollection, getEntry } from 'astro:content';
import { site, socials } from '../data/site';

/** Everything the resume page and each downloadable format are built from */
export async function loadResume() {
  const resume = (await getEntry('resume', 'main'))!.data;
  const jobs = (await getCollection('jobs'))
    .sort((a, b) => a.data.order - b.data.order)
    .map((job) => job.data);

  const profiles = socials.filter(
    (s) => s.label === 'LinkedIn' || s.label === 'GitHub',
  );
  const bareUrl = (url: string) => url.replace(/^https:\/\/(www\.)?/, '');

  const contacts = [
    { label: site.email, href: `mailto:${site.email}` },
    ...profiles.map((s) => ({ label: bareUrl(s.href), href: s.href })),
    { label: bareUrl(site.url), href: site.url },
  ];

  return { resume, jobs, profiles, contacts };
}
