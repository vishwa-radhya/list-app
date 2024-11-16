import './ai-chat.styles.css';
import SvgWithLoader from '../../components-3/svg-with-loader/svg-with-loader.component';
import AiImage from '../../assets/image-for-ai.png';
import { BsFillSendFill } from "react-icons/bs";
import { BsStars } from "react-icons/bs";
import AiChatMessage from '../../components-4/ai-chat-message/ai-chat-message.component';
import { useEffect, useRef, useState,useContext } from 'react';
import ChatLoader from '../../components-4/chat-loader/chat-loader.component';
import { HelperContext } from '../../contexts/helper-context.context';
import { CohereClientV2 } from 'cohere-ai';

const AiChat = () => {

    const [inputValue,setInputValue]=useState('');
    const contentRef = useRef(null);
    const [isSenderReady,setIsSenderReady]=useState(true);
    const [loading,setLoading]=useState(false);
    const {aiChatMessages,setAiChatMessages}=useContext(HelperContext);

    const cohere = new CohereClientV2({
        token:import.meta.env.VITE_COHERE_API_KEY,
    })

    const handleMessageSend=async()=>{
        const trimmedInputValue = inputValue.trim();
        if(trimmedInputValue.length !== 0 ){
            setAiChatMessages((prevMessages)=>(
                [...prevMessages,{content:trimmedInputValue,isUser:true}]
            ))
            setInputValue('')
            try{
            const response =await fetchChatFromApi(inputValue.trim())
            // console.log(response)
            const result = response.message.content[0].text;
            setAiChatMessages((prevMessages)=>{
                return [...prevMessages,{content:result,isUser:false}]
            })
            setLoading(false);
            setIsSenderReady(true)
        }catch(e){
            console.error('something went wrong at setting response to chat',e);
            setLoading(false);
            setIsSenderReady(true)
        }
        }
    }

    const fetchChatFromApi =async(data)=>{
        try{
            setLoading(true);
            setIsSenderReady(false)
            const response = await cohere.chat({
                model: 'command-r-plus',
                messages: [
              {
                role: 'user',
                content: data,
              },
            ],
            })
            return response;
        }catch(e){
            console.error('error in text generation from api')
            setLoading(false);
            setIsSenderReady(true)
        }
    }

    useEffect(()=>{
        if(contentRef.current){
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    },[aiChatMessages])

    return ( 
        <div className="ai-chat-div animate__animated animate__fadeIn">
            <div className='img-div'>
            <SvgWithLoader svgimg={AiImage} svgWidth={120} />
            <span>Artificial Intelligence</span>
            </div>
            <div className='content' ref={contentRef}>
                {aiChatMessages.map((messageObj,idx)=>(
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