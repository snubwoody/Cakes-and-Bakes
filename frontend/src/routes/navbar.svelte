<script lang="ts">
    import Cart from "$lib/components/cart.svelte";
	import { MenuIcon, ShoppingCartIcon } from "svelte-feather-icons";

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
		<a class="text-h6 leading-md hidden md:inline" href="/order">Order</a>
		<p class="text-h6 leading-md hidden md:inline cursor-pointer" onclick={()=>{open = !open}}>
			Cart
		</p>
	</div>
	<a class="text-h6 hidden md:inline" href="/checkout">Checkout</a>
	<div class="flex items-center gap-5 md:hidden">
		<button onclick={()=>{open = !open}}>
			<ShoppingCartIcon/>
		</button>
		<button onclick={()=>{linksOpen = !linksOpen}}>
			<MenuIcon/>
		</button>
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