import { Container } from '../UI/Container'
import { Loader } from '../UI/Loader'
import { BurgerMenu } from '../components/BurgerMenu'
import { FilterItem } from '../components/FilterItem'
import { Product } from '../components/Product'
import { ecommerce } from '../services/ecommerce'
import { ProductType } from '../types/productType'
import { getBrands } from '../utils/getBrands'
import { getCategories } from '../utils/getCategories'
import lodash from 'lodash'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useQuery } from 'react-query'

export interface Filter {
	title: string
	properties: string[]
}

interface PageProps {
	brands: string[]
	categories: string[]
}

function Page({ brands, categories }: PageProps) {
	const router = useRouter()
	const searchQuery = router.query.q as string

	const [products, setProducts] = useState<ProductType[]>([])
	const [checked, setChecked] = useState<string[]>([''])

	useEffect(() => {
		if (searchQuery !== undefined) {
			setChecked([searchQuery])
			fetchProducts()
		}
	}, [searchQuery])

	const { isLoading, refetch: fetchProducts } = useQuery(
		['products', checked],
		async () => await ecommerce.products.filterProducts(checked),
		{
			enabled: checked.length > 0,
			onSuccess(data) {
				setProducts(data)
			},
		}
	)

	const filterSubmit = async (payload: string) => {
		setChecked((prev) => {
			if (prev.includes(payload)) {
				return lodash.remove(prev, (item) => item !== payload)
			} else {
				return [...prev, payload]
			}
		})
	}

	const filters: Filter[] = [
		{
			title: 'Categories',
			properties: categories,
		},
		{
			title: 'Avaliability',
			properties: ['In stock', 'Out of stock'],
		},
		{
			title: 'Brand',
			properties: brands,
		},
	]

	return (
		<>
			<Head>
				<title>Search</title>
			</Head>
			<Container>
				<div className="flex justify-between my-4">
					<BurgerMenu filterSubmit={filterSubmit} filters={filters} />
					<div className="w-[200px] mr-10 hidden sm:block">
						{filters.map((filter, index) => (
							<FilterItem
								key={index}
								item={filter}
								filterSubmit={filterSubmit}
								last={filters.length === index + 1}
							/>
						))}
					</div>
					<div className="ml-12 sm:ml-0 w-full">
						{isLoading ? (
							<div className="flex justify-center">
								<Loader />
							</div>
						) : products.length === 0 ? (
							<p className="text-center">Not products by categories</p>
						) : (
							<div className="grid lg:grid-cols-3 gap-6 sm:grid-cols-2 ">
								{products.map((item, index) => (
									<Product key={index} item={item} />
								))}
							</div>
						)}
					</div>
				</div>
			</Container>
		</>
	)
}

export default observer(Page)

export async function getStaticProps() {
	try {
		const brands = await getBrands()
		const categories = await getCategories()
		return {
			props: { brands, categories },
		}
	} catch {}
}
