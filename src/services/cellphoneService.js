import { validateCellphone, formatCellphone } from '../helpers';
import { toast } from 'vue3-toastify';

class CellphoneService {
    /** Sanitiza um número de celular.
     * @param {string} cellphone - O número de celular a ser sanitizado.
     * @returns {string} O número de celular sanitizado.
     * @throws {Error} Se o número de celular for inválido.
     */
    static sanitizeCellphone(cellphone) {
        if (!validateCellphone(cellphone)) {
            toast.error('Número de celular inválido.');
        }
        return formatCellphone(cellphone);
    }
}

export default CellphoneService;
