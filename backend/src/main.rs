mod utils;
mod orders;
mod image;
use axum::{
    routing::{get, post},
    Json, Router,
};
use dotenv::dotenv;
use http::{
    header::{AUTHORIZATION, CONTENT_TYPE},
    HeaderMap,
};
use image::{decode_image, save_image};
use orders::{OrderBody, OrderRequest};
use reqwest::{Client, StatusCode};
use ulid::Ulid;
use uuid::Uuid;
use std::env;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    dotenv().expect(".env file not found");

    let cors = CorsLayer::new()
        .allow_methods([http::Method::POST, http::Method::GET])
        .allow_headers(Any)
        .allow_origin(Any); //TODO change this in PROD

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

	// The shared id for things ordered together
	let shared_id = Ulid::new().to_string();

    let body:Vec<OrderBody> = payload
        .items
        .iter()
        .map(|item| {
			let id = Uuid::new_v4();
			// Save the images
			match item.image {
				Some(ref image) => {
					match decode_image(image.as_str()) {
						Ok((bytes,format)) => {
							save_image(bytes,id,format);
						}
						Err(err) => {
							dbg!(err);
						}
					}
					
				},
				None => {}	
			};
			OrderBody::new(&payload,item,&shared_id,id)
		})
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
