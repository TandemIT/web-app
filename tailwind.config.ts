import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Poppins", sans-serif', ...defaultTheme.fontFamily.sans],
				grotesk: ['"Space Grotesk Variable", sans-serif']
			},
			colors: {
				secondary: {
					50: '#FFFFFF',
					100: '#D8E4E5',
					200: '#B9CBCC',
					300: '#7C9EA0',
					400: '#5B8D93',
					500: '#336F76',
					600: '#1A545A',
					700: '#004147',
					800: '#002124',
					900: '#000000'
				},
				primary: {
					50: '#E8FFF4',
					100: '#B9FFDF',
					200: '#62F4B1',
					300: '#2CED94', // Main color
					400: '#1DCE7C',
					500: '#13A260'
				}
			}
		}
	}
};
