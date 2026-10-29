import type { APIRoute } from 'astro';
import { loadResume } from '../lib/resume';
import { site } from '../data/site';

export const GET: APIRoute = async () => {
  const { resume, jobs, contacts } = await loadResume();

  const sections = [
    [
      `# ${site.name}`,
      `**${resume.headline}**`,
      contacts.map((c) => `[${c.label}](${c.href})`).join(' · '),
    ].join('\n\n'),

    `## Summary\n\n${resume.summary}`,

    `## Experience\n\n${jobs
      .map((job) =>
        [
          `### ${job.company}`,
          `*${job.location}*`,
          job.roles
            .map((r) => `**${r.title}** · ${r.start} – ${r.end}`)
            .join('  \n'),
          job.highlights.map((h) => `- ${h}`).join('\n'),
        ].join('\n\n'),
      )
      .join('\n\n')}`,

    `## Skills\n\n${resume.skills
      .map((g) => `- **${g.label}:** ${g.items.join(', ')}`)
      .join('\n')}`,

    `## Education\n\n${resume.education
      .map(
        (e) =>
          `**${e.school}**  \n${e.studyType}, ${e.area}${e.honors ? `, ${e.honors}` : ''} · ${e.start} – ${e.end}`,
      )
      .join('\n\n')}`,

    `## Publications\n\n${resume.publications
      .map((p) => `- **${p.title}** (${p.kind}, ${p.publisher}, ${p.year})`)
      .join('\n')}`,
  ];

  return new Response(sections.join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
