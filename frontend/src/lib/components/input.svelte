<script lang="ts">
    import Text from "./text.svelte";

	export let name:string;
	export let label:string;
	export let placeholder:string = "";
	export let type:string = "text"
</script>

<label for={name} class="w-full max-w-full flex flex-col gap-2">
	<Text weight="medium">{label}</Text>
	<input {type} {placeholder} {name} class="px-4 py-3 rounded-2 border border-neutral-400 focus:border-primary-dark outline-none">
</label>

<style lang="postcss">
	input{
		box-sizing: border-box;
		width: 100%;
		border-radius: theme(borderRadius.2);
	}
</style>