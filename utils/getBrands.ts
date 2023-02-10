import { ecommerce } from '../services/ecommerce'
import { ProductType } from '../types/productType'

export const getBrands = async () => {
	let brands: string[] = []
	const products: ProductType[] = await ecommerce.products.list()

	products.forEach((product) => {
		const brand = product.variants[0].brand
		brands.push(brand)
	})

	return Array.from(new Set(brands)).sort()
}
