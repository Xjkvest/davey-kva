import { motion } from 'framer-motion'
import { Trash2, Edit } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'

export default function ElementRenderer({ element, isSelected, onSelect, isPreview, siteConfig }) {
  const { deleteElement } = useEditorStore()

  const handleDelete = (e) => {
    e.stopPropagation()
    deleteElement(element.id)
  }

  const renderContent = () => {
    switch (element.type) {
      case 'text':
        return (
          <div style={element.styles}>
            <element.content.tag style={{ margin: 0 }}>
              {element.content.text}
            </element.content.tag>
          </div>
        )

      case 'heading':
        const HeadingTag = element.content.tag
        return (
          <HeadingTag style={{ ...element.styles, margin: 0 }}>
            {element.content.text}
          </HeadingTag>
        )

      case 'image':
        return (
          <div className="text-center">
            <img
              src={element.content.src}
              alt={element.content.alt}
              style={element.styles}
              className="max-w-full"
            />
            {element.content.caption && (
              <p className="mt-2 text-sm text-gray-600">{element.content.caption}</p>
            )}
          </div>
        )

      case 'video':
        return (
          <div className="relative">
            <iframe
              src={element.content.embedUrl}
              style={element.styles}
              frameBorder="0"
              allowFullScreen
              className="w-full"
            />
          </div>
        )

      case 'button':
        return (
          <div className="flex justify-center">
            <button
              style={element.styles}
              onClick={() => {
                if (isPreview && element.content.url) {
                  window.open(element.content.url, element.content.target)
                }
              }}
              className="transition-all hover:opacity-90"
            >
              {element.content.text}
            </button>
          </div>
        )

      case 'list':
        const ListTag = element.content.listType
        return (
          <ListTag style={element.styles}>
            {element.content.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ListTag>
        )

      case 'divider':
        return (
          <hr
            style={{
              ...element.styles,
              border: 'none',
              borderTop: `${element.styles.borderWidth} ${element.content.style} ${element.styles.borderColor}`
            }}
          />
        )

      case 'spacer':
        return (
          <div style={{ height: element.content.height }} />
        )

      case 'contact':
        return (
          <div style={element.styles}>
            {element.content.phone && (
              <p className="mb-2">
                <strong>Phone:</strong> {element.content.phone}
              </p>
            )}
            {element.content.email && (
              <p className="mb-2">
                <strong>Email:</strong> {element.content.email}
              </p>
            )}
            {element.content.address && (
              <p className="mb-2">
                <strong>Address:</strong> {element.content.address}
              </p>
            )}
          </div>
        )

      case 'testimonial':
        return (
          <div style={element.styles} className="max-w-2xl mx-auto">
            <blockquote className="mb-4">
              "{element.content.quote}"
            </blockquote>
            <cite className="text-sm">
              <strong>{element.content.author}</strong>
              {element.content.position && (
                <span className="text-gray-600"> - {element.content.position}</span>
              )}
            </cite>
          </div>
        )

      default:
        return (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-500">Unknown element type: {element.type}</p>
          </div>
        )
    }
  }

  if (isPreview) {
    return (
      <div className="py-4 px-8">
        {renderContent()}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      onClick={onSelect}
    >
      <div className="py-4 px-8 min-h-[60px] hover:bg-gray-50 transition-colors">
        {renderContent()}
      </div>

      {/* Element Controls */}
      {isSelected && (
        <div className="absolute top-2 right-2 flex items-center gap-2 bg-white shadow-lg rounded-lg p-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  )
}