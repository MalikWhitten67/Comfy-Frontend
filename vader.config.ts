import defineConfig from 'vaderjs/config'
import tailwindcss from 'vaderjs/plugins/tailwind'
export default  defineConfig({
    port: 3001,
    host_provider: 'vercel',
    plugins:[tailwindcss]
})
