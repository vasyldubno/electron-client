import { ProductType } from '../../../types/productType'
import s from './searchInput.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface DropdownMenuProps {
	product: ProductType
	setProducts: any
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
	product,
	setProducts,
}) => {
	return (
		<>
			<Link
				href={`/product/${product.productId}`}
				target="_top"
				onClick={() => {
					setProducts([])
				}}
			>
				<div className={s.dropdownItem}>
					<div className="relative w-10 h-10">
						<Image
							src={product.variants[0].images[0]}
							alt={product.name}
							fill
							className="object-contain"
						/>
					</div>
					{product.name}
				</div>
			</Link>
		</>
	)
}
