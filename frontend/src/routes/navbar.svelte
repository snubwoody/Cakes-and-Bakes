<script lang="ts">
    import Cart from "$lib/components/cart.svelte";
	import { MenuIcon, ShoppingCartIcon } from "svelte-feather-icons";
	import { cart } from "$lib/cart.svelte";
    import Button from "$lib/components/button.svelte";
    import { goto } from "$app/navigation";
    import Text from "$lib/components/text.svelte";

	let open = $state(false)
	let linksOpen = $state(false);
</script>

{#snippet MobileLinks()}
	<div class="links">
		<a class="text-h5 leading-md" onclick={()=>{linksOpen = false}} href="/order">Order</a>
		<a class="text-h5 leading-md" onclick={()=>{linksOpen = false}} href="/checkout">Checkout</a>
	</div>
{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<nav class="flex w-screen p-5 h-[75px] justify-between items-center border-b border-neutral-400">
	<div class="flex items-center gap-7">
		<a class="text-h5 font-medium leading-md" href="/">Cakes and bakes</a>
	</div>
	<div class='flex items-center gap-5 md:gap-6'>
		<div class="hidden md:flex">
			<Button radius='square' size='small' style='bordered' onclick={()=>{goto("/order")}}>
				Create a cake
			</Button>
		</div>
		<button onclick={()=>{open = !open}} class="relative">
			<ShoppingCartIcon size='24'/>
			<div class="absolute size-[15px] rounded-6 bg-primary-action text-neutral-100 top-[-5px] right-[-8px]">
				<p class="extra-small text-neutral-100">{cart.items.length}</p>
			</div>
		</button>
		<div class="flex items-center gap-5 md:hidden">
			<button onclick={()=>{linksOpen = !linksOpen}}>
				<MenuIcon/>
			</button>
		</div>
	</div>
	<Cart bind:open/>
</nav>
{#if linksOpen}
	{@render MobileLinks()}
{/if}

<style lang="scss">
	.links{
		@apply gap-8 py-11;
		background: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: fixed;
		top:75px;
		width: 100vw;
		height: 100dvh;
		z-index: 50;

	}
</style>