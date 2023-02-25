import type { UsersResponse } from '@pocketbase/types';

export function get_user_by_id(users: UsersResponse[]) {
	return users.find((user) => user.id);
}
