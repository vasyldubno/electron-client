import { Container } from '../../UI/Container'
import { Axios } from '../../config/apiAxios'
import { useStore } from '../../hooks/useStore'
import { ecommerce } from '../../services/ecommerce'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useEffect } from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'

function Page() {
	const store = useStore()

	useEffect(() => {
		ecommerce.orders.completed()
		ecommerce.carts.empty(store)
	}, [store.cartLoaded])

	return (
		<>
			<Container styles={'flex flex-col flex-1 items-center'}>
				<div className="text-center my-5 text-base sm:text-3xl ">
					<div className="flex justify-center mb-5">
						<BsFillCheckCircleFill className="fill-green-700 w-10 h-10" />
					</div>
					<h1>Your order has been received.</h1>
					<p className="mb-10">Thank you for your purchase!</p>
				</div>
				<Link
					href={'/'}
					className="hover:text-blue-700 hover:underline text-sm mt-auto mb-5"
				>
					Back to main page
				</Link>
			</Container>
		</>
	)
}

export default observer(Page)
