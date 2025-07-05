import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Palette, Layout, Eye } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/editor')
    }
  }, [session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (session) {
    return null // Will redirect to editor
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-blue-500" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                SiteBuilder
              </span>
            </div>
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Build Beautiful Websites
            <br />
            <span className="text-blue-500">Without Code</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Create stunning websites with our intuitive drag-and-drop builder. 
            More customization than Google Sites, cleaner than Squarespace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors border border-gray-300 flex items-center gap-2 justify-center">
              <Eye className="w-5 h-5" />
              View Demo
            </button>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Layout className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Drag & Drop Editor
            </h3>
            <p className="text-gray-600">
              Simply drag components from the sidebar and drop them onto your page. 
              No coding required.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Advanced Customization
            </h3>
            <p className="text-gray-600">
              Fine-tune every aspect of your design with our comprehensive 
              styling options and custom CSS support.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Live Preview
            </h3>
            <p className="text-gray-600">
              See your changes in real-time with our live preview mode. 
              What you see is what you get.
            </p>
          </div>
        </motion.div>

        {/* Demo credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white p-6 rounded-xl shadow-sm max-w-md mx-auto text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Try It Now</h3>
          <p className="text-gray-600 mb-4">Use these demo credentials to explore the builder:</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-mono text-sm">
              <strong>Username:</strong> admin<br />
              <strong>Password:</strong> admin123
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}