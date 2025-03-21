import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';
import Pocketbase from 'pocketbase';

export const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL);
