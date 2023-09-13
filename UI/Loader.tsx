import { FC } from 'react'
import { ColorRing } from 'react-loader-spinner'

type Props = {
	size?: string
}

export const Loader: FC<Props> = ({ size }) => (
	<ColorRing
		visible={true}
		height={size ?? '180'}
		width={size ?? '180'}
		ariaLabel="blocks-loading"
		wrapperStyle={{}}
		wrapperClass="blocks-wrapper"
		colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
	/>
)
