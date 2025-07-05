import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Save, Settings, LogOut, Globe, Palette } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'

export default function EditorHeader({ onPreview, onSave, isPreview, isSaving, siteConfig }) {
  const [showSettings, setShowSettings] = useState(false)
  const { updateSiteConfig } = useEditorStore()

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings)
  }

  const handleColorChange = (color, type) => {
    updateSiteConfig({ [type]: color })
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-bold text-gray-900">
              {siteConfig.title}
            </h1>
          </div>
          <div className="text-sm text-gray-500">
            Website Builder
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Preview Toggle */}
          <button
            onClick={onPreview}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              isPreview 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {isPreview ? 'Exit Preview' : 'Preview'}
          </button>

          {/* Save Button */}
          <button
            onClick={onSave}
            disabled={isSaving}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>

          {/* Settings Button */}
          <button
            onClick={handleSettingsToggle}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>

          {/* Logout Button */}
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-gray-50 rounded-lg p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Title
              </label>
              <input
                type="text"
                value={siteConfig.title}
                onChange={(e) => updateSiteConfig({ title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={siteConfig.primaryColor}
                  onChange={(e) => handleColorChange(e.target.value, 'primaryColor')}
                  className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={siteConfig.primaryColor}
                  onChange={(e) => handleColorChange(e.target.value, 'primaryColor')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={siteConfig.backgroundColor}
                  onChange={(e) => handleColorChange(e.target.value, 'backgroundColor')}
                  className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={siteConfig.backgroundColor}
                  onChange={(e) => handleColorChange(e.target.value, 'backgroundColor')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}