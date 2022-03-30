import Model, { attr } from '@ember-data/model';

export default class OrderModel extends Model {
  @attr produto;
  @attr valor;
  @attr quantidade;
  @attr data;
  @attr pesoDoProduto;
  @attr largura;
  @attr altura;
  @attr profundidade;
  @attr enderecoCEP;
}
