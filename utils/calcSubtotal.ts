import { ecommerce } from '../services/ecommerce'
import { CartStore } from '../store/CartStore'
import { ProductType } from '../types/productType'
import { toJS } from 'mobx'

export const calcSubtotal = async (store: CartStore) => {
	const buyItems = toJS(store.cart.buyItem)
	let products: ProductType[] = []

	if (store.cartLoaded) {
		const buyItemsPromises = buyItems.map(async (item) => {
			const product = await ecommerce.products.retrieveProduct(item.productId)
			product.quantity = item.quantity
			products.push(product)
		})

		const buyItemsResolves = await Promise.all(buyItemsPromises)

		if (buyItemsResolves) {
			const result: number = products.reduce((acc, item) => {
				return acc + (item.quantity as number) * item.variants[0].price
			}, 0)

			return result
		}
	}
}
