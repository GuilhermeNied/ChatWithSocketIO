import '../styles/Chat.css'
import { BiSend } from 'react-icons/bi'
// import { io } from 'socket.io-client'
import { Login } from './Login'
import { useEffect, useState, useContext } from 'react'
import { MainContext } from '../contexts/mainContext'
import { SocketContext } from '../contexts/socketContext'

export function Chat() {
  const [text, setText] = useState('')
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([])

  const { sender, setSender } = useContext(MainContext)

  useEffect(() => {
    socket.on('message', msg => {
      setMessages(messages => [...messages, msg])
    })
    console.log(messages)
  }, [])

  const handleSendMessage = () => {
    if (text === '' || sender === '') {
      return
    } else {
      socket.emit('sendMessage', text, () => setText(''))
      setText('')
    }
  }

  const date = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
  socket.on('message', message => {
    setMessages([...messages, message])
  })

  const renderMessages = (message, index) => {
    return (
      <li
        key={index}
        className={
          'message-container ' +
          (message.user == sender ? 'sended' : 'received')
        }
      >
        <p>{message.text}</p>
        <p className="user-name">{message.user}</p>
        <p className="date">{date}</p>
      </li>
    )
  }

  return (
    <div className="Chat">
      <Login />
      <div className="messages-container">
        <ul>{messages.map(renderMessages)}</ul>
      </div>

      <form action="" onSubmit={event => event.preventDefault()}>
        <div className="input-container">
          <input
            type="text"
            className="input-message"
            onChange={event => setText(event.target.value)}
            value={text}
          />
          <button className="send-message-button" onClick={handleSendMessage}>
            <BiSend />
          </button>
        </div>
      </form>
    </div>
  )
}
