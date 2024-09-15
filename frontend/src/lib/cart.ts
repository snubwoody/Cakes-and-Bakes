import { browser } from "$app/environment"
import OrderForm from "../routes/order/order_form.svelte"

export interface CartItem{
	flavour:string,
	size:string,
	messageType:string,
	shape:string,
	message?:string,
	quantity:number,
	price:number
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

		//console.log(response.status)
	}

	//FIXME not working
	remove(index:number){
		let newCart = this.items.filter((item,itemIndex)=>{
			itemIndex !== index
		})
		console.log(newCart,this.items)
		localStorage.setItem('cart',JSON.stringify(newCart))
	}
}

export function addSale(order:Order){
	let cart = new Cart()
}



