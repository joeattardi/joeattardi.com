import type { APIRoute } from 'astro';
import { loadResume } from '../lib/resume';
import { site } from '../data/site';

// JSON Resume (https://jsonresume.org/schema), built from the same data as /resume
export const GET: APIRoute = async () => {
  const { resume, jobs, profiles } = await loadResume();

  const json = {
    $schema:
      'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: site.name,
      label: resume.headline,
      email: site.email,
      url: site.url,
      summary: resume.summary,
      profiles: profiles.map((p) => ({
        network: p.label,
        username: new URL(p.href).pathname.split('/').filter(Boolean).pop(),
        url: p.href,
      })),
    },
    // One entry per role; the company's highlights belong to its most recent role
    work: jobs.flatMap((job) =>
      job.roles.map((role, i) => ({
        name: job.company,
        location: job.location,
        position: role.title,
        startDate: role.start,
        ...(role.end !== 'Present' && { endDate: role.end }),
        highlights: i === 0 ? job.highlights : [],
      })),
    ),
    education: resume.education.map((e) => ({
      institution: e.school,
      area: e.area,
      studyType: e.studyType,
      startDate: e.start,
      endDate: e.end,
      // Not part of the schema, which allows extra fields
      ...(e.honors && { honors: e.honors }),
    })),
    publications: resume.publications.map((p) => ({
      name: p.title,
      publisher: p.publisher,
      releaseDate: p.year,
      summary: p.kind,
    })),
    skills: resume.skills.map((group) => ({
      name: group.label,
      keywords: group.items,
    })),
  };

  return new Response(JSON.stringify(json, null, 2) + '\n', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
