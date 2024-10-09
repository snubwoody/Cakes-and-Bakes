<script>
    import { Input, Label, TextField } from "$lib/components/input";
    import { MailIcon } from "svelte-feather-icons";

</script>

<main class="w-screen h-[100dvh] flex items-center justify-center">
	<Input>
		<Label>Email</Label>
		<TextField oninput={(event) => {console.log(event.target?.value)}} placeholder="email@example.com"/>
	</Input>
</main>
