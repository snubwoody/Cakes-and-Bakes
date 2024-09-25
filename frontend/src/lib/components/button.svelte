<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from 'svelte/elements'

	/* export let style: 'primary' | 'neutral' | 'bordered' = 'primary';
	export let fit:boolean = false;
	export let onClick:VoidFunction = ()=>{};
	export let href:string = "" */
	interface Props extends HTMLButtonAttributes {
		fit?:boolean,
		style?: 'primary' | 'neutral' | 'bordered',
		size?:'small' | 'medium',
		radius?:'rounded' | 'square',
		children:Snippet
	}
	
	let {
		fit = false,
		style = 'primary',
		size = 'medium',
		radius = 'rounded',
		children,
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
	class={`button ${size} ${radius} ${buttonSize} ${style}`} 
	{...others}>
	{@render children()}
</button>

<style lang="scss">
	.button{
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.small{
		@apply gap-2 px-4 py-3;
	}

	.medium{
		@apply gap-3 px-8 py-4;
	}

	.rounded{
		@apply rounded-6;
	}

	.square{
		@apply rounded-3;
	}

	.primary{
		@apply bg-primary-action hover:shadow-lg text-neutral-100;
		transition: all 150ms;
	}

	.bordered{
		@apply border border-neutral-400 text-neutral-900 hover:border-primary-action hover:bg-primary-action hover:text-neutral-100;
		transition: all 150ms;
	}

	.neutral{
		@apply bg-neutral-900 text-neutral-100 hover:bg-neutral-800;
		transition: all 150ms;
	}
</style>