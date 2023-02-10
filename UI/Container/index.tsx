import s from './container.module.scss'
import { FC, PropsWithChildren } from 'react'

interface ContainerProps {
	styles?: string
}

export const Container: FC<PropsWithChildren & ContainerProps> = ({
	children,
	styles,
}) => {
	return <div className={`${s.wrapper} ${styles}`}>{children}</div>
}
