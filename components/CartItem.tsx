import { Divider } from '../UI/Divider'
import { QuantityCart } from '../UI/QuantityCart'
import { ecommerce } from '../services/ecommerce'
import store from '../store/CartStore'
import { ProductType } from '../types/productType'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface CartItemProps {
	product: ProductType
	setIsUpdatedCart: Dispatch<SetStateAction<boolean>>
	fetchProducts: any
	filterProducts: any
	last?: boolean
}

export const CartItem: FC<CartItemProps> = ({
	product,
	setIsUpdatedCart,
	fetchProducts,
	filterProducts,
	last,
}) => {
	const [subtotal, setSubtotal] = useState<number>(0)

	const handleDelete = () => {
		ecommerce.carts.remove(product.productId).then((res) => {
			store.setUpdateCart(res.data.result)
			setIsUpdatedCart(true)
		})
		filterProducts(product.productId)
	}

	return (
		<>
			{/* <div
				className="grid items-center h-28 mb-6 md:text-lg lg:text-xl"
				style={{
					gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 50px',
					justifyItems: 'center',
				}}
			>
				<div className="relative md:h-[100%] md:w-[100%] lg:h-full lg:w-full justify-self-start">
					<Image
						src={product.variants[0].images[0]}
						alt={product.name}
						fill
						className="object-contain py-3"
					/>
				</div>
				<p className="font-semibold text-[#003F62] text-center">
					{product.name}
				</p>
				<p className="font-medium text-[#2F2F2F]">
					${product.variants[0].price}
				</p>
				<QuantityCart
					product={product}
					setSubtotal={setSubtotal}
					setIsUpdatedCart={setIsUpdatedCart}
					fetchProducts={fetchProducts}
				/>
				<p className="font-medium text-[#2F2F2F]">${subtotal?.toFixed(2)}</p>
				<button onClick={handleDelete}>
					<AiOutlineCloseCircle className="w-6 h-6" />
				</button>
			</div> */}

			<div className="md:text-lg lg:text-xl md:h-36 sm:h-20 h-44 md:mb-6 mb-2 flex items-center">
				<div className="relative h-full w-[30%] mr-5 sm:mr-0 hidden xs:block">
					<Image
						src={product.variants[0].images[0]}
						alt={product.name}
						fill
						className="object-contain"
					/>
				</div>
				<div className="flex mr-4 items-start sm:items-center gap-4 w-[65%] justify-between sm:flex-row flex-col">
					<p className="font-semibold text-[#003F62] text-left sm:text-center">
						{product.name}
					</p>
					<p className="font-medium text-[#2F2F2F]">
						Price:
						<br /> ${product.variants[0].price}
					</p>
					<QuantityCart
						product={product}
						setSubtotal={setSubtotal}
						setIsUpdatedCart={setIsUpdatedCart}
						fetchProducts={fetchProducts}
					/>
					<p className="font-medium text-[#2F2F2F]">${subtotal?.toFixed(2)}</p>
				</div>
				<button onClick={handleDelete} className="ml-0 w-[5%]">
					<AiOutlineCloseCircle className="w-8 h-8" />
				</button>
			</div>
			<Divider last={last} />
		</>
	)
}
