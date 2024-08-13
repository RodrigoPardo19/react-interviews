import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		server: {
			port: Number(env.VITE_LOCAL_PORT) ?? 5173,
		},
		plugins: [react()],
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: './src/tests/setup.ts',
			include: ['./src/tests/**/*.{test.tsx,test.ts}'],
		},
	};
});
