import '../index.css';
import botLogo from "../assets/Ai-bot-logo.png";
import OnlineIndicator from "./OnlineIndicator";
import { useEffect, useRef, useState } from "react";

const bot_replay = (msg, key) => {
    return (
        <div className="w-full relative flex gap-1.5 px-2" key={key}>
            {/* chat bot logo */}
            <div className="relative w-8 min-h-full p-px">
                <div className="botBgColor absolute bottom-0 rounded-full p-0.5 w-8 h-8">
                    <img src={botLogo} alt="" className="w-full h-full select-none pointer-events-none"/>
                </div>
            </div>
            {/* chat area */}
            <div className="bg-[rgba(255,255,255,0.15)] rounded-[20px_20px_20px_5px] max-w-[75%] p-3 text-white px-4 text-[15px] wrap-break-word max-sm:text-[13px] font-Josefin">
                    {msg}
            </div>
        </div>
    )
}
const user_replay = (msg, key) => {
    return (
        <div className="w-full relative flex justify-end gap-1.5 px-2" key={key}>
            {/* chat area */}
            <div className="rounded-[20px_20px_5px_20px] max-w-[75%] p-3 text-white px-4 text-[15px] btn-Bg-Color wrap-break-word max-sm:text-[13px] font-Josefin">
                {msg}
            </div>
        </div>
    )
}

const AiBot = () => {
  const serverUrl = "http://127.0.0.1:8000" // Our backend Url
  const userInput = useRef(null)
  const [ message, setMessage ] = useState([]);
  const scrollTop = useRef(null)
  // Make button desable if input feild is empty
  const [btnDesabled, setBtnDesabled] = useState(false)

  // Fetch data or get response from server
  const getMessage = async (serverUrl, userMessage) => {
    try{
        const response = await fetch(`${serverUrl}/chat`, {
            method: "POST", // Method will be post
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ "message": userMessage }) // sending message to our Bot/Ai
        })
        if (!response.ok){
            throw new Error("Sorry Response fail!", response.status);
        }

        const getBotMsg = await response.json()
        setMessage(prev => [...prev, {
            text: getBotMsg.botMessage, // get the replay from bot/ai
            type: "bot" // set message type for Bot/ai
        }])

    }
    catch(error){
        console.log(`Data fetch Fail ${error}`)
    }
  }

  const handleKeyPress = () => {
    const inputValue = userInput.current.value
        if(inputValue.trim()){
                getMessage(serverUrl, inputValue);
                setMessage([...message, {
                text: inputValue,
                type: "user"
            }])
            userInput.current.value = ''
            setBtnDesabled(false)
        }
        else{
            return
        }
  }

  useEffect(() => {
    if(scrollTop.current){
        scrollTop.current.scrollTop = scrollTop.current.scrollHeight
    }
  }, [message]);

  return (
    <section className="box-border max-sm:w-[95%] max-sm:flex max-sm:items-center max-sm:justify-center">
        <div className="bg-[rgba(255,255,255,0.09)] backdrop-blur-[50px] shadow-lg rounded-[30px] 
        h-[700px] w-[500px] p-1 overflow-hidden relative border border-[rgba(225,225,225,0.2)] max-sm:w-[100%]">
            {/*=================== chat box hearder section ===================*/}
            <header className="w-full flex items-center gap-5 px-6 py-3">
                <div className="botBgColor relative w-17 h-17 rounded-full overflow-hidden 
                p-1 shadow-lg pointer-events-none select-none max-sm:w-15 max-sm:h-15">
                    <img src={botLogo} alt="bot logo" className="w-full h-full" />
                </div>
                <h1 className="text-white font-bold text-[25px] flex flex-col font-Exo">
                    Your Assistent
                    <span className="text-gray-400 text-[17px] flex items-center justify-start 
                    gap-[7px] relative max-sm:text-[14px] font-Josefin max-sm:gap-[5px] font-[500]"> 
                        <OnlineIndicator /> 
                        Online 
                    </span>
                </h1>
            </header>
            {/*=================== chat bot Messaging sections ===================*/}
            <div className="bg-[#190336] relative h-[86.8%] w-full rounded-[25px] overflow-hidden max-sm:h-[88%]">
                {/* chat area */}
                <section className="overflow-y-auto w-full scroll-smooth flex flex-col gap-[11px] 
                py-[11px] relative h-[85%] items-center" ref={ scrollTop }>
                {/* =================== All chat replays =================== */}
                    {message.map((msg, index) => (
                        msg.type === 'user' ? user_replay(msg.text, index) : bot_replay(msg.text, index)
                    ))}
                </section>
                {/* =================== Input Area =================== */}
                <div className="relative w-full px-5 py-4 flex items-center justify-between 
                box-border overflow-hidden border-t border-[rgba(255,255,255,0.2)]">

                    <input className="text-white w-full h-full border-0 outline-0 font-Josefin font-normal" type="text" 
                        placeholder="Ask anything and press[Enter]"
                        ref={userInput}
                        onChange={(e) => setBtnDesabled(e.target.value.trim().length > 0)}
                        onKeyDown={(e) => e.key === "Enter" ? handleKeyPress() : null}
                    />

                    <button className={`text-white max-w-[45px] max-h-[45px] 
                        h-[45px] min-w-[45px] rounded-full flex items-center justify-center hover:scale-[1.02] 
                        cursor-pointer ${ !btnDesabled ? 'btn-desabled' : 'btn-Bg-Color'}`}
                        onClick={handleKeyPress}>
                        <i className="fa-solid fa-paper-plane rotate-40 -ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AiBot