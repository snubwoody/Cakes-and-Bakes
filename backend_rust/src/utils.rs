use std::time::{SystemTime, UNIX_EPOCH};

use rand::Rng;
use ulid::Ulid;


pub fn generate_shared_id() -> String{
	Ulid::new().to_string()
}