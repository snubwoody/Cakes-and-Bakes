<script lang="ts">
    import { PlusIcon,MinusIcon } from "svelte-feather-icons";
	import Text from "./text.svelte";
	
	interface Props {
		number:number
	}

	let {
		number = $bindable()
	}:Props = $props()
	//FIXME not reasponsive
</script>

<div class="flex items-center gap-5 px-2 py-3 bg-neutral-200 rounded-3">
	<button onclick={()=>{number -= 1}}>
		<MinusIcon/>
	</button>
	<Text weight='medium'>1</Text>
	<button onclick={()=>{number += 1}}>
		<PlusIcon/>
	</button>
</div>