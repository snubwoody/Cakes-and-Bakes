<script lang="ts">
    import { type CartItem,cart } from "$lib/cart.svelte";
	import Checkbox from "$lib/components/checkbox.svelte";
    import Textarea from "$lib/components/textarea.svelte";
    import { InfoIcon } from "svelte-feather-icons";
    import OrderAlert from "./order_alert.svelte";
	import { SelectChip, SelectGroup } from "$lib/components/select_chip";
    import Tabgroup  from "$lib/components/tabgroup.svelte";
    import TextGroup from "$lib/components/text-group.svelte";


	interface Props{
		image:string | null
	}

	let {
		image = $bindable(null)
	}:Props = $props()


	let toppings = ["Oreos","Ferroro rocher","Choc chips","Sprinkles"]
	let flavour: string = $state("");
	let shape: string = $state("");
	let size: string = $state("");
	let message_type: string = $state("Topper");
	let quantity:number = $state(1)
	let message:string;

	let active = $state(false)
	let selectedToppings:string[] = []
	let messageType = $state("Topper")

	function addToCart(){
		//TODO change this
		if(!(flavour || shape || size || message_type)){
			alert("Please fill in everything")
			return
		}

		// FIXME breaking changes
		let item:CartItem = {
			shape,
			size,
			message_type,
			message,
			flavour,
			price:550,
			quantity,
			toppings,
			image
		}
		cart.add(item)

		active = true;
		setTimeout(()=>{active = false},4000)
	}

</script>

<section>
	<div class="flex flex-col gap-6 w-full">
		<div class="flex flex-col gap-3">
			<h2>Custom cake</h2>
			<h4>K500.00</h4>
		</div>
		<div class="w-full flex flex-col gap-6">
			<div class="flex flex-col gap-4">
				<h4>Flavour</h4>
				<TextGroup bind:activeOption={flavour} options={["Vanilla","Chocolate","Red velvet", "Marble"]}/>
			</div>
			<div class="flex flex-col gap-4">
				<h4>Shape</h4>
				<SelectGroup bind:activeOption={shape}>
					<SelectChip value="Round">Round</SelectChip>
					<SelectChip value="Square">Square</SelectChip>
					<SelectChip value="Heart">Heart</SelectChip>
				</SelectGroup>
			</div>
			<div class="flex flex-col gap-4">
				<h4>Size</h4>
				<SelectGroup bind:activeOption={size}>
					<SelectChip value="Small" showSubtext>Small</SelectChip>
					<SelectChip value="Medium" showSubtext subtext="+K100">Medium</SelectChip>
					<SelectChip value="Big" showSubtext subtext="+K400">Big</SelectChip>
					<SelectChip value="Large" showSubtext subtext="+K650">Large</SelectChip>
				</SelectGroup>
			</div>
			<div class="flex flex-col gap-5">
				<Tabgroup bind:activeOption={messageType} options={["Topper","Icing"]}/>
				<Textarea label="Message" placeholder="Type message..."/>
			</div>
			<div class="flex flex-col gap-2 w-full">
				<h4>Toppings</h4>
				<ul class="flex flex-col gap-5">
					{#each toppings as topping}
					<li class="flex items-center justify-between">
						<p class="text-neutral-600">{ topping }</p>
						<Checkbox 
							value={topping} 
							onchecked={(value:any)=>{selectedToppings.push(value);console.log(selectedToppings)}}
							onunchecked={(value:any)=>{
								let index = selectedToppings.indexOf(value)
								selectedToppings.splice(index,1)
							}}
						/>
					</li>
				{/each}
				</ul>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-3">
		<div class="flex gap-2">
			<InfoIcon size='23'/>
			<p class="small text-neutral-700">
				Note that cakes must be ordered at least 24 hours before the expected pick up date
			</p>
		</div>
		<button class="btn-medium btn-rounded btn-primary w-full" onclick={addToCart}>Add to cart</button>
	</div>
	{#if active}
		<OrderAlert bind:active/>
	{/if}
</section>

<style lang="postcss">
	section{
		@apply md:max-w-[550px] sm:border md:border-0 border-l-0 md:border-l border-neutral-400 sm:rounded-5 md:rounded-none;
		flex:1;
		background-color: white;
		display: flex;
		gap:theme(spacing.8);
		flex-direction: column;
		align-items: center;
		padding: theme(spacing.8);
		justify-content: space-between;
	}
</style>