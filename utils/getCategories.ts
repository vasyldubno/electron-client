import { ecommerce } from '../services/ecommerce'
import { ProductType } from '../types/productType'

export const getCategories = async () => {
	let categories: string[] = []
	const products: ProductType[] = await ecommerce.products.list()

	products.forEach((product) => {
		categories.push(product.category)
	})

	return Array.from(new Set(categories))
}
