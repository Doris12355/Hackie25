import React, { useState } from "react";
import dragon from "../assets/dragon.avif";
import squishy from "../assets/squishy.jpeg";
import sound from "../assets/sound.wav";
import water from "../assets/water1.png";

const MyWidget = () => {
  const [tasks, setTasks] = useState([]);
  const [imageSrc, setImageSrc] = useState(dragon);
  const [showTasks, setShowTasks] = useState(false);
  const [showModal, setShowModal] = useState(false); // 控制弹窗显示
  const [newTask, setNewTask] = useState({ text: "", dueDate: "", duration: "", participants: "" });
  const [audio] = useState(new Audio(sound));
  const [waterSrc, setWaterSrc] = useState(water);
  const [aiSummary, setAiSummary] = useState(""); // AI summary text
  const [language, setLanguage] = useState("en"); // 语言状态（默认英文）

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
    audio.play();
  };

  // AI总结函数
  const handleAISummary = () => {
    if (tasks.length === 0) {
      setAiSummary(language === "en" ? "You have no tasks yet. Add one!" : "你还没有任务哦，快去添加一个吧！");
      return;
    }

    // 按截止日期排序任务
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // 创建总结文本
    const summaryText = sortedTasks
      .map((task, index) => 
        `${language === "en" ? `📌 Task ${index + 1}: ${task.text} (Due: ${task.dueDate || "N/A"})` :
        `📌 任务 ${index + 1}: ${task.text} (截止日期: ${task.dueDate || "无"})`}`)
      .join("\n");

    setAiSummary(
      language === "en"
        ? `🧠 AI Summary:\nYou have ${tasks.length} tasks.\nThe most urgent is: ${sortedTasks[0].text}.\n\n${summaryText}`
        : `🧠 AI 总结：\n你有 ${tasks.length} 个任务。\n最紧急的是：${sortedTasks[0].text}。\n\n${summaryText}`
    );
  };

  // 语言选择处理函数
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en"); // 切换语言
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg">
      <div className="text-center space-y-4">
        
        {/* 语言切换按钮 */}
        <button 
          onClick={toggleLanguage} 
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-500 transition w-full sm:w-auto">
          {language === "en" ? "Switch to Chinese" : "切换到英语"}
        </button>

        {/* 添加新任务按钮 */}
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
        >
          ➕ {language === "en" ? "Add New Task" : "添加新任务"}
        </button>

        {/* AI助手按钮 */}
        <button 
          onClick={handleAISummary} 
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition w-full sm:w-auto">
          🤖 {language === "en" ? "AI Assistant" : "AI 助手"}
        </button>

        {/* AI总结显示 */}
        {aiSummary && (
          <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md mt-4 text-left">
            {aiSummary}
          </div>
        )}

        {/* 弹出框（Modal） */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">📝 {language === "en" ? "Add Task" : "添加任务"}</h2>
              
              <input
                type="text" name="text" value={newTask.text} onChange={handleInputChange} placeholder={language === "en" ? "Enter task name..." : "输入任务名称..."}
                className="border-2 border-gray-400 rounded-md p-2 w-full mb-2"
              />
              <input
                type="date" name="dueDate" value={newTask.dueDate} onChange={handleInputChange}
                className="border-2 border-gray-400 rounded-md p-2 w-full mb-2"
              />
              <input
                type="text" name="duration" value={newTask.duration} onChange={handleInputChange} placeholder={language === "en" ? "Duration" : "时长"}
                className="border-2 border-gray-400 rounded-md p-2 w-full mb-2"
              />
              <input
                type="text" name="participants" value={newTask.participants} onChange={handleInputChange} placeholder={language === "en" ? "Participants" : "参与者"}
                className="border-2 border-gray-400 rounded-md p-2 w-full mb-4"
              />

              <div className="flex justify-end space-x-2">
                <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                  {language === "en" ? "Cancel" : "取消"}
                </button>
                <button onClick={handleSaveTask} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  {language === "en" ? "Save" : "保存"}
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
                className="relative p-2 rounded-md"
              >
                <div className="relative w-[430px] h-[270px]"> {/* Set a specific height for the image container */}
                  <img
                    src={waterSrc} // Replace with your image URL
                    alt="task-background"
                    className="w-full h-full object-cover rounded-md"
                    
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-center text-white bg-transparent bg-opacity-50">
                    <div className="p-4" onClick={() => handleDeleteTask(index)}>
                      <strong>{t.text}</strong>
                      {t.dueDate && <p className="text-sm">📅 {language === "en" ? `Due: ${t.dueDate}` : `截止: ${t.dueDate}`}</p>}
                      {t.duration && <p className="text-sm">⏳ {language === "en" ? `Duration: ${t.duration}` : `时长: ${t.duration}`}</p>}
                      {t.participants && <p className="text-sm">👤 {language === "en" ? `Participants: ${t.participants}` : `参与者: ${t.participants}`}</p>}
                    </div>
                  </div> 
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
            className="w-[300px] h-[350px] object-cover cursor-pointer"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default MyWidget;
