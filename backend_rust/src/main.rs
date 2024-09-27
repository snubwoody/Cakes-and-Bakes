use axum::{
    response,
    routing::{get, post},
    Json, Router,
};
use dotenv::dotenv;
use http::{
    header::{AUTHORIZATION, CONTENT_TYPE},
    HeaderMap,
};
use reqwest::{Client, StatusCode};
use serde::{Deserialize, Serialize};
use std::env;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    dotenv().expect(".env file not found");

    let cors = CorsLayer::new()
        .allow_methods([http::Method::POST, http::Method::GET])
        .allow_headers(Any)
        .allow_origin(Any);

    let app = Router::new()
        .route("/active", get(active))
        .route("/purchase", post(add_sale))
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("localhost:3000")
        .await
        .unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn active() -> &'static str {
    "The server is up and running!"
}

async fn add_sale(Json(payload): Json<OrderRequest>) -> StatusCode {
    //FIXME handle missing values
    let client = Client::new();
    let api_key = env::var("SERVICE_KEY").unwrap();

    let mut headers = HeaderMap::new();
    headers.insert(
        AUTHORIZATION,
        format!("Bearer {}", api_key).parse().unwrap(),
    );
    headers.insert("apiKey", api_key.parse().unwrap());
    headers.insert(CONTENT_TYPE, "application/json".parse().unwrap());
    headers.insert("prefer", "return=minimal".parse().unwrap());

    let body:Vec<OrderBody> = payload
        .items
        .iter()
        .map(|item| OrderBody::new(&payload, item))
		.collect();

    let response = client
        .post("https://xgeaoarxkbluxxzuxyeb.supabase.co/rest/v1/sales")
        .headers(headers)
        .json(&body)
        .send()
        .await;

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

#[derive(Serialize, Deserialize, Debug)]
#[serde(deny_unknown_fields)]
struct OrderRequest {
    pub name: String,
    pub phone_number: String,
    pub email: String,
    pub date: String,
    pub items: Vec<Order>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
struct OrderBody {
    pub name: String,
    pub phone_number: String,
    pub email: String,
    pub date: String,
	pub total: f32,
    pub message_type: String,
    pub flavour: String,
    pub quantity: i32,
    pub size: String,
    pub shape: String,
    pub toppings: Vec<String>,
    pub message: Option<String>,
}

impl OrderBody {
    pub fn new(payload:&OrderRequest,item:&Order) -> Self {
        Self {
            name: payload.name.clone(),
            phone_number: payload.phone_number.clone(),
            email: payload.email.clone(),
            date: payload.date.clone(),
            total: item.price.clone(),
            message_type: item.message_type.clone(),
            flavour: item.flavour.clone(),
            quantity: item.quantity.clone(),
            size: item.size.clone(),
            shape: item.shape.clone(),
            toppings: item.toppings.clone(),
            message: item.message.clone(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
struct Order {
    pub flavour: String,
    pub shape: String,
    pub size: String,
	pub price:f32,
    pub quantity: i32,
	pub image: Option<String>,
    pub toppings: Vec<String>,
    pub message: Option<String>,
    pub message_type: String,
}
