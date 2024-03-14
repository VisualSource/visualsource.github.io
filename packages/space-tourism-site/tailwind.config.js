/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			barlow: ['Barlow', 'serif'],
			'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
			bellerfair: ['Bellefair', 'serif'],
			sans: ['Barlow Condensed', 'sans-serif'],
			serif: ['Bellefair', 'serif']
		},
		extend: {
			scale: {
				200: {
					'--tw-scale-y': '2',
					'--tw-scale-x': '2',
					transform:
						'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))'
				}
			},
			colors: {
				'navy-blue': 'hsl(230,35,7)',
				'light-purple': 'hsl(231,77,90)'
			},
			letterSpacing: {
				2.7: '0.16875rem',
				'3-38': '0.21125rem',
				'4-72': '0.295rem',
				none: '0'
			},
			lineHeight: {
				25: '1.5625rem',
				28: '1.75rem',
				32: '2rem',
				100: '6.25rem',
				150: '9.375rem'
			},
			fontSize: {
				'h-14': '0.875rem',
				'h-15': '0.9375rem',
				'h-16': '1rem',
				'h-18': '1.125rem',
				'h-20': '1.25rem',
				'h-24': '1.5rem',
				'h-28': '1.75rem',
				'h-32': '2rem',
				'h-40': '2.5rem',
				'h-56': '3.5rem',
				'h-80': '5rem',
				'h-100': '6.25rem',
				'h-150': '9.375rem',

				h1: [
					'9.375rem',
					{
						letterSpacing: '0rem'
					}
				],
				'h1-mobile': ['5rem', { lineHeight: '100px', letterSpacing: '0rem' }],
				h2: [
					'6.25rem',
					{
						letterSpacing: '0rem'
					}
				],
				h3: ['3.5rem', { letterSpacing: 0 }],
				h4: [
					'2rem',
					{
						letterSpacing: '0rem'
					}
				],
				'h4-mobile': ['1.25rem', { letterSpacing: '1.25px' }],
				h5: ['1.75rem', { letterSpacing: '1.667rem' }],
				nav: ['1rem', { letterSpacing: '0.169rem', lineHeight: '1.188rem' }],
				sub1: ['1.75rem', { letterSpacing: '0rem' }],
				sub2: ['0.875rem', { letterSpacing: '0.146875rem' }],
				body: '1.125rem',
				'body-mobile': ['0.9375rem']
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
};
