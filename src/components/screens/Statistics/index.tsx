import { useRouter } from 'next/router'
import { FC, Fragment } from 'react'
import { TailSpin } from 'react-loader-spinner'

import Button from '@/ui/Button'
import Text from '@/ui/Text'
import ArrowIconLeft from '@/ui/icons/Arrow/ArrowIconLeft'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { StatisticsResponse } from '@/types/statistics.interface'

import { formatToCurrency } from '@/utils/format-to-currency'

import styles from './Statistics.module.scss'

const Statistics: FC<{ data: StatisticsResponse; isLoading: boolean }> = ({
	data,
	isLoading
}) => {
	const { push } = useRouter()

	return (
		<>
			<div className={styles.top}>
				<div className={styles.back} onClick={() => push(PAGES.admin)}>
					<Button rounder hover>
						<ArrowIconLeft />
					</Button>
				</div>
				<Text topline nowrap>
					Статистика
				</Text>
			</div>
			<div className={styles.main}>
				{isLoading ? (
					<TailSpin width={50} height={50} color={COLORS.accent} />
				) : data.length ? (
					data.map((statistic, index) => (
						<Fragment key={index}>
							<div className={styles.item}>
								<Text size='body-medium' color='accent' nowrap>
									{statistic.name}
								</Text>
								<Text
									className={styles.value}
									size='subheading-large'
									color='accent-dark'
									nowrap
								>
									{index === data.length - 1
										? formatToCurrency(statistic.value)
										: statistic.value}
								</Text>
							</div>
							{index !== data.length - 1 && <div className={styles.line} />}
						</Fragment>
					))
				) : (
					<Text size='subheading-medium' color='accent-dark' nowrap>
						Статистика відсутня
					</Text>
				)}
			</div>
		</>
	)
}

export default Statistics
