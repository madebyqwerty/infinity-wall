/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				upshop: {
					primary: '#134E4A',
					secondary: '#14532D',
					accent: '#164E63',
					neutral: '#1F2937',
					'base-100': '#E2E8F0',
					info: '#0C4A6E',
					success: '#10B981',
					warning: '#A16207',
					error: '#991B1B',
					'--rounded-box': '2rem', // border radius rounded-box utility class, used in card and other large boxes
					'--rounded-btn': '2rem', // border radius rounded-btn utility class, used in buttons and similar element
					'--rounded-badge': '2rem', // border radius rounded-badge utility class, used in badges and similar
					'--animation-btn': '0.25s', // duration of animation when you click on button
					'--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
					'--btn-text-case': 'uppercase', // set default text transform for buttons
					'--btn-focus-scale': '0.95', // scale transform of button when you focus on it
					'--border-btn': '1px', // border width of buttons
					'--tab-border': '1px', // border width of tabs
					'--tab-radius': '2rem' // border radius of tabs
				}
			},
			'corporate',
			{
				admin: {
					primary: '#134E4A',
					secondary: '#14532D',
					accent: '#166534',
					neutral: '#1F2937',
					'base-100': '#0F172A',
					info: '#0C4A6E',
					success: '#10B981',
					warning: '#A16207',
					error: '#991B1B',
					'--rounded-box': '0rem', // border radius rounded-box utility class, used in card and other large boxes
					'--rounded-btn': '0rem', // border radius rounded-btn utility class, used in buttons and similar element
					'--rounded-badge': 'rem', // border radius rounded-badge utility class, used in badges and similar
					'--animation-btn': '0.25s', // duration of animation when you click on button
					'--animation-input': '0.2s', // duration of animation for inputs like checkbox, toggle, radio, etc
					'--btn-text-case': 'uppercase', // set default text transform for buttons
					'--btn-focus-scale': '0.95', // scale transform of button when you focus on it
					'--border-btn': '1px', // border width of buttons
					'--tab-border': '1px', // border width of tabs
					'--tab-radius': '0rem' // border radius of tabs
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
