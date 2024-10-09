<script lang="ts">
    import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes{

	}
	let { ...props }:Props = $props()

</script>

<div class="rounded-2 border-[1.5px] border-neutral-400 min-h-[48px]">
	<input type="text" {...props}>
</div>

<style lang="postcss">
	input{
		box-sizing: border-box;
		width: 100%;
		border-radius: theme(borderRadius.2);
		height: 100%;
		outline: none;
		padding: theme(spacing.3);
	}
</style>