<script lang="ts">
	export let style: 'primary' | 'neutral' | 'bordered' = 'primary';
	export let fit:boolean = false;
	export let onClick:VoidFunction;

	const buttonStyle = {
		primary:'bg-primary-action hover:shadow-lg text-neutral-100',
		bordered:'border border-neutral-400 hover:bg-neutral-200 text-neutral-900',
		neutral:'bg-neutral-900 text-neutral-100 hover:bg-neutral-800'
	}

	const buttonSize = fit ? 'w-fit' : 'w-full'

</script>

<button on:click={()=>{onClick()}} class={`flex items-center justify-center gap-2 px-8 py-4 rounded-6 ${buttonSize} ${buttonStyle[style]}`}>
	<slot/>
</button>