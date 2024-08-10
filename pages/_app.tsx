import { SessionProvider } from "next-auth/react"
import '../styles/globals.css';
import { ConnectKitProvider, ConnectKitButton } from 'connectkit';
import { WagmiProvider } from 'wagmi';
import { config } from '../lib/config';
// import 'tailwindcss/tailwind.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import type { AppProps } from "next/app"
import type { Session } from "next-auth"

const queryClient = new QueryClient()

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    // <SessionProvider session={session}>
    //     <Component {...pageProps} />
    // </SessionProvider>
    <WagmiProvider config={config}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
            <Component {...pageProps} />
            {/* <EnhancedWorldIDVerification/> */}
          </ConnectKitProvider>
        </QueryClientProvider>
      </SessionProvider>
		</WagmiProvider>

  )
}
