import { loadStripe, Stripe } from '@stripe/stripe-js'

export async function checkout() {
	let stripePromise: Promise<Stripe | null>

	const getStripe = () => {
		if (!stripePromise) {
			stripePromise = loadStripe(
				process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
			)
		}
		return stripePromise
	}

	const stripe = await getStripe()

	await stripe?.redirectToCheckout({
		mode: 'payment',
		successUrl: 'http',
		cancelUrl: 'http',
	})
}
