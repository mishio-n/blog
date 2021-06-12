import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { pageview } from '~/libs/gtag'

export const usePageView = () => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (path: string) => {
      pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])
}
