import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'
import { GOOGLE_ANALYTICS_ID } from '~/libs/gtag'

class MyDocument extends NextDocument {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await super.getInitialProps(context)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" sizes="192x192" href="/icon-192x192.png" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${GOOGLE_ANALYTICS_ID}', {
                            page_path: window.location.pathname,
                          });`
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
          integrity="sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ=="
          crossOrigin="anonymous"
          async
        ></script>
      </Html>
    )
  }
}

export default MyDocument
