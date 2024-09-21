<script lang="ts">
    import Cart from "$lib/components/cart.svelte";
	import { MenuIcon, ShoppingCartIcon } from "svelte-feather-icons";

	let open = false
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<nav class="flex w-screen p-5 justify-between items-center border-b border-neutral-400">
	<div class="flex items-center gap-7">
		<a class="text-h5 font-medium leading-md" href="/">Cakes and bakes</a>
		<a class="text-h6 leading-md hidden md:inline" href="/order">Order</a>
		<p class="text-h6 leading-md hidden md:inline cursor-pointer" on:click={()=>{open = !open}}>
			Cart
		</p>
	</div>
	<a class="text-h6 hidden md:inline" href="/checkout">Checkout</a>
	<div class="flex items-center gap-5 md:hidden">
		<button on:click={()=>{open = !open}}>
			<ShoppingCartIcon/>
		</button>
		<MenuIcon/>
	</div>
	<Cart bind:open/>
</nav>