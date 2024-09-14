<script lang="ts">
    import Text from "./text.svelte";

	export let name:string;
	export let label:string;
	export let placeholder:string = "";
	export let type:string = "text"
	// Medium fonts not working in firefox
</script>

<label for={name} class="flex flex-col gap-2">
	<Text weight="medium">{label}</Text>
	<input {type} {placeholder} {name} class="px-4 py-3 rounded-2 border border-neutral-400 focus:border-primary-dark outline-none">
</label>