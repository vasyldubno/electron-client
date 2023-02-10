import { ecommerce } from '../services/ecommerce'
import { BpCheckbox } from './Checkbox'
import { Dispatch, FC, SetStateAction } from 'react'
import {
	Control,
	Controller,
	FieldValues,
	useController,
	useForm,
} from 'react-hook-form'

interface IFilterItem {
	item: {
		title: string
		properties: string[]
	}
	filterSubmit: any
	toggleDrawer?: any
}

export const FilterItem: FC<IFilterItem> = ({
	item,
	filterSubmit,
	toggleDrawer,
}) => {
	const { control } = useForm()
	return (
		<>
			<div className="flex justify-between">
				<p className="text-[#003F62] font-medium text-base">{item.title}</p>
			</div>
			<div className="flex flex-col gap-3 mt-3 mb-6">
				{item.properties.map((property, index) => (
					<div className="flex items-center" key={index}>
						<Controller
							control={control}
							name={property}
							render={({ field: props }) => {
								return (
									<BpCheckbox
										onChange={(e) => {
											filterSubmit(props.name)
											// toggleDrawer('left', false)
										}}
									/>
								)
							}}
						/>
						<p className="text-[#222222] text-base pl-2">{property}</p>
					</div>
				))}
			</div>
			<div className="w-full h-[1px] bg-[#BDBDBD] mb-6"></div>
		</>
	)
}
