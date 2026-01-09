# React Memoization Demo

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

> **homework-50** - A comprehensive demonstration of React memoization techniques for performance optimization

## 🚀 Live Demo

[View Live Demo](https://homework-50-nine.vercel.app)

## 📖 Overview

This project showcases advanced React memoization techniques including `useMemo`, `useCallback`, and `React.memo`. It demonstrates how proper memoization can significantly improve application performance by preventing unnecessary re-renders and expensive recalculations.

### ✨ Features

- **📊 Data Table with Filtering** - Demonstrates `useMemo` for expensive filtering operations
- **🎨 Interactive Todo List** - Shows `useCallback` optimization for event handlers
- **📈 Performance Metrics** - Real-time render count tracking for memoized vs non-memoized components
- **🔄 Live Comparison** - Side-by-side comparison of optimized and non-optimized components
- **📱 Responsive Design** - Modern, mobile-friendly UI built with Tailwind CSS
- **🎯 Type Safety** - Full TypeScript implementation

## 🛠️ Tech Stack

- **React 18.3.1** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icon library

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mihuilsu/homework-50.git

# Navigate to project directory
cd homework-50

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Usage

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📂 Project Structure

```
homework-50/
├── src/
│   ├── components/
│   │   ├── demos/
│   │   │   ├── DataTableDemo.tsx      # useMemo demonstration
│   │   │   ├── TodoListDemo.tsx       # useCallback demonstration
│   │   │   └── ComparisonDemo.tsx     # React.memo comparison
│   │   ├── ui/
│   │   │   ├── Card.tsx               # Reusable card component
│   │   │   ├── Button.tsx             # Reusable button component
│   │   │   └── Badge.tsx              # Reusable badge component
│   │   └── Layout/
│   │       ├── Header.tsx             # App header
│   │       └── Footer.tsx             # App footer
│   ├── hooks/
│   │   ├── useRenderCount.ts          # Custom hook for tracking renders
│   │   └── useDebouncedValue.ts       # Debounced value hook
│   ├── utils/
│   │   ├── calculations.ts            # Expensive calculation functions
│   │   └── dataGenerator.ts           # Mock data generation
│   ├── types/
│   │   └── index.ts                   # TypeScript type definitions
│   ├── App.tsx                        # Main application component
│   ├── main.tsx                       # Application entry point
│   └── index.css                      # Global styles
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎓 Memoization Concepts Demonstrated

### 1. **useMemo** - Memoizing Expensive Calculations

```typescript
const filteredData = useMemo(() => {
  return data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [data, searchTerm]);
```

**Use Case**: Prevents expensive filtering operations from running on every render.

### 2. **useCallback** - Memoizing Event Handlers

```typescript
const handleAddTodo = useCallback((text: string) => {
  setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
}, []);
```

**Use Case**: Prevents child components from re-rendering when parent re-renders.

### 3. **React.memo** - Memoizing Components

```typescript
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

**Use Case**: Prevents component re-renders when props haven't changed.

## 📊 Performance Impact

The project includes real-time performance metrics showing:

- **Render count** - Number of times components have rendered
- **Execution time** - Time taken for expensive operations
- **Memory usage** - Before and after memoization comparison

## 🎨 Customization

### Tailwind Configuration

Modify `tailwind.config.js` to customize the design system:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add custom colors
      }
    }
  }
}
```

### Adding New Demos

1. Create a new component in `src/components/demos/`
2. Import and add it to `App.tsx`
3. Follow the existing pattern for performance tracking

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

**mihuilsu**

- GitHub: [@mihuilsu](https://github.com/mihuilsu)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for excellent documentation on performance optimization
- Tailwind CSS for the amazing utility-first framework
- Vite for blazing fast development experience

---

<div align="center">
  Made with ❤️ by mihuilsu
</div>