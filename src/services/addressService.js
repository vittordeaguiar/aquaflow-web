import axios from 'axios';
import { ToastActions, toast } from 'vue3-toastify';
import { validateZipcode } from '../helpers';

class AddressService {
    /** Função assíncrona que busca um endereço a partir de um CEP.
     * @param {string} zipcode - O CEP a ser pesquisado.
     * @returns {Promise<Object>} - Uma Promise que resolve com o objeto contendo os dados do endereço encontrado.
     * @throws {Error} - Lança um erro caso ocorra algum problema na busca do CEP.
     */
    getByZipcode = async (zipcode) => {
        if (!validateZipcode(zipcode)) {
            toast.error('CEP inválido. Por favor, insira um CEP correto.');
            return;
        }

        const toastId = toast.loading('Buscando CEP...');

        try {
            const responsePromise = axios.get(
                `/address/getByZipcode/${zipcode}`
            );

            await new Promise((resolve) => setTimeout(resolve, 400));

            const { data } = await responsePromise;

            ToastActions.dismiss(toastId);

            return data;
        } catch (error) {
            ToastActions.dismiss(toastId);
            toast.error('Erro ao buscar CEP.');
            throw error;
        }
    };

    /** Cria um novo cliente.
     * @param {Object} address - O objeto contendo os dados do cliente.
     * @returns {Promise<Object>} - Uma Promise que resolve com os dados do cliente criado.
     * @throws {Error} - Se ocorrer algum erro durante a criação do cliente.
     */
    create = async (address) => {
        await this.validateAddress(address);
        const res = await axios.post('/address/create', address);
        return res.data;
    };

    validateAddress = async (address) => {
        if (!address) throw new Error('Endereço não informado.');
        if (!address.zipcode) throw new Error('CEP não informado.');
        if (!validateZipcode(address.zipcode)) throw new Error('CEP inválido.');
        if (!address.state) throw new Error('Estado não informado.');
        if (!address.city) throw new Error('Cidade não informada.');
        if (!address.neighborhood) throw new Error('Bairro não informado.');
        if (!address.street) throw new Error('Logradouro não informado.');
        if (!address.number) throw new Error('Número não informado.');
    };

    /** Atualiza um endereço.
     * @param {Object} address - O objeto de endereço a ser atualizado.
     * @returns {Promise<Object>} - Uma Promise que resolve com os dados do endereço atualizado.
     */
    update = async (address) => {
        await this.validateAddress(address);
        const res = await axios.patch('/address/update', address);
        return res.data;
    };
}

export default new AddressService();
