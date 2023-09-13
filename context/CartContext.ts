import { CartStore } from '../store/CartStore'
import { createContext } from 'react'

export const CartContext = createContext<CartStore>(new CartStore())
