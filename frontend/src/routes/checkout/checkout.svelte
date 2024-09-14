<script lang="ts">
    import Button from "$lib/components/button.svelte";
    import Divider from "$lib/components/divider.svelte";
	import Input from "$lib/components/input.svelte";
    import Tabs from "$lib/components/tabs.svelte";
	import Text from "$lib/components/text.svelte";
	
	let deliveryState:string;
</script>

<section class="max-w-[450px] flex flex-col gap-6">
	<Text weight="medium" size="h1">Checkout</Text>
	<div class="flex flex-col gap-8">
		<div class="flex flex-col gap-6">
			<Input name="name" label="Name" placeholder="John doe"/>
			<Input name="email" label="Email" placeholder="example@email.com"/>
			<Input name="phonenumber" label="Phone number" placeholder="09xxxxxxxx"/>	
		</div>
		<Divider/>
		<div class="flex flex-col gap-6">
			<Tabs options={["Delivery","Pick-up"]} bind:activeOption={deliveryState}/>
			{#if deliveryState === "Delivery"}
				<Input name="address" label="Address"/>
				<Input name="deliverydate" label="Delivery date" placeholder="DD / MM / YYYY"/>	
			{:else}
				<Input name="pickupdate" label="Pick up date" placeholder="DD / MM / YYYY"/>
			{/if}
		</div>
		<Divider/>
		<div class="flex flex-col gap-6 w-full">
			<Input name="cardnumber" label="Card number" placeholder="0000 0000 0000 0000"/>
			<div class="flex items-center gap-7">
				<!--FIXME fix the overflow-->
				<Input name="cardexpiry" label="Expiry" placeholder="MM / YY"/>
				<Input name="cvv" label="CVV" placeholder="xxx"/>
			</div>	
		</div>
		<Button onClick={()=>{}}>Confirm purchase</Button>
	</div>
</section>