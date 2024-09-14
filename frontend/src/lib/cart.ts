import { browser } from "$app/environment"
import { supabase } from "./lib"

export interface CartItem{
	flavour:string,
	size:string,
	messageType:string,
	shape:string,
	message?:string,
	quantity:number,
	price:number
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

	//FIXME not working
	remove(index:number){
		let newCart = this.items.filter((item,itemIndex)=>{
			itemIndex !== index
		})
		console.log(newCart,this.items)
		localStorage.setItem('cart',JSON.stringify(newCart))
	}
}

export function addSale(){
	let k:Order = {flavour:""}
}

interface Order{
	id?:string,
	flavour:string
}

