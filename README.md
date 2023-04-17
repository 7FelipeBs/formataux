
# Projeto de Formatações e Validações

Este projeto consiste em uma biblioteca de funções que realizam formatações básicas e validações para diversos tipos de dados, como dinheiro, telefone, data, CPF e CNPJ.

## Funcionalidades

As principais funcionalidades da biblioteca são:

-   `formatarDinheiro(valor: number,  opcoes?:  string): string`: formata um valor numérico para o formato monetário brasileiro como default (exemplo: `formatarDinheiro(1000) // "R$ 1.000,00"`), existe opções atuais para formatar como: inglês, português portugal, chinês, etc.

-   `formatarTelefone(telefone: string): string`: formata um número de telefone para o formato (99) 9999-9999 ou (99) 99999-9999, conforme necessário, sendo o (99) que é o DD como opcional, pode enviar apenas o valor 99999999 que ele vai te retorna 9999-9999 formatado.
-  `formatarZerosEsquerda(valor: number  |  string,  quantidadeZeros: number): string`: formatar zeros a esquerda conforme os parâmetros passado.

-   `formatarData(data: string): string`: formata uma data no formato (yyyy-mm-dd ou MMM dd, yyyy) para o formato dd/mm/yyyy

 -   `formataDataHora(data: string): string`: formata uma data ISO (yyyy-MM-ddT:HH:mm:ssZ ou yyyy-MM-dd HH:mm:ss) para alguns tipos de formato disponível atual como: dd/MM/yyyy, dd/MM/yyyy HH:mm:ss, HH:mm:ss, etc.
-   `formataDocumentos(valor: number|string)`: formata um numero/string de CPF ou CNPJ confome passado o valor  para modelo como esse: 000.000.000-00 ou 00.000.000/0000-00
-    `removeFormatacaoCnpjCpf(valor: number|string): string`:  remove formatações de CNPJ ou CPF

-   `validarEmail(email: any): boolean`: verifica se um email é válido

-   `validarData(telefone: string): boolean`: verifica se a data passada é válida

-   `verificarValorPresente(valor: string|number): boolean`: verifica se um campo realmente possui algum valor ou se é vazio, undefined, null ou NaN


## Uso

Para usar a biblioteca, é necessário importar o módulo e chamar as funções desejadas. Exemplo:

    const  formatacao  =  require("./util/formatacao")
	const  {  validarEmail  }  =  require("./util/validacao")
	validarEmail("teste@gmail.com")
	formatacao.formatarTelefone("3499999999")

## Contribuição

Contribuições são sempre bem-vindas! Se você tiver alguma sugestão de melhoria ou nova funcionalidade, sinta-se à vontade para abrir uma issue ou pull request.