import { FC, PropsWithChildren } from 'react'

import Header from './Header'
import styles from './Layout.module.scss'
import Meta from './Meta'
import { ILayout } from './layout.interface'

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, ...rest }) => {
	return (
		<>
			<Meta {...rest} />
			<Header />
			<main className={styles.main}>{children}</main>
		</>
	)
}

export default Layout
