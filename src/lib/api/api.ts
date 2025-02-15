/**
 * Dependence
 */
import axios from 'axios';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

/**
 * Dependence Types
 */
import type { AxiosInstance } from 'axios';

/**
 * API
 * @type {axios.AxiosInstance}
 */

axios.interceptors.response.use(
  response => response,
  error => {
    throw error; 
  }
);

export const api: AxiosInstance = axios.create({
	baseURL: PUBLIC_API_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
	},
	validateStatus: () => true
});
