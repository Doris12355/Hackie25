import React, { useState } from "react";
import dragon from "../assets/dragon.avif";
import squishy from "../assets/squishy.jpeg";

const MyWidget = () => {
  const [task, setTask] = useState(""); // 输入框的值
  const [tasks, setTasks] = useState([]); // 任务列表
  const [imageSrc, setImageSrc] = useState(dragon);
  const [showText, setShowText] = useState(false); // 控制任务列表显示

  // 任务输入框更新
  const handleChange = (event) => {
    setTask(event.target.value);
  };

  // 保存任务但不显示
  const handleSaveTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask(""); // 清空输入框
    }
  };

  // 切换任务完成状态
  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // 删除任务
  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // 点击图片后显示/隐藏任务列表
  const handleClick = () => {
    setImageSrc((prevSrc) => (prevSrc === dragon ? squishy : dragon));
    setShowText(!showText); // 切换任务列表可见性
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg">
      <div className="text-center space-y-4">
        
        {/* 输入框 + 保存按钮 */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={task}
            onChange={handleChange}
            placeholder="Enter a new task..."
            className="border-2 border-gray-400 rounded-md p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSaveTask}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>

        {/* 任务列表（仅在点击图片后显示） */}
        {showText && (
          <ul className="space-y-2 text-left">
            {tasks.map((t, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-2 border rounded-md ${
                  t.completed ? "bg-green-100 line-through text-gray-500" : "bg-gray-100"
                }`}
              >
                <span onClick={() => toggleTaskCompletion(index)} className="cursor-pointer">
                  {t.text}
                </span>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* 图片，点击后显示/隐藏任务 */}
        <div className="flex justify-center">
          <img
            src={imageSrc}
            alt="button_image"
            className="w-[300px] h-[500px] object-cover cursor-pointer"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MyWidget;
