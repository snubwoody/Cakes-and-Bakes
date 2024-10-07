<script lang="ts">
    import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from 'svelte/elements'

	interface Props extends HTMLButtonAttributes {
		fit?:boolean,
		style?: 'primary' | 'neutral' | 'bordered',
		size?:'small' | 'medium',
		radius?:'rounded' | 'square',
		class? : string,
		children:Snippet
	}
	
	let {
		fit = false,
		style = 'primary',
		size = 'medium',
		radius = 'rounded',
		class:externalClass,
		children,
		...others
	}:Props = $props()

</script>

<button 
	class={`button ${size} ${radius} ${style} ${externalClass}`} 
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
		@apply bg-primary-action hover:shadow-primary-lg text-neutral-100;
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