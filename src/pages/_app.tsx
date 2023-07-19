import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import useSWR from 'swr'


const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())



export default function App({ Component, pageProps }: AppProps) {

  const { data, error } = useSWR('/api/hello', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
