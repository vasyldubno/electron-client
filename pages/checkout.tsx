import { observer } from 'mobx-react-lite'
import { Checkout } from '../components/Checkout'

function Page() {
	return <Checkout />
}

export default observer(Page)
