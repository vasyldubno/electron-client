import { Layout } from '../components/Layout'
import { LayoutCart } from '../components/LayoutCart'
import '../styles/globals.css'
import { StyledEngineProvider } from '@mui/material'
import { Poppins } from '@next/font/google'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import {
	Hydrate,
	QueryClient,
	QueryClientConfig,
	QueryClientProvider,
} from 'react-query'

const font = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-poppins',
})

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<main style={font.style}>
					<StyledEngineProvider injectFirst>
						<LayoutCart>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</LayoutCart>
					</StyledEngineProvider>
				</main>
			</Hydrate>
		</QueryClientProvider>
	)
}
