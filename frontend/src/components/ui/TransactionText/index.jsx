import { useState, useEffect } from 'react';

const TransactionText = ({ ...params }) => {
	const [dots, setDots] = useState(0); // State to track the number of active dots

	useEffect(() => {
		const interval = setInterval(() => {
			setDots((prev) => (prev === 3 ? 1 : prev + 1)); // Cycle through 1, 2, 3
		}, 500);

		return () => clearInterval(interval);
	}, []);

	// Generate a string with the active dots and spaces
	const dotString = '.'.repeat(dots).padEnd(3, ' ');

	return (
		<p style={{ whiteSpace: 'pre' }} {...params}>
			Listening For New Transactions{dotString}
		</p>
	);
};

export default TransactionText;
