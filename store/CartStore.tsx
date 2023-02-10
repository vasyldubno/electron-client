import { ecommerce } from '../services/ecommerce'
import { CarCrash } from '@mui/icons-material'
import { makeAutoObservable } from 'mobx'

interface Cart {
	id: string
	favoriteItem: string[]
	buyItem: {
		productId: string
		quantity: number
	}[]
}

class CartStore {
	cart: Cart
	isUpdating: boolean
	cartLoaded: boolean

	constructor() {
		this.cartLoaded = false
		this.cart = {
			id: '',
			favoriteItem: [],
			buyItem: [],
		}
		this.isUpdating = false
		makeAutoObservable(this)
	}

	get getId() {
		return this.cart.id
	}

	get getFavoriteItem() {
		return this.cart.favoriteItem
	}

	get getCart() {
		return this.cart
	}

	setUpdateCart(payload: any) {
		this.cart = payload
		this.cartLoaded = true
	}

	async addFavoriteItem(payload: string) {
		const response = await ecommerce.carts.updateCart(payload, this.cart.id)
		this.setUpdateCart(response)
	}
}

export { CartStore }
export default new CartStore()
export const store = new CartStore()
