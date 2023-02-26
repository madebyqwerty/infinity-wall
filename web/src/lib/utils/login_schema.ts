import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const login_schema = zfd.formData({
	email: z.string({ required_error: 'Email nebo uživatelské jmené nesmí být prázdné' }),
	password: z.string({ required_error: 'Heslo nesmí být prázdné' })
});
