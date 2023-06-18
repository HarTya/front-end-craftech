export const formatToCurrency = (price: number) => {
	return new Intl.NumberFormat('uk-UA', {
		style: 'currency',
		currency: 'UAH',
		maximumFractionDigits: 0
	}).format(price)
}
