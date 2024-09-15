<script lang="ts">
    import { Cart, type CartItem } from "$lib/cart";
    import Button from "$lib/components/button.svelte";
	import Checkbox from "$lib/components/checkbox.svelte";
	import Dropdown from "$lib/components/dropdown.svelte";
	import Text from "$lib/components/text.svelte";
    import Textarea from "$lib/components/textarea.svelte";
    import OrderAlert from "./order_alert.svelte";

	const cart = new Cart()

	let toppings = ["Oreos","Ferroro rocher","Choc chips","Sprinkles"]
	let flavour: "Vanilla" | "Chocolate" | "Red velvet";
	let shape: "Round" | "Square" | "Heart";
	let size: "Large" | "Medium" | "Small";
	let messageType: "Topper" | "Icing";
	let message:string;

	let alertActive = false;

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

		let price = flavourPrice[flavour] + shapePrice[shape] + sizePrice[size] + messagePrice[messageType]
		let item:CartItem = {shape,size,messageType,message,flavour,price,quantity:1}
		cart.add(item)

		alertActive = true;
		setTimeout(()=>{alertActive = false},4000)
	}

	//TODO add the toppings
</script>

<section class="flex flex-col justify-between h-[100dvh] sm:border md:border-0 border-l-0 md:border-l border-neutral-400 bg-white sm:rounded-5 md:rounded-none">
	<div class="flex flex-col gap-10 w-full items-center">
		<Text size="h3" weight="medium">Create your own cake</Text>
		<div class="w-full flex flex-col gap-6">
			<div class="w-full flex items-center gap-8">
				<Dropdown label="Flavour" items={["Vanilla", "Chocolate","Red velvet"]} bind:activeItem={flavour}/>
				<Dropdown label="Shape" items={["Round", "Square","Heart"]} bind:activeItem={shape}/>
			</div>
			<div class="w-full flex items-center gap-8">
				<Dropdown label="Size" items={["Large", "Medium","Small"]} bind:activeItem={size}/>
				<Dropdown label="Message type" items={["Topper", "Icing"]} bind:activeItem={messageType}/>
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
		</div>
	</div>
	<Button onClick={()=>{addToCart()}}>Add to cart</Button>
	{#if alertActive}
		<OrderAlert bind:alertActive/>
	{/if}
</section>

<style lang="postcss">
	section{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: theme(spacing.8);
		width: 100%;
		max-width: 550px;
	}
</style>