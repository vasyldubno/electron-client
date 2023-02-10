export interface ProductType {
	name: string
	productId: string
	category: string
	quantity?: number
	variants: {
		variantId: string
		price: number
		inventory: {
			available: number
		}
		brand: string
		model: string
		screenSize: string
		hardDiskStotage: string
		RAM: string
		cpuModel: string
		OS: string
		color: string
		connectivityTechnology: string
		formFactor: string
		images: string[]
	}[]
}
