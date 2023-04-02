import './App.css';
import { useState } from 'react'
import logo from './images/logo.svg'
import user from './images/user.png'

function App() {

  const [input, setInput] = useState("");
  const [chat, setChat] = useState([
    {
      user: "gpt",
      message: "How can i help you today?"
    },
    {
      user: "client",
      message: "I want to learn chatGPT today."
    }
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatNew = [...chat, { user: "client", message: `${input}` }]
    setInput("");
    setChat(chatNew)
    const messages = chatNew.map((message) => message.message).join("\n");
    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    });
    const data = await response.json()
    setChat([...chatNew, { user: "gpt", message: `${data.message}` }])
  }


  function clearResponse() {
     setChat([]);
  }

  return (
    <div className="container.xl text-white/60 mx-auto h-auto flex flex-col lg:flex-row w-[100%] min-h-[100vh]">
      <div className=" lg:w-[244px] p-[0.5rem] w-full bg-[#202123] h-auto min-h-[8rem] ">
        <div>
        <span className='text-center text-[30px] lg:text-[20px]'>ChatGPT Clone Using Open Ai</span>
          <button onClick={clearResponse} className="flex border mt-2 lg:mt-6 p-[5px] border-[hsla(0,0%,100%,.2)] items-center rounded-md gap-x-6 text-white w-full hover:bg-[#2f3133]"><span className="text-[25px]">+</span> New Chat</button>
        </div>
      </div>
      <div className="flex-1 relative bg-[#343541]">
        <div className="mb-28">
          <form onSubmit={handleSubmit} className='flex w-[80%] absolute inset-x-0 top-6 mx-auto'>
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" className="bg-transparent border border-[hsla(0,0%,100%,.2)] w-full p-[10px] rounded-md shadow-md shadow-[#202123] focus:outline-none" placeholder="Send a message..." />
            <button type='submit' className='border rounded-md w-[4.5rem] ml-4 border-[hsla(0,0%,100%,.2)] shadow-md shadow-[#202123] hover:bg-[#2f3133]' >Submit</button>
          </form>
        </div>
        {/* Chatbot results preview */}
        <div className='overflow-y-auto'>
          {chat.map((message, index) => {
            return <Message message={message} />
          })}
        </div>
      </div>
    </div>
  );
}

const Message = ({ message }) => {
  return (
    <div>
      <div className={`flex w-full gap-x-8 p-8 items-center justify-center client ${message.user === "gpt" && "bg-[#4d4e5f]"}`}>
        <div className={`${message.user === "client" && "w-12 h-12 bg-[#606174] rounded-full  flex items-center justify-center"}`}>
          {message.user === "client" && <img className="w-7 h-7" src={user} alt="" />}
          {message.user === "gpt" && <img className="w-12 h-12" src={logo} alt="" />}
        </div>
        <div className="text-white/70 flex-1">{message.message}</div>
      </div>
    </div>
  )
}

export default App;
