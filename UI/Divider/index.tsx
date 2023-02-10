import s from './divider.module.scss'
import clsx from 'clsx'
import { FC } from 'react'

interface DividerProps {
	styles?: string
	last?: boolean
}

export const Divider: FC<DividerProps> = ({
	styles = 'mb-6',
	last = false,
}) => {
	return (
		<div
			className={`${s.divider} ${styles}`}
			style={{ display: last ? 'none' : 'block' }}
		></div>
	)
}
