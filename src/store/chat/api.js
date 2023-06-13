import axios from 'axios';

const API_URL = 'https://twilliopizza.mateusb121.repl.co'

const axiosApi = axios.create({
    baseURL: API_URL,
})

export const getChats = async () => {
    try {
        const response = await axiosApi.get(`/get_all_conversations`);
        return response.data ? response.data : [];
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao obter chats";
        throw error;
    }
}

// Adicionar um novo chat
export const addChat = async (chatData) => {
    try {
        if (!chatData) throw new Error("Dados de chat inválidos");
        const response = await axiosApi.post(`/create_conversation`, chatData);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar chat", error);
        throw error;
    }
}

// Atualizar um chat existente
export const updateChat = async (chatData) => {
    try {
        if (!chatData) throw new Error("Dados de chat inválidos");
        const response = await axiosApi.put(`/update_conversation`, chatData);
        return response.data;
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao atualizar chats";
        throw error;
    }
}

// Adicionar uma nova mensagem
export const addMessage = async (messageData) => {
    try {
        if (!messageData) throw new Error("Dados de mensagem inválidos");
        const response = await axiosApi.post(`/add_message`, messageData);
        return messageData;
    } catch (error) {
        console.error("Erro ao adicionar mensagem", error);
        throw error;
    }
}

// Obter mensagens de um chat (room) específico
export const getMessages = async (telephone) => {
    try {
        if (!telephone) throw new Error("ID de sala inválido");
        const response = await axiosApi.get(`/get_user_conversations/${telephone}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter mensagens", error);
        throw error;
    }
}
