import React from "react";
import { GuitarChordVisualizer } from "./components/GuitarChordVisualizer";
import { GuitarNeck } from "./components/GuitarNeck";

const App: React.FC = () => (
  <main className="min-h-screen flex items-start justify-center">
    <GuitarChordVisualizer />
  </main>
);

export default App;