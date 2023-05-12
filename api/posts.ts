import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getPosts } from '../lib/controllers/posts.js'
export default async function (
  request: VercelRequest,
  response: VercelResponse
): Promise<void> {
  const posts = await getPosts()
  response.send(posts)
}
