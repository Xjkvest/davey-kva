import { useState } from 'react'
import { motion } from 'framer-motion'
import { useEditorStore } from '../../store/editorStore'
import { 
  Type, 
  Image, 
  Video, 
  Layout, 
  Square, 
  List, 
  Link, 
  Phone, 
  Mail, 
  MapPin,
  Star,
  Calendar,
  BarChart3,
  Quote
} from 'lucide-react'

const componentLibrary = [
  {
    id: 'text',
    name: 'Text',
    icon: Type,
    category: 'content',
    defaultContent: {
      type: 'text',
      content: {
        text: 'Your text here',
        tag: 'p',
        alignment: 'left'
      },
      styles: {
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'normal',
        lineHeight: '1.5'
      }
    }
  },
  {
    id: 'heading',
    name: 'Heading',
    icon: Type,
    category: 'content',
    defaultContent: {
      type: 'heading',
      content: {
        text: 'Your Heading',
        tag: 'h1',
        alignment: 'left'
      },
      styles: {
        fontSize: '32px',
        color: '#000000',
        fontWeight: 'bold',
        lineHeight: '1.2'
      }
    }
  },
  {
    id: 'image',
    name: 'Image',
    icon: Image,
    category: 'media',
    defaultContent: {
      type: 'image',
      content: {
        src: 'https://via.placeholder.com/400x300',
        alt: 'Placeholder image',
        caption: ''
      },
      styles: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px'
      }
    }
  },
  {
    id: 'video',
    name: 'Video',
    icon: Video,
    category: 'media',
    defaultContent: {
      type: 'video',
      content: {
        src: '',
        embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        autoplay: false
      },
      styles: {
        width: '100%',
        height: '400px',
        borderRadius: '8px'
      }
    }
  },
  {
    id: 'button',
    name: 'Button',
    icon: Square,
    category: 'interactive',
    defaultContent: {
      type: 'button',
      content: {
        text: 'Click Me',
        url: '#',
        target: '_self'
      },
      styles: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'medium',
        border: 'none',
        cursor: 'pointer'
      }
    }
  },
  {
    id: 'list',
    name: 'List',
    icon: List,
    category: 'content',
    defaultContent: {
      type: 'list',
      content: {
        items: ['Item 1', 'Item 2', 'Item 3'],
        listType: 'ul'
      },
      styles: {
        fontSize: '16px',
        color: '#000000',
        lineHeight: '1.6'
      }
    }
  },
  {
    id: 'divider',
    name: 'Divider',
    icon: Layout,
    category: 'layout',
    defaultContent: {
      type: 'divider',
      content: {
        style: 'solid'
      },
      styles: {
        borderColor: '#e5e7eb',
        borderWidth: '1px',
        margin: '20px 0'
      }
    }
  },
  {
    id: 'spacer',
    name: 'Spacer',
    icon: Layout,
    category: 'layout',
    defaultContent: {
      type: 'spacer',
      content: {
        height: '40px'
      },
      styles: {}
    }
  },
  {
    id: 'contact',
    name: 'Contact Info',
    icon: Phone,
    category: 'contact',
    defaultContent: {
      type: 'contact',
      content: {
        phone: '+1 (555) 123-4567',
        email: 'hello@example.com',
        address: '123 Main St, City, State 12345'
      },
      styles: {
        fontSize: '16px',
        color: '#000000',
        lineHeight: '1.6'
      }
    }
  },
  {
    id: 'testimonial',
    name: 'Testimonial',
    icon: Quote,
    category: 'content',
    defaultContent: {
      type: 'testimonial',
      content: {
        quote: 'This is an amazing product! Highly recommended.',
        author: 'John Doe',
        position: 'CEO, Company'
      },
      styles: {
        fontSize: '18px',
        color: '#000000',
        fontStyle: 'italic',
        textAlign: 'center'
      }
    }
  }
]

const categories = [
  { id: 'all', name: 'All', icon: Layout },
  { id: 'content', name: 'Content', icon: Type },
  { id: 'media', name: 'Media', icon: Image },
  { id: 'interactive', name: 'Interactive', icon: Square },
  { id: 'layout', name: 'Layout', icon: Layout },
  { id: 'contact', name: 'Contact', icon: Phone }
]

export default function EditorSidebar() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { addElement } = useEditorStore()

  const filteredComponents = componentLibrary.filter(component => 
    activeCategory === 'all' || component.category === activeCategory
  )

  const handleAddElement = (componentData) => {
    addElement(componentData.defaultContent)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Components</h2>
        <p className="text-sm text-gray-500">Drag to add to your page</p>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                {category.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Components */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredComponents.map((component) => {
            const Icon = component.icon
            return (
              <motion.div
                key={component.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                onClick={() => handleAddElement(component)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{component.name}</h3>
                    <p className="text-xs text-gray-500 capitalize">{component.category}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}