
import type { IPostsResponse } from '$lib/api/types/response/posts';
import type { ISuccessResponse, ServerResponse } from '$lib/api/types/response/utils';

/**
 * Get chache
 * @param nameModel
 * @param data
 * @description Функция сохранения данных
 * @returns { void }
 */
export function saveCache<T>(nameModel: string, data: T[]): void {
  localStorage.setItem(nameModel, JSON.stringify(data))
}

/**
 * Get chache
 * @param nameModel
 * @description Функция получения данных
 * @returns {ISuccessResponse<T> | void }
 */
export function getCache<T>(nameModel: string): ISuccessResponse<T> | void {
  const data = localStorage.getItem(nameModel)
  if (!data) {
    new Error('Not found data')
  } else {
    return {
      success: true,
      data: JSON.parse(data!),
      status: 304
    }
  }
}