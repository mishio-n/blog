export const GOOGLE_ANALYTICS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

export const pageview = (path: string) => {
  window.gtag('config', GOOGLE_ANALYTICS_ID, { page_path: path });
};
