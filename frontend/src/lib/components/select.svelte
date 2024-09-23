<script lang="ts">
    import { ChevronDownIcon } from "svelte-feather-icons";
	import Text from "./text.svelte";
	interface Props{
		items:string[],
		activeItem:string
	}

	let {
		items,activeItem = $bindable()
	}:Props = $props()

	let dropdownActive = $state(false)
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
 <div class="flex flex-col gap-2 relative">
	<div onclick={()=>{dropdownActive = !dropdownActive}}  class="p-2 gap-1 w-full flex items-center">
		<Text>{activeItem ?? "Select"}</Text>
		<span class="material-symbols-outlined text-neutral-900">
			unfold_more
		</span>
	</div>
	{#if dropdownActive}
		<ul>
			{#each items as item}
				<li onclick={()=>{dropdownActive = false;activeItem = item}} class="p-2 hover:bg-neutral-200 rounded-1 flex w-full items-center justify-start">
					{item}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<!--FIXME calculate the right position for the bottom-->
<style lang="postcss">
	ul{
		@apply p-2 gap-2 shadow-base bg-white;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 50;
		position: absolute;
		bottom: -50px;
		width: 100%;
		border-radius: theme(borderRadius.2);
	}
</style>