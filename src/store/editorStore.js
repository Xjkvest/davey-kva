import { create } from 'zustand'

export const useEditorStore = create((set, get) => ({
  // Editor state
  isEditing: false,
  selectedElement: null,
  elements: [],
  
  // Website configuration
  siteConfig: {
    title: 'My Website',
    description: 'A beautiful website built with the drag-and-drop builder',
    primaryColor: '#3b82f6',
    secondaryColor: '#1e40af',
    font: 'Inter',
    backgroundColor: '#ffffff',
  },
  
  // Actions
  setIsEditing: (isEditing) => set({ isEditing }),
  setSelectedElement: (element) => set({ selectedElement: element }),
  
  // Element management
  addElement: (element) => {
    const newElement = {
      id: Date.now().toString(),
      type: element.type,
      content: element.content,
      styles: element.styles || {},
      position: element.position || elements.length,
      ...element
    }
    set((state) => ({
      elements: [...state.elements, newElement]
    }))
  },
  
  updateElement: (id, updates) => {
    set((state) => ({
      elements: state.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    }))
  },
  
  deleteElement: (id) => {
    set((state) => ({
      elements: state.elements.filter(el => el.id !== id),
      selectedElement: state.selectedElement?.id === id ? null : state.selectedElement
    }))
  },
  
  reorderElements: (startIndex, endIndex) => {
    set((state) => {
      const result = Array.from(state.elements)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return { elements: result }
    })
  },
  
  // Site configuration
  updateSiteConfig: (updates) => {
    set((state) => ({
      siteConfig: { ...state.siteConfig, ...updates }
    }))
  },
  
  // Save/Load
  saveWebsite: async () => {
    const { elements, siteConfig } = get()
    const data = { elements, siteConfig }
    
    try {
      const response = await fetch('/api/save-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (response.ok) {
        console.log('Website saved successfully!')
      }
    } catch (error) {
      console.error('Error saving website:', error)
    }
  },
  
  loadWebsite: async () => {
    try {
      const response = await fetch('/api/load-website')
      const data = await response.json()
      
      if (data.elements) {
        set({ elements: data.elements })
      }
      if (data.siteConfig) {
        set({ siteConfig: data.siteConfig })
      }
    } catch (error) {
      console.error('Error loading website:', error)
    }
  }
}))