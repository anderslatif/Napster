<script>
	let name = "edit this";
	let isEditing = false;
	
	function handleSubmit(event) {
		if (event.code === "Enter") {
			isEditing = false;
			// todo call the store
		}
	}
</script>

<div on:dblclick={() => isEditing = true}>
	{#if isEditing}
		<input bind:value={name} on:keydown={handleSubmit} />
	{:else}
		<div>
			{name}
        </div>
	{/if}
</div>
