<script lang="ts">
	/**
	 * Dependence
	 */
	import PostsApi from '$lib/api/methods/posts';
	import { getReasonPhrase } from 'http-status-codes';

	/**
	 * Components
	 */
	import Feed from '$lib/components/feed/Feed.svelte';
	import Loader from '$lib/components/shared/Loader.svelte';
	import ErrorComponent from '$lib/components/shared/Error.svelte';

	let message = $state('')

	/**
	 * Load data
	 * @description Метод для получения постов
	 */
	const loadData = async () => {
		const response = await PostsApi.getAll();

		if (!response.success) {
			message = 'Нет данных для отображения.'
			throw new Error(getReasonPhrase(response.data.code));
		} else if (response.status === 304) {
			message = 'Данные были загружены из локального хранилища.'
		} else {
			message = 'Были загруженны новые посты'
		}

		return response.data;
	};

</script>

{#if message}
	<div>
		{ message }
	</div>
{/if}
{#await loadData()}
	<Loader />
{:then posts}
	<Feed {posts} />
{:catch e}
	<ErrorComponent>
		{e}
	</ErrorComponent>
{/await}
