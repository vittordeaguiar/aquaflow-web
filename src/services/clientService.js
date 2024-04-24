import { toast } from 'vue3-toastify';
import axios from 'axios';
import { validateClient } from '../helpers';

class ClientService {
    /** Cria um novo cliente.
     * @param {Object} client - O objeto contendo os dados do cliente a ser criado.
     * @returns {Promise<Object>} - Uma Promise que resolve com os dados do cliente criado.
     * @throws {Error} - Se ocorrer algum erro durante a criação do cliente.
     */
    create = async (client) => {
        await validateClient(client);
        const res = await axios.post('/client/create', client);
        return res.data;
    };

    /** Retorna todos os clientes.
     * @returns {Promise<Array>} Uma Promise que resolve para um array contendo os dados dos clientes.
     */
    getAll = async () => (await axios.get('/client/getAll')).data;

    /** Retorna o cliente pelo ID selecionado.
     * @returns {Promise<Array>} Uma Promise que resolve para um JSON contendo os dados do cliente.
     */
    getById = async (id) => (await axios.get(`/client/getById/${id}`)).data;

    /** Atualiza um cliente.
     * @param {Object} client - O objeto do cliente a ser atualizado.
     * @returns {Promise<Object>} - Uma Promise que resolve com os dados do cliente atualizado.
     */
    update = async (client) => {
        await validateClient(client);
        const res = await axios.patch('/client/update', client);
        return res.data;
    };
}

export default new ClientService();
