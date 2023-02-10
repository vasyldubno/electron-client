import { ecommerce } from '../services/ecommerce'
import store from '../store/CartStore'
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

const updateCart = () => {
	const cart_id = localStorage.getItem('cart_id')
	if (cart_id) {
		ecommerce.carts.retrieveCart(cart_id)
	} else {
		ecommerce.carts.createCart()
	}
}

export const LayoutCart: FC<PropsWithChildren> = observer(({ children }) => {
	useEffect(() => {
		updateCart()
	}, [])

	return <>{children}</>
})
