/** @type {import('tailwindcss').Config} */

export default{
	content:['./src/**/*.{html,css,js,svelte,ts}'],
	theme:{
		colors:{
			white:'#FFFFFF',
			black:'#000000',
			neutral:{
				900:'#191919',
				800:'#333333',
				700:'#4D4D4D',
				600:'#808080',
				500:'#B3B3B3',
				400:'#E6E6E6',
				300:'#F2F2F2',
				200:'#F7F7F7',
				100:'#FCFCFC',
			},
			primary:{
				action:'#6E17C5',
				dark:'#2A074C',
				light:'#C285FF',
				lightest:'#EEDDFF',
			}
		},
		spacing:{
			0:'0rem',
			1:'.25rem',
			2:'.5rem',
			3:'.75rem',
			4:'1rem',
			5:'1.25rem',
			6:'1.5rem',
			7:'2rem',
			8:'2.25rem',
			9:'2.5rem',
			10:'2.75rem',
			11:'3.5rem',
			12:'4rem',
			13:'6rem',
			14:'7.5rem',
		},
		borderRadius:{
			1:'.25rem',
			2:'.5rem',
			3:'1rem',
			4:'1.25rem',
			5:'1.5rem',
			6:'2.25rem',
			none:'0rem'
		},
		fontSize:{
			h1:'4rem',
			h2:'3rem',
			h3:'2.25rem',
			h4:'1.625rem',
			h5:'1.375rem',
			h6:'1.125rem',
			base:'1rem',
			sm:'.75rem',
			xs:'.625rem',
		},
		fontWeight:{
			bold:'700',
			medium:'500',
			regular:'400',
			light:'300',
		},
		screens:{
			sm:'520px',
			md:'744px',
			lg:'1024px',
			xl:'1280px',
			'2xl':'1540px',
		},
		lineHeight:{
			lg:'1.0',
			md:'1.5',
			sm:'1.6',
			xs:'1.65'
		},
		boxShadow:{
			sm:'0 1px 2px 0 rgb(0 0 0 / 0.05)',
			base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
			md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
			lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
			xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
			inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
		}
	},
}