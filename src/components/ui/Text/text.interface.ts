export type TextSize =
	| 'heading'
	| 'subheading-large'
	| 'subheading-medium'
	| 'subheading'
	| 'body-large'
	| 'body-medium'
	| 'body-small'
	| 'body'
	| 'caption-large'
	| 'caption-medium'
	| 'caption'

type TextWeight = 'semibold' | 'bold'

type TextColor = 'accent' | 'accent-dark' | 'error' | 'rating'

export interface IText {
	size?: TextSize
	weight?: TextWeight
	color?: TextColor
	topline?: boolean
	nowrap?: boolean
	prewrap?: boolean
	className?: string
}
