export const language_colors: Record<string, string> = {
	Java: '#F9A825',
	'C++': '#00599C',
	Python: '#3771A8',
	JavaScript: '#F0DB4F',
	'C#': '#8E44AD',
	PHP: '#7D3C98',
	Ruby: '#C91F37',
	Perl: '#15678F',
	Swift: '#FF9B43',
	GO: '#007D9C',
	Kotlin: '#F88C25',
	Scala: '#EA2C2C',
	R: '#0D6AB4',
	Bash: '#6CB54A',
	Rust: '#CA4E10',
	'Objective-C': '#6381F8',
	React: '#58D6F4',
	Angular: '#C3002F',
	Vue: '#41B883',
	Ember: '#FF4136',
	Svelte: '#FF3E00',
	C: '#555',
	Cobol: '#FFA500',
	Fortran: '#6A4EBF',
	Lisp: '#4A6AA7',
	Pascal: '#8CC63F',
	SQL: '#FFAF3F',
	TypeScript: '#007ACC',
	Elixir: '#6D1F7B',
	Erlang: '#AA60B6',
	Julia: '#8B6EAF',
	Haskell: '#5C8F22',
	Clojure: '#C14D3B',
	OCaml: '#5C9ECC',
	'F#': '#A837FF',
	WebAssembly: '#3178C6'
};

export function get_color(language: string | undefined): string {
	if (language === undefined) {
		return 'hsl(0, 0%, 33%)';
	}

	if (language_colors[language] !== undefined) {
		return language_colors[language];
	}

	return 'hsl(0, 0%, 33%)';
}
