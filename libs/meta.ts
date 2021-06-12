export const OG_TITLE = 'og:title'
export const DESCRIPTION = 'description'
export const OG_DESCRIPTION = 'og:description'
export const OG_TYPE = 'og:type'
export const OG_IMAGE = 'og:image'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || ''
const SITE_TITLE = 'mishioブログ'
export const description = '技術や趣味に関してつぶやくブログです'

export const generateTitle = (pageTitle?: string) =>
  pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE
