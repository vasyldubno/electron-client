import { useStore } from '../hooks/useStore'
import { observer } from 'mobx-react-lite'

export const Favorite = observer(() => {
	const store = useStore()

	const favor = store.getFavoriteItem

	return <>{favor && favor.map((item) => <p>{item}</p>)}</>
})
