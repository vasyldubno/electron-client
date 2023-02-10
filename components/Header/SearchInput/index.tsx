import { Axios } from '../../../config/apiAxios'
import { ProductType } from '../../../types/productType'
import { DropdownMenu } from './DropdownMenu'
import s from './searchInput.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export const SearchInput = () => {
	const [search, setSearch] = useState<string>('')
	const [products, setProducts] = useState<ProductType[]>([])

	const router = useRouter()

	useQuery(
		['products', search],
		async () => {
			const products = await Axios.post('/searchProducts', {
				payload: search,
			})
			return products.data.result
		},
		{
			enabled: !!(search.length >= 3),
			onSuccess(data) {
				setProducts(data)
			},
		}
	)

	useEffect(() => {
		setProducts([])
	}, [search.length < 3])

	const handleClick = () => {
		setProducts([])
		if (search.length >= 3) {
			router.query.q = search
			router.pathname = '/search'
			router.push(router)
		}
	}

	return (
		<div className="relative flex items-center order-1 lg:order-none pt-5 lg:pt-0 w-full lg:w-[27rem]">
			<div className="flex-grow relative rounded-3xl overflow-hidden">
				<input
					className="pl-6 py-4 w-full placeholder:text-[#292D32] outline-none"
					placeholder="Search any things"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button className={s.button} onClick={handleClick}>
					Search
				</button>
			</div>
			<div className="absolute left-0 top-16 z-50 flex flex-col gap-1">
				{products &&
					products.map((product: ProductType) => (
						<DropdownMenu
							product={product}
							setProducts={setProducts}
							key={product.productId}
						/>
					))}
			</div>
		</div>
	)
}
