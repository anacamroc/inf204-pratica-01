import React, {
  createContext,
  useState
} from "react";

export const TemaContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro");

  function alternarTema() {
    setTema((temaAtual) =>
      temaAtual === "claro" ? "escuro" : "claro"
    );
  }

  return (
    <TemaContext.Provider
      value={{ tema, alternarTema }}
    >
      {children}
    </TemaContext.Provider>
  );
}
