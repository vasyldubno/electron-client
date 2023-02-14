import { Dispatch, FC, SetStateAction, useState } from 'react'

const list = ['Headphones', 'Laptops', 'Tablets']

interface PopularProductsProps {
	fetchCheckedCategory: any
}

export const PopularProducts: FC<PopularProductsProps> = ({
	fetchCheckedCategory,
}) => {
	const [selectedCategory, setSelectedCategory] = useState<string>('')

	return (
		<div className="flex flex-col items-center justify-between mb-14 mt-12 lg:flex-row">
			<h2 className="font-semibold xs:text-3xl text-2xl text-[#1B5A7D] mb-6 lg:mb-0">
				Popular products
			</h2>
			<div className="grid sm:grid-cols-3 gap-3 grid-cols-1">
				{list.map((item, index) => (
					<button
						className="rounded-[20px] border-[#B5B5B5] hover:border-[#1B5A7D]  px-9 py-3 flex justify-center cursor-pointer"
						key={index}
						onClick={() => {
							fetchCheckedCategory([item.slice(0, -1)])

							setSelectedCategory(item)
						}}
						style={{
							borderWidth: selectedCategory === item ? '1px' : '1px',
							borderColor: selectedCategory === item ? '#1B5A7D' : '#B5B5B5',
						}}
					>
						<p className="font-medium text-base text-[#1B5A7D] inline">
							{item}
						</p>
					</button>
				))}
			</div>
		</div>
	)
}
