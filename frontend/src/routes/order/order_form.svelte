<script lang="ts">
    import { type CartItem,cart } from "$lib/cart.svelte";
    import Button from "$lib/components/button.svelte";
	import Checkbox from "$lib/components/checkbox.svelte";
    import Divider from "$lib/components/divider.svelte";
	import Dropdown from "$lib/components/dropdown.svelte";
    import Select from "$lib/components/select.svelte";
	import Text from "$lib/components/text.svelte";
    import Textarea from "$lib/components/textarea.svelte";
    import { InfoIcon, PlusIcon, MinusIcon } from "svelte-feather-icons";
    import OrderAlert from "./order_alert.svelte";
    import Numberpicker from "$lib/components/numberpicker.svelte";


	interface Props{
		image:string | null
	}

	let {
		image = $bindable(null)
	}:Props = $props()


	let toppings = ["Oreos","Ferroro rocher","Choc chips","Sprinkles"]
	let flavour: string = $state("Vanilla");
	let shape: string = $state("Round");
	let size: string = $state("Medium");
	let messageType: string = $state("Topper");
	let quantity:number = $state(1)
	let message:string;

	let active = $state(false)

	const flavourPrice = {
		"Vanilla":300,
		"Chocolate":500,
		"Red velvet":600
	}

	const shapePrice = {
		"Round":50,
		"Square":100,
		"Heart":150
	}

	const sizePrice = {
		"Large":300,
		"Medium":200,
		"Small":100
	}

	const messagePrice = {
		"Topper":100,
		"Icing":100
	}

	function addToCart(){
		if(!(flavour || shape || size || messageType)){
			alert("Please fill in everything")
			return
		}

		// FIXME breaking changes
		//let price = flavourPrice[flavour] + shapePrice[shape] + sizePrice[size] + messagePrice[messageType]
		let item:CartItem = {shape,size,messageType,message,flavour,price:200,quantity,image}
		cart.add(item)

		active = true;
		setTimeout(()=>{active = false},4000)
	}

	//TODO add the toppings
</script>

<section class="md:max-w-[550px] sm:border md:border-0 border-l-0 md:border-l border-neutral-400 sm:rounded-5 md:rounded-none">
	<div class="flex flex-col gap-6 w-full">
		<div class="flex flex-col gap-1">
			<Text size='h4'>Custom cake</Text>
			<Text weight='medium' size='h5'>K155.00</Text>	
		</div>
		<div class="w-full flex flex-col gap-6">
			<div class="flex flex-col">
				<div class="flex items-center justify-between py-2">
					<Text weight='medium' size='h6'>Flavour</Text>
					<Select items={["Vanilla", "Chocolate","Red velvet"]} bind:activeItem={flavour}/>
				</div>
				<Divider/>
				<div class="flex items-center justify-between py-2">
					<Text weight='medium' size='h6'>Size</Text>
					<Select items={["Large", "Medium","Small"]} bind:activeItem={size}/>
				</div>
				<Divider/>
				<div class="flex items-center justify-between py-2">
					<Text weight='medium' size='h6'>Shape</Text>
					<Select items={["Round", "Square","Heart"]} bind:activeItem={shape}/>
				</div>
				<Divider/>
				<div class="flex items-center justify-between py-2">
					<Text weight='medium' size='h6'>Message Type</Text>
					<Select items={["Topper", "Icing"]} bind:activeItem={messageType}/>
				</div>
				<Divider/>
				<div class="flex items-center justify-between py-2">
					<Text weight='medium' size='h6'>Quantity</Text>
					<Numberpicker bind:number={quantity}/>
				</div>
			</div>
			<Textarea label="Message" placeholder="Type message..."/>
			<div class="flex flex-col gap-2 w-full">
				<Text weight="medium">Toppings</Text>
				{#each toppings as topping}
				<li class="flex items-center justify-between">
					<Text class="text-neutral-600">{ topping }</Text>
					<Checkbox/>
				</li>
				{/each}
			</div>
			<div class="flex gap-2">
				<InfoIcon size='24'/>
				<!--FIXME text colour-->
				<Text weight='medium'>
					Note that cakes must be ordered at least 24 hours before the expected pick up date
				</Text>
			</div>
		</div>
	</div>
	<Button onclick={addToCart}>Add to cart</Button>
	{#if active}
		<OrderAlert bind:active/>
	{/if}
</section>

<style lang="postcss">
	section{
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