<script lang="ts"> 
	type Props = {
		options:string[],
		activeOption:string
	}

	let { options, activeOption = $bindable() }:Props = $props()
</script>

<ul class="flex items-center gap-5">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	{#each options as option}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<li 
		class="text {activeOption === option ? 'active-text' : null}" 
		onclick={()=>{activeOption = option}}>{ option }</li>
	{/each}
</ul>

<style lang="postcss">
	@keyframes text-animation{
		from{
			background-size: 0% 1.3px;
		}

		to{
			background-size: 100% 1.3px;
		}
	}
	
	.text{
		@apply base;
		color: theme(colors.neutral.700);
		cursor:pointer;
	}

	.text:hover{
		background: linear-gradient(theme(colors.neutral.900),theme(colors.neutral.900));
		background-size: 100% 1.3px;
		background-position: 0 100%;
		background-repeat:no-repeat;
		color: theme(colors.neutral.900);
		animation: text-animation 500ms ease-in-out;
		animation-fill-mode: backwards;
	}

	.active-text{
		background: linear-gradient(theme(colors.neutral.900),theme(colors.neutral.900));
		background-size: 100% 1.3px;
		background-position: 0 100%;
		background-repeat:no-repeat;
		color: theme(colors.neutral.900);
		animation: text-animation 500ms ease-in-out;
		animation-fill-mode: backwards;
	}

</style>