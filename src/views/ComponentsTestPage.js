import React, { useState } from 'react';
import Input from '../components/UI/Input';
import { ThemeProvider } from 'styled-components';
import CommentsCounter from '../components/UI/CommentsCounter';
import UpvoteCounter from '../components/UI/UpvoteCounter';
import Menu, { CustomMenu } from '../components/UI/Menu';
import MenuOption from '../components/UI/MenuOption';
import { FiSearch } from 'react-icons/fi';
import TextArea from '../components/UI/TextArea';
import Checkbox from '../components/UI/CheckBox';
import RadioButton from '../components/UI/RadioButton';
import Toggle from '../components/UI/Toggle';
import Dropdown from '../components/UI/Dropdown';

function ComponentsTest({ title }) {
  const menuOptions = Array(15)
    .fill()
    .map((val, index) => ({
      value: index,
      label: 'option ' + index,
      ...(index === 2 ? { disabled: true } : undefined),
    }));

  const onOptionClick = (option) => alert('Click on Menu: ' + JSON.stringify(option));
  const [texto, setTexto] = useState('');
  const [textoTextarea, setTextoTextarea] = useState('');
  const [checked, setChecked] = useState(false);
  const [radio, setRadio] = useState(null);
  const [dropdown, setDropdown] = useState(null);

  const onChangeRadio = (value) => setRadio(value);
  const onChangeDropdown = (value) => {
    console.log('Seleccionado', value);
    setDropdown(value);
  };
  return (
    <div>
      <h2>{title}</h2>
      <div style={{ padding: '10px' }}>
        <h4>Inputs</h4>
        <Input type="text" placeholder="normal" value={texto} onChange={(value) => setTexto(value)} />
        <Input type="text" placeholder="disabled" value={texto} onChange={(value) => setTexto(value)} disabled />
        <Input
          type="text"
          placeholder="with autocomplete"
          value={texto}
          onChange={(value) => setTexto(value)}
          autoCompleteOptions={menuOptions}
        />
      </div>
      <div style={{ padding: '10px' }}>
        <h4>Counters</h4>
        <CommentsCounter count={999} /> <UpvoteCounter count={999} />
      </div>

      <div style={{ padding: '10px' }}>
        <h4>Input with icons</h4>
        <Input type="text" Icon={FiSearch} placeholder="normal" value={texto} onChange={(value) => setTexto(value)} />
        <Input
          type="text"
          Icon={FiSearch}
          placeholder="disabled"
          value={texto}
          onChange={(value) => setTexto(value)}
          disabled
        />
      </div>

      <div style={{ padding: '10px' }}>
        <h4>Squared Inputs</h4>
        <Input
          type="text"
          Icon={FiSearch}
          squaredRight
          placeholder="only right"
          value={texto}
          onChange={(value) => setTexto(value)}
        />
        <Input
          type="text"
          Icon={FiSearch}
          squaredLeft
          squaredRight
          placeholder="left and right"
          value={texto}
          onChange={(value) => setTexto(value)}
        />
        <Input
          type="text"
          Icon={FiSearch}
          squaredLeft
          placeholder="only left"
          value={texto}
          onChange={(value) => setTexto(value)}
        />
      </div>

      <div style={{ padding: '10px' }}>
        <h4>Menu</h4>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'stretch' }}>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Normal</h6>
            <Menu options={menuOptions} onOptionClick={onOptionClick} />
          </div>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Custom Menu</h6>
            <CustomMenu>
              <MenuOption option={menuOptions[0]} onClick={onOptionClick} />
              <MenuOption option={menuOptions[1]} onClick={onOptionClick} />
              <MenuOption option={menuOptions[2]} onClick={onOptionClick} />
            </CustomMenu>
          </div>
        </div>
      </div>

      <div style={{ padding: '10px' }}>
        <h4>Textarea</h4>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'stretch' }}>
          <TextArea
            placeholder="Without limit"
            value={textoTextarea}
            onChange={(value) => setTextoTextarea(value)}
            rows={8}
            style={{ flex: 1 }}
          ></TextArea>
          <TextArea
            placeholder="With 300 characters limit"
            limit={200}
            value={textoTextarea}
            onChange={(value) => setTextoTextarea(value)}
            rows={8}
            style={{ flex: 1 }}
          ></TextArea>
        </div>
      </div>

      <div style={{ padding: '10px' }}>
        <h4>Check Box</h4>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'stretch' }}>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Fixed States</h6>
            <label>
              <Checkbox checked={true} />
              <span>Checked: </span>
            </label>
            <label>
              <Checkbox checked={false} />
              <span>Unchecked: </span>
            </label>
          </div>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Normal</h6>
            <label>
              <Checkbox
                checked={checked}
                onChange={(checked) => {
                  setChecked(checked);
                }}
              />
              <span>Checkme </span>
            </label>
          </div>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Read only</h6>
            <label>
              <span>Read only: </span>
              <Checkbox
                checked={checked}
                readonly
                onChange={(e) => {
                  setChecked(checked);
                }}
              />
            </label>
          </div>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Disabled</h6>
            <label>
              <span>Disabled: </span>
              <Checkbox
                checked={checked}
                disabled
                onChange={(e) => {
                  setChecked(checked);
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div style={{ padding: '10px' }}>
        <h4>Radio buttons</h4>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'stretch' }}>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Fixed States</h6>
            <label>
              <RadioButton checked={true} />
              <span>Checked</span>
            </label>
            <label>
              <RadioButton checked={false} />
              <span>Unchecked</span>
            </label>
          </div>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Radio groups</h6>
            <label>
              <RadioButton checked={radio === 'Man'} value="Man" onChange={onChangeRadio} />
              <span>Man</span>
            </label>
            <label>
              <RadioButton checked={radio === 'Woman'} value="Woman" onChange={onChangeRadio} />
              <span>Woman</span>
            </label>
            <label>
              <RadioButton checked={radio === 'Other'} value="Other" onChange={onChangeRadio} />
              <span>Other</span>
            </label>
          </div>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Read only</h6>
            <label>
              <RadioButton checked={radio === 'Man'} value="Man" onChange={onChangeRadio} readonly />
              <span>Man</span>
            </label>
            <label>
              <RadioButton checked={radio === 'Woman'} value="Woman" onChange={onChangeRadio} readonly />
              <span>Woman</span>
            </label>
            <label>
              <RadioButton checked={radio === 'Other'} value="Other" onChange={onChangeRadio} readonly />
              <span>Other</span>
            </label>
          </div>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Disabled</h6>
            <label>
              <RadioButton checked={radio === 'Man'} value="Man" onChange={onChangeRadio} disabled />
              <span>Man</span>
            </label>
            <label>
              <RadioButton checked={radio === 'Woman'} value="Woman" onChange={onChangeRadio} disabled />
              <span>Woman</span>
            </label>
            <label>
              <RadioButton checked={radio === 'Other'} value="Other" onChange={onChangeRadio} disabled />
              <span>Other</span>
            </label>
          </div>
        </div>
      </div>

      <div style={{ padding: '10px' }}>
        <h4>Toggle</h4>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'stretch' }}>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Fixed States</h6>
            <label>
              <Toggle checked={true} />
              <span>Checked: </span>
            </label>
            <label>
              <Toggle checked={false} />
              <span>Unchecked: </span>
            </label>
          </div>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Normal</h6>
            <label>
              <Toggle
                checked={checked}
                onChange={(checked) => {
                  setChecked(checked);
                }}
              />
              <span>Checkme </span>
            </label>
          </div>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Read only</h6>
            <label>
              <span>Read only: </span>
              <Toggle
                checked={checked}
                readonly
                onChange={(e) => {
                  setChecked(checked);
                }}
              />
            </label>
          </div>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Disabled</h6>
            <label>
              <span>Disabled: </span>
              <Toggle
                checked={checked}
                disabled
                onChange={(e) => {
                  setChecked(checked);
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div style={{ padding: '10px' }}>
        <h4>Dropdown</h4>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'stretch' }}>
          <div style={{ flex: 1, margin: '5px' }}>
            <h6>Normal</h6>
            <Dropdown options={menuOptions} value={dropdown} onChange={onChangeDropdown} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComponentsTestPage() {
  return (
    <div className="home">
      <h1>Test Components</h1>
      <div style={{ backgroundColor: 'white', padding: '30px' }}>
        <ComponentsTest title={'Light Theme'} />
      </div>

      <div style={{ backgroundColor: '#1F1F3D', padding: '30px', color: 'white' }}>
        <ThemeProvider theme={{ isDark: true }}>
          <ComponentsTest title={'Dark Theme'} />
        </ThemeProvider>
      </div>
    </div>
  );
}
