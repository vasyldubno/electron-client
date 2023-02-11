import { Checkout } from '../components/Checkout'
import { observer } from 'mobx-react-lite'

function Page() {
	return <Checkout />
}

export default observer(Page)
