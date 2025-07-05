import fs from 'fs'
import path from 'path'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { elements, siteConfig } = req.body
    const websiteData = {
      elements,
      siteConfig,
      lastModified: new Date().toISOString(),
      userId: session.user.id
    }

    // Save to a JSON file (in production, you'd use a proper database)
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    const filePath = path.join(dataDir, `website-${session.user.id}.json`)
    fs.writeFileSync(filePath, JSON.stringify(websiteData, null, 2))

    res.status(200).json({ message: 'Website saved successfully' })
  } catch (error) {
    console.error('Error saving website:', error)
    res.status(500).json({ error: 'Failed to save website' })
  }
}