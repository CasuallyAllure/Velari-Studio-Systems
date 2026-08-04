import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import type { IncomingMessage, ServerResponse } from 'http'
import { handleIntakeRequest } from './server/intake/handler'
import { handleLeadRequest } from './server/intake/lead'

// Reads and JSON-parses a POST body, then hands it to `handle`, writing the
// resulting {status, body} back onto the response. Shared by both dev API
// middlewares below so they stay a twin of their api/*.ts Vercel wrapper.
function jsonApiMiddleware(
  handle: (parsed: unknown) => Promise<{ status: number; body: unknown }>,
) {
  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
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
      const result = await handle(parsed)
      res.statusCode = result.status
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify(result.body))
    })
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.INTAKE_MODEL) {
    process.env.INTAKE_MODEL = env.INTAKE_MODEL
  }

  // Local dev twin of api/intake.ts and api/lead.ts (the Vercel functions) —
  // same handlers.
  function intakeApiDev(): Plugin {
    return {
      name: 'intake-api-dev',
      configureServer(server: ViteDevServer) {
        server.middlewares.use(
          '/api/intake',
          jsonApiMiddleware((parsed) => handleIntakeRequest(parsed, env.ANTHROPIC_API_KEY)),
        )
        server.middlewares.use('/api/lead', jsonApiMiddleware(handleLeadRequest))
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
