import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PedidoCardComponent extends Component {
  @tracked emailEnviado = 'não';
  @tracked status = 'em aberto';

  @action
  enviarEmail() {
    this.emailEnviado = 'sim';
  }

  @action
  cancelarPedido() {
    this.status = 'cancelado';
  }
}
