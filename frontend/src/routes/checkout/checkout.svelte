<script lang="ts">
    import { type OrderInfo,cart } from "$lib/cart.svelte";
    import Button from "$lib/components/button.svelte";
    import Divider from "$lib/components/divider.svelte";
	import Input from "$lib/components/input.svelte";
    import Tabs from "$lib/components/tabs.svelte";
	import Text from "$lib/components/text.svelte";
    import Page from "./+page.svelte";
	
	let form:HTMLFormElement;

	//TODO handle null values or maybe just post the data as a form
	function addPurchase(){
		if (!form.checkValidity()){
			alert("Please fill in all the values")
			return
		}

		if (cart.items.length === 0) {
			alert("Your cart is empty")
			return
		}

		let formData = new FormData(form)
		let order:OrderInfo = {
			name:String(formData.get("name")),
			phone_number:String(formData.get("phoneNumber")),
			email:String(formData.get("email")),
			date:String(formData.get("date")),
		}

		cart.addSale(order)
	}


</script>

<!--TODO find a way to parse things like dates and card numbers-->
<section class="w-full max-w-[450px] flex flex-col gap-6 items-center md:items-start">
	<Text weight="medium" size="h1">Checkout</Text>
	<form bind:this={form} class="w-full flex flex-col gap-8">
		<div class="flex flex-col gap-6">
			<Input required name="name" label="Name" placeholder="John doe"/>
			<Input required name="email" label="Email" placeholder="example@email.com"/>
			<Input required name="phoneNumber" label="Phone number" placeholder="09xxxxxxxx"/>	
		</div>
		<Divider/>
		<div class="flex flex-col">		
			<Input required name="date" label="Pick up date" placeholder="DD / MM / YYYY"/>
		</div>
		<Button type="submit" onclick={addPurchase}>Confirm purchase</Button>
	</form>
</section>