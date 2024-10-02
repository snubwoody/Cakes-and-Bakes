<script lang="ts">
    import { ChevronDownIcon } from "svelte-feather-icons";
	interface Props{
		items:string[],
		activeItem:string
	}

	let {
		items,
		activeItem = $bindable()
	}:Props = $props()


	let dropdown:HTMLDetailsElement;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<details bind:this={dropdown} class="flex flex-col gap-2 relative dropwod">
	<summary  class="p-2 gap-1 w-full flex items-center">
		<p>{activeItem ?? "Select"}</p>
		<span class="material-symbols-outlined text-neutral-900">
			unfold_more
		</span>
	</summary>
	<ul class="menu">
		{#each items as item}
			<li onclick={()=>{dropdown.open = false;activeItem = item}} class="menu-item base">
				{item}
			</li>
		{/each}
	</ul>
</details>

<!--FIXME calculate the right position for the bottom-->
<style lang="postcss">
	/* ul{
		@apply p-2 gap-2 shadow-base bg-white;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 50;
		position: absolute;
		bottom: -50px;
		width: 100%;
		border-radius: theme(borderRadius.2);
	} */
</style>