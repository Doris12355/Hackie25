import React, { useState } from "react";
import dragon from "../assets/dragon.avif";
import squishy from "../assets/squishy.jpeg";

const MyWidget = () => {
  const [tasks, setTasks] = useState([]);
  const [imageSrc, setImageSrc] = useState(dragon);
  const [showTasks, setShowTasks] = useState(false);
  const [showModal, setShowModal] = useState(false); // 控制弹窗显示
  const [newTask, setNewTask] = useState({ text: "", dueDate: "", duration: "", participants: "" });

  // 打开/关闭弹窗
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // 输入框变化
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // 保存任务
  const handleSaveTask = () => {
    if (newTask.text.trim()) {
      setTasks([...tasks, { ...newTask, completed: false }]);
      setNewTask({ text: "", dueDate: "", duration: "", participants: "" }); // 清空输入
      closeModal(); // 关闭弹窗
    }
  };

  // 切换任务完成状态
  const toggleTaskCompletion = (index) => {
    setTasks(tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t)));
  };

  // 删除任务
  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // 点击图片后显示/隐藏任务列表
  const handleClick = () => {
    setImageSrc((prevSrc) => (prevSrc === dragon ? squishy : dragon));
    setShowTasks(!showTasks);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg">
      <div className="text-center space-y-4">
        
        {/* 添加新任务按钮 */}
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
        >
          ➕ Add New Task
        </button>

        {/* 弹出框（Modal） */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">📝 Add Task</h2>
              
              <input
                type="text" name="text" value={newTask.text} onChange={handleInputChange} placeholder="Enter task name..."
                className="border-2 border-gray-400 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <input
                type="date" name="dueDate" value={newTask.dueDate} onChange={handleInputChange}
                className="border-2 border-gray-400 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <input
                type="text" name="duration" value={newTask.duration} onChange={handleInputChange} placeholder="Enter duration (e.g., 2 hours)"
                className="border-2 border-gray-400 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <input
                type="text" name="participants" value={newTask.participants} onChange={handleInputChange} placeholder="Enter participants (comma-separated)"
                className="border-2 border-gray-400 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 mb-4"
              />

              <div className="flex justify-end space-x-2">
                <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                  Cancel
                </button>
                <button onClick={handleSaveTask} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 任务列表（仅在点击图片后显示） */}
        {showTasks && (
          <ul className="space-y-2 text-left">
            {tasks.map((t, index) => (
              <li
                key={index}
                className={`p-2 border rounded-md ${
                  t.completed ? "bg-green-100 line-through text-gray-500" : "bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-grow cursor-pointer" onClick={() => toggleTaskCompletion(index)}>
                    <strong>{t.text}</strong>
                    {t.dueDate && <p className="text-sm text-gray-600">📅 Due: {t.dueDate}</p>}
                    {t.duration && <p className="text-sm text-gray-600">⏳ Duration: {t.duration}</p>}
                    {t.participants && <p className="text-sm text-gray-600">👤 Participants: {t.participants}</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    X
                  </button>
                </div>
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
