<script lang="ts">
    import Divider from "$lib/components/divider.svelte";
	import Text from "$lib/components/text.svelte";
    import { MinusIcon, PlusIcon } from "svelte-feather-icons";
	import Checkout from "./checkout.svelte";
    import { writable } from "svelte/store";
    import OrderSummary from "./order_summary.svelte";

	
</script>

<svelte:head>
	<title>Checkout</title>	
</svelte:head>
<main class="flex justify-center lg:justify-between px-5 sm:px-12 py-8 sm:py-10">
	<Checkout/>
	<OrderSummary/>
</main>