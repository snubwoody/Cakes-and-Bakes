<script lang="ts">
    import { setContext, type Snippet } from "svelte";
	import type { HTMLAttributes } from 'svelte/elements'
    import { writable } from "svelte/store";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		activeOption:string,
		children:Snippet
	}

	let { children, activeOption = $bindable(), ...others }:Props = $props();

	// TODO just set the store on the page and pass it down
	let activeItem = writable(activeOption)
	const setOption = (value:string) => {
		activeOption = value
		activeItem.set(value)
	}
	setContext('activeOption',activeItem)
	setContext('setActiveOption',setOption)
</script>

<div class="flex gap-6" {...others}>
	{@render children()}
</div>