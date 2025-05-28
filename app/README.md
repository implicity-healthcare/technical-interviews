# Frontend Architecture & Folder Structure

This is an Angular 19 application built for the Implicit Technical Interview project. The frontend follows Angular best practices with a modular, scalable architecture.

## 🏗️ Architecture Overview

The application is built using:
- **Angular 19** - Modern Angular framework with standalone components
- **PrimeNG** - UI component library for rich interface components
- **Tailwind CSS** - Utility-first CSS framework for styling
- **TypeScript** - Type-safe development
- **SCSS** - Enhanced CSS with variables and mixins

## 📁 Folder Structure

```
app/
├── src/                          # Source code
│   ├── app/                      # Main application module
│   │   ├── layout/               # Layout components and services
│   │   │   ├── component/        # Layout-related components
│   │   │   └── service/          # Layout-related services
│   │   ├── pages/                # Feature pages/modules
│   │   │   ├── patients/         # Patient management feature
│   │   │   └── pages.routes.ts   # Page routing configuration
│   │   ├── services/             # Application services
│   │   │   └── patients/         # Patient-related services
│   │   ├── app.component.ts      # Root component
│   │   ├── app.config.ts         # Application configuration
│   │   └── app.routes.ts         # Main routing configuration
│   ├── assets/                   # Static assets
│   │   └── layout/               # Layout-specific assets
│   ├── index.html                # Main HTML template
│   ├── main.ts                   # Application bootstrap
│   ├── styles.scss               # Global styles
│   └── tailwind.css              # Tailwind CSS imports
├── angular.json                  # Angular CLI configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🧩 Architecture Patterns

### Feature-Based Organization
The application follows a feature-based folder structure where each major feature (like `patients`) has its own directory containing:
- Components
- Services
- Models/Interfaces
- Routing

### Separation of Concerns
- **Layout**: Reusable layout components and services
- **Pages**: Feature-specific pages and components
- **Services**: Business logic and API communication
- **Assets**: Static files and resources

### Standalone Components
The application uses Angular's modern standalone components approach, reducing the need for NgModules and improving tree-shaking.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm start
# or
ng serve
```
The application will be available at `http://localhost:4200`

### Build
```bash
npm run build
# or
ng build
```

### Code Formatting
```bash
npm run format
```

## 🎨 Styling Architecture

### Tailwind CSS + PrimeNG
The application combines:
- **Tailwind CSS** for utility-first styling
- **PrimeNG** for pre-built UI components
- **SCSS** for custom styles and component-specific styling

### Theme Configuration
- PrimeNG themes are configured in `app.config.ts`
- Tailwind configuration is in `tailwind.config.js`
- Global styles are in `src/styles.scss`

## 🛣️ Routing Structure

The application uses Angular Router with a hierarchical routing structure:
- Main routes defined in `app.routes.ts`
- Feature-specific routes in respective feature directories
- Lazy loading for optimal performance

## 📦 Key Dependencies

### Core Framework
- `@angular/core` - Angular framework
- `@angular/router` - Routing functionality
- `@angular/forms` - Form handling

### UI & Styling
- `primeng` - UI component library
- `primeicons` - Icon library
- `tailwindcss` - CSS framework
- `@primeng/themes` - PrimeNG theming

### Development Tools
- `typescript` - Type safety
- `eslint` - Code linting
- `prettier` - Code formatting

## 🔧 Configuration Files

- **`angular.json`** - Angular CLI workspace configuration
- **`tsconfig.json`** - TypeScript compiler options
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`eslint.config.js`** - ESLint rules and configuration
- **`.prettierrc.json`** - Prettier formatting rules

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow Angular style guide
- Use Prettier for consistent formatting
- Use ESLint for code quality

### Component Structure
- Use standalone components
- Keep components focused and single-purpose
- Use services for business logic
- Implement proper error handling

### File Naming
- Use kebab-case for file names
- Use descriptive, meaningful names
- Follow Angular naming conventions

## 🚀 Deployment

The application is configured for deployment on Vercel with the `vercel.json` configuration file. It can also be deployed to any static hosting service after building.

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [PrimeNG Documentation](https://primeng.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) 