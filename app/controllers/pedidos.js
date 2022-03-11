import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class PedidosController extends Controller {
  get QuandadeDePedidos() {
    return this.model.pedidos.length;
  }

  @action
  adicionarPedido() {
    this.model.pedidos.pushObject({
      Produto: '',
      Data: 'aknsakdjf',
      Quantidade: 0,
      PesoDoProduto: 0,
      Valor: 0,
      Largura: 0,
      Altura: 0,
      Comprimento: 0,
      EnderecoCEP: '',
    });
  }
}
