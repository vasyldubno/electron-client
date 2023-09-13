import { useStore } from '../../hooks/useStore'
import { ProductType } from '../../types/productType'
import s from './Product.module.scss'
import Favorite from '@mui/icons-material/Favorite'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Checkbox from '@mui/material/Checkbox'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { BsCartDash } from 'react-icons/bs'
import { FiEye } from 'react-icons/fi'

interface ProductProps {
	item: ProductType
	checking?: boolean
	filterProducts?: any
}

export const Product: FC<ProductProps> = observer(
	({ item, checking, filterProducts }) => {
		const { control } = useForm()

		const store = useStore()
		console.log(store)

		const [favoriteItem, setFavoriteItem] = useState<string[]>([])

		// useEffect(() => {}, [store])

		// const favoriteItem = toJS(store.getFavoriteItem)

		// useEffect(() => {
		// 	console.log('store change')
		// 	if (store) {
		// 		setFavoriteItem(toJS(store.getFavoriteItem))
		// 	}
		// }, [store])

		// console.log(toJS(store.getFavoriteItem))

		useEffect(() => {
			if (store.cartLoaded) {
				setFavoriteItem(toJS(store.getFavoriteItem))
			}
		}, [store.cartLoaded])

		return (
			<>
				{item?.variants[0]?.images?.length >= 1 && (
					<div className={s.wrapper}>
						<div className="absolute top-4 right-4 bg-[#B3D4E5] p-2 rounded-full z-10">
							<Controller
								control={control}
								name={item.productId}
								render={({ field: props }) => (
									<Checkbox
										onChange={() => {
											store.addFavoriteItem(props.name)
											setFavoriteItem((prev) => {
												if (prev.includes(props.name)) {
													return prev.filter((item) => item !== props.name)
												}
												return [...prev, props.name]
											})
											if (checking) {
												filterProducts(item.productId)
											}
										}}
										onClick={() =>
											console.log(
												'click on Checkbox in Product.tsx',
												favoriteItem
											)
										}
										icon={<FavoriteBorder />}
										checkedIcon={<Favorite />}
										sx={{ padding: 0, backgroundColor: 'transparent' }}
										disableRipple
										checked={
											favoriteItem && favoriteItem.includes(item.productId)
												? true
												: false
										}
									/>
								)}
							/>
						</div>

						<Link href={`/product/${item.productId}`}>
							<div className="relative h-[100px] xs:h-[170px] mb-4 xs:mb-7">
								<Image
									src={item.variants[0].images[0]}
									alt={`${item.variants[0].brand} ${item.variants[0].model}`}
									fill
									className="object-contain"
									priority
								/>
							</div>
							<p className={s.title}>
								{item.variants[0].brand} {item.variants[0].model}
							</p>
							<p className={s.price}>${item.variants[0].price.toFixed(2)}</p>
							<div className="flex gap-3">
								<div className={s.addToCart}>
									<p className="text-[#272727] font-semibold text-base mr-10">
										Add to cart
									</p>
									<div className="bg-[#EDA415] p-2 rounded-full">
										<BsCartDash className="w-4 h-4 fill-white" />
									</div>
								</div>
								<div className={s.preview}>
									<FiEye className="w-6 h-6" />
								</div>
							</div>
						</Link>
					</div>
				)}
			</>
		)
	}
)
