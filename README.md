# Shrinesh's Developer Portfolio 🚀

Welcome to my personal 3D interactive portfolio, featuring a physics-based interactive lanyard card and a modern, responsive user interface.

## 🌟 Live Website
This project is automatically deployed and hosted via GitHub Pages. 
Visit the live site here: **[Shrinesh's Portfolio](https://shrinesh16.github.io/Shrinesh-Portfolio/)**

## 💻 Tech Stack 

This project utilizes a modern web development stack to achieve high performance, 3D graphics, and responsive design:

### Core Frameworks
- **[React 19](https://react.dev/)**: For building interactive UI components.
- **[Vite](https://vitejs.dev/)**: A lightning-fast frontend build tool.
- **[TypeScript](https://www.typescriptlang.org/)** / **JavaScript**: For robust standard typing and scripting.

### 3D Rendering & Physics
- **[Three.js](https://threejs.org/)**: The core WebGL 3D rendering engine.
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)**: A React renderer for Three.js.
- **[@react-three/drei](https://github.com/pmndrs/drei)**: Useful helpers and abstractions for React Three Fiber.
- **[@react-three/rapier](https://github.com/pmndrs/react-three-rapier)**: A 3D physics engine for React (used for the interactive swinging/bumping effects of the lanyard card).

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI styling.
- **[shadcn/ui](https://ui.shadcn.com/)** & **Radix UI**: Accessible, customizable unstyled components.
- **Lucide React**: Beautiful scalable icons.

## ⚙️ How the Deployment Works

This repository is set up with an **automated Continuous Deployment (CD)** pipeline using **GitHub Actions**.

The entire source code lives in the `main` branch. You do not need to manually deploy the site. The workflow file (`.github/workflows/deploy.yml`) is triggered automatically:

1. You make changes to the code.
2. You push the changes to everything to the `main` branch.
3. GitHub Actions spins up a server, installs dependencies, runs `npm run build`, and automatically publishes the `dist` folder to the live website.

## 🛠️ Local Development

To run this project locally on your machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/shrinesh16/Shrinesh-Portfolio.git
   ```
2. Navigate into the directory:
   ```bash
   cd Shrinesh-Portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.
