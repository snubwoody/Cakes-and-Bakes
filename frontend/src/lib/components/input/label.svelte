<script lang="ts">
    import type { Snippet } from "svelte";
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLParagraphElement>{
		children:Snippet,
		class?:string
	}

	let { children, class:externalClass,...others}:Props = $props()
</script>

<p class="flex items-center gap-2 text-neutral-700 base {externalClass}" {...others}>
	{@render children()}
</p>