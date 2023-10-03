import './App.css'
import UsuariosLogados from './Components/UsuariosLogados';
import { useChat } from './hooks/useChat';

function App() {
  const { username, users, chatMessages, message, setMessage, handleLogin, handleSendMessage } = useChat();

  console.log(chatMessages);
  return (
    <div>
      <h1>Chat</h1>
      {username ? (
        <div>
          <UsuariosLogados users={users}/>
          <div>
            <div>
              {chatMessages.map((chatMessage, index) => (
                <div key={index}>{chatMessage}</div>
              ))}
            </div>
            <div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
              />
              <button onClick={handleSendMessage}>Enviar</button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            id='nomeUser'
            type="text"
            placeholder="Nome de usuário"
          />
          <button type='submit'>Entrar</button>
        </form>
      )}
    </div>
  );
}

export default App
