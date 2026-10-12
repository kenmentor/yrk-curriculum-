import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter({ runtime: 'nodejs22.x' }),
		alias: {
			$lib: './src/lib'
		}
	}
};

export default config;
