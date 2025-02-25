import './ai-chat-message.styles.css';
import PropTypes from 'prop-types';

const AiChatMessage = ({content,isUser}) => {
    return ( 
        <div className={`ai-chat-message-div ${isUser ? 'user' : 'api' }`}>
            {content}
        </div>
     );
}
AiChatMessage.propTypes={
    content:PropTypes.string,
    isUser:PropTypes.bool,
}
export default AiChatMessage;