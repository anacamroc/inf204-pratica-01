import React from "react";

import { AuthProvider } from "./src/contexts/AuthContext";
import { ThemeProvider } from "./src/contexts/TemaContext";

import Rotas from "./src/routes";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </ThemeProvider>
  );
}
