import { useState, useEffect } from 'react'
import { socket } from '../socket/conexao';

export const useChat = () => {
    const [socketInstance] = useState(socket);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (socketInstance) {

            socketInstance.on('chat-message', (data: any) => {
                setChatMessages((prevMessages) => [...prevMessages, data]);
            });

            socketInstance.on('user-list', (users: any) => {
                setUsers(users);
            });

            socketInstance.on('user-connected', (data: any) => {
                const message = `${data.username} entrou no chat.`;
                setChatMessages((prevMessages) => [...prevMessages, message]);
            });

            socketInstance.on('user-disconnected', (socketId: any) => {
                const message = `${users[socketId]} saiu do chat.`;
                setChatMessages((prevMessages) => [...prevMessages, message]);
            });
        }
    }, [socketInstance, users]);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { nomeUser } = event.currentTarget
        if (username.trim() !== '') {
            socketInstance.emit('user-login', nomeUser.value);
        }
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            socketInstance.emit('chat-message', message);
            setMessage('');
        }
    };

    return {
        username,
        users,
        chatMessages,
        message,
        setUsername,
        setMessage,
        handleLogin,
        handleSendMessage,
    }
}