import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class OrdersRoute extends Route {
  async model() {
    // Poderíamos buscar dados em um arquivo estático json guardado no projeto
    // Poderíamos ir na WEB e  buscar dados de qualquer API utilizando requests HTTP
    // Poderímaos ainda buscar dados e guardá-los no ember data

    let codigoPorCepresponse = await fetch('/api/codigoPorCep.json');
    let codigoPorCepparsed = await codigoPorCepresponse.json();
    // return parsedCodigosPorCepResponse;
    // fazer a mesma coisa para os preços por peso

    let precoporcodigoResponse = await fetch('/api/precoPorCodigo.json');
    let precoporcodigoparsed = await precoporcodigoResponse.json();
    console.log(precoporcodigoparsed[0].peso-maximo)
    let PrecoporCodigo = precoporcodigoparsed [0];

    return RSVP.hash({
      codigosPorCep: codigoPorCepparsed,
      precoporcodigo:PrecoporCodigo,
      pedidos: [
        {
          Produto: 'Coca-Cola',
          Data: '01/01/2022',
          Quantidade: 2,
          PesoDoProduto: 500,
          Valor: 1000,
          Largura: 10,
          Altura: 10,
          Comprimento: 10,
          EnderecoCEP: '01001-000',
        },
        {
          Produto: 'Guaraná',
          Data: '04/01/2022',
          Quantidade: 4,
          PesoDoProduto: 700,
          Valor: 1000,
          Largura: 2,
          Altura: 2,
          Comprimento: 2,
          EnderecoCEP: '01001-000',
        },
      ],
    });
  }
}
