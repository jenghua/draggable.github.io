import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');

  const handleAddText = () => {
    const inputText = document.getElementById('inputText').value;
    setText(inputText);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  return (
    <div className="container">
      <div className="text-controls">
        <div>
          <input id="inputText" type="text" />
          <button onClick={handleAddText}>添加文字</button>
        </div>
        <div>
          <input id="inputFontSize" type="range" min="10" max="72" value={fontSize} onChange={handleFontSizeChange} />
          <span>{fontSize}px</span>
        </div>
        <div>
          <select id="inputFontFamily" value={fontFamily} onChange={handleFontFamilyChange}>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
      </div>
      <div className="image-container">
        <Draggable bounds="parent">
          <div style={{ position: 'absolute', cursor: 'move', fontSize: `${fontSize}px`, fontFamily: fontFamily }}>
            {text}
          </div>
        </Draggable>
      </div>
    </div>
  );
}

export default App;