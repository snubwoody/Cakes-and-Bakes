use std::io::Cursor;
use base64::{engine::general_purpose, Engine};
use image::ImageReader;

pub fn decode_image(input:&str) -> Result<(Vec<u8>,&str),()>{
	let split_image:Vec<&str> = input.split(";base64,").collect();
	let image_format = split_image[0];
	let raw_image = split_image[1];
	let bytes = general_purpose::STANDARD.decode(raw_image);

	match bytes {
		Ok(raw_image) => {
			Ok((raw_image,image_format))
		}
		Err(err) => {
			Err(())
		}
	}
}

pub fn save_image(bytes:Vec<u8>){
	let img = ImageReader::new(Cursor::new(bytes)).with_guessed_format().unwrap().decode().unwrap();
	std::fs::create_dir("images").unwrap();
	img.save_with_format("images/image", image::ImageFormat::Png).unwrap();
	dbg!(img);
}