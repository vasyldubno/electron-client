import { observer } from 'mobx-react-lite'
import store from '../store/CartStore'

export const Favorite = observer(() => {
	const favor = store.getFavoriteItem
	return <>{favor && favor.map((item) => <p>{item}</p>)}</>
})
