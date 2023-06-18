export const getReviewsPhrase = (number: number): string => {
	const lastDigit = number % 10
	const lastTwoDigits = number % 100
	let word = ''

	switch (true) {
		case lastTwoDigits >= 11 && lastTwoDigits <= 19:
			word = 'відгуків'
			break
		case lastDigit === 1:
			word = 'відгук'
			break
		case lastDigit >= 2 && lastDigit <= 4:
			word = 'відгуки'
			break
		default:
			word = 'відгуків'
			break
	}

	return `${number} ${word}`
}
