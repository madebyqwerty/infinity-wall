import { dev } from '$app/environment';
import Pocketbase from 'pocketbase';

export const pocketbase_URL = dev ? 'http://127.0.0.1:8090' : '/';

export const pb = new Pocketbase(pocketbase_URL);
