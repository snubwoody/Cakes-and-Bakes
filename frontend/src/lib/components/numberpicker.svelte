<script lang="ts">
    import { PlusIcon,MinusIcon } from "svelte-feather-icons";
	import Text from "./text.svelte";
	
	interface Props {
		number:number
	}

	let {
		number = $bindable(1)
	}:Props = $props()
	//FIXME not reasponsive 
	$inspect(number)
</script>

<div class="flex items-center gap-5 px-2 py-3 bg-neutral-200 rounded-3">
	<button onclick={()=>{number >= 2 ? number -= 1 : null}}>
		<MinusIcon/>
	</button>
	<Text weight='medium'>{number}</Text>
	<button onclick={()=>{number += 1}}>
		<PlusIcon/>
	</button>
</div>