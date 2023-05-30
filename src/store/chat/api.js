// api.j
import axios from 'axios';

const URL = 'http://localhost:8000'

export const getChats = async () => {
    const response = await axios.get(`${URL}/get_chats`);
  return response.data;

}

// Adicionar um novo chat
export const addChat = async (chatData) => {
    const response = await axios.post(`${URL}/add_chat`, chatData);
    return response.data;
}

// Atualizar um chat existente
export const updateChat = async (chatId, chatData) => {
    const response = await axios.put(`${URL}/update_chat/${chatId}`, chatData);
    return response.data;
}

// Adicionar uma nova mensagem
export const addMessage = async (roomId, messageData) => {
    const response = await axios.post(`${URL}/add_message/${roomId}`, messageData);
    return response.data;
}

// Obter mensagens de um chat (room) específico
export const getMessages = async (roomId) => {
    const response = await axios.get(`${URL}/get_messages/${roomId}`);
    return response.data;
}


