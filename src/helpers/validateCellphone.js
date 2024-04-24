/** Valida um número de telefone celular.
 * @param {string} cellphone - O número de telefone celular a ser validado.
 * @returns {boolean} Retorna true se o número de telefone celular for válido, caso contrário retorna false.
 */
export default (cellphone) => {
    const cleanedCellphone = cellphone.replace(/\D/g, '');
    return cleanedCellphone.length === 11 && cleanedCellphone[2] === '9';
};
