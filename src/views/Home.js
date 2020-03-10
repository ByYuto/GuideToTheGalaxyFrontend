import React, { useState } from "react";
import Input from "../components/UI/Input";
import { ThemeProvider } from "styled-components";
import CommentsCounter from "../components/UI/CommentsCounter";
import UpvoteCounter from "../components/UI/UpvoteCounter";

export default function Home() {
  const [texto, setTexto] = useState("");
  return (
    <div className="home">
      <h1>Home</h1>


      <div style={{ backgroundColor: "white", padding: "30px" }}>
        <div style={{ padding: "10px" }}>
          <Input type="text" placeholder="normal" value={texto} onChange={value => setTexto(value)} />
          <Input type="text" placeholder="disabled" value={texto} onChange={value => setTexto(value)} disabled />
        </div>
        <div style={{ padding: "10px" }}>
          <CommentsCounter count={999} /> <UpvoteCounter count={999} />
        </div>
      </div>

      <ThemeProvider theme={{ isDark: true }}>
        <div style={{ backgroundColor: "#1F1F3D", padding: "30px" }}>
          <div style={{ padding: "10px" }}>
            <Input type="text" placeholder="normal" value={texto} onChange={value => setTexto(value)} />
            <Input type="text" placeholder="disabled" value={texto} onChange={value => setTexto(value)} disabled />
          </div>
          <div style={{ padding: "10px" }}>
            <CommentsCounter count={999} /> <UpvoteCounter count={999} />
          </div>
        </div>
      </ThemeProvider>
    </div>

  );
}
