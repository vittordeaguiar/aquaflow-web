/** Formata um número de telefone celular.
 * @param {string} cellphone - O número de telefone celular a ser formatado.
 * @returns {string} O número de telefone celular formatado.
 */
export default (cellphone) => {
    const cleanedCellphone = cellphone.replace(/\D/g, '');
    return cleanedCellphone.replace(
        /(\d{2})(\d{1})(\d{4})(\d{4})/,
        '($1) $2$3-$4'
    );
};
