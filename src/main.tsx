import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'goey-toast/styles.css';
import './index.css';
import { AnimationProvider } from './context/AnimationContext';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

createRoot(document.getElementById("root")!).render(
  <ConvexProvider client={convex}>
    <AnimationProvider>
      <App />
    </AnimationProvider>
  </ConvexProvider>
);
