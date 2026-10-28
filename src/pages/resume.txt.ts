import type { APIRoute } from 'astro';
import { loadResume } from '../lib/resume';
import { site } from '../data/site';

const WIDTH = 80;
const INDENT = '  ';

// Plain text has no curly quotes or en dashes to fall back on, so keep it ASCII-safe
const plain = (text: string) => text.replace(/[’‘]/g, "'");

/** Word-wraps text to WIDTH; `first` prefixes the first line and `rest` the others */
function wrap(text: string, first = '', rest = first): string {
  const lines: string[] = [];
  let line = first;
  let empty = true;
  for (const word of plain(text).split(/\s+/)) {
    if (!empty && line.length + 1 + word.length > WIDTH) {
      lines.push(line);
      line = rest + word;
    } else {
      line += (empty ? '' : ' ') + word;
    }
    empty = false;
  }
  lines.push(line);
  return lines.join('\n');
}

/** Joins items with pipes, starting a new line rather than exceeding WIDTH */
function contactLines(items: string[]): string {
  const lines: string[] = [];
  for (const item of items) {
    const last = lines.at(-1);
    if (last !== undefined && last.length + 3 + item.length <= WIDTH) {
      lines[lines.length - 1] = `${last} | ${item}`;
    } else {
      lines.push(item);
    }
  }
  return lines.join('\n');
}

/** Left text and right text on one line, padded to WIDTH */
const split = (left: string, right: string, indent = '') =>
  `${indent}${left}${' '.repeat(Math.max(2, WIDTH - indent.length - left.length - right.length))}${right}`;

const heading = (title: string) =>
  `${title.toUpperCase()}\n${'-'.repeat(WIDTH)}`;

export const GET: APIRoute = async () => {
  const { resume, jobs, contacts } = await loadResume();

  const sections = [
    [
      site.name.toUpperCase(),
      plain(resume.headline),
      contactLines(contacts.map((c) => c.label)),
    ].join('\n'),

    `${heading('Summary')}\n${wrap(resume.summary)}`,

    `${heading('Experience')}\n${jobs
      .map((job) =>
        [
          split(plain(job.company), job.location),
          ...job.roles.map((r) =>
            split(r.title, `${r.start} - ${r.end}`, INDENT),
          ),
          '',
          ...job.highlights.map((h) => wrap(h, `${INDENT}* `, `${INDENT}  `)),
        ].join('\n'),
      )
      .join('\n\n')}`,

    `${heading('Skills')}\n${resume.skills
      .map((g) => wrap(`${g.label}: ${g.items.join(', ')}`, '', INDENT))
      .join('\n')}`,

    `${heading('Education')}\n${resume.education
      .map((e) =>
        [
          split(e.school, `${e.start} - ${e.end}`),
          `${INDENT}${e.studyType}, ${e.area}${e.honors ? `, ${e.honors}` : ''}`,
        ].join('\n'),
      )
      .join('\n')}`,

    `${heading('Publications')}\n${resume.publications
      .map((p) =>
        wrap(`${p.title} (${p.kind}, ${p.publisher}, ${p.year})`, '* ', '  '),
      )
      .join('\n')}`,
  ];

  return new Response(sections.join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
