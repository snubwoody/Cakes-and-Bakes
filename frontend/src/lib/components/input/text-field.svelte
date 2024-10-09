<script lang="ts">
    import type { Snippet } from "svelte";
    import Text from "../text.svelte";
	import type { HTMLLabelAttributes } from "svelte/elements";

	interface Props extends HTMLLabelAttributes{
		children:Snippet
		class?:string
	}

	let {
		children,
		class:externalClass,
		...others
	}:Props = $props()

</script>

<label class="flex flex-col gap-2 {externalClass}" {...others}>
	{@render children()}
</label>

<style lang="postcss">
	input{
		box-sizing: border-box;
		width: 100%;
		border-radius: theme(borderRadius.2);
	}
</style>