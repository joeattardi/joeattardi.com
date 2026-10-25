import logRocketMark from '../assets/publications/logrocket-mark.png';

// Keyed by the `publication` value in the articles collection. Marks are
// monochrome and tinted with the text color: `icon` is an astro-icon name,
// `mask` is an image whose alpha channel is used as the shape.
export type PublicationLogo = { icon: string } | { mask: string };

export const publicationLogos: Record<string, PublicationLogo> = {
  freeCodeCamp: { icon: 'simple-icons:freecodecamp' },
  LogRocket: { mask: logRocketMark.src },
  'Smashing Magazine': { icon: 'simple-icons:smashingmagazine' },
};
