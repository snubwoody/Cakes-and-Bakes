<script class="">
    import Button from "$lib/components/button.svelte";
	import Text from "$lib/components/text.svelte";
	import { CheckIcon } from "svelte-feather-icons";

	//FIXME fix alert on small screens
</script>

<div class="order-alert">
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

	@keyframes in-animation-large {
		0%{
			transform: translateX(510px);
		}

		100%{
			transform: translateX(0px);
		}
	}

	@keyframes in-animation-small {
		0%{
			transform: translateX(510px);
		}

		100%{
			transform: translateX(-50%);
		}
	}
	
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
		animation: in-animation-large 900ms;
		

		@media (min-width:744px) {
			right: 24px;
			
		}

		@media (max-width: 744px) {
			width: 100%;
    		left: 50%;
    		transform: translate(-50%,0);
			animation: in-animation-small 900ms;
		}
	}
</style>