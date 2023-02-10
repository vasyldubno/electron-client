import { ecommerce } from '../services/ecommerce'
import store from '../store/CartStore'
import { ProductType } from '../types/productType'
import { toJS } from 'mobx'
import { useState } from 'react'
import { useQuery } from 'react-query'

export const calcSubtotal = () => {
	const productIds = toJS(store.cart.buyItem)
	let products: ProductType[] = []

	if (store.cartLoaded) {
		productIds.forEach(async (item) => {
			const product = await ecommerce.products.retrieveProduct(item.productId)
			product.quantity = item.quantity
			products.push(product)
		})

		const result: number = products.reduce((acc, item) => {
			return acc + (item.quantity as number) * item.variants[0].price
		}, 0)

		return result
	}
}
