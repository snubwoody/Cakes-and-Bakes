<script lang="ts">
	export let size:  'xs' | 'sm' |'base' | 'h6' | 'h5' | 'h4' | 'h3' | 'h2' | 'h1' = 'base' ;
	export let weight:  'light' | 'regular' |'medium' | 'bold' = 'regular' ;

	const fontSize = {
		h1:'text-h1',
		h2:'text-h2',
		h3:'text-h3',
		h6:'text-h6',
		h4:'text-h4',
		h5:'text-h5',
		base:'text-base',
		sm:'text-sm',
		xs:'text-xs',
	}

	const fontWeight = {
		light:'font-light',
		regular:'font-regular',
		medium:'font-medium',
		bold:'font-bold',
	}

	const lineHeight = {
		h1:'leading-lg',
		h2:'leading-lg',
		h3:'leading-lg',
		h6:'leading-lg',
		h4:'leading-lg',
		h5:'leading-md',
		base:'leading-md',
		sm:'leading-sm',
		xs:'leading-xs',
	}

	
</script>

<p class={`${fontWeight[weight]} ${fontSize[size]} ${lineHeight[size]}`} {...$$restProps}>
	<slot/>
</p>

