import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';


export default class PedidoCardComponent extends Component {

    @tracked emailEnviado = 'não';
    @tracked status = 'em aberto';

    get precoDoFrete() {
        return this.calcularLogistica(); 
    }

    @action
    enviarEmail() {
        this.emailEnviado = 'sim';
    }

    @action
    cancelarPedido() {
        this.status = 'cancelado';
    }

    @action
    calcularLogistica() {
        // GUI vai implementar deve retornar o preço cheio de logistica (int)
        console.log(this.args.pedido);
        console.log(this.args.codigosPorCep);

        return 10
    }
}
