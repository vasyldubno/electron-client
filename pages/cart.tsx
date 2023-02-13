import { Container } from '../UI/Container'
import { Loader } from '../UI/Loader'
import { CartItem } from '../components/CartItem'
import { CartTotal } from '../components/CartTotal'
import { ecommerce } from '../services/ecommerce'
import store from '../store/CartStore'
import { ProductType } from '../types/productType'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const Page = () => {
	const [products, setProducts] = useState<ProductType[]>([])
	const [totalSubtotal, setTotalSubotal] = useState<number>(0)
	const [isUpdatedCart, setIsUpdatedCart] = useState<boolean>(false)

	const filterProducts = (productId: string) => {
		setProducts((prev) => {
			return prev.filter((item) => item.productId !== productId)
		})
	}

	const { refetch: fetchProducts, isLoading } = useQuery(
		'',
		() => {
			setProducts([])
			toJS(store.cart.buyItem).forEach(async (item) => {
				const product = await ecommerce.products.retrieveProduct(item.productId)
				product.quantity = item.quantity
				setProducts((prev) => [...prev, product])
			})
		},
		{ enabled: false }
	)

	if (isUpdatedCart) {
		setTotalSubotal(0)
		toJS(store.cart.buyItem).forEach(async (item) => {
			const product = await ecommerce.products.retrieveProduct(item.productId)
			product.quantity = item.quantity
			setTotalSubotal(
				(prev) =>
					prev + (product.quantity as number) * product.variants[0].price
			)
		})
		setIsUpdatedCart(false)
	}

	useEffect(() => {
		fetchProducts()
	}, [store.isUpdating || store.cartLoaded])

	return (
		<Container styles="md:px-5">
			<Head>
				<title>Cart</title>
			</Head>
			{isLoading ? (
				<Loader />
			) : products.length > 0 ? (
				<div className="flex flex-col lg:flex-row mt-8 mb-8 items-center lg:items-start">
					<div className="block mr-5 w-full">
						{products &&
							products.map((product, index) => (
								<CartItem
									product={product}
									key={index}
									setIsUpdatedCart={setIsUpdatedCart}
									fetchProducts={fetchProducts}
									filterProducts={filterProducts}
									last={++index === products.length ? true : false}
								/>
							))}
					</div>
					<CartTotal totalSubtotal={totalSubtotal} />
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						margin: '20px 0px',
					}}
				>
					<div className="max-h-[200px] max-w-[200px] h-full w-full">
						<svg
							fill="#000000"
							version="1.1"
							id="Capa_1"
							viewBox="0 0 231.523 231.523"
						>
							<g>
								<path d="M107.415,145.798c0.399,3.858,3.656,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231   l-3.459-33.468c-0.426-4.12-4.113-7.111-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L107.415,145.798z" />
								<path d="M154.351,152.488c0.262,0.027,0.522,0.04,0.78,0.04c3.796,0,7.052-2.872,7.451-6.73l3.458-33.468   c0.426-4.121-2.569-7.806-6.689-8.231c-4.123-0.421-7.806,2.57-8.232,6.689l-3.458,33.468   C147.235,148.377,150.23,152.062,154.351,152.488z" />
								<path d="M96.278,185.088c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221   c12.801,0,23.216-10.417,23.216-23.221C119.494,195.502,109.079,185.088,96.278,185.088z M96.278,216.523   c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215   C104.494,212.835,100.808,216.523,96.278,216.523z" />
								<path d="M173.719,185.088c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.414,23.221,23.216,23.221   c12.802,0,23.218-10.417,23.218-23.221C196.937,195.502,186.521,185.088,173.719,185.088z M173.719,216.523   c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215   C181.937,212.835,178.251,216.523,173.719,216.523z" />
								<path d="M218.58,79.08c-1.42-1.837-3.611-2.913-5.933-2.913H63.152l-6.278-24.141c-0.86-3.305-3.844-5.612-7.259-5.612H18.876   c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.94l6.227,23.946c0.031,0.134,0.066,0.267,0.104,0.398l23.157,89.046   c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.21-89.25C220.49,83.309,220,80.918,218.58,79.08z    M183.638,165.418H86.362l-19.309-74.25h135.895L183.638,165.418z" />
								<path d="M105.556,52.851c1.464,1.463,3.383,2.195,5.302,2.195c1.92,0,3.84-0.733,5.305-2.198c2.928-2.93,2.927-7.679-0.003-10.607   L92.573,18.665c-2.93-2.928-7.678-2.927-10.607,0.002c-2.928,2.93-2.927,7.679,0.002,10.607L105.556,52.851z" />
								<path d="M159.174,55.045c1.92,0,3.841-0.733,5.306-2.199l23.552-23.573c2.928-2.93,2.925-7.679-0.005-10.606   c-2.93-2.928-7.679-2.925-10.606,0.005l-23.552,23.573c-2.928,2.93-2.925,7.679,0.005,10.607   C155.338,54.314,157.256,55.045,159.174,55.045z" />
								<path d="M135.006,48.311c0.001,0,0.001,0,0.002,0c4.141,0,7.499-3.357,7.5-7.498l0.008-33.311c0.001-4.142-3.356-7.501-7.498-7.502   c-0.001,0-0.001,0-0.001,0c-4.142,0-7.5,3.357-7.501,7.498l-0.008,33.311C127.507,44.951,130.864,48.31,135.006,48.311z" />
							</g>
						</svg>
					</div>
					<p className="font-bold text-4xl my-5 text-center">
						Your Cart is Empty
					</p>
				</div>
			)}
		</Container>
	)
}

export default observer(Page)
