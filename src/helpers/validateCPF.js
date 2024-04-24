import { calculateCPFDigit } from '.';

/** Valida um número de CPF.
 * @param {string} cpf - O número de CPF a ser validado.
 * @returns {boolean} Retorna true se o CPF é válido, caso contrário retorna false.
 */
export default (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    return calculateCPFDigit(cpf, 10, 10) && calculateCPFDigit(cpf, 11, 11);
};
