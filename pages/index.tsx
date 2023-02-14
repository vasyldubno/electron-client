import { HomePage } from '../components/HomePage'
import { ecommerce } from '../services/ecommerce'
import { ProductType } from '../types/productType'
import lodash from 'lodash'
import { observer } from 'mobx-react-lite'
import { NextPage } from 'next'

interface Props {
	productsList: ProductType[]
}

const Home: NextPage<Props> = ({ productsList }) => {
	return <HomePage productsList={productsList} />
}

export default observer(Home)

export const getStaticProps = async () => {
	try {
		const productsList = lodash.shuffle(await ecommerce.products.list())

		return {
			props: {
				productsList,
			},
		}
	} catch {}
}
