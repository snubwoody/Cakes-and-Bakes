<script lang="ts">
    import { type OrderInfo,cart } from "$lib/cart.svelte";
    import Button from "$lib/components/button.svelte";
    import Divider from "$lib/components/divider.svelte";
	import Input from "$lib/components/input.svelte";
    import Tabs from "$lib/components/tabs.svelte";
	import Text from "$lib/components/text.svelte";
	
	export let deliveryMethod:string;
	let form:HTMLFormElement;


	//TODO handle null values or maybe just post the data as a form
	function addPurchase(){
		let formData = new FormData(form)

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

<!--TODO find a way to parse things like dates and card numbers-->
<section class="w-full max-w-[450px] flex flex-col gap-6 items-center md:items-start">
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
		<Button onClick={()=>{addPurchase()}}>Confirm purchase</Button>
	</form>
</section>