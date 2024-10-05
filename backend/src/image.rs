use std::io::Cursor;
use base64::{engine::general_purpose, Engine};
use image::ImageReader;
use uuid::Uuid;

pub fn decode_image(input:&str) -> Result<(Vec<u8>,&str),()>{
	let split_image:Vec<&str> = input.split(";base64,").collect();
	let image_format = split_image[0];
	let raw_image = split_image[1];
	let format:Vec<&str> = image_format.split("/").collect();
	let bytes = general_purpose::STANDARD.decode(raw_image);

	match bytes {
		Ok(raw_image) => {
			Ok((raw_image,format[1]))
		}
		Err(err) => {
			Err(())
		}
	}
}

pub fn save_image(bytes:Vec<u8>,id:Uuid,format:&str){
	let img = ImageReader::new(Cursor::new(bytes)).with_guessed_format().unwrap().decode().unwrap();
	std::fs::create_dir("images").unwrap_or_else(|_|{});
	img.save(format!("images/{}.{}",id.to_string(),format)).unwrap();
}