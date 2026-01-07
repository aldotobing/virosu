# VIROSU - Premium Extrait de Parfum E-commerce

A stunning, modern e-commerce website for VIROSU, a premium perfume brand specializing in Extrait de Parfum with 12-24 hour longevity. The website showcases luxury fragrances with an elegant, sophisticated design that reflects the brand's premium positioning.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Interactive Product Carousel**: Smooth, animated carousel showcasing featured products
- **Product Detail Pages**: Comprehensive product information with olfactory notes and highlights
- **Search Functionality**: Quick search to find specific fragrances
- **Shopping Cart**: Integrated cart system for seamless purchasing
- **SEO Optimized**: Proper meta tags, structured data, and social media integration
- **Performance Optimized**: Image optimization and lazy loading for fast loading times
- **Smooth Animations**: Framer Motion powered animations for enhanced user experience

## 🛠️ Technology Stack

### Frontend Framework
- **React 19**: Modern component-based architecture
- **Vite 7**: Fast build tool and development server
- **React Router DOM 7**: Client-side routing

### Styling & UI
- **Tailwind CSS 3.4**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Advanced animations and gestures
- **Lucide React**: Beautiful, accessible icon library

### Development Tools
- **Vite Imagetools**: Image optimization and processing
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing

### Performance & Optimization
- **Image Optimization**: WebP format with responsive sizing
- **Lazy Loading**: Images and components load as needed
- **Intersection Observer**: For scroll-based loading and animations

## 📁 Project Structure

```
virosu/
├── public/                 # Static assets
│   ├── assets/            # Product images and brand assets
│   ├── robots.txt         # SEO configuration
│   └── sitemap.xml        # Site map
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   │   ├── CarouselProductCard.jsx
│   │   ├── CartSidebar.jsx
│   │   ├── Hero.jsx
│   │   ├── LazyImage.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductSection.jsx
│   │   ├── ScentCarousel.jsx
│   │   ├── SearchModal.jsx
│   │   └── SplashScreen.jsx
│   ├── data/              # Product and content data
│   │   ├── optimizedProducts.js
│   │   ├── products.js
│   │   ├── about.json
│   │   └── raw_details.json
│   ├── pages/             # Route components
│   │   ├── Home.jsx
│   │   └── ProductDetail.jsx
│   ├── styles/            # Custom styles
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd virosu
```

2. Install dependencies:
```bash
# Using npm
npm install

# Using pnpm (as indicated by pnpm-lock.yaml)
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser to [http://localhost:5173](http://localhost:5173)

### Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎨 Design System

### Color Palette
- **Onyx (#050505)**: Primary background
- **Charcoal (#121212)**: Secondary background
- **Gold (#D4AF37)**: Accent color for highlights
- **Silver (#E0E0E0)**: Text color

### Typography
- **Montserrat**: Primary sans-serif font
- **Playfair Display**: Serif font for headings and elegant text

### Custom Utilities
- **Glass Panel**: Frosted glass effect for UI elements
- **Text Glow**: Subtle text glow effect
- **Scrollbar Hide**: Custom scrollbar styling
- **Responsive Background**: Subtle noise pattern

## 📦 Key Components

### ScentCarousel
An interactive, animated carousel showcasing featured products with:
- Smooth transitions between items
- Auto-rotation with pause on hover
- Mobile swipe support
- Loading states and skeleton screens

### Product Detail Pages
Comprehensive product information including:
- Olfactory notes (top, heart, base)
- Product highlights and benefits
- Image gallery with thumbnail navigation
- Size selection options
- Social sharing functionality

### Navigation & Layout
- Responsive navbar with mobile menu
- Elegant hero section with animated elements
- Product cards with detailed information
- Search modal for quick product discovery

## 📈 Performance Features

- **Image Optimization**: All images are optimized to WebP format with responsive sizing
- **Lazy Loading**: Components and images load as they come into view
- **Code Splitting**: Route-based code splitting for faster initial load
- **Intersection Observer**: Efficient scroll-based loading and animations
- **Memory Management**: Proper cleanup of event listeners and observers

## 🔧 Custom Hooks & Utilities

- **Meta Tag Management**: Dynamic meta tag updates for SEO
- **Image Optimization**: Custom image processing and optimization
- **State Persistence**: LocalStorage-based state preservation across sessions

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile**: Touch-friendly interface with swipe gestures
- **Tablet**: Balanced layout between mobile and desktop
- **Desktop**: Full-featured experience with enhanced visual elements

## 🌐 SEO & Social Integration

- **Meta Tags**: Comprehensive meta tag configuration
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for rich search results
- **Canonical URLs**: Proper duplicate content handling

## 🚢 Deployment

The application is built with Vite and can be deployed to any static hosting service. The build process creates optimized assets ready for production.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support, please contact the development team or open an issue in the repository.

---

**VIROSU** - Where Scent Becomes Identity