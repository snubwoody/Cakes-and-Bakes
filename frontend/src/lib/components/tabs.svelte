<script lang="ts">
    import Text from "./text.svelte";

	interface Props{
		options:string[],
		activeOption:string
	}

	let {
		options,
		activeOption = $bindable(options[0])
	}:Props = $props()
</script>
<!-- svelte-ignore a11y_no_static_element_interactions -->
 <!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="bg-neutral-200 p-1 gap-1 rounded-2 flex items-center">
	{#each options as option}
		<div 
			class={activeOption === option ? "tab-active" : "tab"} 
			on:click={()=>{activeOption = option}}>
			<Text>{option}</Text>
		</div>
	{/each}
</div>

<style lang="postcss">
	.tab{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: theme(spacing.2);
		border-radius: theme(borderRadius.1);
	}

	.tab-active{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: theme(spacing.2);
		background-color: white;
		border-radius: theme(borderRadius.1);
	}
</style>