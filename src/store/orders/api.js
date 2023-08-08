import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://southamerica-east1-newagent-ponu.cloudfunctions.net',
})

export const getOrders = async () => {
    try {
        const headers = {
            'Access-Control-Allow-Origin': '*' // Defina a origem correta
        };

        const response = await axiosApi.get(`/get_all_orders`, { headers });
        return response.data ? response.data : [];
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao obter pedidos";
        throw error;
    }
}

// Adicionar um novo pedido
export const addOrder = async (orderData) => {
    try {
        if (!orderData) throw new Error("Dados de pedido inválidos");
        const response = await axiosApi.post(`/create_order`, orderData);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar pedido", error);
        throw error;
    }
}

// Atualizar um pedido existente
export const updateOrder = async (orderData) => {
    try {
        if (!orderData) throw new Error("Dados de pedido inválidos");
        const response = await axiosApi.put(`/update_order`, orderData);
        return response.data;
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao atualizar pedidos";
        throw error;
    }
}

// Deletar um pedido
export const deleteOrder = async (orderId) => {
    try {
        if (!orderId) throw new Error("ID de pedido inválido");
        const response = await axiosApi.delete(`/delete_order/${orderId}`);
        return response.data;
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao deletar pedido";
        throw error;
    }
}

