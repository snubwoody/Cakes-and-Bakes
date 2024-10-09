<script lang="ts">
    import { type OrderInfo,cart } from "$lib/cart.svelte";
    import Button from "$lib/components/button.svelte";
    import Divider from "$lib/components/divider.svelte";
    import { Input , Label, TextField } from "$lib/components/input";
	
	let form:HTMLFormElement;

	//TODO handle null values or maybe just post the data as a form
	const addPurchase = () => {
		if (!form.checkValidity()){
			//alert("Please fill in all the values")
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

	let date:string = $state("");
	let previousDate = date;
	let validDateCharacters = ["1","2","3","4","5","6","7","8","9","0","/"," ",]

	const parseDate = () => {
		// Remove whitespace
		date?.replaceAll(" ","");
		for (let char of date) {
			//Replace invalid characters
			if (!validDateCharacters.includes(char)){
				date = date.replace(date.at(date.indexOf(char)) ?? "","")
			}
		}

		// Only add '/' if we're typing and not when deleting text
		if (date?.length == 2 && previousDate.length < date?.length) {
			date = date.concat(" / ");
		}
		
		if (date?.length == 7 && previousDate.length < date?.length ) {
			date = date.concat(" / ");
		}

		if (date?.length > 14) {
			date = previousDate
		}
		previousDate = date
	}

	$effect(()=>{
		parseDate()
	})

</script>

<!--TODO find a way to parse things like dates and card numbers-->
<section class="w-full max-w-[450px] flex flex-col gap-6 items-center md:items-start">
	<h1 class="font-medium">Checkout</h1>
	<form bind:this={form} class="w-full flex flex-col gap-8">
		<div class="flex flex-col gap-6">
			<TextField>
				<Label>Name</Label>
				<input required name="name" type="text" placeholder="John Doe" class="input" >
			</TextField>
			<TextField>
				<Label>Email</Label>
				<input required name="phoneNumber" type="email" inputmode="email" placeholder="email@example.com" class="input" >
			</TextField>
			<TextField>
				<Label>Phone number</Label>
				<input required name="phoneNumber" type="text" inputmode="tel" placeholder="09xxxxxxxx" class="input" >
			</TextField>
		</div>
		<Divider/>
		<div class="flex flex-col">		
			<TextField>
				<Label>Pick a date</Label>
				<input 
					bind:value={date} 
					required 
					name="date" 
					type="text" 
					inputmode="numeric" 
					placeholder="DD / MM / YYYY" 
					class="input" 
				>
			</TextField>
		</div>
		<Button type="submit" onclick={addPurchase}>Confirm purchase</Button>
	</form>
</section>