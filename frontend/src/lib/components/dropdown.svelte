<script lang="ts">
    import { ChevronDownIcon } from "svelte-feather-icons";
	import Text from "./text.svelte";
	export let label:string;
	export let items:string[]
	export let activeItem:string;

	let dropdownActive = false
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
 <div class="flex flex-col gap-2 relative w-full" {...$$restProps}>
	<Text weight="medium">{ label }</Text>
	<div on:click={()=>{dropdownActive = !dropdownActive}}  class="px-3 py-2 w-full flex items-center justify-between rounded-2 border border-neutral-400">
		<Text>{activeItem ?? "Select an item"}</Text>
		<ChevronDownIcon/>
	</div>
	{#if dropdownActive}
		<ul>
			{#each items as item}
				<li on:click={()=>{dropdownActive = false;activeItem = item}} class="p-2 hover:bg-neutral-200 rounded-1 flex items-center justify-center">
					{item}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="postcss">
	ul{
		@apply p-2 gap-2 shadow-base bg-white;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 50;
		position: absolute;
		bottom: -50px;
		border-radius: theme(borderRadius.2);
	}
</style>