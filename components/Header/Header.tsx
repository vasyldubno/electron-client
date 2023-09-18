import { Container } from '../../UI/Container'
import { Logo } from '../../UI/Logo'
import { useStore } from '../../hooks/useStore'
import { SearchInput } from './SearchInput'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { FC } from 'react'
import { BsCartDash, BsHeart } from 'react-icons/bs'

export const Header: FC = observer(() => {
	const store = useStore()

	const favorite = store.cart.favoriteItem.length
	const cart = store.cart.buyItem.length

	return (
		<>
			<div className=" bg-[#003F62] flex">
				<Container>
					<div className="py-5 flex flex-wrap items-center ">
						<div className="flex">
							<Link href={'/'} className="lg:mr-20">
								<Logo />
							</Link>
						</div>

						<SearchInput />

						<div className="flex ml-auto text-white text-sm gap-7">
							<Link href={'/favorites'} data-testId="favorites-link">
								<div className="flex items-center relative">
									<BsHeart className="h-6 w-6 mr-[3px]" />
									{favorite !== 0 && (
										<div className="h-5 w-5 bg-[#EDA415] rounded-full flex items-center justify-center mr-3 absolute -top-2 -right-6">
											<p className="text-[12px] font-semibold">{favorite}</p>
										</div>
									)}
								</div>
							</Link>
							<Link href={'/cart'}>
								<div className="flex items-center relative">
									<BsCartDash className="h-6 w-6 mr-[3px]" />
									{cart !== 0 && (
										<div className="h-5 w-5 bg-[#EDA415] rounded-full flex items-center justify-center mr-3 absolute -top-2 -right-6">
											<p className="text-[12px] font-semibold">{cart}</p>
										</div>
									)}
								</div>
							</Link>
						</div>
					</div>
				</Container>
			</div>
		</>
	)
})
