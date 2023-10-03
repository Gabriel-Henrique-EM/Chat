import { Server } from "socket.io";

export const montarChat = (io: Server): void => {

    const connectedUsers: any = {};

    io.on('connection', (socket) => {
        // Configura o evento de desconexão
        socket.on('disconnect', () => {
            // Remove o usuário da lista de conectados
            delete connectedUsers[socket.id];
            // Atualiza a lista de usuários conectados para todos os clientes
            socket.broadcast.emit('user-disconnected', socket.id);
        });

        // Configura o evento de login de usuário
        socket.on('user-login', (username) => {
            // Armazena o nome de usuário associado a este socket
            connectedUsers[socket.id] = username;
            // Envia a lista de usuários conectados para o novo cliente
            socket.emit('user-list', Object.values(connectedUsers));
            // Notifica a todos os clientes que um novo usuário se conectou
            socket.broadcast.emit('user-connected', { id: socket.id, username });
        });

        // Configura o evento de envio de mensagem
        socket.on('chat-message', (message) => {
            // Envia a mensagem para todos os clientes
            console.log(message)
            socket.broadcast.emit('chat-message', message);
        });

    });
}