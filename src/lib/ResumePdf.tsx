/** @jsxImportSource react */
import path from 'node:path';
import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import type { CollectionEntry } from 'astro:content';

type Resume = CollectionEntry<'resume'>['data'];
type Job = CollectionEntry<'jobs'>['data'];

interface Props {
  name: string;
  resume: Resume;
  jobs: Job[];
  contacts: { label: string; href: string }[];
}

// react-pdf reads static TTF/WOFF files, not variable or WOFF2, so it uses the
// static Fontsource packages rather than the variable ones the site loads
const fontFile = (pkg: string, file: string) =>
  path.resolve('node_modules/@fontsource', pkg, 'files', file);

Font.register({
  family: 'Fraunces',
  fonts: [
    {
      src: fontFile('fraunces', 'fraunces-latin-600-normal.woff'),
      fontWeight: 600,
    },
    {
      src: fontFile('fraunces', 'fraunces-latin-700-normal.woff'),
      fontWeight: 700,
    },
  ],
});
Font.register({
  family: 'Plus Jakarta Sans',
  fonts: [
    {
      src: fontFile(
        'plus-jakarta-sans',
        'plus-jakarta-sans-latin-400-normal.woff',
      ),
      fontWeight: 400,
    },
    {
      src: fontFile(
        'plus-jakarta-sans',
        'plus-jakarta-sans-latin-600-normal.woff',
      ),
      fontWeight: 600,
    },
    {
      src: fontFile(
        'plus-jakarta-sans',
        'plus-jakarta-sans-latin-700-normal.woff',
      ),
      fontWeight: 700,
    },
  ],
});
// Keeps long bullets from breaking mid-word at awkward places
Font.registerHyphenationCallback((word) => [word]);

// Print palette, mirroring the light-mode site tokens (PDF has no CSS variables)
const color = {
  fg: '#0b1220',
  muted: '#4a5a75',
  border: '#d9e1ee',
  primary: '#1d4ed8',
  tint: '#eef2f8',
};

const s = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 9.5,
    lineHeight: 1.45,
    color: color.fg,
  },
  name: {
    fontFamily: 'Fraunces',
    fontWeight: 700,
    fontSize: 30,
    lineHeight: 1.1,
    letterSpacing: -0.5,
    marginBottom: 3,
  },
  headline: {
    marginTop: 2,
    fontSize: 12,
    color: color.primary,
    fontWeight: 600,
  },
  contacts: { marginTop: 8, flexDirection: 'row', flexWrap: 'wrap', gap: 14 },
  contact: { color: color.muted, textDecoration: 'none', fontSize: 9 },
  rule: { marginTop: 14, height: 2, backgroundColor: color.primary },
  summary: {
    marginTop: 14,
    fontSize: 10.5,
    lineHeight: 1.55,
    color: color.muted,
  },
  section: { marginTop: 14 },
  sectionTitle: {
    fontFamily: 'Fraunces',
    fontWeight: 700,
    fontSize: 14,
    paddingBottom: 4,
    marginBottom: 10,
    borderBottomWidth: 0.75,
    borderBottomColor: color.border,
  },
  job: { marginBottom: 11 },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  company: { fontFamily: 'Fraunces', fontWeight: 600, fontSize: 12 },
  location: { fontSize: 8.5, color: color.muted },
  roles: { marginTop: 3 },
  role: { flexDirection: 'row', justifyContent: 'space-between' },
  roleTitle: { fontWeight: 600, fontSize: 9.5 },
  dates: { fontSize: 8.5, color: color.primary, fontWeight: 600 },
  bullets: { marginTop: 5 },
  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  bulletMark: { width: 10, color: color.primary, fontWeight: 700 },
  bulletText: { flex: 1, color: color.muted },
  skillRow: { flexDirection: 'row', marginBottom: 4 },
  skillLabel: { width: 78, fontWeight: 700, fontSize: 8.5, color: color.fg },
  skillItems: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: color.muted,
  },
  skillItem: { flexDirection: 'row' },
  skillDot: { marginHorizontal: 5 },
  eduRow: { flexDirection: 'row', justifyContent: 'space-between' },
  strong: { fontWeight: 600 },
  muted: { color: color.muted },
  pubRow: { flexDirection: 'row', marginBottom: 3 },
  pubKind: {
    width: 78,
    fontSize: 8,
    color: color.primary,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingTop: 1,
  },
  pubTitle: { flex: 1 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: color.muted,
  },
});

export function ResumePdf({ name, resume, jobs, contacts }: Props) {
  return (
    <Document title={`${name} - Resume`} author={name} subject="Resume">
      <Page size="LETTER" style={s.page}>
        <View>
          <Text style={s.name}>{name}</Text>
          <Text style={s.headline}>{resume.headline}</Text>
          <View style={s.contacts}>
            {contacts.map((c) => (
              <Link key={c.href} src={c.href} style={s.contact}>
                {c.label}
              </Link>
            ))}
          </View>
          <View style={s.rule} />
          <Text style={s.summary}>{resume.summary}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Experience</Text>
          {jobs.map((job) => (
            <View key={job.company} style={s.job}>
              {/* Keeps the header and first bullet together across page breaks */}
              <View wrap={false}>
                <View style={s.jobHeader}>
                  <Text style={s.company}>{job.company}</Text>
                  <Text style={s.location}>{job.location}</Text>
                </View>
                <View style={s.roles}>
                  {job.roles.map((role) => (
                    <View key={role.title} style={s.role}>
                      <Text style={s.roleTitle}>{role.title}</Text>
                      <Text style={s.dates}>
                        {role.start} – {role.end}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={[s.bullet, { marginTop: 5 }]}>
                  <Text style={s.bulletMark}>•</Text>
                  <Text style={s.bulletText}>{job.highlights[0]}</Text>
                </View>
              </View>
              <View style={{ marginTop: 0 }}>
                {job.highlights.slice(1).map((h) => (
                  <View key={h} style={s.bullet} wrap={false}>
                    <Text style={s.bulletMark}>•</Text>
                    <Text style={s.bulletText}>{h}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={s.section} wrap={false}>
          <Text style={s.sectionTitle}>Skills</Text>
          {resume.skills.map((group) => (
            <View key={group.label} style={s.skillRow}>
              <Text style={s.skillLabel}>{group.label}</Text>
              <View style={s.skillItems}>
                {/* Each dot lives in its item's box, so a wrapped line never starts with one */}
                {group.items.map((item, i) => (
                  <View key={item} style={s.skillItem}>
                    <Text>{item}</Text>
                    {i < group.items.length - 1 && (
                      <Text style={s.skillDot}>·</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={s.section} wrap={false}>
          <Text style={s.sectionTitle}>Education</Text>
          {resume.education.map((e) => (
            <View key={e.school} style={s.eduRow}>
              <View>
                <Text style={s.strong}>{e.school}</Text>
                <Text style={s.muted}>
                  {e.studyType}, {e.area}
                  {e.honors ? `, ${e.honors}` : ''}
                </Text>
              </View>
              <Text style={s.dates}>
                {e.start} – {e.end}
              </Text>
            </View>
          ))}
        </View>

        <View style={s.section} wrap={false}>
          <Text style={s.sectionTitle}>Publications</Text>
          {resume.publications.map((p) => (
            <View key={p.title} style={s.pubRow}>
              <Text style={s.pubKind}>{p.kind}</Text>
              <Text style={s.pubTitle}>
                <Text style={s.strong}>{p.title}</Text>
                <Text style={s.muted}>
                  {'  '}
                  {p.publisher}, {p.year}
                </Text>
              </Text>
            </View>
          ))}
        </View>

        <View style={s.footer} fixed>
          <Text>{name}</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
