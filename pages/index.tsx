import { Container } from '../UI/Container'
import { Benefits } from '../components/Benefits'
import { PopularProducts } from '../components/PopularProducts'
import { Product } from '../components/Product'
import { ecommerce } from '../services/ecommerce'
import store from '../store/CartStore'
import { ProductType } from '../types/productType'
import lodash from 'lodash'
import { observer } from 'mobx-react-lite'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

interface Props {
	test: ProductType[]
}

const Home: NextPage<Props> = ({ test }) => {
	const [products, setProducts] = useState<ProductType[]>(test)
	const [checkedCategory, setCheckedCategory] = useState<string[]>([])

	const fetchCheckedCategory = async (category: string[]) => {
		const result = await ecommerce.products.filterProducts(category)
		setProducts(lodash.shuffle(result))
	}

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const result = await ecommerce.products.filterProducts(checkedCategory)
	// 		setProducts(lodash.shuffle(result))
	// 	}
	// 	fetchData()
	// }, [checkedCategory])

	return (
		<>
			<Head>
				<title>ELECTRON</title>
			</Head>
			<Container>
				<PopularProducts
					setCheckedCategory={setCheckedCategory}
					fetchCheckedCategory={fetchCheckedCategory}
				/>
				<div className="grid gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1">
					{products ? (
						products
							.slice(0, 8)
							.map((item, index) => <Product item={item} key={index} />)
					) : (
						<p>LOADING...</p>
					)}
				</div>
				<Benefits />
			</Container>
		</>
	)
}

export default observer(Home)

export const getStaticProps = async () => {
	try {
		const products = await ecommerce.products.list()

		return {
			props: {
				test: lodash.shuffle(products),
			},
		}
	} catch {}
}
