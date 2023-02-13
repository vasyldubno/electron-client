import { Divider } from '../../UI/Divider'
import { Filter } from '../../pages/search'
import { BpCheckbox, BpCheckedIcon, BpIcon } from '../Checkbox'
import { FilterItem } from '../FilterItem'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { Checkbox } from '@mui/material'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { FC, Fragment, KeyboardEvent, MouseEvent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { RxHamburgerMenu } from 'react-icons/rx'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

interface BurgerMenuProps {
	filters: Filter[]
	filterSubmit: any
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ filters, filterSubmit }) => {
	const [checkedState, setCheckedState] = useState({})
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	const toggleDrawer = (anchor: Anchor, open: boolean) => {
		setState((prev) => ({ ...prev, [anchor]: open }))
	}

	const List = () => {
		return (
			<>
				<Box
					sx={{
						width: 300,
						paddingLeft: '10px',
						paddingTop: '10px',
					}}
				>
					{filters.map((filter, index) => {
						return (
							<>
								<div className="flex justify-between">
									<p className="text-[#003F62] font-medium text-base">
										{filter.title}
									</p>
								</div>
								<div className="flex flex-col mt-0 mb-0">
									{filter.properties.map((property, index) => (
										<div className="flex items-center" key={index}>
											<Checkbox
												name={property}
												onChange={(e) => {
													filterSubmit(e.target.name)
													setCheckedState((prev) => {
														if (
															checkedState[
																property as keyof typeof checkedState
															] === true ||
															false
														) {
															return {
																...prev,
																[`${e.target.name}`]:
																	!checkedState[
																		property as keyof typeof checkedState
																	],
															}
														}
														return { ...prev, [`${e.target.name}`]: true }
													})
													toggleDrawer('left', false)
												}}
												checked={
													checkedState[property as keyof typeof checkedState]
												}
												icon={<BpIcon />}
												checkedIcon={<BpCheckedIcon />}
												sx={{ padding: '4px' }}
											/>
											<p className="text-[#222222] text-base pl-2">
												{property}
											</p>
										</div>
									))}
								</div>
								{/* <div className="w-full h-[1px] bg-[#BDBDBD] mb-6"></div> */}
								<Divider styles="my-2" last={filters.length === index + 1} />
							</>
						)
					})}
				</Box>
			</>
		)
	}

	return (
		<div className="block sm:hidden">
			<button
				onClick={() => toggleDrawer('left', true)}
				className="absolute mt-2"
			>
				<RxHamburgerMenu className="w-10 h-10" />
			</button>
			<Drawer
				anchor={'left'}
				open={state['left']}
				onClose={() => toggleDrawer('left', false)}
			>
				<List />
			</Drawer>
		</div>
	)
}
