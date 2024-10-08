<script lang='ts'>
    import { getContext, type Snippet } from "svelte";
    import type { Writable } from "svelte/store";

	interface Props{
		children:Snippet,
		subtext?:string,
		showSubtext?:boolean,
		value:string,
	};

	let { 
		children, 
		subtext, 
		value, 
		showSubtext = false
	}:Props = $props();

	let activeOption:Writable<string> = getContext('activeOption');
	let setActiveOption: (value:string) => void = getContext('setActiveOption');
	console.log(activeOption,setActiveOption);
</script>

<!--FIXME style error-->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
onclick={()=>{setActiveOption(value)}}
class="select-chip {showSubtext ? 'with-subtext' : null} {value === $activeOption ? 'active-select' : null}">
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

	.active-select{
		background: theme(colors.primary.lightest);
		border: 1px solid theme(colors.primary.light);
	}

	.with-subtext{
		gap: theme(spacing.1);
		padding: theme(spacing.2) theme(spacing.4);
		padding-right: theme(spacing.7);
	}
</style>