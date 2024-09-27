use std::env;
use axum::{response, routing::{get, post}, Json, Router};
use dotenv::dotenv;
use http::{header::{AUTHORIZATION, CONTENT_TYPE}, HeaderMap};
use reqwest::{Client, StatusCode};
use serde::{Deserialize,Serialize};
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
	dotenv().expect(".env file not found");

	let cors = CorsLayer::new()
		.allow_methods([http::Method::POST,http::Method::GET,])
		.allow_headers(Any)
		.allow_origin(Any);

	
	let app = Router::new()
	.route("/active", get(active))
	.route("/purchase", post(add_sale))
	.layer(cors);

	let listener = tokio::net::TcpListener::bind("localhost:3000").await.unwrap();
	axum::serve(listener, app).await.unwrap();
}

async fn active() -> &'static str{
	"The server is up and running!"
}

async fn add_sale(Json(payload):Json<OrderRequest>) -> StatusCode{
	//FIXME handle missing values
	let client = Client::new();
	let api_key = env::var("SERVICE_KEY").unwrap();

	let mut headers = HeaderMap::new();
	headers.insert(AUTHORIZATION, format!("Bearer {}",api_key).parse().unwrap() );
	headers.insert("apiKey", api_key.parse().unwrap() );
	headers.insert(CONTENT_TYPE, "application/json".parse().unwrap());
	headers.insert("prefer", "return=minimal".parse().unwrap());

	let body = OrderBody::from(payload);
	let response = client.post("https://xgeaoarxkbluxxzuxyeb.supabase.co/rest/v1/sales")
		.headers(headers)
		.json(&body)
		.send().await;

	match response {
		Ok(resp) => {
			let status = resp.status();
			dbg!(&resp.text().await.unwrap());
			status
		}
		Err(err) => {
			dbg!(err);
			StatusCode::INTERNAL_SERVER_ERROR
		}
	}
}	

#[derive(Serialize,Deserialize,Debug)]
#[serde(deny_unknown_fields)]
struct OrderRequest{
	name:String,
	phone_number:String,
	email:String,
	date:String,
	message_type:String,
	image:Option<String>,
	flavour:String,
	total:f32,
	quantity:i32,
	size:String,
	shape:String,
	toppings:Vec<String>,
	message:Option<String>
}

#[derive(Debug,Serialize,Deserialize)]
#[serde(deny_unknown_fields)]
struct OrderBody{
	name:String,
	phone_number:String,
	email:String,
	date:String,
	message_type:String,
	flavour:String,
	total:f32,
	quantity:i32,
	size:String,
	shape:String,
	toppings:Vec<String>,
	message:Option<String>
}

impl From<OrderRequest> for OrderBody {
	fn from(order: OrderRequest) -> Self {
		Self { 
			name:order.name, 
			phone_number: order.phone_number, 
			email: order.email, 
			date: order.date, 
			message_type: order.message_type, 
			flavour: order.flavour, 
			total: order.total, 
			quantity: order.quantity, 
			message: order.message,
			size: order.size,
			toppings: order.toppings,
			shape: order.shape
		}
	}
}