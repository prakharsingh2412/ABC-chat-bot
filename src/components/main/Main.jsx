import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets.js'
import { Context } from '../../context/context.jsx'


const Main = () => {
    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context);
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSent(); // Call onSent when Enter is pressed
        }
    }
    return (
    <div className="main">
        <div className="nav">
            <p>ABC ChatBot</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResult?<>
                <div className="greet">
                <p><span>Hello, You.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Tell me about my daily schedual</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstrom team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the given code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>:
            <div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className='result-data'>
                    <img src={assets.gemini_icon} alt="" />
                    {loading ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>:
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                </div>
            </div>
            }

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} onKeyDown={handleKeyPress} value={input} type="text" placeholder='Enter a prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">
                   ABC Chat Bot may display inaccurate about people,So double-check its reasponses. Your privacy and ABC Chat Bots Apps 
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main