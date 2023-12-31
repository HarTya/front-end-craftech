import Image from 'next/legacy/image'
import { FC } from 'react'
import { Link as ScrollLink } from 'react-scroll'

import Layout from '@/layout/Layout'

import Button from '@/ui/Button'
import Text from '@/ui/Text'
import CatalogPagination from '@/ui/catalog/CatalogPagination'

import { VARS } from '@/config/variables.config'

import { useViewportWidth } from '@/hooks/useViewportWidth'

import { IProductsPagination } from '@/types/product.interface'

import styles from './Home.module.scss'

const Home: FC<IProductsPagination> = ({ products, length }) => {
	const { viewportWidth } = useViewportWidth()

	return (
		<Layout title='Головна' description='Головна сторінка'>
			<section>
				<div className={styles.hello}>
					<div className={styles.image}>
						<Image
							src='/images/hello.jpeg'
							alt='Hello'
							layout='fill'
							objectFit='cover'
							quality={100}
							placeholder='blur'
							blurDataURL={'/images/hello.jpeg'}
						/>
					</div>
					<div className={styles.content}>
						<Text topline nowrap>
							Сила в кожному кроці,
						</Text>
						<Text nowrap>разом з CRAFTECH!</Text>
						<Text size='subheading' color='accent'>
							З 2014 року ми прагнули до досконалості, щоб запропонувати нашим
							клієнтам надійний та комфортний одяг за привабливою ціною.
						</Text>
						<ScrollLink
							to='shop'
							offset={
								viewportWidth <= 575
									? -VARS.headerHeightMobile
									: -VARS.headerHeight
							}
							spy={true}
							smooth={true}
							duration={500}
							className={styles.link}
						>
							<Button className={styles.button} size='large' hover>
								В магазин
							</Button>
						</ScrollLink>
					</div>
				</div>
				<div id='shop'>
					<CatalogPagination title='Магазин' data={{ products, length }} />
				</div>
			</section>
		</Layout>
	)
}

export default Home
