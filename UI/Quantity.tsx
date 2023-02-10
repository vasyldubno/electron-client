import { Dispatch, FC, SetStateAction, useState } from 'react'

interface QuantityProps {
	quantity: number
	setQuantity: Dispatch<SetStateAction<number>>
}

export const Quantity: FC<QuantityProps> = ({ quantity, setQuantity }) => {
	// const [quantity, setQuantity] = useState(quantityN)

	const handleQuantity = (operator: string) => {
		if (operator === '-') {
			if (quantity === 1) {
				return
			} else {
				setQuantity((prev) => prev - 1)
			}
		}
		if (operator === '+') {
			setQuantity((prev) => prev + 1)
		}
	}
	return (
		<>
			<div className="flex" style={{ width: '133px' }}>
				<button
					className="bg-[#EEEEEE] border-[#BDBDBD] border-[1px] items-center justify-center flex"
					style={{ width: '33.3%', height: '32px' }}
					onClick={() => handleQuantity('-')}
				>
					-
				</button>
				<div
					className="bg-[#EEEEEE] border-[#BDBDBD] border-[1px] items-center justify-center flex"
					style={{ width: '66.6%', height: '32px' }}
				>
					{quantity}
				</div>
				<button
					className="bg-[#EEEEEE] border-[#BDBDBD] border-[1px] items-center justify-center flex"
					style={{ width: '33.3%', height: '32px' }}
					onClick={() => handleQuantity('+')}
				>
					+
				</button>
			</div>
		</>
	)
}
