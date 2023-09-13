import { CartContext } from '../context/CartContext'
import { CartStore } from '../store/CartStore'
import { FC, PropsWithChildren } from 'react'

interface UserProviderProps {
	store: CartStore
}

export const CartProvider: FC<UserProviderProps & PropsWithChildren> = ({
	store,
	children,
}) => {
	return <CartContext.Provider value={store}>{children}</CartContext.Provider>
}
