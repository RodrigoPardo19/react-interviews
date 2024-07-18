export interface PaginatedProducs {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
}

export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand?: string;
	sku: string;
	weight: number;
	dimensions: Dimensions;
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: AvailabilityStatus;
	reviews: Review[];
	returnPolicy: ReturnPolicy;
	minimumOrderQuantity: number;
	meta: Meta;
	images: string[];
	thumbnail: string;
}

export enum AvailabilityStatus {
	InStock = 'In Stock',
	LowStock = 'Low Stock',
}

export interface Dimensions {
	width: number;
	height: number;
	depth: number;
}

export interface Meta {
	createdAt: Date;
	updatedAt: Date;
	barcode: string;
	qrCode: string;
}

export enum ReturnPolicy {
	NoReturnPolicy = 'No return policy',
	The30DaysReturnPolicy = '30 days return policy',
	The60DaysReturnPolicy = '60 days return policy',
	The7DaysReturnPolicy = '7 days return policy',
	The90DaysReturnPolicy = '90 days return policy',
}

export interface Review {
	rating: number;
	comment: string;
	date: Date;
	reviewerName: string;
	reviewerEmail: string;
}

export interface FiltersConfig {
	category: string;
	pricing: { min: number; max: number };
}

export interface CartItem {
	count: number;
	product: Product;
}

export const INITIAL_CATEGORY = 'todos';
