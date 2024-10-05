use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// The order that is sent to the database
#[derive(Debug, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct OrderBody {
	pub id:String,
    pub name: String,
    pub phone_number: String,
    pub email: String,
    pub date: String,
	pub total: f32,
    pub message_type: String,
    pub flavour: String,
    pub quantity: i32,
	pub shared_id: String,
    pub size: String,
    pub shape: String,
    pub toppings: Vec<String>,
    pub message: Option<String>,
}

impl OrderBody {
    pub fn new(payload:&OrderRequest,item:&Order,shared_id:&String,id:Uuid) -> Self {
        Self {
			id:id.into(),
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
			shared_id: shared_id.clone()
        }
    }
}

/// Contains information about individual orders
#[derive(Debug, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct Order {
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


/// The order received from the client
#[derive(Serialize, Deserialize, Debug)]
#[serde(deny_unknown_fields)]
pub struct OrderRequest {
    pub name: String,
    pub phone_number: String,
    pub email: String,
    pub date: String,
    pub items: Vec<Order>,
}


