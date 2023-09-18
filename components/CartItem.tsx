import { Divider } from '../UI/Divider'
import { QuantityCart } from '../UI/QuantityCart'
import { useStore } from '../hooks/useStore'
import { ecommerce } from '../services/ecommerce'
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
	const store = useStore()

	const [subtotal, setSubtotal] = useState<number>(0)

	const handleDelete = () => {
		ecommerce.carts.remove(product.productId, store).then((res) => {
			store.setUpdateCart(res.data.result)
			setIsUpdatedCart(true)
		})
		filterProducts(product.productId)
	}

	return (
		<>
			<div className="md:text-lg lg:text-xl md:h-36 md:mb-6 mb-2 flex items-center">
				<div className="relative h-[100px] md:h-[120px] w-[30%] mr-5 sm:mr-0 hidden xs:block">
					<Image
						src={product.variants[0].images[0]}
						alt={product.name}
						fill
						className="object-contain"
					/>
				</div>
				<div className="flex sm:gap-4 mr-4 items-start sm:items-center w-[65%] justify-between sm:flex-row flex-col">
					<p className="font-semibold text-[#003F62] text-left sm:text-center">
						{product.name}
					</p>
					<p className="font-medium text-[#2F2F2F]">
						Price: ${product.variants[0].price}
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
					<AiOutlineCloseCircle className="w-full h-full" />
				</button>
			</div>
			<Divider last={last} />
		</>
	)
}
