/* istanbul ignore file */
export default function System() {
	return (
		<svg
			viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
			className="system" strokeWidth="8" strokeLinecap="round" fill="none"
		>
			<circle cx="50" cy="50" r="46" />

			<path
				strokeWidth="0" fill="currentColor" d="
					M 50,0
						a 50,50,0,1,1,0,100
					Z"
			/>
		</svg>
	);
}
