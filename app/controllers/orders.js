import Controller from '@ember/controller';
import { action } from '@ember/object';
import moment from 'moment';
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
      //calculate total

      var weighttotal = this.newOrder.pesoDoProduto * this.newOrder.quantidade * 0.001 * 0.91;
      var picking = 0.28 * this.newOrder.quantidade;
      var armz = this.newOrder.largura * this.newOrder.altura * this.newOrder.profundidade * 0.000001 * 49.98 * this.newOrder.quantidade;
      var packing = 5.72;

      var frete = this.frete;

      var precofinal = weighttotal + picking + armz + packing + frete;
      
      this.newOrder.valor = precofinal.toFixed(2);
      this.newOrder.frete = frete;
      this.newOrder.data = moment().format('DD/MM/YYYY');

      return true;
    }
  }


  // VALIDANDO VALORES
 validateOrder() {
  if (this.newOrder.pesoDoProduto == null ||
    isNaN(this.newOrder.pesoDoProduto) == true ||
    this.newOrder.pesoDoProduto <= 0) {
      alert('Por favor, coloque um peso válido!');
      return false;
    }
  
  else if (this.newOrder.largura == null ||
  this.newOrder.largura === 0 ||
  isNaN(this.newOrder.largura) == true ||
  this.newOrder.largura <= 0) {
    alert('Por favor, coloque uma largura válida!');
    return false;
  } 
  
  else if (this.newOrder.altura == null ||
  this.newOrder.altura === 0 ||
  isNaN(this.newOrder.altura) == true ||
  this.newOrder.altura <= 0) {
    alert('Por favor, coloque uma altura válida!');
    return false;
  } 
  
  else if (this.newOrder.profundidade == null ||
  this.newOrder.profundidade === 0 ||
  isNaN(this.newOrder.profundidade) == true ||
  this.newOrder.profundidade <= 0) {
      alert('Por favor, coloque uma profundidade válida!');
      return false;
  } 
  
  else if (this.newOrder.quantidade == null ||
  this.newOrder.quantidade === 0 ||
  isNaN(this.newOrder.quantidade) == true ||
  this.newOrder.quantidade <= 0) {
    alert('Por favor, coloque uma quantidade válida!');
    return false;
  } 
  
  else if (this.newOrder.enderecoCEP == null ||
  this.newOrder.enderecoCEP === 0 ||
  isNaN(this.newOrder.enderecoCEP) == true ||
  this.newOrder.enderecoCEP <= 0) {
    alert('Por favor, coloque uma Código Postal válido!');
    return false;
  } else {
    return true;
  }
}

  get frete() {
    var zip_code = this.newOrder.enderecoCEP;
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
    var amount = this.newOrder.quantidade;
    var weight = this.newOrder.pesoDoProduto;
    var weighttotal = weight * amount * 0.001 * 0.91;
    console.log(weighttotal);
    for (let i = 0; i < this.model.precoporcodigo.length; i++) {
      let codigoRegiao = this.model.precoporcodigo[i]['codigo-regiao'].replace(/\s+/g,'');
      let pesostring = this.model.precoporcodigo[i]['peso-maximo'].replace(',','.');
      let peso = parseFloat(pesostring);
      console.log(peso);
      if (codigoRegiao == geografiacomercial && weighttotal <= peso) {
        var preco = this.model.precoporcodigo[i]['preco'].replace(',', '.');
        return parseFloat(preco);
      }
    }
  }
}
