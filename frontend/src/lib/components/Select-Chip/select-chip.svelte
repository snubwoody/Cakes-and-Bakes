<script lang='ts'>
    import type { Snippet } from "svelte";

	interface Props{
		children:Snippet,
		subtext?:string,
		showSubtext?:boolean
	}

	let { children, subtext, showSubtext = false }:Props = $props()
	console.log(showSubtext)
</script>
<!--FIXME style error-->
<div class="select-chip {showSubtext ? 'with-subtext' : null}">
	{@render children()}	
	{#if showSubtext}
		<p class="font-light small text-neutral-700">{ subtext ?? "" }</p>
	{/if}
</div>

<style lang="postcss">
	.select-chip{
		@apply base;
		display: flex;
		flex-direction: column;
		background: white;
		border-radius: theme(borderRadius.3);
		padding: theme(spacing.2) theme(spacing.4);
		transition: all 250ms;
		border: 1px solid theme(colors.neutral.400);
	}

	.select-chip:hover{
		background: theme(colors.primary.lightest);
		border: 1px solid theme(colors.primary.light);
		scale:1.05;
	}

	.with-subtext{
		gap: theme(spacing.1);
		padding: theme(spacing.2) theme(spacing.4);
		padding-right: theme(spacing.7);
	}
</style>