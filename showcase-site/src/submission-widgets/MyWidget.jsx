import React, { useState } from 'react';
import dragon from "../assets/dragon.avif";
import squishy from "../assets/squishy.png";
const MyWidget = () => {
  const [text, setText] = useState('');

  

  const [imageSrc, setImageSrc] = useState(dragon);
  const [showText, setShowText] = useState(false); // State to track visibility

  const handleClick = () => {
       setImageSrc((prevSrc) => (prevSrc === dragon ? squishy : dragon));
       setShowText(!showText); // Toggle text visibility
  };
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    alert(`You entered: ${text}`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg">
      <div className="text-center space-y-4">
        <div>
          <input 
            type="text" 
            value={text} 
            onChange={handleChange} 
            placeholder="Enter text here"
            className="border-2 border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleSubmit}>Submit</button>
          </div>
        <div className="flex items-center space-x-4">
          {showText && (
            <div className="text-2xl font-bold text-blue-600">
              {text}
            </div>
          )}
          
          <img 
            src={imageSrc} 
            alt="button_image" 
            className="w-[300px] h-[500px] object-cover" 
            onClick={handleClick}
          />
          {showText && (
            <div className="text-2xl font-bold text-blue-600">
              {text}
            </div>
          )}
          </div>
          
        <div className="flex justify-center">
          
        </div>
      </div>
    </div>
  );
};

export default MyWidget;
