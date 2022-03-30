import Model, { attr } from '@ember-data/model';

export default class OrderModel extends Model {
  @attr produto;
  @attr quantidade;
  @attr data;
  @attr pesoDoProduto;
  @attr valor;
  @attr largura;
  @attr altura;
  @attr profundidade;
  @attr enderecoCEP;
  @attr frete;
}
