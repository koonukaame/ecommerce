# Yanki Store ✨

## Project Description 📋

**Yanki Store** is a Single Page Application (SPA) for a women's outerwear e-commerce platform. The store features a variety of clothing items for women.

The website includes the following pages:

- Main Page  
- Login Page  
- Registration Page  
- Catalog Product Page  
- Detailed Product Page  
- User Profile Page  
- Basket Page  
- About Us Page

📱 The application supports responsive design with a minimum screen width of **380px**.

This project is developed by a team of three developers:

- [**Mariya Lezhebokova**](https://github.com/koonukaame) — Team Lead and Developer 👩‍💻
- [**Tatiana Grosul**](https://github.com/tanya-gro) — Developer 💻  
- [**Aliaksandr Strelchanka**](https://github.com/alexspearsi) — Developer 💻  

Our mentor is  [**Anna Zhuravleva**](https://github.com/ansivgit)👩‍🏫.

## Project Purpose 🎯

The goal of the project is to gain practical experience in frontend development by building a full-featured SPA. We focus on teamwork, API integration using commercetools, and maintaining clean, testable code with modern tools.

## Technology Stack 🛠️

- **TypeScript** 🔤
- **CommerceTools** (backend) 🛠️
- **Tailwind CSS** 💅
- **Vite** (bundler) ⚡
- **Vitest** (unit testing) 🧪
- **ESLint** (code linting) 🧹
  - Plugins: `eslint-plugin-unicorn`, `eslint-plugin-perfectionist`  
- **Prettier** (code formatting) 🎨
- **Husky** (Git hooks) 🦸‍♂️
  - Plugins: `commitlint`, `lint-staged`

## Usage Instructions for Running Scripts 📝

### ⚡️ Vite
Vite is a bundler that provides fast and efficient production builds
- **Start the development server:**\
  `npm run dev`
- **Build the project for production:**\
  `npm run build`
- **Preview the production build locally:**\
  `npm run preview`

### 🧪 Vitest
Vitest is a unit testing framework
- **Run tests in watch mode:**\
  `npm run test`
- **Run tests with coverage report:**\
  `npm run test:coverage`

### 🧹 ESLint
ESLint helps detect and fix problems in TypeScript code
- **Check for linting issues:**\
  `npm run lint`
- **Automatically fix style issues:**\
  `npm run lint:fix`

### 🎨 Prettier
Prettier formats code for consistent style
- **Format code:**\
  `npm run format`
- **Check formatting without modifying files:**\
  `npm run ci:format`

### 🖌️ Stylelint
Stylelint checks CSS for errors and violations
- **Check styles for linting issues:**\
  `npm run stylelint`
- **Automatically fix style issues:**\
  `npm run stylelint:fix`

### 🔍 TypeScript Compiler
TypeScript compiler checks for type errors without generating output files
- **Check for TypeScript type errors:**\
  `npm run typecheck`
  
### 🦸‍♂️ Husky
Husky helps manage Git hooks, ensuring certain tasks are performed before committing or pushing code
- **Set up Husky Git hooks:**\
  `npm run prepare`

## Local Setup Guide ⚙️

- **Clone the repository:**\
  `git clone https://github.com/koonukaame/ecommerce.git`
- **Install dependencies:**\
  `npm install`
- **Start the development server:**\
  `npm run dev`
