/** Calcula o dígito verificador de um CPF.
 * @param {string} cpf - O CPF a ser calculado.
 * @param {number} initialWeight - O peso inicial para o cálculo.
 * @param {number} finalWeight - O peso final para o cálculo.
 * @returns {boolean} Retorna true se o dígito verificador calculado for igual ao dígito verificador fornecido no CPF, caso contrário retorna false.
 */
export default (cpf, initialWeight, finalWeight) => {
    let sum = 0;
    for (let i = 0; i < finalWeight - 1; i++) {
        sum += parseInt(cpf.charAt(i)) * (initialWeight - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpf.charAt(finalWeight - 1));
};
