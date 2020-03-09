import React, { useState } from "react";
import Input from "../components/UI/Input";

export default function Home() {
  const [texto, setTexto] = useState("");
  return (
    <div className="home">
      <h1>Home</h1>

      <Input type="text" placeholder="Hola" value={texto} onChange={value => setTexto(value)} />

    </div>
  );
}
