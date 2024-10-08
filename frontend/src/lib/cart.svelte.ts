import { browser } from "$app/environment"
import { goto } from "$app/navigation"
import { derived, writable, type Writable } from "svelte/store"

export interface CartItem{
	flavour:string,
	size:string,
	message_type:string,
	shape:string,
	message?:string,
	quantity:number,
	price:number,
	toppings:string[],
	image:string | null
}

export interface Order{
    name:string,
    phone_number:string,
    email:string,
    date:string,
	items:CartItem[]
}

export interface OrderInfo{
	name:string,
	email:string,
	phone_number:string,
	date:string
}


// TODO change this to a class 
export function createCart(){
	let items = $state<CartItem[]>([])

	let total = $derived(
		items.reduce((prevVal,item)=>{
			return prevVal += item.price * item.quantity
		},0)
	)
	
	if(browser){
		if(!localStorage.getItem('cart')){
			localStorage.setItem('cart',JSON.stringify([]))
		}
		let cartItems = JSON.parse(localStorage.getItem('cart') ?? '[]')
		items = cartItems
	}

	return{
		get items(){
			return items
		},
		get total() {
			return total
		},
		increment: (index:number) => {
			items[index].quantity += 1;
			localStorage.setItem('cart',JSON.stringify(items))
		},
		decrement: (index:number) => {
			if (items[index].quantity === 1){
				items.splice(index,1)
				localStorage.setItem('cart',JSON.stringify(items))
				return 
			}
			items[index].quantity -= 1;
			localStorage.setItem('cart',JSON.stringify(items))
		},
		add: (item:CartItem) => {
			items.push(item)
			localStorage.setItem('cart',JSON.stringify(items))
		},
		empty: () => {
			items = [],
			localStorage.setItem('cart',JSON.stringify(items))
		},
		// TODO this isn't cart specific so move it out
		addSale: async (orderInfo:OrderInfo) => {
			
			const order:Order = {
				items:cart.items,
				...orderInfo
			}

			// TODO handle the different response types
			const response = await fetch("http://localhost:3000/purchase",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(order)
			})

			if (response.ok){
				cart.empty()
				goto("/checkout/success")
				return
			}

			alert("Something went wrong, please try again")
		}
	}	
}

export let cart = createCart()

