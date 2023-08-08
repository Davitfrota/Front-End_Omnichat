import axios from 'axios';
import { GCP_API_BASE_URL, LOCALHOST_API_BASE_URL } from '../../constants/apiUrls';


const GCPaxiosApi = axios.create({
    baseURL: GCP_API_BASE_URL 
})

const localHostaxiosApi = axios.create({
    baseURL: LOCALHOST_API_BASE_URL + '/conversations'
})

export const getChats = async () => {
    try {
        const response = await localHostaxiosApi.get(`/get_all_conversations`);
        return response.data != null ? response.data : [];
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao obter chats";
        throw error;
    }
}

// Adicionar um novo chat
export const addChat = async (chatData) => {
    try {
        console.log('chatData', chatData)
        if (!chatData) throw new Error("Dados de chat inválidos");
        console.log('enviando requisição para create_conversation', chatData)
        const response = await localHostaxiosApi.get(`/get_conversation_by_whatsapp_number/${chatData.phoneNumber}`,);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar chat", error);
        throw error;
    }
}

// Atualizar um chat existente
export const updateChat = async (chatData) => {
    try {
        console.log('chatData', chatData)
        if (!chatData) throw new Error("Dados de chat inválidos");
        const response = await localHostaxiosApi.put(`/update_conversation`, chatData);
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
        const response = await localHostaxiosApi.post(`/add_message`, messageData);
        console.log('adicionou mensagem ',response.data )
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar mensagem", error);
        throw error;
    }
}

// Obter mensagens de um chat (room) específico
export const getMessages = async (telephone) => {
    try {
        if (!telephone) throw new Error("ID de sala inválido");
        const response = await localHostaxiosApi.get(`/get_conversation_by_whatsapp_number/${telephone}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter mensagens", error);
        throw error;
    }
}
