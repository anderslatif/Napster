<script>
    import { songsProcessedCount } from '../../store.js';
</script>

{#if $songsProcessedCount.remaining > 0 && $songsProcessedCount.total > 0}
    <progress value={$songsProcessedCount.percentage} />
{/if}

<style>
	progress {
		display: block;
		width: 100%;
	}
</style>