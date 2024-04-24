/** Verifica se um CEP é válido.
 * @param {string} cep - O CEP a ser verificado.
 * @returns {boolean} Retorna true se o CEP for válido, caso contrário retorna false.
 */
export default (cep) => {
    const cleanCep = cep.replace(/\D/g, '');
    return cleanCep.length === 8 && /^\d+$/.test(cleanCep);
};
