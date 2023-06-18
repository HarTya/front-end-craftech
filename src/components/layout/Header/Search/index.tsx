import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import Input from '@/ui/Input'
import SearchIcon from '@/ui/icons/Search/SearchIcon'

import styles from './Search.module.scss'

const Search: FC = () => {
	const { push } = useRouter()

	const [searchTerm, setSearchTerm] = useState('')

	return (
		<section className={styles.section}>
			<div
				onClick={() => {
					if (searchTerm.trim() && searchTerm.length <= 100)
						push(`/q?term=${searchTerm.trim()}`)
				}}
			>
				<SearchIcon />
			</div>
			<Input
				name='search'
				autoComplete='off'
				state={searchTerm}
				setState={setSearchTerm}
				color='accent-dark'
				placeholder='Пошук товарів'
				onKeyDown={event => {
					if (
						event.key === 'Enter' &&
						searchTerm.trim() &&
						searchTerm.length <= 100
					)
						push(`/q?term=${searchTerm.trim()}`)
				}}
			/>
		</section>
	)
}

export default Search
