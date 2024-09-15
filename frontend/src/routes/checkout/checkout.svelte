<script lang="ts">
    import { Cart, type OrderInfo } from "$lib/cart";
    import Button from "$lib/components/button.svelte";
    import Divider from "$lib/components/divider.svelte";
	import Input from "$lib/components/input.svelte";
    import Tabs from "$lib/components/tabs.svelte";
	import Text from "$lib/components/text.svelte";
	
	let deliveryMethod:string;
	let form:HTMLFormElement;

	let cart = new Cart()

	//TODO handle null values
	function addPurchase(){
		let formData = new FormData(form)

		const data = Object.fromEntries(formData.entries())
		
		let order:OrderInfo = {
			name:String(formData.get("name")),
			phoneNumber:String(formData.get("phoneNumber")),
			email:String(formData.get("email")),
			address:String(formData.get("address")),
			date:String(formData.get("date")),
			deliveryMethod:deliveryMethod
		}

		cart.addSale(order)
	}
</script>

<!--FIXME layout error-->
<!--TODO find a way to parse things like dates and card numbers-->
<section class="w-full max-w-[450px] flex flex-col gap-6 items-center">
	<Text weight="medium" size="h1">Checkout</Text>
	<form bind:this={form} class="w-full flex flex-col gap-8">
		<div class="flex flex-col gap-6">
			<Input name="name" label="Name" placeholder="John doe"/>
			<Input name="email" label="Email" placeholder="example@email.com"/>
			<Input name="phoneNumber" label="Phone number" placeholder="09xxxxxxxx"/>	
		</div>
		<Divider/>
		<div class="flex flex-col gap-6">
			<Tabs options={["Delivery","Pick-up"]} bind:activeOption={deliveryMethod}/>
			{#if deliveryMethod === "Delivery"}
				<Input name="address" label="Address"/>
				<Input name="date" label="Delivery date" placeholder="DD / MM / YYYY"/>	
			{:else}
				<Input name="date" label="Pick up date" placeholder="DD / MM / YYYY"/>
			{/if}
		</div>
		<Divider/>
		<div class="flex flex-col gap-6 w-full">
			<Input name="cardNumber" label="Card number" placeholder="0000 0000 0000 0000"/>
			<div class="flex items-center gap-7">
				<!--FIXME fix the overflow-->
				<Input name="cardExpiry" label="Expiry" placeholder="MM / YY"/>
				<Input name="cvv" label="CVV" placeholder="xxx"/>
			</div>	
		</div>
		<Button onClick={()=>{addPurchase()}}>Confirm purchase</Button>
	</form>
</section>