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

	let api_key = env::var("SERVICE_KEY").expect("API_KEY must be set");
	dbg!(api_key);

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
	let client = Client::new();
	let mut headers = HeaderMap::new();
	headers.insert(AUTHORIZATION, "Bearer".parse().unwrap());
	headers.insert(CONTENT_TYPE, "application/json".parse().unwrap());
	headers.insert("apiKey", "application/json".parse().unwrap());
	headers.insert("prefer", "return=minimal".parse().unwrap());

	let response = client.post("https://xgeaoarxkbluxxzuxyeb.supabase.co/rest/v1/sales")
		.body("")
		.headers(headers)
		.send().await;

	dbg!(response);

	dbg!(payload);
	StatusCode::CREATED
}	

#[derive(Deserialize,Debug)]
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
	message:Option<String>
}

#[derive(Debug,Serialize)]
struct OrderBody{
	name:String,
	phone_number:String,
	email:String,
	date:String,
	message_type:String,
	flavour:String,
	total:f32,
	quantity:i32,
	message:Option<String>
}