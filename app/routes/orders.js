import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class OrdersRoute extends Route {
  async model() {

    let codigoPorCepresponse = await fetch('/api/codigoPorCep.json');
    let codigoPorCepparsed = await codigoPorCepresponse.json();

    let precoporcodigoResponse = await fetch('/api/precoPorCodigo.json');
    let precoporcodigoparsed = await precoporcodigoResponse.json();
    console.log(precoporcodigoparsed[0]['peso-maximo'])
    // let PrecoporCodigo = precoporcodigoparsed [0];

    return RSVP.hash({
      codigosPorCep: codigoPorCepparsed,
      precoporcodigo:precoporcodigoparsed,
      pedidos: [
        {
          Produto: 'Coca-Cola',
          Data: '01/01/2022',
          Quantidade: 20,
          PesoDoProduto: 500,
          Valor: 70,
          Largura: 10,
          Altura: 10,
          Comprimento: 10,
          EnderecoCEP: '01001-000',
        },
        {
          Produto: 'Guaraná',
          Data: '04/01/2022',
          Quantidade: 40,
          PesoDoProduto: 700,
          Valor: 100,
          Largura: 2,
          Altura: 2,
          Comprimento: 2,
          EnderecoCEP: '01001-000',
        },
      ],
    });
  }
}
