<script>
    import { goto } from "$app/navigation";
    import Button from "$lib/components/button.svelte";
	import Text from "$lib/components/text.svelte";
    import { text } from "@sveltejs/kit";
    import { ShoppingBagIcon, CheckIcon } from "svelte-feather-icons";


</script>

{#snippet Checkpoint(text)}
	<div class='relative flex justify-center'>
		<div class="size-[31px] rounded-full shadow-primary-lg bg-primary-action text-neutral-100 flex items-center justify-center">
			<CheckIcon size='20' class="text-neutral-100"/>
		</div>
		<p class="absolute text-nowrap bottom-[-30px] text-neutral-700 sm md:base">{text}</p>
	</div>
{/snippet}

<main class=''>
	<div class="flex flex-col items-center gap-10 max-w-[680px]">
		<div class="flex flex-col items-center gap-4">
			<h1 class='h3 md:h1'>Cakes & Bakes</h1>
			<p class="text-center text-neutral-700 small md:base">
				At Cakes & Bakes, we believe in celebrating life's sweetest 
				moments with a touch of homemade perfection. 
				Whether it's a birthday, wedding, or a simple treat for 
				yourself, our cakes are crafted with love, 
				care, and the finest ingredients.
			</p>
		</div>
		<Button class="w-fit" style='bordered' onclick={()=>{goto("/order")}}>
			<ShoppingBagIcon/>
			Order
		</Button>
	</div>
	<div class="flex max-w-[800px] w-full items-center">
		{@render Checkpoint("100% Organic")}
		<div class="w-full h-2 bg-primary-action shadow-primary-lg"></div>
		{@render Checkpoint("Vegeterian friendly")}
		<div class="w-full h-2 bg-primary-action shadow-primary-lg"></div>
		{@render Checkpoint("Halaal")}
	</div>
</main>

<style lang="postcss">
	main{
		@apply gap-13 px-7 sm:px-12 bg-neutral-100;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: calc(100dvh - 75px);
	}
</style>
