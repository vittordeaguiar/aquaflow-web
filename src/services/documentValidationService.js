import { validateCPF, formatCPF } from '../helpers';
import { toast } from 'vue3-toastify';

class DocumentValidationService {
    /** Sanitiza um CPF, validando-o e formatando-o.
     * @param {string} cpf O CPF a ser sanitizado.
     * @returns {string} O CPF sanitizado e formatado.
     * @throws {Error} Se o CPF for inválido.
     */
    static sanitizeCPF(cpf) {
        if (!validateCPF(cpf)) toast.error('CPF inválido.');
        return formatCPF(cpf);
    }
}

export default DocumentValidationService;
