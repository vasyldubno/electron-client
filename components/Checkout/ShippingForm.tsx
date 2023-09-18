import { Axios } from '../../config/apiAxios'
import { listCountries } from '../../data/listCountries'
import { useStore } from '../../hooks/useStore'
import { ecommerce } from '../../services/ecommerce'
import { ProductType } from '../../types/productType'
import s from './checkout.module.scss'
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material'
import axios from 'axios'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { FC, createRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

interface State {
	name: string
	state_code: string
}

export const ShippingForm: FC = observer(() => {
	const store = useStore()

	const selectRef = createRef<HTMLDivElement>()
	const [selectedCountry, setSelectedCountry] = useState<string>('')
	const [states, setStates] = useState<State[]>()
	const [selectedState, setSelectedState] = useState<string>('')
	const [cities, setCities] = useState<string[]>()
	const [products, setProducts] = useState<ProductType[]>([])
	const [subTotal, setSubTotal] = useState<number>(0)
	const [phoneValue, setPhoneValue] = useState('')

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onSubmit',
	})
	const router = useRouter()

	const handleForm = async (data: any) => {
		const response = await Axios.post<{ url: string; orderId: string }>(
			'checkout',
			{
				customerData: data,
				products,
				total: subTotal,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		if (response) {
			router.push(response.data.url)
			localStorage.setItem('order_id', response.data.orderId)
		}
	}

	const fieldsInput: { name: string; label: string }[] = [
		{ name: 'firstName', label: 'First Name' },
		{ name: 'lastName', label: 'Last Name' },
	]

	useQuery(
		['states', selectedCountry],
		() => {
			axios
				.post('https://countriesnow.space/api/v0.1/countries/states', {
					country: selectedCountry,
				})
				.then((res) => setStates(res.data.data.states))
		},
		{
			enabled: !!selectedCountry,
		}
	)

	useQuery(
		['cities', selectedState],
		() => {
			axios
				.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
					country: selectedCountry,
					state: selectedState,
				})
				.then((res) => setCities(res.data.data))
		},
		{ enabled: !!selectedState }
	)

	useQuery(
		'',
		() => {
			toJS(store.cart.buyItem).forEach(async (item) => {
				const product = await ecommerce.products.retrieveProduct(item.productId)
				product.quantity = item.quantity
				setProducts((prev) => [...prev, product])
				setSubTotal(
					(prev) =>
						prev + Number(product.quantity) * Number(product.variants[0].price)
				)
			})
		},
		{ enabled: store.cartLoaded }
	)

	return (
		<form onSubmit={handleSubmit(handleForm)} className="flex flex-col my-5">
			{fieldsInput.map((field, index) => (
				<>
					{errors[field.name] && (
						<p className="text-red-700">Invalid your{field.label}</p>
					)}
					<Controller
						key={index}
						control={control}
						name={field.name}
						rules={{ required: true, minLength: 2 }}
						render={(fields) => {
							return (
								<TextField
									label={field.label}
									variant="outlined"
									onChange={fields.field.onChange}
									className={s.text_field}
								/>
							)
						}}
					/>
				</>
			))}

			{errors.email && <p className="text-red-700">Invalid email</p>}
			<Controller
				control={control}
				name="email"
				rules={{
					pattern: new RegExp(
						/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]+$/gm
					),
					required: 'email invalid',
				}}
				render={(fields) => {
					return (
						<TextField
							label="Email"
							variant="outlined"
							onChange={fields.field.onChange}
							className={s.text_field}
						/>
					)
				}}
			/>

			{errors.phone && <p className="text-red-700">Invalid phone number</p>}
			<Controller
				name="phone"
				control={control}
				rules={{
					required: 'phone invalid',
					validate: (value) =>
						isValidPhoneNumber(value) || 'Invalid phone number',
				}}
				render={(props) => (
					<TextField
						label="Phone"
						variant="outlined"
						value={phoneValue}
						onChange={(e) => {
							props.field.onChange(e.target.value)
							setPhoneValue(e.target.value)
						}}
						className={s.text_field}
						onClick={() => setPhoneValue('+')}
					/>
				)}
			/>

			{errors.country && <p className="text-red-700">Choose you country</p>}
			<Controller
				control={control}
				name="country"
				rules={{ required: true }}
				render={(props) => {
					return (
						<FormControl variant="outlined" className={s.text_field}>
							<InputLabel>Country</InputLabel>
							<Select
								variant="outlined"
								label="country"
								onChange={(e) => {
									props.field.onChange(e.target.value)
									setSelectedCountry(e.target.value as string)
								}}
								ref={selectRef}
								defaultValue=""
							>
								{Object.entries(listCountries).map((country, index) => (
									<MenuItem key={index} value={country[1]}>
										{country[1]}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)
				}}
			/>

			{errors.state && <p className="text-red-700">Choose you state</p>}
			<Controller
				control={control}
				name={'state'}
				rules={{ required: true }}
				render={(props) => {
					return (
						<FormControl variant="outlined" className={s.text_field}>
							<InputLabel>State</InputLabel>
							<Select
								variant="outlined"
								label="state"
								onChange={(e) => {
									props.field.onChange(e.target.value)
									setSelectedState(e.target.value)
								}}
								ref={selectRef}
								defaultValue=""
							>
								{states !== undefined && states?.length > 0 ? (
									states.map((state, index) => (
										<MenuItem key={index} value={state.name}>
											{state.name}
										</MenuItem>
									))
								) : (
									<p>Not states in {selectedCountry}</p>
								)}
							</Select>
						</FormControl>
					)
				}}
			/>

			{errors.city && <p className="text-red-700">Choose you city</p>}
			<Controller
				control={control}
				name={'city'}
				rules={{ required: true }}
				render={(props) => {
					return (
						<FormControl variant="outlined" className={s.text_field}>
							<InputLabel>City</InputLabel>
							<Select
								variant="outlined"
								label="city"
								onChange={(e) => {
									props.field.onChange(e.target.value)
								}}
								ref={selectRef}
								defaultValue=""
							>
								{cities !== undefined && cities?.length > 0 ? (
									cities.map((city, index) => (
										<MenuItem key={index} value={city}>
											{city}
										</MenuItem>
									))
								) : (
									<p>Not states in {selectedCountry}</p>
								)}
							</Select>
						</FormControl>
					)
				}}
			/>
			{errors.address && <p className="text-red-700">Enter your address</p>}
			<Controller
				name="address"
				control={control}
				rules={{
					required: true,
					minLength: 5,
				}}
				render={(props) => (
					<TextField
						label="Address"
						variant="outlined"
						onChange={(e) => {
							props.field.onChange(e.target.value)
						}}
						className={s.text_field}
					/>
				)}
			/>
			<button
				type="submit"
				className="bg-[#EDA415] text-white rounded-lg font-medium py-5"
			>
				PAY ${subTotal}
			</button>
		</form>
	)
})
