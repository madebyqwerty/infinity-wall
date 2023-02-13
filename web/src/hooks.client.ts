import { pb } from '@pocketbase';
import auth_store from '@stores/auth_store';

pb.authStore.loadFromCookie(document.cookie);

if (pb.authStore.isValid) {
	console.log('valid');
	auth_store.set(pb.authStore.model);
} else {
	console.log('invalid');
}
