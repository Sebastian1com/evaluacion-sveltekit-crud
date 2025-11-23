<script>
	import { enhance } from '$app/forms'; 
	import { fade } from 'svelte/transition';

	export let data;
	export let form; 

	
	let editingId = null;

	
	function handleSubmit() {
		return async ({ update }) => {
			await update();
			editingId = null; 
		};
	}
</script>

<main class="container">
	<h1>Evaluación SvelteKit CRUD</h1>

	<section class="card create-section">
		<h2>Crear Nueva Publicación</h2>
		{#if form?.missing}
			<p class="error">{form.message}</p>
		{/if}

		<form method="POST" action="?/crear" use:enhance={handleSubmit}>
			<div class="form-group">
				<input 
					name="title" 
					placeholder="Título" 
					value={form?.title ?? ''} 
					class:error-input={form?.missing && !form?.title}
				/>
			</div>
			<div class="form-group">
				<textarea 
					name="body" 
					placeholder="Contenido" 
					class:error-input={form?.missing && !form?.body}
				>{form?.body ?? ''}</textarea>
			</div>
			<button type="submit">Publicar</button>
		</form>
	</section>

	<section class="posts-list">
		{#each data.posts as post (post.id)}
			<div class="card post" transition:fade>
				{#if editingId === post.id}
					<form method="POST" action="?/actualizar" use:enhance={handleSubmit} class="edit-form">
						<input type="hidden" name="id" value={post.id} />
						<input name="title" value={post.title} />
						<textarea name="body">{post.body}</textarea>
						<div class="actions">
							<button type="submit" class="save-btn">Guardar</button>
							<button type="button" on:click={() => editingId = null} class="cancel-btn">Cancelar</button>
						</div>
					</form>
				{:else}
					<h3>{post.title}</h3>
					<p>{post.body}</p>
					<div class="actions">
						<button on:click={() => editingId = post.id} class="edit-btn">Editar</button>
						
						<form method="POST" action="?/eliminar" use:enhance>
							<input type="hidden" name="id" value={post.id} />
							<button type="submit" class="delete-btn">Eliminar</button>
						</form>
					</div>
				{/if}
			</div>
		{/each}
	</section>
</main>

<style>
	
	.container { max-width: 800px; margin: 0 auto; padding: 2rem; font-family: sans-serif; }
	.card { border: 1px solid #ddd; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; }
	.create-section { background-color: #f9f9f9; border-color: #333; }
	.error { color: red; font-weight: bold; }
	.error-input { border-color: red; }
	.actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
	input, textarea { width: 100%; margin-bottom: 0.5rem; padding: 0.5rem; }
	button { cursor: pointer; padding: 0.5rem 1rem; }
	.delete-btn { background: #ffdddd; border: 1px solid #ffaaaa; color: #900; }
</style>