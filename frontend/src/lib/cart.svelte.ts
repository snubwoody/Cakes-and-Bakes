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

export function useCart(){
	let {subscribe, set, update}= writable<CartItem[]>([])
	if(browser){
		if(!localStorage.getItem('cart')){
			localStorage.setItem('cart',JSON.stringify([]))
		}
		let cartItems = JSON.parse(localStorage.getItem('cart') ?? '[]')
		set(cartItems)
	}

	return {
		subscribe,
		//FIXME this is not reactive
		total: ():number =>  {
			let total = 0;
			const unsubscribe = subscribe((items)=>{
				total = items.reduce((prevVal,item)=>{
					return prevVal += item.price * item.quantity
				},0)
			})
			//update()

			return total
		},
		increment: (index:number) => {
			update(items => {
				items[index].quantity += 1;
				localStorage.setItem('cart',JSON.stringify(items))
				return items
			})
		},
		decrement: (index:number) => {
			update(items => {
				if (items[index].quantity === 1){
					return items
				}
				items[index].quantity -= 1;
				localStorage.setItem('cart',JSON.stringify(items))
				return items
			})
		},
		add: (item:CartItem) => {
			update(items => {
				items.push(item)
				localStorage.setItem('cart',JSON.stringify(items))
				return items
			})
		},
		//FIXME remove from cart not working
		remove: (index:number) => {
			update(items => {
				let newCart = items.filter((item,itemIndex)=>{
					itemIndex !== index
				})
				localStorage.setItem('cart',JSON.stringify(newCart))
				return newCart
			})
		},
		addSale: async (orderInfo:OrderInfo) => {
			let cart:CartItem[] = [];
			let unsubscribe = subscribe((items)=>{
				cart = items
			})
			let item = cart[0]
	
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
			unsubscribe()
		}
	}
}


export let cart = createCart()

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
export class Cart{
	items:CartItem[]

	constructor() {
		if(browser){
			if(!localStorage.getItem('cart')){
				localStorage.setItem('cart',JSON.stringify([]))
			}

			let cart = JSON.parse(localStorage.getItem('cart') ?? '[]')
			this.items = cart
			return
		}
		this.items = []
	}

	get total():number {
		let total = this.items.reduce((prevVal,item)=>{
			return prevVal += item.price * item.quantity
		},0)
		
		return total
	}

	add(item:CartItem){
		this.items.push(item)
		localStorage.setItem('cart',JSON.stringify(this.items))
	}

	increment(index:number){
		this.items[index].quantity += 1;
		localStorage.setItem('cart',JSON.stringify(this.items))
	}

	decrement(index:number){
		if (this.items[index].quantity === 1) {
			this.remove(index)
			localStorage.setItem('cart',JSON.stringify(this.items))
			return
		}
		this.items[index].quantity -= 1;
		localStorage.setItem('cart',JSON.stringify(this.items))
	}

	async addSale(orderInfo:OrderInfo){
		let item = this.items[0]

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

	//FIXME remove from cart not working
	remove(index:number){
		let newCart = this.items.filter((item,itemIndex)=>{
			itemIndex !== index
		})
		console.log(newCart,this.items)
		localStorage.setItem('cart',JSON.stringify(newCart))
	}
}


