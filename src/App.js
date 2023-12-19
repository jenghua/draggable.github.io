import React, { useState } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [rotation, setRotation] = useState(0); // 新增旋轉狀態

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

  const handleRotationChange = (event) => { // 新增旋轉處理器
    setRotation(event.target.value);
  };

  const handleDownload = () => {
    html2canvas(document.querySelector(".image-container")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
  
      // 創建一個新的鏈接元素
      const link = document.createElement('a');
  
      // 將鏈接的 href 設置為圖像的數據 URL
      link.href = imgData;
  
      // 將鏈接的下載屬性設置為想要的檔案名稱
      link.download = 'download.png';
  
      // 觸發鏈接的點擊事件來開始下載
      link.click();
    });
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
          <input id="inputRotation" type="range" min="0" max="360" value={rotation} onChange={handleRotationChange} /> {/* 新增旋轉輸入範圍 */}
          <span>{rotation}°</span>
        </div>
        <div>
          <select id="inputFontFamily" value={fontFamily} onChange={handleFontFamilyChange}>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="dfhsiuw3">中文秀風體</option>
  
          </select>
        </div>
        <button onClick={handleDownload}>Download</button>
      </div>
      <div className="image-container">
        <Draggable bounds="parent">
          <div style={{ position: 'absolute', cursor: 'move' }}>
            <div style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily, transform: `rotate(${rotation}deg)` }}>
              {text}
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );
}

export default App;