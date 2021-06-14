import React from 'react';
import socket from '../socket';

function Chat({userName, roomId, users, messages, onAddMessage}) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  const onSendMessage = async () => {
    if (!messageValue) return;
    
    await socket.emit('ROOM:NEW_MESSAGE', {
      roomId,
      userName,
      text: messageValue
    })

    onAddMessage({userName, text: messageValue});
    setMessageValue('');
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 999999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => <li key={name+index}>{name}</li>)}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="chat-messages--view">
          {
            messages.length ?
            messages.map((message, index) => {
              let myMess = '';
              if (message.userName === userName) {
                myMess = 'my-mess'
              }

              return (
                <div key={index} className={`messages ${myMess}`}>
                  <div className="message">
                    <p>{message.text}</p>
                    <div>
                      <span>{message.userName}</span>
                    </div>
                  </div>
                </div>  
              )
            }) : <span>Чат пока пустой...</span>
          }
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"></textarea>
          <button 
          onClick={onSendMessage}
          type="button" 
          className="btn btn-primary"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;