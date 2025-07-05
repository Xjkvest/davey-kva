# Content Ops Starter

![Content Ops Starter](https://assets.stackbit.com/docs/content-ops-starter-thumb.png)

Netlify starter that's made for customization with a flexible content model, component library, [visual editing](https://docs.netlify.com/visual-editor/overview/) and [Git Content Source](https://docs.netlify.com/create/content-sources/git/).

**⚡ View demo:** [https://content-ops-starter.netlify.app/](https://content-ops-starter.netlify.app/)

## Table of Contents

- [Deploying to Netlify](#deploying-to-netlify)
- [Develop with Netlify Visual Editor Locally](#develop-with-netlify-visual-editor-locally)
- [Building for production](#building-for-production)
- [Setting Up Algolia Search](#setting-up-algolia-search)
- [Next Steps](#next-steps)
- [Support](#support)

## Deploying to Netlify

If you click "Deploy to Netlify" button, it will create a new repo for you that looks exactly like this one, and sets that repo up immediately for deployment on Netlify.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/content-ops-starter)

## Develop with Netlify Visual Editor Locally

The typical development process is to begin by working locally. Clone this repository, then run `npm install` in its root directory.

Run the Next.js development server:

```txt
cd content-ops-starter
npm run dev
```

Install the [Netlify Visual Editor CLI](https://www.npmjs.com/package/@stackbit/cli). Then open a new terminal window in the same project directory and run the Netlify visual editor dev server:

```txt
npm install -g @stackbit/cli
stackbit dev
```

This outputs your own Netlify visual editor URL. Open this, register, or sign in, and you will be directed to Netlify's visual editor for your new project.

![Next.js Dev + Visual Editor Dev](https://assets.stackbit.com/docs/next-dev-stackbit-dev.png)

## Building for production

To build a static site for production, run the following command

```shell
npm run build
```

## Setting Up Algolia Search

This starter includes Algolia search integration. To set it up:

1. Create an [Algolia](https://www.algolia.com/) account
2. Create a new application and index
3. Set the following environment variables:
   - `NEXT_PUBLIC_ALGOLIA_APP_ID` - Your Algolia application ID
   - `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY` - Your Algolia search-only API key
   - `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` - Your index name

## Next Steps

Here are a few suggestions on what to do next if you're new to Netlify visual editor:

- Learn [Netlify visual editor overview](https://docs.netlify.com/visual-editor/visual-editing/)
- Check [Netlify visual editor reference documentation](https://visual-editor-reference.netlify.com/)

## Support

If you get stuck along the way, get help in our [support forums](https://answers.netlify.com/).

# Drag & Drop Website Builder

![Website Builder](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Drag+%26+Drop+Website+Builder)

A modern, intuitive drag-and-drop website builder similar to Google Sites but with advanced customization options like Squarespace. Built with Next.js, React, and Tailwind CSS.

## ✨ Features

- **🎨 Drag & Drop Interface**: Intuitive visual editor with drag-and-drop functionality
- **🔐 Authentication**: Secure login system with NextAuth
- **🎯 Component Library**: Rich set of pre-built components (text, images, buttons, etc.)
- **🎨 Advanced Customization**: Fine-tune colors, fonts, spacing, and more
- **📱 Responsive Design**: Mobile-first approach with responsive layouts
- **👀 Live Preview**: Real-time preview of your changes
- **💾 Auto-Save**: Automatic saving of your work
- **🔧 Custom CSS**: Support for custom CSS for advanced users
- **🚀 Fast Performance**: Built with Next.js for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drag-drop-website-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and update the values:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Demo Credentials

To try the builder immediately, use these demo credentials:

- **Username**: `admin`
- **Password**: `admin123`

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Drag & Drop**: React Beautiful DnD
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Project Structure

```
src/
├── components/
│   └── editor/
│       ├── EditorHeader.js      # Top navigation bar
│       ├── EditorSidebar.js     # Component library
│       ├── ElementRenderer.js   # Renders website elements
│       └── PropertyPanel.js     # Element customization panel
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth].js # Authentication config
│   │   ├── save-website.js      # Save website API
│   │   └── load-website.js      # Load website API
│   ├── editor.js                # Main drag-and-drop editor
│   ├── login.js                 # Login page
│   └── index.js                 # Landing page
├── store/
│   └── editorStore.js           # Global state management
└── css/
    └── main.css                 # Global styles
```

## 🎨 Component Library

The builder includes a comprehensive component library:

### Content Components
- **Text**: Paragraphs and body text
- **Headings**: H1-H6 headings with customizable styling
- **Lists**: Bullet and numbered lists
- **Testimonials**: Customer testimonials with author info

### Media Components
- **Images**: Responsive images with captions
- **Videos**: Embedded videos from YouTube, Vimeo, etc.

### Interactive Components
- **Buttons**: Customizable call-to-action buttons
- **Links**: Text and button links

### Layout Components
- **Spacers**: Add vertical spacing
- **Dividers**: Horizontal dividers and separators

### Contact Components
- **Contact Info**: Phone, email, and address display

## 🎯 Usage

### Building a Website

1. **Login**: Use the demo credentials or set up your own authentication
2. **Add Components**: Click components from the sidebar to add them to your page
3. **Customize**: Select any element to customize its content and styling
4. **Rearrange**: Drag elements to reorder them on your page
5. **Preview**: Toggle preview mode to see your site as visitors would
6. **Save**: Your changes are automatically saved

### Customization Options

Each component can be customized with:

- **Content**: Text, images, links, and other content
- **Styling**: Colors, fonts, sizes, and spacing
- **Layout**: Width, height, margins, and padding
- **Advanced**: Custom CSS for power users

### Site Configuration

Global site settings include:

- **Site Title**: Your website's name
- **Primary Color**: Main brand color
- **Secondary Color**: Accent color
- **Background Color**: Page background
- **Typography**: Font family and sizing

## 🔧 Development

### Adding New Components

1. **Define Component**: Add to `componentLibrary` in `EditorSidebar.js`
2. **Render Logic**: Add rendering logic in `ElementRenderer.js`
3. **Property Controls**: Add customization options in `PropertyPanel.js`

### Extending Functionality

- **New Element Types**: Add new component types to the library
- **Advanced Styling**: Extend the styling system with new options
- **Custom Animations**: Add entrance/exit animations
- **Templates**: Create pre-built page templates

## 📚 API Reference

### Save Website
```javascript
POST /api/save-website
Content-Type: application/json

{
  "elements": [...],
  "siteConfig": {...}
}
```

### Load Website
```javascript
GET /api/load-website
```

## 🚀 Deployment

### Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

### Vercel

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy!

## 🛠️ Production Considerations

- **Database**: Replace JSON file storage with a proper database (MongoDB, PostgreSQL)
- **File Storage**: Use cloud storage for user-uploaded images
- **Authentication**: Configure proper OAuth providers or user registration
- **Security**: Update NEXTAUTH_SECRET and implement proper CSRF protection
- **Performance**: Optimize images and implement lazy loading
- **SEO**: Add meta tags and structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Google Sites' simplicity and Squarespace's design quality
- Built with amazing open-source tools and libraries
- Thanks to the React and Next.js communities

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Happy Building!** 🎉
