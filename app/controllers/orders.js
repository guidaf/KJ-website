import Controller from '@ember/controller';
import { action } from '@ember/object';
import moment from 'moment';

export default class OrdersController extends Controller {

  @action // botão de compra
  adicionarPedidos() {
    if (this.calculate() !== false) {
      var name = document.getElementById('name').value;
      var weight = document.getElementById('weight').value;
      var wide = document.getElementById('wide').value;
      var height = document.getElementById('height').value;
      var depth = document.getElementById('depth').value;
      var amount = document.getElementById('amount').value;
      var zip_code = document.getElementById('zip_code').value;
      var precofrete = this.calculate()

      this.model.pedidos.pushObject({
        Produto: name,
        Data: moment().format('DD/MM/YYYY'),
        Quantidade: amount,
        PesoDoProduto: weight,
        Valor: precofrete,
        Largura: wide,
        Altura: height,
        Comprimento: depth,
        EnderecoCEP: zip_code,
      });

      this.close();
    }
  }

  //Modal

  @action
  show() {
    const modal = document.getElementById('modalID');
    modal.classList.add('show');
    for (let i = 0; i < this.model.codigosPorCep.length; i++) {
      if (this.model.codigosPorCep[i]['CEPInicial']<=5612050<=this.model.codigosPorCep[i]['CEPFinal']) {
        var geografiacomercial = this.model.codigosPorCep[i]['GeografiaComercial'];
        console.log(geografiacomercial);
        break;
    // console.log(this.model.precoporcodigo[0]["codigo-regiao"])
      }
    }
  }

  @action
  close() {
    const modal = document.getElementById('modalID');
    document.getElementById('name').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('wide').value = '';
    document.getElementById('height').value = '';
    document.getElementById('depth').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('zip_code').value = '';
    modal.classList.remove('show');
  }

  // Verificando se o valor é válido e enviando o preço final
  @action
  calculate() {
    var name = document.getElementById('name').value;
    var weight = document.getElementById('weight').value;
    var wide = document.getElementById('wide').value;
    var height = document.getElementById('height').value;
    var depth = document.getElementById('depth').value;
    var amount = document.getElementById('amount').value;
    var zip_code = document.getElementById('zip_code').value;

    if (
      weight === '' ||
      weight === 0 ||
      weight <= 0 ||
      wide === '' ||
      wide === 0 ||
      wide <= 0 ||
      height === '' ||
      height === 0 ||
      height <= 0 ||
      depth === '' ||
      depth === 0 ||
      depth <= 0 ||
      amount === '' ||
      amount === 0 ||
      amount <= 0 ||
      zip_code === '' ||
      zip_code === 0 ||
      zip_code <= 0
    ) {
      //Alet
      alert('Por favor, coloque um valor válido!');
      return false;
    } else if (name === '' || name === ' ') {
      alert('Por favor, coloque um nome válido!');
      return false;
    } else {
      //calculate total
      var weighttotal = weight * amount * 0.001 * 0.91;
      var picking = 0.28 * amount;
      var armz = wide * height * depth * 0.000001 * 49.98 * amount;
      var packing = 5.72;
      var frete = this.frete
      var preçofinal = weighttotal + picking + armz + packing + frete
      // console.log(this.frete.geografiacomercial)
      return (preçofinal.toFixed(2));
    }
  }
  
  get frete(){
    var zip_code = document.getElementById('zip_code').value;
    for (let i = 0; i < this.model.codigosPorCep.length; i++) {
      if (this.model.codigosPorCep[i]['CEPInicial']<=zip_code<=this.model.codigosPorCep[i]['CEPFinal']) {
        var geografiacomercial = this.model.codigosPorCep[i]['GeografiaComercial'];
        console.log(geografiacomercial)
        return (this.precofrete(geografiacomercial))
      } 
    }
  }

  precofrete(geografiacomercial){
    var weight = document.getElementById('weight').value;
      for (let i = 0; i < this.model.precoporcodigo.length; i++) {
        if (this.model.precoporcodigo[i]["codigo-regiao"] === geografiacomercial && weight<=this.model.precoporcodigo[i]["peso-maximo"]) {
          return (this.model.precoporcodigo[i]["preco"])
        }        
    }
  }
}
