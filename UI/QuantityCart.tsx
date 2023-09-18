import { Axios } from '../config/apiAxios'
import { useStore } from '../hooks/useStore'
import { ecommerce } from '../services/ecommerce'
import { ProductType } from '../types/productType'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

interface QuantityProps {
	product: ProductType
	setSubtotal: any
	setIsUpdatedCart: any
	fetchProducts: any
}

export const QuantityCart: FC<QuantityProps> = ({
	product,
	setSubtotal,
	setIsUpdatedCart,
	fetchProducts,
}) => {
	const store = useStore()

	const [quantity, setQuantity] = useState<number>(product.quantity as number)

	const { refetch: addToCart } = useQuery(
		'',
		async () => {
			return await Axios.post('updateCart', {
				id: store.getId,
				payload: {
					buyItem: {
						productId: product.productId,
						quantity: quantity,
					},
				},
			})
		},
		{
			enabled: false,
			onSuccess(data) {
				if (data?.data?.result) {
					setIsUpdatedCart(true)
					store.setUpdateCart(data.data.result)
				}
			},
		}
	)

	const handleQuantity = (operator: string) => {
		if (operator === '-') {
			if (quantity === 1) {
				return
			} else {
				setQuantity((prev) => prev - 1)
			}
		}
		if (operator === '+') {
			setQuantity((prev) => {
				return prev + 1
			})
		}
	}

	useEffect(() => {
		addToCart()
		setSubtotal(product.variants[0].price * quantity)
	}, [quantity])

	return (
		<>
			<div
				className="flex font-medium md:text-base lg:text-lg"
				style={{ width: '133px' }}
			>
				<button
					className="bg-[#EEEEEE] border-[#BDBDBD] border-[1px] items-center justify-center flex "
					style={{ width: '33.3%', height: '32px' }}
					onClick={() => handleQuantity('-')}
				>
					-
				</button>
				<div
					className="bg-[#EEEEEE] border-[#BDBDBD] border-[1px] items-center justify-center flex"
					style={{ width: '66.6%', height: '32px' }}
				>
					{quantity}
				</div>
				<button
					className="bg-[#EEEEEE] border-[#BDBDBD] border-[1px] items-center justify-center flex"
					style={{ width: '33.3%', height: '32px' }}
					onClick={() => handleQuantity('+')}
				>
					+
				</button>
			</div>
		</>
	)
}
