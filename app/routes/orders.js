import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default class OrdersRoute extends Route {
  @service store;
  async model() {
    let codigoPorCepresponse = await fetch('/api/codigoPorCep.json');
    let codigoPorCepparsed = await codigoPorCepresponse.json();

    let precoporcodigoResponse = await fetch('/api/precoPorCodigo.json');
    let precoporcodigoparsed = await precoporcodigoResponse.json();

    return RSVP.hash({
      codigosPorCep: codigoPorCepparsed,
      precoporcodigo: precoporcodigoparsed,
      pedidos: this.store.findAll('order'),
    });
  }
}
