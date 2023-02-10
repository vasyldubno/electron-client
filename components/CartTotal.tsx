import { Divider } from '../UI/Divider'
import Link from 'next/link'
import { FC } from 'react'

interface CartTotalProps {
	totalSubtotal: number
}

export const CartTotal: FC<CartTotalProps> = ({ totalSubtotal }) => {
	return (
		<>
			<div className="w-full sm:w-[50%] lg:w-[40%] border-[1px] border-[#C3C3C3] max-h-56 md:text-base lg:text-xl sticky top-2 pb-6 lg:pb-9 mt-8">
				<div className="text-center bg-[#E2F4FF] font-medium py-3">
					<p>Cart total</p>
				</div>
				<div className="px-3 pt-5">
					<div className="font-medium flex justify-between pb-6">
						<p>Subtotal</p>
						<p>$ {totalSubtotal.toFixed(2)}</p>
					</div>
					<Divider />
					<Link href={'/checkout'}>
						<button className="bg-[#EDA415] font-semibold text-white py-3 rounded-3xl w-full">
							Go to Checkout
						</button>
					</Link>
				</div>
			</div>
		</>
	)
}
