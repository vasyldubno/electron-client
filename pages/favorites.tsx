import { Product } from '../components/Product'
import { ecommerce } from '../services/ecommerce'
import store from '../store/CartStore'
import { ProductType } from '../types/productType'
import { commerce } from '../utils/commerce'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useEffect, useState } from 'react'

function Page() {
	const [products, setProducts] = useState<ProductType[]>([])
	const [productsId, setProductsId] = useState<string[]>([])

	const filterProducts = (productId: string) => {
		setProducts((prev) => prev.filter((item) => item?.productId !== productId))
	}

	const productsIdFetch = () => {
		setProductsId(toJS(store.getFavoriteItem))
	}

	useEffect(() => {
		productsIdFetch()
	}, [store.cartLoaded === true])

	useEffect(() => {
		productsId.forEach(async (item) => {
			const response = await ecommerce.products.retrieveProduct(item)
			setProducts((prev) => {
				return [...prev, response]
			})
		})
	}, [productsId.length > 0])

	return (
		<>
			<Head>
				<title>Favorite Items</title>
			</Head>
			<div className="max-w-[1440px] mx-auto px-14 w-full ">
				{products ? (
					products.length > 0 ? (
						<div className="grid grid-cols-4 gap-6 my-10">
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
						<p className="text-center font-bold text-4xl">
							You Favorite List is Empty
						</p>
					)
				) : (
					<p>LOADING...</p>
				)}
			</div>
		</>
	)
}

export default observer(Page)
