import { browser } from "$app/environment"
import { derived, writable, type Writable } from "svelte/store"

export interface CartItem{
	flavour:string,
	size:string,
	messageType:string,
	shape:string,
	message?:string,
	quantity:number,
	price:number,
	image:string | null
}

export interface Order{
    name:string,
    phoneNumber:string,
    email:string,
    messageType:string,
    flavour:string,
    size:string,
    shape:string,
    date:string,
    deliveryMethod:string,
	image:string | null
    address:string,
    total: number,
    quantity: number,
    message?:string
}

export interface OrderInfo{
	name:string,
	email:string,
	phoneNumber:string,
	deliveryMethod:string,
	address:string,
	date:string
}


export function createCart(){
	let items = $state<CartItem[]>([])
	// FIXME still not working
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
			let item = items[0]
			
			const order:Order = {
				flavour:item.flavour,
				messageType:item.messageType,
				message:item.message,
				size:item.size,
				shape:item.shape,
				image:item.image,
				total:20,
				quantity:1,
				...orderInfo
			}
			
			const response = await fetch("http://localhost:3000/purchase",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(order)
			})
		}
	}	
}

export let cart = createCart()

