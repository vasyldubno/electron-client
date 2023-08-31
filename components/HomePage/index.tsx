import { Container } from '../../UI/Container'
import { Loader } from '../../UI/Loader'
import { Benefits } from '../../components/Benefits'
import { PopularProducts } from '../../components/PopularProducts'
import { Product } from '../../components/Product'
import { ecommerce } from '../../services/ecommerce'
import { ProductType } from '../../types/productType'
import lodash from 'lodash'
import Head from 'next/head'
import { FC, useState } from 'react'

interface Props {
	productsList: ProductType[]
}

export const HomePage: FC<Props> = ({ productsList }) => {
	const [products, setProducts] = useState<ProductType[]>(productsList)

	const fetchCheckedCategory = async (category: string[]) => {
		const result = await ecommerce.products.filterProducts(category)
		setProducts(lodash.shuffle(result))
	}

	return (
		<>
			<Head>
				<title>ELECTRON</title>
			</Head>
			<Container>
				<button></button>
				<PopularProducts fetchCheckedCategory={fetchCheckedCategory} />
				<div className="grid gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1">
					{products ? (
						products
							.slice(0, 8)
							.map((item, index) => <Product item={item} key={index} />)
					) : (
						<Loader />
					)}
				</div>
				<Benefits />
			</Container>
		</>
	)
}
