<script lang="ts">
    import Text from "./text.svelte";

	export let label:string;
	export let placeholder:string = "";
	//FIXME focus not working
	//TODO try setting to undefined
	interface Props{
		label:string,
		placeholder:string
	}

</script>	

<div class="flex flex-col gap-2 w-full" {...$$restProps}>
	<Text weight="medium">{ label }</Text>
	<textarea name="" id="" placeholder={placeholder}></textarea>
</div>

<style lang="postcss">
	textarea{
		width: 100%;
		min-height: 100px;
		max-height: 250px;
		padding: theme(spacing.3);
		border-radius: theme(borderRadius.2);
		border: 1px solid theme(colors.neutral.400);
		outline:none;
	}
	
	textarea:focus-within{
		border-radius: 1px solid theme(colors.neutral.900);
		outline:none;
	}
</style>