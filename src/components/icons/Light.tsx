/* istanbul ignore file */
export default function Light() {
	return (
		<svg
			viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
			className="light" strokeWidth="8" strokeLinecap="round" fill="none"
		>
			<circle cx="50" cy="50" r="20" />

			<path d="M 50 86 v 10" transform="rotate(0 50 50)" />
			<path d="M 50 86 v 10" transform="rotate(90 50 50)" />
			<path d="M 50 86 v 10" transform="rotate(180 50 50)" />
			<path d="M 50 86 v 10" transform="rotate(270 50 50)" />

			<path d="M 50 86 v 15" transform="rotate(45 50 50)" />
			<path d="M 50 86 v 15" transform="rotate(135 50 50)" />
			<path d="M 50 86 v 15" transform="rotate(225 50 50)" />
			<path d="M 50 86 v 15" transform="rotate(315 50 50)" />
		</svg>
	);
}
