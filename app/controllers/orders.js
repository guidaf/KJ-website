import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class OrdersController extends Controller {
  @service store;
  @tracked newOrder = null;

  @action // botão de compra
  adicionarPedidos() {
    if (this.calculate() !== false) {
      this.newOrder.save();
      this.close();
      }
  }

  //Modal

  @tracked modalIsShown = false;

  @action show() {
    this.modalIsShown = true;

    if (!this.newOrder) {
      this.newOrder = this.store.createRecord('order');
    }
  }

  @action
  close() {
    this.modalIsShown = false;

    if (this.newOrder) {
      this.newOrder.unloadRecord();
    }
  }


  // Verificando se o valor é válido e enviando o preço final
  @action
  calculate() {
    let isValid = this.validateOrder();
    if (true==isValid) {
      //Alet
      alert('Por favor, coloque um valor válido!');
      return false;
    } else {
      //calculate total
      this.showbutton();

      var weighttotal = weight * amount * 0.001 * 0.91;
      var picking = 0.28 * amount;
      var armz = wide * height * depth * 0.000001 * 49.98 * amount;
      var packing = 5.72;
      var frete = this.frete;

      var precofinal = weighttotal + picking + armz + packing + frete;
      return precofinal.toFixed(2);
    }
  }

 validateOrder() {
  if (
    this.weight === '' ||
    this.weight === 0 ||
    this.weight <= 0 ||
    this.wide === '' ||
    this.wide === 0 ||
    this.wide <= 0 ||
    this.height === '' ||
    this.height === 0 ||
    this.height <= 0 ||
    this.depth === '' ||
    this.depth === 0 ||
    this.depth <= 0 ||
    this.amount === '' ||
    this.amount === 0 ||
    this.amount <= 0 ||
    this.zip_code === '' ||
    this.zip_code === 0 ||
    this.zip_code <= 0
  ) { 
    // validar as infos com base nas propriedades do model
    // ex: if (this.newOrder.produto === '') return false;
    // ex: if (this.newOrder.cep === '') return false;
    // ex: if (this.newOrder.produto === '') return false;

    return true;
  }
}

  get frete() {
    var zip_code = document.getElementById('zip_code').value;
    for (let i = 0; i < this.model.codigosPorCep.length; i++) {
      if (
        this.model.codigosPorCep[i]['CEPInicial'] <=
        zip_code <=
        this.model.codigosPorCep[i]['CEPFinal']
      ) {
        var geografiacomercial =
          this.model.codigosPorCep[i]['GeografiaComercial'];
        return this.precofrete(geografiacomercial);
      }
    }
  }

  precofrete(geografiacomercial) {
    var amount = document.getElementById('amount').value;
    var weight =
      document.getElementById('weight').value * amount * 0.001 * 0.91;
    for (let i = 0; i < this.model.precoporcodigo.length; i++) {
      let codigoRegiao = this.model.precoporcodigo[i]['codigo-regiao'].replace(
        /\s+/g,
        ''
      );
      let pesostring = this.model.precoporcodigo[i]['peso-maximo'].replace(
        ',',
        '.'
      );
      let peso = parseFloat(pesostring);

      if (codigoRegiao == geografiacomercial && weight <= peso) {
        var preco = this.model.precoporcodigo[i]['preco'].replace(',', '.');
        return parseFloat(preco);
      }
    }
  }
}
