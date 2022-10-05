import { connectToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket -client</h2>

    <input id="jwt-token" type="text" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>

    <br />
    <span id="server-status">offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input type="text" placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`;

// connectToServer();
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  jwtToken.value = jwtToken.value.trim();
  if (jwtToken.value.length <= 0) return alert('JWT token is required');

  connectToServer(jwtToken.value);
});