import { Container } from '../UI/Container'
import { Loader } from '../UI/Loader'
import { Product } from '../components/Product/Product'
import { ecommerce } from '../services/ecommerce'
import store from '../store/CartStore'
import { ProductType } from '../types/productType'
import { commerce } from '../utils/commerce'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { use, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

function Page() {
	const [products, setProducts] = useState<ProductType[]>([])

	const filterProducts = (productId: string) => {
		setProducts((prev) => prev.filter((item) => item?.productId !== productId))
	}

	useEffect(() => {
		toJS(store.getFavoriteItem).forEach(async (item) => {
			const response = await ecommerce.products.retrieveProduct(item)
			setProducts((prev) => {
				return [...prev, response]
			})
		})
	}, [store.cartLoaded === true])

	return (
		<>
			<Head>
				<title>Favorite Items</title>
			</Head>
			{/* <div className="max-w-[1440px] mx-auto px-14 w-full "> */}
			<Container>
				{products.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10">
						{products.map((product) => (
							<Product
								item={product}
								key={product?.productId}
								checking={true}
								filterProducts={filterProducts}
							/>
						))}
					</div>
				) : (
					<p className="text-center font-bold text-4xl mt-10">
						You Favorite List is Empty
					</p>
				)}
			</Container>
			{/* </div> */}
		</>
	)
}

export default observer(Page)
