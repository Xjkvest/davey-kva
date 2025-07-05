import fs from 'fs'
import path from 'path'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const filePath = path.join(process.cwd(), 'data', `website-${session.user.id}.json`)
    
    if (!fs.existsSync(filePath)) {
      // Return empty data if no saved website exists
      return res.status(200).json({
        elements: [],
        siteConfig: {
          title: 'My Website',
          description: 'A beautiful website built with the drag-and-drop builder',
          primaryColor: '#3b82f6',
          secondaryColor: '#1e40af',
          font: 'Inter',
          backgroundColor: '#ffffff',
        }
      })
    }

    const websiteData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    res.status(200).json(websiteData)
  } catch (error) {
    console.error('Error loading website:', error)
    res.status(500).json({ error: 'Failed to load website' })
  }
}