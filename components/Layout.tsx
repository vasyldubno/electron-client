import { Footer } from './Footer'
import { Header } from './Header'
import { observer } from 'mobx-react-lite'
import { FC, ReactNode } from 'react'

interface LayoutProps {
	children: ReactNode
}

export const Layout: FC<LayoutProps> = observer(({ children }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex flex-1">{children}</div>
			<Footer />
		</div>
	)
})
