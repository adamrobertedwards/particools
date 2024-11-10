import { defineConfig } from 'vite'

export default () => {
    return defineConfig({
        base: './',
        publicDir: 'public',
        server: {
            port: 5173,
            strictPort: true,
            headers: {
                'Cross-Origin-Embedder-Policy': 'require-corp',
                'Cross-Origin-Opener-Policy': 'same-origin',
            },
        },
        resolve: {
            alias: {
              '@src': "/src",
            },
          },
    })
}
