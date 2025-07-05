import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEditorStore } from '../../store/editorStore'
import { 
  Type, 
  Palette, 
  Layout, 
  Link, 
  Image, 
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

export default function PropertyPanel({ element }) {
  const { updateElement } = useEditorStore()
  const [expandedSections, setExpandedSections] = useState({
    content: true,
    styles: true,
    layout: false,
    advanced: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleContentUpdate = (field, value) => {
    updateElement(element.id, {
      content: { ...element.content, [field]: value }
    })
  }

  const handleStyleUpdate = (field, value) => {
    updateElement(element.id, {
      styles: { ...element.styles, [field]: value }
    })
  }

  const renderContentControls = () => {
    switch (element.type) {
      case 'text':
      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
              <textarea
                value={element.content.text}
                onChange={(e) => handleContentUpdate('text', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {element.type === 'heading' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heading Level</label>
                <select
                  value={element.content.tag}
                  onChange={(e) => handleContentUpdate('tag', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                  <option value="h5">H5</option>
                  <option value="h6">H6</option>
                </select>
              </div>
            )}
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={element.content.src}
                onChange={(e) => handleContentUpdate('src', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
              <input
                type="text"
                value={element.content.alt}
                onChange={(e) => handleContentUpdate('alt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
              <input
                type="text"
                value={element.content.caption}
                onChange={(e) => handleContentUpdate('caption', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={element.content.text}
                onChange={(e) => handleContentUpdate('text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
              <input
                type="url"
                value={element.content.url}
                onChange={(e) => handleContentUpdate('url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
              <select
                value={element.content.target}
                onChange={(e) => handleContentUpdate('target', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="_self">Same Window</option>
                <option value="_blank">New Window</option>
              </select>
            </div>
          </div>
        )

      case 'list':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">List Type</label>
              <select
                value={element.content.listType}
                onChange={(e) => handleContentUpdate('listType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ul">Bullet List</option>
                <option value="ol">Numbered List</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
              <textarea
                value={element.content.items.join('\n')}
                onChange={(e) => handleContentUpdate('items', e.target.value.split('\n').filter(Boolean))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="One item per line"
              />
            </div>
          </div>
        )

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video Embed URL</label>
              <input
                type="url"
                value={element.content.embedUrl}
                onChange={(e) => handleContentUpdate('embedUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={element.content.phone}
                onChange={(e) => handleContentUpdate('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={element.content.email}
                onChange={(e) => handleContentUpdate('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                value={element.content.address}
                onChange={(e) => handleContentUpdate('address', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )

      case 'testimonial':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
              <textarea
                value={element.content.quote}
                onChange={(e) => handleContentUpdate('quote', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
              <input
                type="text"
                value={element.content.author}
                onChange={(e) => handleContentUpdate('author', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input
                type="text"
                value={element.content.position}
                onChange={(e) => handleContentUpdate('position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderStyleControls = () => {
    return (
      <div className="space-y-4">
        {/* Typography */}
        {(element.type === 'text' || element.type === 'heading' || element.type === 'list') && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
              <input
                type="text"
                value={element.styles.fontSize || '16px'}
                onChange={(e) => handleStyleUpdate('fontSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={element.styles.color || '#000000'}
                  onChange={(e) => handleStyleUpdate('color', e.target.value)}
                  className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={element.styles.color || '#000000'}
                  onChange={(e) => handleStyleUpdate('color', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Weight</label>
              <select
                value={element.styles.fontWeight || 'normal'}
                onChange={(e) => handleStyleUpdate('fontWeight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Light</option>
                <option value="bolder">Extra Bold</option>
              </select>
            </div>
          </>
        )}

        {/* Button Styles */}
        {element.type === 'button' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={element.styles.backgroundColor || '#3b82f6'}
                  onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
                  className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={element.styles.backgroundColor || '#3b82f6'}
                  onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={element.styles.color || '#ffffff'}
                  onChange={(e) => handleStyleUpdate('color', e.target.value)}
                  className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={element.styles.color || '#ffffff'}
                  onChange={(e) => handleStyleUpdate('color', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
              <input
                type="text"
                value={element.styles.borderRadius || '8px'}
                onChange={(e) => handleStyleUpdate('borderRadius', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {/* Image Styles */}
        {element.type === 'image' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
              <input
                type="text"
                value={element.styles.borderRadius || '8px'}
                onChange={(e) => handleStyleUpdate('borderRadius', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {/* Spacing */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Margin</label>
          <input
            type="text"
            value={element.styles.margin || '0'}
            onChange={(e) => handleStyleUpdate('margin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 20px 0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Padding</label>
          <input
            type="text"
            value={element.styles.padding || '0'}
            onChange={(e) => handleStyleUpdate('padding', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 20px"
          />
        </div>
      </div>
    )
  }

  const Section = ({ title, icon: Icon, children, sectionKey }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-4 pb-4"
        >
          {children}
        </motion.div>
      )}
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
        <p className="text-sm text-gray-500 capitalize">{element.type} element</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Section title="Content" icon={Type} sectionKey="content">
          {renderContentControls()}
        </Section>

        <Section title="Styles" icon={Palette} sectionKey="styles">
          {renderStyleControls()}
        </Section>

        <Section title="Layout" icon={Layout} sectionKey="layout">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
              <input
                type="text"
                value={element.styles.width || 'auto'}
                onChange={(e) => handleStyleUpdate('width', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
              <input
                type="text"
                value={element.styles.height || 'auto'}
                onChange={(e) => handleStyleUpdate('height', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </Section>

        <Section title="Advanced" icon={Settings} sectionKey="advanced">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
              <textarea
                value={element.customCSS || ''}
                onChange={(e) => updateElement(element.id, { customCSS: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter custom CSS properties..."
              />
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}