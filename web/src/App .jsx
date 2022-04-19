import { Chat } from './components/Chat'
import { MainProvider } from './contexts/mainContext'
import { UsersProvider } from './contexts/usersContext'
import { SocketProvider } from './contexts/socketContext'
function App() {
  return (
    <MainProvider>
      <UsersProvider>
        <SocketProvider>
          <Chat />
        </SocketProvider>
      </UsersProvider>
    </MainProvider>
  )
}

export default App
