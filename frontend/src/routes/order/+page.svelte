<script lang="ts">
    import { UploadCloudIcon } from "svelte-feather-icons";
    import OrderForm from "./order_form.svelte";
    import Text from "$lib/components/text.svelte";
    import Button from "$lib/components/button.svelte";

	let imageInput:HTMLInputElement;
	let fileName: string | null = null;
	let file: string | null = null;

	async function parseFile(){
		if (imageInput.files === null) {
			return
		}

		let image = imageInput.files[0]

		// Only support png and jpg files
		if (image.type !== "image/png" && image.type !== "image/jpg"){
			alert("Unsupported file")
			return
		}

		// 5mb max file size
		if (image.size > 5 * 1024 * 1024) {
			alert("File too big")
			return
		}

		fileName = image.name

		let reader = new FileReader()
		reader.onload = (e) => {
			if (e.target){
				file = e.target.result
			}
		}
		reader.readAsDataURL(image) 
	}
</script>

<svelte:head>
	<title>Order a cake</title>
</svelte:head>
<main class="flex flex-col md:flex-row gap-3 sm:gap-7 md:gap-0 sm:px-6 md:px-0 sm:py-12 md:py-0 bg-neutral-100 l:bg-white">
	<section class="bg-neutral-100 hidden sm:flex md:py-11 md:px-8 lg:px-11 justify-center flex-1">
		<div class="flex flex-col items-center justify-center gap-7 rounded-5 w-full bg-white max-w-[650px] h-[450px]">
			<UploadCloudIcon size="66"/>
			<div class="flex flex-col gap-1 items-center">
				<Text>Have an idea of the cake you want?</Text>
				<Text weight="medium">{fileName ?? "Pick an image"}</Text>
				<input 
					bind:this={imageInput} 
					on:input={parseFile} 
					type="file" 
					name="image" 
					id="image" 
					class="hidden"
				>
			</div>
			<Button fit onclick={()=>{imageInput.click()}} style="bordered">Upload an image</Button>
		</div>
	</section>
	<OrderForm bind:image={file}/>
</main>
