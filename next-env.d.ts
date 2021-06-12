/// <reference types="next" />
/// <reference types="next/types/global" />

// for Google Analytics
interface Window {
  gtag(
    type: 'config',
    googleAnalyticsId: string,
    options: {
      page_path: string
    }
  )
}
