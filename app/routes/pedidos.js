import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class PedidosRoute extends Route {
  async model() {
    // Poderíamos buscar dados em um arquivo estático json guardado no projeto
    // Poderíamos ir na WEB e  buscar dados de qualquer API utilizando requests HTTP
    // Poderímaos ainda buscar dados e guardá-los no ember data

    // let codigosPorCepResponse = await fetch('/api/codigosPorCep.json');
    // let parsedCodigosPorCepResponse = await response.json();

    // fazer a mesma coisa para os preços por peso

    return RSVP.hash({
        // codigosPorCep: parsedCodigosPorCepResponse,
        codigosPorCep: [
            {
                cep: '01001-000',
                preco: 10,
            },
            {
                cep: '01002-000',
                preco: 20,
            },
        ],
        pedidos: [
            {
              Produto: 'Coca-Cola',
              Data: '01/01/2019',
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
              Data: '01/01/2019',
              Quantidade: 2,
              PesoDoProduto: 500,
              Valor: 1000,
              Largura: 10,
              Altura: 10,
              Comprimento: 10,
              EnderecoCEP: '01001-000',
            },
        ],
    });
  }
}
