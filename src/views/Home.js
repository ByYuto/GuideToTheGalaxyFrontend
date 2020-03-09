import React, { useState, useContext } from "react";
import Input from "../components/UI/Input";
import { ThemeProvider, ThemeContext } from "styled-components";

export default function Home() {
  const [texto, setTexto] = useState("");
  const themeContext = useContext(ThemeContext);
  return (
    <div className="home">
      <h1>Home</h1>

      <Input type="text" placeholder="normal" value={texto} onChange={value => setTexto(value)} />
      <Input type="text" placeholder="disabled" value={texto} onChange={value => setTexto(value)} disabled />

      <ThemeProvider theme={{ isDark: true }}>
        <div style={{ backgroundColor: "#1F1F3D", padding: "50px" }}>
          <Input type="text" placeholder="normal" value={texto} onChange={value => setTexto(value)} />
          <Input type="text" placeholder="disabled" value={texto} onChange={value => setTexto(value)} disabled />
        </div>
      </ThemeProvider>
    </div>

  );
}
