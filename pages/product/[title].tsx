import { Container } from '../../UI/Container'
import { Divider } from '../../UI/Divider'
import { Quantity } from '../../UI/Quantity'
import { Axios } from '../../config/apiAxios'
import { ecommerce } from '../../services/ecommerce'
import store from '../../store/CartStore'
import s from '../../styles/title.module.scss'
import { ProductType } from '../../types/productType'
import Favorite from '@mui/icons-material/Favorite'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import { Checkbox } from '@mui/material'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { BsCheckLg } from 'react-icons/bs'
import { useQuery } from 'react-query'
import { Slide, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface PageProps {
	data: ProductType
}

interface ICart {
	productId: string
	quantity: number
}

function Page({ data: product }: PageProps) {
	const router = useRouter()
	const [images, setImages] = useState(product.variants[0].images)
	const [selectedImage, setSelectedImage] = useState(
		product.variants[0].images[0]
	)
	const [quantity, setQuantity] = useState<number>(1)
	const [isChecked, setIsChecked] = useState<boolean>(false)
	const [cart, setCart] = useState<ICart>()

	const { refetch: addToCart } = useQuery(
		'',
		async () => {
			return await Axios.post('updateCart', {
				id: store.getId,
				payload: {
					buyItem: {
						productId: product.productId,
						quantity: quantity,
					},
				},
			})
		},
		{
			enabled: false,
		}
	)

	const handleSelectImage = (image: string) => {
		setSelectedImage(image)
	}

	const notify = () =>
		toast.success(`${product.name} added to cart`, {
			position: 'top-right',
			autoClose: 5000,
			delay: 500,
			transition: Slide,
			hideProgressBar: true,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			theme: 'light',
		})

	const handleAddToCart = async () => {
		const response = await addToCart()
		if (response.data?.data.result) {
			store.isUpdating = true
			store.setUpdateCart(response.data?.data.result)
		}
		notify()
	}

	useEffect(() => {
		const favoriteItems = toJS(store.getFavoriteItem)
		const currentItem = router.query.title as string

		if (favoriteItems.includes(currentItem)) {
			setIsChecked(true)
		}
	}, [store.cartLoaded === true])

	const { control } = useForm()

	return (
		<>
			<Head>
				<title>{product.name}</title>
			</Head>
			<Container>
				<ToastContainer />
				{product && (
					<div className="grid sm:grid-cols-2 grid-cols-1 mt-3 lg:mt-12">
						<div className="sm:mr-12 sm:mb-12 mr-0">
							<div className={s.mainImage}>
								{/* <div className=" "> */}
								<Image
									src={selectedImage}
									alt={product.variants[0].brand}
									fill
									className="object-contain p-3"
								/>
								{/* </div> */}
							</div>
							<div className={s.otherImages}>
								{images &&
									images.map((item, index) => (
										<button
											key={index}
											className="border-[1px] rounded-[10px] lg:rounded-[20px] w-full p-1"
											style={
												item === selectedImage
													? { borderColor: '#1B5A7D', borderWidth: '3px' }
													: { borderColor: '#ACACAC' }
											}
											onClick={() => handleSelectImage(item)}
										>
											<div className="relative pb-[100%]">
												<Image
													src={item}
													alt="product"
													fill
													className="object-contain"
												/>
											</div>
										</button>
									))}
							</div>
						</div>

						<div className="mt-2">
							<h1 className="font-medium text-[#003F62] text-2xl md:text-3xl mb-1">
								{product.name}
							</h1>
							<h2 className="text-[#4A4A4A] font-semibold text-2xl md:text-3xl mb-4">
								${product.variants[0].price}
							</h2>

							<div className="flex mb-4">
								<p className="mr-5">Availability:</p>
								{product.variants[0].inventory.available > 0 ? (
									<div className="flex items-center">
										<BsCheckLg className="fill-[#30BD57] h-5 mr-4" />
										<p className="text-[#30BD57] text-lg font-medium">
											In stock
										</p>
									</div>
								) : (
									<p className="text-gray-400 text-lg font-medium">
										Out of stock
									</p>
								)}
							</div>

							{product.variants[0].inventory.available <= 50 && (
								<p className="text-[#5D5D5D] text-base font-normal mb-5">
									Hurry up! only {product.variants[0].inventory.available}{' '}
									product left in stock!
								</p>
							)}

							<Divider />

							<div className="flex gap-5 mb-6 items-center justify-between">
								<p className="text-[#232323] font-medium text-md md:text-xl lg:text-2xl">
									Quantity :
								</p>
								<Quantity quantity={quantity} setQuantity={setQuantity} />
							</div>

							<Divider />

							<div className="flex gap-7 mb-6 justify-between">
								<button className={s.addToCart} onClick={handleAddToCart}>
									Add to cart
								</button>

								<button className=" bg-[#EEEEEE] rounded-full flex items-center justify-center">
									<Controller
										control={control}
										name={product.productId}
										render={({ field: props }) => (
											<Checkbox
												onChange={(e: ChangeEvent<HTMLInputElement>) => {
													store.addFavoriteItem(props.name)

													setIsChecked((prev) => !prev)
												}}
												icon={<FavoriteBorder className={s.favorite} />}
												checkedIcon={<Favorite className={s.favorite} />}
												sx={{ padding: 0 }}
												checked={isChecked}
											/>
										)}
									/>
								</button>
							</div>
						</div>
					</div>
				)}
			</Container>
		</>
	)
}

export default observer(Page)

export async function getServerSideProps({ params }: { params: any }) {
	const { title } = params
	return {
		props: {
			data: await ecommerce.products.retrieveProduct(title),
		},
	}
}
