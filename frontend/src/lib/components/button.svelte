<script lang="ts">
    import { goto } from "$app/navigation";
	import type { HTMLButtonAttributes } from 'svelte/elements'

	/* export let style: 'primary' | 'neutral' | 'bordered' = 'primary';
	export let fit:boolean = false;
	export let onClick:VoidFunction = ()=>{};
	export let href:string = "" */
	interface Props extends HTMLButtonAttributes {
		//TODO these are deprecated
		onClick?:VoidFunction, 
		href?:string, 
		fit?:boolean,
		style?: 'primary' | 'neutral' | 'bordered',
	}
	
	let {
		onClick,
		href,
		fit = false,
		style = 'primary',
		...others
	}:Props = $props()

	const buttonStyle = {
		primary:'bg-primary-action hover:shadow-lg text-neutral-100',
		bordered:'border border-neutral-400 hover:bg-neutral-200 text-neutral-900',
		neutral:'bg-neutral-900 text-neutral-100 hover:bg-neutral-800'
	}
 
	const buttonSize = fit ? 'w-fit' : 'w-full'
	
</script>

<!--FIXME the goto might cause problems-->
<button 
	
	class={`flex items-center justify-center gap-2 px-8 py-4 rounded-6 ${buttonSize} ${buttonStyle[style]}`} 
	{...others}>
	<slot/>
</button>

<style lang="postcss">
	.button{
		display: flex;
	}
</style>