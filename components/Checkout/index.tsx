import { Container } from '../../UI/Container'
import { ShippingForm } from './ShippingForm'
import { observer } from 'mobx-react-lite'

export const Checkout = observer(() => {
	return (
		<Container>
			<div className="mx-auto my-0 max-w-[500px]">
				<ShippingForm />
			</div>
		</Container>
	)
})
