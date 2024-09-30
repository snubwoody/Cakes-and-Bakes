<script lang="ts">
    import { goto } from "$app/navigation";
    import Button from "$lib/components/button.svelte";
	import Text from "$lib/components/text.svelte";
    import { text } from "@sveltejs/kit";
    import { ShoppingBagIcon, CheckIcon } from "svelte-feather-icons";
    import { cubicInOut } from "svelte/easing";
    import { tweened } from "svelte/motion";


	let firstWidth = tweened(0,{
		duration:2900,
		easing:cubicInOut
	})
	let secondWidth = tweened(0,{
		duration:2900,
		delay:2900,
		easing:cubicInOut
	})

	$effect(()=>{
		firstWidth.set(100)
		secondWidth.set(100)
	})


</script>

{#snippet Checkpoint(text,index)}
	<div class='relative flex justify-center'>
		<div style={`animation-delay:${index * 3050}ms`} class="checkpoint-icon">
			<CheckIcon size='20' class="text-neutral-100"/>
		</div>
		<p class="absolute text-nowrap bottom-[-30px] text-neutral-700 small md:base">{text}</p>
	</div>
{/snippet}

{#snippet LoadingBar(width)}
	<div class="outer-bar">
		<div style:width={`${width}%`}  class="inner-bar"></div>
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
		{@render Checkpoint("100% Organic",0)}
		{@render LoadingBar($firstWidth)}
		{@render Checkpoint("Vegeterian friendly",1)}
		{@render LoadingBar($secondWidth)}
		{@render Checkpoint("Halaal",2)}
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

	.outer-bar{
		@apply w-full h-2 relative border-y border-neutral-400;
	}

	.inner-bar{
		@apply bg-primary-action shadow-primary-lg;
		height:100%;
	}

	@keyframes checkpoint-anim{
		from{
			background-color: white;
			box-shadow: none;
			border: 1px solid theme(colors.neutral.400);
		}

		to{
			background-color: theme(colors.primary.action);
			box-shadow: theme(boxShadow.primary-lg);
			border: 1px solid theme(colors.primary.action);
		}
	}

	.checkpoint-icon{
		@apply size-[31px] rounded-full shadow-primary-lg text-neutral-100 flex items-center justify-center;
		background-color: theme(colors.primary.action);
		animation: checkpoint-anim 500ms ease-in-out;
		animation-fill-mode:backwards;
	}
</style>
