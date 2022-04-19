import userImage from '../assets/photo.svg'
import { useContext, useEffect } from 'react'
import { MainContext } from '../contexts/mainContext'
import { SocketContext } from '../contexts/socketContext'
import { UsersContext } from '../contexts/usersContext'

import '../styles/Login.css'

export function Login() {
  const socket = useContext(SocketContext)

  const { sender, setSender, room, setRoom } = useContext(MainContext)
  const { setUsers } = useContext(UsersContext)

  useEffect(() => {
    socket.on('users', users => {
      setUsers(users)
    })
  }, [])

  const handleClick = () => {
    socket.emit('login', { sender, room }, error => {
      if (error) {
        console.log(error)
        return console.log('error')
      }
    })
  }
  return (
    <div className="header-container">
      <button id="status-btn">
        <div id="user-img" className="online">
          <img src={userImage} alt="User Photo" />
        </div>
      </button>
      <div className="Login">
        <form
          action=""
          className="form-login"
          onSubmit={event => event.preventDefault()}
        >
          <input
            type="text"
            value={room}
            onChange={event => setRoom(event.target.value)}
            className="input-login"
            placeholder="Digite sua sala"
          />
          <input
            type="text"
            value={sender}
            onChange={event => setSender(event.target.value)}
            className="input-login"
            placeholder="Digite seu nome"
          />

          <button className="login-button" onClick={handleClick}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
