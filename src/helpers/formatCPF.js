import { validateCPF } from '.';
/** Formata um número de CPF no formato XXX.XXX.XXX-XX.
 * @param {string} cpf - O número de CPF a ser formatado.
 * @returns {string} O CPF formatado.
 * @throws {Error} Se o CPF fornecido for inválido.
 */
export default (cpf) => {
    if (!validateCPF(cpf)) throw new Error('CPF inválido.');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};
