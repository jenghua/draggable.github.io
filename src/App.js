import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import './App.css';


function App() {
  
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState('');
  const [rotation, setRotation] = useState(0); // 新增旋轉狀態
  const draggableRef = useRef(null);
  const imageRef = useRef();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setPosition({ x: width / 1.5, y: height / 1.5 });
    }
  }, [text]);

  const handleAddText = () => {
    const inputText = document.getElementById('inputText').value;
    setText(inputText);
  };

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };


  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleRotationChange = (event) => { // 新增旋轉處理器
    setRotation(event.target.value);
  };

  const handleDownload = () => {
    if (!window.navigator.onLine) {
      alert('請使用瀏覽器');
      return;
    }
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
      <div className="logo-container">
        <img ref={imageRef} src={process.env.PUBLIC_URL + '/dawoodesign.png'} alt="Logo" />
      </div>
      <div className="row mt-5 mb-5">
        <div className="image-container col-xl-6">
          <Draggable position={position} onDrag={handleDrag}  nodeRef={draggableRef}>
            <div ref={draggableRef}>
              <div style={{ display: 'inline-block', cursor: 'move', fontSize: `${fontSize}px`, fontFamily: fontFamily, transform: `rotate(${rotation}deg)` }}>
                {text}
              </div>
            </div>
          </Draggable>
        </div>
        <div className="col-xl-6 p-4">
          <div className="row mb-3">
            <div className="col-sm-2 col-form-label">
              <label>輸入文字:</label>
            </div>
            <div className="col-auto">
              <input id="inputText" type="text" className="form-control mr-2" />
            </div>
            <div className="col-auto"> <button onClick={handleAddText} className="btn btn-primary">添加文字</button> </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-2 col-form-label">
              <label>文字大小:</label>
            </div>
            <div className="col-auto">
              <input id="inputFontSize" type="range" min="16" max="32" value={fontSize} onChange={handleFontSizeChange} className="form-control-range"/>
              <span>{fontSize}px</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-2 col-form-label">
              <label>旋轉:</label>
            </div>
            <div className="col-auto">
              <input id="inputRotation" type="range" min="0" max="360" value={rotation} onChange={handleRotationChange} className="form-control-range"/> {/* 新增旋轉輸入範圍 */}
              <span>{rotation}°</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-2 col-form-label">
              <label>字體:</label>
            </div>
            <div className="col-auto">
              <select id="inputFontFamily" value={fontFamily} onChange={handleFontFamilyChange} className="form-control">
                <option defaultValue>Open this select menu</option>
                <option value="trajan">英文正體字</option>
                <option value="amazon">英文草寫一</option>
                <option value="sacramento">英文草寫二</option>
                <option value="elegant">中文秀風體</option>
                <option value="w3">中文鐵線體</option>
              </select>
            </div>
          </div>
          <button onClick={handleDownload} className="btn btn-primary mt-2">Download</button>
        </div>
      </div>
      <footer className="align-items-end text-center">
        <p>&copy; {new Date().getFullYear()} DaWood Design.</p>
      </footer> 
      </div>
  );
}

export default App;