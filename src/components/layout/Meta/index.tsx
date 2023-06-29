import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { descriptionMerge, siteName, titleMerge } from './meta.config'
import { ISeo } from './meta.interface'

const Meta: FC<PropsWithChildren<ISeo>> = ({ title, description, image }) => {
	const { asPath } = useRouter()
	const currentUrl = `${process.env.APP_URL}${asPath}`

	return (
		<Head>
			<title itemProp='headline'>{titleMerge(title)}</title>
			{description ? (
				<>
					<meta
						name='keywords'
						content='craftech, CRAFTECH, craftech.com.ua, craftech com ua, Військовий одяг, Військове спорядження, Військовий одяг, Купити військовий одяг, Військовий камуфляж, Продаж військового одягу, Військовий магазин CRAFTECH, Купити уніформу, Військові аксесуари, Військові товари'
					/>
					<meta
						itemProp='description'
						name='description'
						content={descriptionMerge(description)}
					/>
					<link rel='canonical' href={currentUrl} />
					<meta property='og:locale' content='uk' />
					<meta property='og:title' content={titleMerge(title)} />
					<meta property='og:url' content={currentUrl} />
					<meta property='og:image' content={image || '/images/logo.png'} />
					<meta property='og:site_name' content={siteName} />
					<meta
						property='og:description'
						content={descriptionMerge(description)}
					/>
				</>
			) : (
				<meta name='robots' content='noindex, nofollow' />
			)}
		</Head>
	)
}

export default Meta
