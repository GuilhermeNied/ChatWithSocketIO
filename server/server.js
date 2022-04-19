const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)
const { addUser, getUser, deleteUser, getUsers } = require('./users')
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
})
const PORT = process.env.PORT || 8080
app.use(cors('*'))

io.on('connection', socket => {
  socket.on('login', ({ sender, room }, callback) => {
    const { user, error } = addUser(socket.id, sender, room)
    if (error) {
      return callback(error)
    }

    socket.join(user.room)
    socket.in(room).emit('notification', {
      title: 'Someone here',
      description: `${user.sender} just entered in room`
    })

    io.in(room).emit('users', getUsers(room))
    callback()
  })

  socket.on('sendMessage', message => {
    const user = getUser(socket.id)
    io.in(user.room).emit('message', { user: user.sender, text: message })
  })
  socket.on('disconnect', () => {
    console.log('User disconnected')
    const user = deleteUser(socket.id)
    if (user) {
      io.in(user.room).emit('notification', {
        title: 'Someone left',
        description: `${user.sender} just left in room`
      })
      io.in(user.room).emit('users', getUsers(user.room))
    }
  })
})

http.listen(PORT, () => console.log(`Server is running on port ${PORT}🚀`))
