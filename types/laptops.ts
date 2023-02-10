export interface ProviderMetadata {
	public_id: string
	resource_type: string
}

export interface Thumbnail {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata
}

export interface ProviderMetadata2 {
	public_id: string
	resource_type: string
}

export interface Small {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata2
}

export interface ProviderMetadata3 {
	public_id: string
	resource_type: string
}

export interface Large {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata3
}

export interface ProviderMetadata4 {
	public_id: string
	resource_type: string
}

export interface Medium {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata4
}

export interface Formats {
	thumbnail: Thumbnail
	small: Small
	large: Large
	medium: Medium
}

export interface ProviderMetadata5 {
	public_id: string
	resource_type: string
}

export interface Attributes2 {
	name: string
	alternativeText?: any
	caption?: any
	width: number
	height: number
	formats: Formats
	hash: string
	ext: string
	mime: string
	size: number
	url: string
	previewUrl?: any
	provider: string
	provider_metadata: ProviderMetadata5
	createdAt: Date
	updatedAt: Date
}

export interface Data {
	id: number
	attributes: Attributes2
}

export interface ImageMain {
	data: Data
}

export interface ProviderMetadata6 {
	public_id: string
	resource_type: string
}

export interface Thumbnail2 {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata6
}

export interface ProviderMetadata7 {
	public_id: string
	resource_type: string
}

export interface Small2 {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata7
}

export interface ProviderMetadata8 {
	public_id: string
	resource_type: string
}

export interface Large2 {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata8
}

export interface ProviderMetadata9 {
	public_id: string
	resource_type: string
}

export interface Medium2 {
	name: string
	hash: string
	ext: string
	mime: string
	path?: any
	width: number
	height: number
	size: number
	url: string
	provider_metadata: ProviderMetadata9
}

export interface Formats2 {
	thumbnail: Thumbnail2
	small: Small2
	large: Large2
	medium: Medium2
}

export interface ProviderMetadata10 {
	public_id: string
	resource_type: string
}

export interface Attributes3 {
	name: string
	alternativeText?: any
	caption?: any
	width: number
	height: number
	formats: Formats2
	hash: string
	ext: string
	mime: string
	size: number
	url: string
	previewUrl?: any
	provider: string
	provider_metadata: ProviderMetadata10
	createdAt: Date
	updatedAt: Date
}

export interface Datum {
	id: number
	attributes: Attributes3
}

export interface ImagesOther {
	data: Datum[]
}

export interface Attributes {
	title: string
	price: number
	availability: string
	leftInStock: number
	popular: boolean
	createdAt: Date
	updatedAt: Date
	screenSize: number
	cpuModel: string
	hardDiskSize: string
	ram: string
	os: string
	description: string
	model: string
	brand: string
	imageMain: ImageMain
	imagesOther: ImagesOther
}

export interface Laptop {
	id: number
	attributes: Attributes
}
