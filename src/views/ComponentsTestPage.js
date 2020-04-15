import React, { useState } from "react";
import Input from "../components/UI/Input";
import { ThemeProvider } from "styled-components";
import CommentsCounter from "../components/UI/CommentsCounter";
import UpvoteCounter from "../components/UI/UpvoteCounter";
import Menu, { CustomMenu } from "../components/UI/Menu";
import MenuOption from "../components/UI/MenuOption";
import { FiSearch } from 'react-icons/fi';

function ComponentsTest({ title }) {

  const menuOptions = [
    {
      value: 1,
      label: "option 1"
    },
    {
      value: 1,
      label: "option 2",
      disabled: true
    },
    {
      value: 2,
      label: "option 3"
    },
    {
      value: 3,
      label: "option 4"
    }, {
      value: 4,
      label: "option 5"
    },
  ];

  const onMenuClick = (option) => alert("Click on Menu: " + option.label);
  const [texto, setTexto] = useState("");
  return <div>
    <h2>{title}</h2>
    <div style={{ padding: "10px" }}>
      <h4>Inputs</h4>
      <Input type="text" placeholder="normal" value={texto} onChange={value => setTexto(value)} />
      <Input type="text" placeholder="disabled" value={texto} onChange={value => setTexto(value)} disabled />
      <Input type="text" placeholder="with autocomplete" value={texto} onChange={value => setTexto(value)} autoCompleteOptions={menuOptions} />
    </div>
    <div style={{ padding: "10px" }}>
      <h4>Counters</h4>
      <CommentsCounter count={999} /> <UpvoteCounter count={999} />
    </div>

    <div style={{ padding: "10px" }}>
      <h4>Input with icons</h4>
      <Input type="text" Icon={FiSearch} placeholder="normal" value={texto} onChange={value => setTexto(value)} />
      <Input type="text" Icon={FiSearch} placeholder="disabled" value={texto} onChange={value => setTexto(value)} disabled />
    </div>

    <div style={{ padding: "10px" }}>
      <h4>Squared Inputs</h4>
      <Input type="text" Icon={FiSearch} squaredRight placeholder="only right" value={texto} onChange={value => setTexto(value)} />
      <Input type="text" Icon={FiSearch} squaredLeft squaredRight placeholder="left and right" value={texto} onChange={value => setTexto(value)} />
      <Input type="text" Icon={FiSearch} squaredLeft placeholder="only left" value={texto} onChange={value => setTexto(value)} />
    </div>

    <div style={{ padding: "10px" }}>
      <h4>Menu</h4>
      <Menu options={menuOptions} onMenuClick={onMenuClick} />
    </div>

    <div style={{ padding: "10px" }}>
      <h4>Custom Menu</h4>
      <CustomMenu>
        <MenuOption option={menuOptions[0]} onClick={onMenuClick} />
        <MenuOption option={menuOptions[1]} onClick={onMenuClick} />
        <MenuOption option={menuOptions[2]} onClick={onMenuClick} />
      </CustomMenu>
    </div>


  </div>
}

export default function ComponentsTestPage() {

  return (
    <div className="home">
      <h1>Test Components</h1>
      <div style={{ backgroundColor: "white", padding: "30px" }}>
        <ComponentsTest title={"Light Theme"} />
      </div>

      <div style={{ backgroundColor: "#1F1F3D", padding: "30px", color: "white" }}>
        <ThemeProvider theme={{ isDark: true }}>
          <ComponentsTest title={"Dark Theme"} />
        </ThemeProvider>
      </div>
    </div>
  );
}
