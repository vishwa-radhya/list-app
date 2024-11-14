import './ai-chat.styles.css';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import AiImage from '../../assets/image-for-ai.png';
import { BsFillSendFill } from "react-icons/bs";
import { BsStars } from "react-icons/bs";
import AiChatMessage from '../../components-4/ai-chat-message/ai-chat-message.component';
import { useEffect, useRef, useState } from 'react';
import ChatLoader from '../../components-4/chat-loader/chat-loader.component';

const AiChat = () => {

    const [messages,setMessages]=useState([]);
    const [inputValue,setInputValue]=useState('');
    const contentRef = useRef(null);
    const [isSenderReady,setIsSenderReady]=useState(true);
    const [loading,setLoading]=useState(false);

    const handleMessageSend=()=>{
        if(inputValue.trim().length !== 0 ){
            fetchChatFromApi({"inputs":inputValue}).then((response)=>{
                console.log(response)
                const responseText = response[0].generated_text || '';
                const formattedText = responseText.replace(/\n/g,' ').trim();
                setMessages((prevMessages)=>{
                    return [...prevMessages,{content:inputValue,isUser:true},{content:formattedText,isUser:false}]
                })
            })
            setInputValue('')
            
        }
    }

    const fetchChatFromApi =async(data)=>{
        try{
            setLoading(true);
            setIsSenderReady(false)
            const response = await fetch(
                "https://api-inference.huggingface.co/models/google/gemma-2-2b-it",
                {
                    headers: {
                        Authorization: "Bearer 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",
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            )
            const result = await response.json();
            setLoading(false);
            setIsSenderReady(true)
            if (result.error) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { content: "Sorry, the AI model is currently busy. Please try again later.", isUser: false }
                ]);
                console.error(result.error);
                return null; // or return result.error if you want to pass it up
            }
            return result;
        }catch(e){
            console.error('error text generation from api')
            setLoading(false);
            setIsSenderReady(true)
        }
    }

    useEffect(()=>{
        if(contentRef.current){
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    },[messages])

    return ( 
        <div className="ai-chat-div">
            <div className='img-div'>
            <SvgWithLoader svgimg={AiImage} svgWidth={120} />
            <span>Artificial Intelligence</span>
            </div>
            <div className='content' ref={contentRef}>
                {messages.map((messageObj,idx)=>(
                    <AiChatMessage key={`ai-chat-msg-${idx}`} content={messageObj.content} isUser={messageObj.isUser} />
                ))}
            </div>
            <div className='sender'>
            <div className='cent'>
                <BsStars/>
            </div>
                <input type='text' maxLength={130} value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
                <button className='cent flyer'  disabled={!isSenderReady} onClick={handleMessageSend} >
                    <BsFillSendFill/>
                </button>
            {loading && <ChatLoader/>}
            </div>
        </div>
     );
}
 
export default AiChat;