import axios from 'axios';
import { Pedido } from '../types/Pedido.type';

const APIURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function buscarPedidoPorId(id: string, token?: string): Promise<Pedido | null> {
    try {
        const response = await axios.get<Pedido>(`${APIURL}/pedido/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pedido no servidor:', error);
        return null;
    }
}
