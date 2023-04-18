module.exports = {

  /**
    Valida se o campo ele de fato tem algum valor
    @param {string|number} valor - Verifica se o valor passado é válido.
    @returns {boolean} - Retorna se é válido o campo.
  */
  verificarValorPresente(valor) {
      return !(valor === null || valor === undefined || (typeof valor === "number" && isNaN(valor)) || (typeof valor === "string" && valor.trim() === ""));
  },

  /**
    Valida se o E-mail é válido
    @param {string} valor - Verifica se o E-mail é valido.
    @returns {boolean} - Retorna se é válido o E-mail.
  */
  validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
    Valida se o Telefone é válido
    @param {object} valor - Verifica se o Telefone é valido.
    @returns {boolean} - Retorna se é válido o Telefone.
  */
  validarTelefone(telefone) {
    const padrao = /^\d+$/;
    const tamanhoTelefone = String(telefone).length;

    if (tamanhoTelefone < 8 || tamanhoTelefone > 11) {
      return false;
    }

    if (!padrao.test(String(telefone))) {
      return false;
    }

    return true;
  },

  /**
    Valida se o CPF é válido
    @param {string} valor - Verifica se o CPF é valido.
    @returns {boolean} - Retorna se é válido o CPF.
  */
  validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
            return false;

    // Valida 1o digito
    add = 0;
    for (i=0; i < 9; i ++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i ++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
  },

  /**
    Valida se o CNPJ é válido
    @param {string} valor - Verifica se o CNPJ é valido.
    @returns {boolean} - Retorna se é válido o CNPJ.
  */
  validarCNPJ(cnpj) {
    // Remover caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, '');

    // CNPJ deve ter 14 dígitos
    if (cnpj.length !== 14) {
      return false;
    }

    // Verificar dígito verificador
    let soma = 0;
    let pos = 5;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * pos;
      pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(cnpj.charAt(12))) {
      return false;
    }

    soma = 0;
    pos = 6;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * pos;
      pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(cnpj.charAt(13))) {
      return false;
    }

    return true;
  },

  /**
    Valida se é uma data válido
    @param {string} valor - Verifica se a data é valida.
    @returns {boolean} - Retorna se é válida a data.
  */
  validarData (valor) {
    return valor instanceof Date && !isNaN(valor);
  }
}
