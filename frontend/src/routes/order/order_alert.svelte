<script class="">
    import Button from "$lib/components/button.svelte";
	import Text from "$lib/components/text.svelte";
	import { CheckIcon } from "svelte-feather-icons";
    import { fly } from "svelte/transition";

</script>

<div in:fly={{x:'520px',duration:750}} class="order-alert">
	<div class="flex gap-2 items-center">
		<CheckIcon size="24"/>
		<Text size="h5">Cake added to cart</Text>
	</div>
	<div class="flex items-center gap-2">
		<Button style="bordered" onClick={()=>{}}>Continue shopping</Button>
		<Button onClick={()=>{}}>Checkout</Button>
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