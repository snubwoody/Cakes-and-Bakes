<script lang="ts">
    import { CheckIcon } from "svelte-feather-icons";

	let checked = $state(false);

	interface Props{
		onchecked?: (value:string) => void,
		onunchecked?: (value:string) => void,
		value: string
	}

	let {
		onchecked = (value) => {},
		onunchecked = (value) => {},
		value
	}:Props = $props()

	const handleClick = () => {
		checked = !checked 

		if (checked) {
			onchecked(value)
		}
		else {
			onunchecked(value)
		}
	}
</script>
<!--TODO change this to an actual checkbox-->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onclick={handleClick} class="{checked ? 'checkbox-active' : 'checkbox-inactive'} checkbox">
	{#if checked}
		<CheckIcon size="15"  class="text-neutral-100"/>
	{/if}
</div>

<style lang="postcss">
	.checkbox{
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius:theme(borderRadius.1);
		transition: all 250ms;
	}
	.checkbox-inactive{
		border: 1px solid theme(colors.neutral.400);
	}

	.checkbox-active{
		background-color: theme(colors.primary.action);
		border: 1px solid theme(colors.primary.action);
	}
</style>