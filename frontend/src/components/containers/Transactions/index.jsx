import React from 'react';
import './style.scss';
import TransactionBox from '../../ui/TransactionBox';
import TransactionText from '../../ui/TransactionText';
import { Toaster } from 'react-hot-toast';
import AnimatedComponent from '../../ui/Animated/Component';
import { iphoneAnimation } from '../../../utility/framer-transitions';
import TransactionBoxSkeleton from '../../ui/TransactionBox/Skeleton';
import PaginatedList from '../../ui/PaginationList';
import { HiDocumentText } from 'react-icons/hi';

export default function LatestTransactions({
	latestTransactions,
	noHeader = false,
	loading = false,
	pagination = false,
	skeletonCount = 3,
}) {
	return (
		<AnimatedComponent
			animation={iphoneAnimation(1)}
			className="transactions-container"
		>
			<Toaster />

			{noHeader == false && (
				<div className="transactions-header">
					<HiDocumentText className="logo" />
					<h3>Latest Operations</h3>
				</div>
			)}

			<section className="items-container">
				{pagination == true && (
					<PaginatedList itemsPerPage={8}>
						{latestTransactions.length !== 0 &&
							loading == false &&
							[...latestTransactions]
								.sort((a, b) => b.timestamp - a.timestamp)
								.map((item, index) => {
									return (
										<TransactionBox
											key={index}
											data={item}
										/>
									);
								})}
					</PaginatedList>
				)}
				{pagination == false && (
					<>
						{latestTransactions.length !== 0 &&
							loading == false &&
							[...latestTransactions]
								.sort((a, b) => b.timestamp - a.timestamp)
								.map((item, index) => {
									return (
										<TransactionBox
											key={index}
											data={item}
										/>
									);
								})}
					</>
				)}

				{(loading || latestTransactions.length === 0) &&
					[...Array(skeletonCount)].map((_, index) => (
						<TransactionBoxSkeleton key={index} />
					))}
			</section>
		</AnimatedComponent>
	);
}
