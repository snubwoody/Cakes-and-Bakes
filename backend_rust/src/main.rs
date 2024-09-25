use axum::{routing::{get, post}, Json, Router};
use reqwest::StatusCode;
use serde::{Deserialize,Serialize};
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {

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
	dbg!(payload);
	StatusCode::INTERNAL_SERVER_ERROR
}	

#[derive(Deserialize,Serialize,Debug)]
struct OrderRequest{
	name:String,
	phone_number:String,
	email:String,
	address:Option<String>,
	date:String,
	message_type:String,
	image:Option<String>,
	flavour:String,
	total:f32,
	quantity:i32,
	message:Option<String>
}