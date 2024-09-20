<script lang="ts">
    import { goto } from "$app/navigation";
    import Button from "$lib/components/button.svelte";
	import Text from "$lib/components/text.svelte";
    import { redirect } from "@sveltejs/kit";
	import { CheckIcon } from "svelte-feather-icons";
    import { fly } from "svelte/transition";

	export let alertActive:boolean;
</script>

<div in:fly={{x:'520px',duration:750}} class="order-alert">
	<div class="flex gap-2 items-center">
		<CheckIcon size="24"/>
		<Text size="h5">Cake added to cart</Text>
	</div>
	<div class="flex items-center gap-2">
		<!--FIXME this isn't working-->
		<!--FIXME button wrapping on small screens-->
		<Button style="bordered" onClick={()=>{alertActive = false; }}>Continue shopping</Button>
		<Button href="/checkout" onClick={()=>{}}>Checkout</Button>
	</div>
</div>

<style lang="postcss">
	.order-alert{
		@apply border border-neutral-400;
		width: 510px;
		background-color: white;
		display: flex;
		position: fixed;
		bottom: 24px;
		flex-direction: column;
		padding: theme(spacing.5) theme(spacing.6);
		gap: theme(spacing.3);
		border-radius: theme(borderRadius.3);
		@media (min-width:744px) {
			right: 24px;
			
		}
		@media (max-width: 744px) {
			width: calc(100% - 24px);
    		left: 50%;
    		transform: translate(-50%,0);
		}
	}
</style>