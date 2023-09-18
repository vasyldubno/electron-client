import { useStore } from '../hooks/useStore'
import { ecommerce } from '../services/ecommerce'
import { CartStore } from '../store/CartStore'
import { observer } from 'mobx-react-lite'
import { FC, PropsWithChildren, useEffect } from 'react'

const updateCart = (store: CartStore) => {
	const cart_id = localStorage.getItem('cart_id')

	if (cart_id) {
		ecommerce.carts.retrieveCart(cart_id, store)
	} else {
		ecommerce.carts.createCart(store)
	}
}

export const LayoutCart: FC<PropsWithChildren> = observer(({ children }) => {
	const store = useStore()

	useEffect(() => {
		if (store) {
			updateCart(store)
		}
	}, [store])

	return <>{children}</>
})
