<script lang="ts">
	type Props = {
		options: string[]
		activeOption:string
	}

	let { options,activeOption = $bindable() }:Props = $props()
	let offset = $state("initial")
</script>

<ul class="tab-group">
	{#each options as option}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<li
		onclick={()=>{activeOption = option;offset = "8px"}} 
		class="tab {activeOption === option ? 'active-tab' : null}">
			{ option }
		</li>
	{/each}
</ul>
<!--FIXME animation-->
<style lang="postcss">
	.tab-group{
		display: flex;
		padding: theme(spacing.1);
		position: relative;
		background: theme(colors.neutral.100);
		border: 1px solid theme(colors.neutral.400);
		border-radius: theme(borderRadius.3);
	}

	.tab{
		@apply base;
		width: 100%;
		padding: theme(spacing.2) 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: all 550ms;
	}

	.active-tab{
		background-color: white;
		border-radius: theme(borderRadius.3);
		box-shadow: theme(boxShadow.base);
	}
</style>