
import { fail } from '@sveltejs/kit'; 

const API_URL = 'https://jsonplaceholder.typicode.com/posts';


export const load = async ({ fetch }) => {
	const response = await fetch(API_URL);
	const posts = await response.json();
	
	
	return {
		posts: posts.slice(0, 10).map(post => ({
			id: post.id,
			title: post.title,
			body: post.body
		}))
	};
};

export const actions = {
	
	crear: async ({ request, fetch }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const body = formData.get('body');

		
		if (!title || !body) {
			return fail(400, { 
				title, 
				body, 
				missing: true, 
				message: 'Título y cuerpo son requeridos' 
			});
		}

		
		const response = await fetch(API_URL, {
			method: 'POST',
			body: JSON.stringify({ title, body, userId: 1 }),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		});

		const newPost = await response.json();
		
		
		return { success: true, post: newPost };
	},

	
	actualizar: async ({ request, fetch }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const title = formData.get('title');
		const body = formData.get('body');

		if (!title || !body) {
			return fail(400, { error: 'Datos incompletos para actualizar' });
		}

		
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ id, title, body, userId: 1 }),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		});

		const updatedPost = await response.json();
		return { success: true, post: updatedPost };
	},

	
	eliminar: async ({ request, fetch }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		
		await fetch(`${API_URL}/${id}`, {
			method: 'DELETE'
		});

		return { success: true, id };
	}
};