import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = (token: string) => {

  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    extraHeaders: {
      authentication: token
    }
  });

  socket?.removeAllListeners();
  socket = manager.socket('/');

  addListeners();
};

const addListeners = () => {

  const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'online';
  });

  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'disconnect';
  });

  socket.on('clients-updated', (clients: string[]) => {
    let clientsHtml = '';

    clients.forEach((clientId) => {
      clientsHtml += `<li>${ clientId }</li>`;
    });

    clientsUl.innerHTML = clientsHtml;
  });

  messageForm.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    if (messageInput.value.trim().length <= 0) return;

    // console.log({ id: 'soy yo', message: messageInput.value });

    socket.emit('message-from-client',
      { id: 'soy yo', message: messageInput.value }
    );

    messageInput.value = '';
  });

  socket.on('message-from-server', (payload: { fullName: string, message: string; }) => {
    const newMessage = `
      <li>
        <strong>${ payload.fullName }</strong>
        <span>${ payload.message }</span>
      </li>
    `;

    const li = document.createElement('li');
    li.innerHTML = newMessage;
    messagesUl.append(li);
    // messagesUl.innerHTML += `<li>${ message }</li>`;
  });

};