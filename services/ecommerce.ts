import { Axios } from '../config/apiAxios'
import store from '../store/CartStore'
import { ProductType } from '../types/productType'
import axios from 'axios'
import { QueryClient, dehydrate } from 'react-query'

const createCart = async () => {
	console.log('createCart')
	// const response = await Axios.get('createCart')
	const response = await axios.get(
		'https://electron-server.onrender.com/api/createCart'
	)
	console.log('test 2', response)
	const id: string = response.data.cart.id
	store.setUpdateCart(response.data.cart)
	localStorage.setItem('cart_id', id)
}

const retrieveCart = async (id: string) => {
	console.log('retrieveCart')
	return await Axios.post('retrieveCart', {
		id,
	}).then((response) => {
		if (response.data.cart.length === 0) {
			createCart()
		}

		if (response.data.cart[0]) {
			store.setUpdateCart(response.data.cart[0])
		}

		return response
	})
}

const updateCart = async (favoriteItem: string, id: string) => {
	const response = await Axios.post('updateCart', {
		id,
		payload: {
			favoriteItem,
		},
	})
	return response.data.result
}

const retrieveProduct = async (id: string) => {
	const fetchData = async () => {
		const response = await Axios.post('retrieveProduct', { product_id: id })
		return response.data
	}

	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['products'], fetchData)

	const result = dehydrate(queryClient).queries[0].state.data as {
		product: ProductType
	}

	return result.product
}

const getFilterProducts = async (payload: string[]) => {
	const fetchData = async () => {
		const response = await Axios.post('filterProducts', {
			payload,
		})
		return response.data
	}
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['products'], fetchData)

	const result = dehydrate(queryClient).queries[0].state.data as {
		result: ProductType[]
	}

	return result.result
}

const getListProducts = async () => {
	const fetchData = async () => {
		const response = await Axios.get('retrieveProducts')
		return response.data
	}
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['products'], fetchData)

	const result = dehydrate(queryClient).queries[0]?.state.data as {
		products: ProductType[]
	}

	return result?.products
}

const completedOrder = async () => {
	await Axios.post('updateOrder', {
		orderId: localStorage.getItem('order_id'),
	}).then((res) => localStorage.removeItem('order_id'))
}

const emptyCart = async () => {
	await Axios.post('emptyCart', {
		cartId: store.cart.id,
	})
	store.cart.buyItem = []
}

const removeItemFromCart = async (id: string) => {
	return await Axios.post('deleteProduct', {
		id: store.getId,
		product_id: id,
	})
}

class Store {
	carts
	products
	orders
	constructor() {
		this.carts = {
			createCart,
			retrieveCart,
			updateCart,
			empty: emptyCart,
			remove: removeItemFromCart,
		}
		this.products = {
			retrieveProduct,
			filterProducts: getFilterProducts,
			list: getListProducts,
		}
		this.orders = {
			completed: completedOrder,
		}
	}
}

export const ecommerce = new Store()
