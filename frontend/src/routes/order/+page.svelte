<script lang="ts">
    import { Cart } from "$lib/cart";
    import { UploadCloudIcon } from "svelte-feather-icons";
    import OrderForm from "./order_form.svelte";
    import Text from "$lib/components/text.svelte";
    import Button from "$lib/components/button.svelte";
</script>

<main class="w-screen flex flex-col md:flex-row gap-3 sm:gap-7 md:gap-0 sm:px-6 md:px-0 sm:py-12 md:py-0">
	<section class="w-full bg-neutral-100 hidden sm:flex py-11 px-8 lg:px-11 justify-center">
		<div class="flex flex-col items-center justify-center gap-7 rounded-5 w-full aspect-[3/2] bg-white max-w-[650px]">
			<UploadCloudIcon size="66"/>
			<div class="flex flex-col gap-1 items-center">
				<Text>Have an idea of the cake you want?</Text>
				<Text weight="medium">Drop an image</Text>
			</div>
			<Button onClick={()=>{}} style="bordered">Upload an image</Button>
		</div>
	</section>
	<OrderForm/>
</main>

<style lang="postcss">
	p{
		background-color: theme(colors.primary.action);
	}
</style>