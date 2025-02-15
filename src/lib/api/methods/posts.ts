/**
 * Dependence
 */
import { catchrequest, checkokstatus } from '$lib/api/utils/requests';
import { api } from '$lib/api/api';
import { ErrorUtils } from '$lib/utils/error';
import { saveCache, getCache } from '$lib/api/utils/localCache';

/**
 * Types
 */
import type { AxiosError, AxiosResponse } from 'axios';
import type { IPostsResponse } from '$lib/api/types/response/posts';
import type { ISuccessResponse, ServerResponse } from '$lib/api/types/response/utils';
import type { IPost } from '$lib/api/types/models/post';

/**
 * Get All
 * @description Запрос для получения данных по постам
 * @returns {ServerResponse<IPostsResponse>}
 */
async function getAll(): ServerResponse<IPostsResponse> {
	try {
		const response = await api.get('/posts');
		saveCache<IPost>('posts', response.data);
		return {
			success: true,
			data: response.data,
			status: response.data
		} as ISuccessResponse<IPostsResponse>;
	} catch(e) {
		const data = getCache<IPostsResponse>('posts');
		if (data) {
			return data
		} else {
			ErrorUtils.log(e, "API: error from 'getAll'");
			return ErrorUtils.getErrorReason(e);
		}
	}
}

export default {
	getAll
};
