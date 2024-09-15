<script lang="ts">
    import { Cart } from "$lib/cart";
    import Divider from "$lib/components/divider.svelte";
	import Text from "$lib/components/text.svelte";
    import { MinusIcon, PlusIcon } from "svelte-feather-icons";
	import Checkout from "./checkout.svelte";
    import { writable } from "svelte/store";

	let cart = writable(new Cart())
	//FIXME cart isn't reactive
</script>

<main class="flex justify-center lg:justify-between px-5 sm:px-12 py-8 sm:py-10">
	<Checkout/>
	<section class="hidden lg:flex flex-col w-full max-w-[500px] h-fit gap-5 p-7 rounded-3 border border-neutral-400">
		<Text size="h3" weight="medium">Order summary</Text>
		<div class="h-[220px] flex flex-col justify-between">
			<div class="flex flex-col gap-2">
				{#if $cart.items.length !== 0}
					{#each $cart.items as item,index}
					<div class="flex justify-between">
						<div class="flex flex-col gap-1">
							<Text size='h6'>{item.flavour}</Text>
							<Text class="text-neutral-600">K{item.price}.00</Text>
						</div>
						<div class="flex items-center gap-8 px-3 py-2 rounded-2 border-2 border-neutral-400">
							<button on:click={()=>{$cart.decrement(index)}}>
								<MinusIcon/>
							</button>
							<Text>{item.quantity}</Text>
							<button on:click={()=>{$cart.increment(index)}}>
								<PlusIcon/>
							</button>
						</div>
					</div>
					{/each}
				{:else}
					<Text class="text-neutral-600">Your cart is empty</Text>
				{/if}
			</div>
			<div class="flex items-center justify-between">
				<Text>Sub-total</Text>
				<Text>K0.00</Text>
			</div>
		</div>
		<Divider/>
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<Text>Delivery fee</Text>
				<Text>K50.00</Text>
			</div>
			<div class="flex items-center justify-between">
				<Text size='h5' weight='medium'>Total</Text>
				<Text size='h5' weight='medium'>K150.00</Text>
			</div>
		</div>
	</section>
</main>