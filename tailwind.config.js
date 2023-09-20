/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		`./src/pages/**/*.{js,jsx,ts,tsx}`,
		`./src/components/**/*.{js,jsx,ts,tsx}`,
	],
	theme: {
		colors: {
			"grey-1": "var(--color-grey-1)",
			"grey-2": "var(--color-grey-2)",
			"grey-3": "var(--color-grey-3)",
		},
		extend: {},
	},
	plugins: [],
};
