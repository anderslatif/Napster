<script>
    export let onSubmit;
    export let content;

	let isEditing = false;
	
	function handleSubmit(event) {
		if (event.code === "Enter" || event.code === "Escape") {
			isEditing = false;
            onSubmit(content);
		}
	}
</script>

<div class="editable-field" on:dblclick={() => isEditing = true}>
	{#if isEditing}
		<input class="editable-input" bind:value={content} on:keydown={handleSubmit} />
	{:else}
		{content}
	{/if}
</div>

<style>
    .editable-field {
        background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(55, 55, 55) 82%);
    }

    .editable-input {
        background: linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(55, 55, 55) 82%); 
        color: white;
    }
</style>