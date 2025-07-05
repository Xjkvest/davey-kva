import { useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useEditorStore } from '../store/editorStore'
import EditorSidebar from '../components/editor/EditorSidebar'
import ElementRenderer from '../components/editor/ElementRenderer'
import PropertyPanel from '../components/editor/PropertyPanel'
import EditorHeader from '../components/editor/EditorHeader'
import { Plus, Eye, Save, Settings, MousePointer, Hand } from 'lucide-react'

// Sortable Item Component
function SortableItem({ element, index, selectedElement, setSelectedElement, siteConfig }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`group relative ${isDragging ? 'z-50' : ''}`}
    >
      <div
        {...listeners}
        className={`absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-400 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-move z-10 ${
          selectedElement?.id === element.id ? 'opacity-100' : ''
        }`}
      >
        <Hand className="w-4 h-4 text-white m-1" />
      </div>
      <ElementRenderer
        element={element}
        isSelected={selectedElement?.id === element.id}
        onSelect={() => setSelectedElement(element)}
        siteConfig={siteConfig}
      />
    </div>
  )
}

export default function Editor() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [activeId, setActiveId] = useState(null)
  
  const {
    elements,
    selectedElement,
    setSelectedElement,
    reorderElements,
    saveWebsite,
    loadWebsite,
    siteConfig
  } = useEditorStore()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/login')
      return
    }
    loadWebsite()
  }, [session, status, router, loadWebsite])

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    
    if (active.id !== over?.id) {
      const oldIndex = elements.findIndex((element) => element.id === active.id)
      const newIndex = elements.findIndex((element) => element.id === over?.id)
      
      reorderElements(oldIndex, newIndex)
    }
    
    setActiveId(null)
  }

  const handleSave = async () => {
    setIsSaving(true)
    await saveWebsite()
    setIsSaving(false)
  }

  const handlePreview = () => {
    setIsPreview(!isPreview)
    setSelectedElement(null)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <EditorHeader 
        onPreview={handlePreview}
        onSave={handleSave}
        isPreview={isPreview}
        isSaving={isSaving}
        siteConfig={siteConfig}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {!isPreview && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="w-80 bg-white border-r border-gray-200 flex flex-col"
          >
            <EditorSidebar />
          </motion.div>
        )}

        {/* Main Editor Area */}
        <div className="flex-1 flex">
          {/* Canvas */}
          <div className="flex-1 overflow-auto bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto">
              {/* Website Preview Container */}
              <div 
                className="bg-white min-h-screen shadow-lg rounded-lg overflow-hidden"
                style={{ backgroundColor: siteConfig.backgroundColor }}
              >
                {isPreview ? (
                  // Preview Mode
                  <div className="relative">
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={handlePreview}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
                      >
                        <MousePointer className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                    <div className="space-y-0">
                      {elements.map((element) => (
                        <ElementRenderer
                          key={element.id}
                          element={element}
                          isPreview={true}
                          siteConfig={siteConfig}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  // Edit Mode
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="min-h-screen p-4">
                      {elements.length === 0 ? (
                        <div className="h-96 flex items-center justify-center text-gray-500">
                          <div className="text-center">
                            <Plus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-lg font-medium">Start building your website</p>
                            <p className="text-sm">Drag components from the sidebar to get started</p>
                          </div>
                        </div>
                      ) : (
                        <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
                          {elements.map((element, index) => (
                            <SortableItem
                              key={element.id}
                              element={element}
                              index={index}
                              selectedElement={selectedElement}
                              setSelectedElement={setSelectedElement}
                              siteConfig={siteConfig}
                            />
                          ))}
                        </SortableContext>
                      )}
                    </div>
                  </DndContext>
                )}
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          {!isPreview && selectedElement && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              className="w-80 bg-white border-l border-gray-200"
            >
              <PropertyPanel element={selectedElement} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}