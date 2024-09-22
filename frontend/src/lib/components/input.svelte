<script lang="ts">
    import Text from "./text.svelte";

	interface Props{
		name:string,
		label:string,
		placeholder?:string,
		type?:string
	}

	let {
		name,
		label,
		placeholder,
		type = "text"
	}:Props = $props()

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