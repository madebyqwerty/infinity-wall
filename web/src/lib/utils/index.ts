export const site_name = 'Track';

export function get_text_color(color: string) {
	if (!color) {
		return '#FF0000';
	}

	const r = parseInt(color.substring(1, 3), 16);
	const g = parseInt(color.substring(3, 5), 16);
	const b = parseInt(color.substring(5, 7), 16);

	const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? '#0e1015' : '#fff';
}
