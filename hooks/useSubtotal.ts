import { ecommerce } from '../services/ecommerce'
import store from '../store/CartStore'
import { ProductType } from '../types/productType'
import { toJS } from 'mobx'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export const useSubtotal = () => {
	const [products, setProducts] = useState<ProductType[]>([])
	const [subTotal, setSubTotal] = useState<number>(0)
	const [success, setSuccess] = useState<boolean>(false)
	const { isSuccess } = useQuery(
		'',
		() => {
			let sub = 0
			toJS(store.cart.buyItem).forEach(async (item) => {
				const product = await ecommerce.products.retrieveProduct(item.productId)
				product.quantity = item.quantity
				setProducts((prev) => [...prev, product])

				sub = sub + Number(product.quantity) * Number(product.variants[0].price)
			})
			setSubTotal(sub)
		},
		{
			enabled: store.cartLoaded,
		}
	)

	if (subTotal > 0) {
		return subTotal
	}
}
