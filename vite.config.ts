import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { handleIntakeRequest } from './server/intake/handler'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.INTAKE_MODEL) {
    process.env.INTAKE_MODEL = env.INTAKE_MODEL
  }

  // Local dev twin of api/intake.ts (the Vercel function) — same handler.
  function intakeApiDev(): Plugin {
    return {
      name: 'intake-api-dev',
      configureServer(server: ViteDevServer) {
        server.middlewares.use('/api/intake', (req, res, next) => {
          if (req.method !== 'POST') {
            next()
            return
          }
          const chunks: Buffer[] = []
          req.on('data', (chunk) => chunks.push(chunk))
          req.on('end', async () => {
            let parsed: unknown
            try {
              parsed = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
            } catch {
              res.statusCode = 400
              res.setHeader('content-type', 'application/json')
              res.end(JSON.stringify({ error: 'bad_request' }))
              return
            }
            const result = await handleIntakeRequest(parsed, env.ANTHROPIC_API_KEY)
            res.statusCode = result.status
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(result.body))
          })
        })
      },
    }
  }

  return {
    server: {
      port: Number(process.env.PORT) || 5173,
    },
    plugins: [react(), intakeApiDev()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
