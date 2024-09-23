<script lang="ts">
    import { XIcon,MinusIcon,PlusIcon } from "svelte-feather-icons";
	import Button from "./button.svelte";
    import Text from "./text.svelte";
    import { Cart, createCart,cart } from "$lib/cart.svelte";
    import { currency } from "$lib/lib";
    import { goto } from "$app/navigation";

	let {
		open = $bindable(false)
	} = $props()

</script>

{#if open}
	<aside class="cart">
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<Text weight="medium" size='h3'>Cart</Text>
				<button onclick={()=>{open = false}}>
					<XIcon/>
				</button>
			</div>
			<div class="flex flex-col gap-5 py-4 max-h-[400px] min-h-[150px] overflow-y-auto border-y-2 border-neutral-400">
				{#each cart.items as item,index}
					<div class="flex justify-between">
						<div class="flex flex-col gap-1">
							<Text size='h6'>{item.flavour}</Text>
							<Text class="text-neutral-600">{currency(item.price)}</Text>
						</div>
						<div class="flex items-center gap-8 px-3 py-2 rounded-2 border-2 border-neutral-400">
							<button onclick={()=>{cart.decrement(index)}}>
								<MinusIcon/>
							</button>
							<Text>{item.quantity}</Text>
							<button onclick={()=>{cart.increment(index)}}>
								<PlusIcon/>
							</button>
						</div>
					</div>
				{:else}
					<Text class="text-neutral-500">Your cart is empty</Text>
				{/each}
			</div>
			<div class="flex items-center justify-between">
				<Text weight='medium' size='h5'>Total</Text>
				<Text weight='medium' size='h5'>{currency(cart.total)}</Text>
			</div>
		</div>
		<div class="flex flex-col gap-3">
			<Button style="bordered" onclick={cart.empty}>Clear cart</Button>
			<Button onclick={()=>{goto("/checkout")}}>Checkout</Button>
		</div>
	</aside>
{/if}

<style lang="postcss">
	.cart{
		width: 100%;
		max-width: 500px;
		height: 100dvh;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		right: 0;
		top: 0;
		background: white;
		border-left: 1px solid theme(colors.neutral.400);
		z-index:400;
		padding: theme(spacing.7) theme(spacing.8);
	}
</style>