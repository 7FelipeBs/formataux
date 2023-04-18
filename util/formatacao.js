const constante = require("./constante");
const validacao = require("./validacao");

module.exports = {

  /**
 * Transforma um CNPJ/CPF com sua formatação
 *
 * @param {number|string}  valor - CNPJ/CPF Sem formatação
 * @returns {string} CNPJ/CPF formatado Ex: XXX.XXX.XXX-XX ou XX.XXX.XXX/XXXX-XX
 * @throws Quando o formato é inválido do documento.
 */
  formataDocumentos (valor) {
    if(!validacao.verificarValorPresente(valor)) return null

    if (String(valor).length === 11) {
      if(!validacao.validarCPF(valor))  throw new Error(`Formato Inválido do CPF`);
      return String(valor).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

    } else if (String(valor).length === 14) {
      if(!validacao.validarCNPJ(valor))  throw new Error(`Formato Inválido do CNPJ`);
      return String(valor).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    }

    throw new Error(`Tamanho Inválido do documento!`);
  },

  /**
 * Retira a formatação de um CNPJ/CPF
 *
 * @param {number|string} valor - CNPJ/CPF Formatado
 * @returns {string} Retira a formatação do CPF/CNPJ
 */
  removeFormatacaoCnpjCpf (valor) {
    if(validacao.verificarValorPresente(valor)) {
      const regex = /[\.-\/]/g;
      return valor.replace(regex, "");
    }
  },

/**
 * Formatar um valor baseado na localização atual.
 * [default=portugues_brasil]
 *
 * @param {number} valor - Valor monetário sem formatação.
 * @param {string} opcoes - Opções de localização: ingles(EUA), chines, espanhol(espanha), portugues_brasil, portugues_portugal, frances
 * @returns {string} Valor monetário formatado.
 */
  formatarDinheiro(valor, opcoes = 'portugues_brasil') {
    if (!validacao.verificarValorPresente(valor)) return null;

    const linguagem = constante.LOCALIZACAO.find((l) => l.nome === opcoes);

    if (!validacao.verificarValorPresente(linguagem)) throw new Error(`Não existe essa opção no momento: ${opcoes}`);

    const formatoMoeda = new Intl.NumberFormat(linguagem.valor, {
      style: 'currency',
      currency: linguagem.moedaISO,
    });

    return formatoMoeda.format(valor);
  },

  /**
    Formata a data no formato especificado.
    @param {string} valor - Data para se formatado, formato válido: yyyy-MM-dd ou "MMM dd, yyyy".
    @returns {string} A data formatada para dd/MM/yyyy.
    @throws Quando o formato é inválido ou quando a data é inválida..
  */
  formataData(valor) {
    if(!validacao.verificarValorPresente(valor)) return null
    const data = new Date(valor);

    if(validacao.validarData(data)) {
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();

      return `${dia}/${mes}/${ano}`
    } throw new Error(`Formato Inválido da data passada: ${valor}`);
  },

    /**
    Formata a data no formato especificado.
    @param {string} valor - A data em formato de ISO 8601 (yyyy-MM-dd HH:mm:ss ou yyyy-MM-ddTHH:mm:ssZ).
    @param {string} formato - O formato da data que vai ser convertido, opções disponíveis: 'yyyy-MM-dd', 'HH:mm:ss', 'dd/MM/yyyy', 'MMM dd, yyyy' e 'dd/MM/yyyy HH:mm:ss'.
    @returns {string} A data formatada.
    @throws Quando o formato é inválido ou quando a data é inválida.
  */
  formataDataHora(valor, formato) {
    if(!validacao.verificarValorPresente(valor)) return null
    const data = new Date(valor);

    if(validacao.validarData(new Date(valor))) {
      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const dia = String(data.getDate()).padStart(2, '0');
      const hora = String(data.getHours() + 3).padStart(2, '0');
      const minuto = String(data.getMinutes()).padStart(2, '0');
      const segundos = String(data.getSeconds()).padStart(2, '0');


      switch (formato) {
        case 'yyyy-MM-dd':
          return `${ano}-${mes}-${dia}`;
        case 'HH:mm:ss':
          return `${hora}:${minuto}:${segundos}`;
        case 'dd/MM/yyyy':
          return `${dia}/${mes}/${ano}`;
        case 'MMM dd, yyyy':
          const mesName = constante.ABREVIACAO_MES[data.getMonth()];
          return `${mesName} ${dia}, ${ano}`;
        case 'dd/MM/yyyy HH:mm:ss':
          return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundos}`;
        default:
          throw new Error(`Formato Inválido da data: ${formato}`);
      }
    } else throw new Error(`Formato Inválido da data passada: ${valor}`);
  },

  /**
    Formata o valor passado com zeros à esquerda até a quantidade especificada.
    @param {number|string} valor - O valor a ser formatado.
    @param {number} quantidadeZeros - A quantidade de zeros à esquerda a serem adicionados.
    @returns {string} - O valor formatado com zeros à esquerda.
  */
  formatarZerosEsquerda(valor, quantidadeZeros) {
    if(!validacao.verificarValorPresente(valor)) return null
    return String(valor).padStart(quantidadeZeros, '0');
  },

  /**
    Formata o telefone para: (XX) XXXXX-XXXX e (XX) XXXX-XXXX
    (DD é opcional de acordo com o valor passado).
    @param {number|string} valor - O valor a ser formatado.
    @returns {string} - O valor formatado com zeros à esquerda.
  */
  formatarTelefone(telefone) {
    if (validacao.verificarValorPresente(telefone)) {
      if(!validacao.validarTelefone(telefone)) throw new Error(`Número Inválido do telefone!`);

      const regexTelefone = /^(\d{2})?(\d{8}|\d{9})$/;
      const match = String(telefone).match(regexTelefone);

      if (!match) {
        return telefone;
      }

      const ddd = match[1] ? `(${match[1]})` : "";
      const codigoArea = match[2].length === 9 ? `${match[2].substring(0,5)}-${match[2].substring(5)}` : `${match[2].substring(0,4)}-${match[2].substring(4)}`;
      const telefoneFormatado = `${ddd}${codigoArea}`;

      return telefoneFormatado;
    }

    return telefone
  }
}
