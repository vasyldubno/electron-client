import { CartContext } from '../context/CartContext'
import { useContext } from 'react'

export const useStore = () => {
	return useContext(CartContext)
}
