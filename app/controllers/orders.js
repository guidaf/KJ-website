import Controller from '@ember/controller';
import { action } from '@ember/object';
import moment from 'moment';

export default class OrdersController extends Controller {

  @action // botão de compra
  adicionarPedidos() {
      var name = document.getElementById('name').value;
      var wide = document.getElementById('wide').value;
      var height = document.getElementById('height').value;
      var depth = document.getElementById('depth').value;
      var amount = document.getElementById('amount').value;
      var weight = document.getElementById('weight').value * amount * 0.001 * 0.91 ;
      var zip_code = document.getElementById('zip_code').value;
      var preco = this.calculate()

      this.model.pedidos.pushObject({
        Produto: name,
        Data: moment().format('DD/MM/YYYY'),
        Quantidade: amount,
        PesoDoProduto: weight.toFixed(2),
        Valor: preco,
        Largura: wide,
        Altura: height,
        Comprimento: depth,
        EnderecoCEP: zip_code,
        Frete: 1,
      });

      this.closemodal();
  }

  //Modal

  @action
  showmodal() {
    const modal = document.getElementById('modalID');
    modal.classList.add('show');
  }

  @action
  closemodal() {
    const modal = document.getElementById('modalID');
    const button = document.getElementById('buy')
    const calculate = document.getElementById('calculate')
    const preco = document.getElementById('preco')
    document.getElementById('name').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('wide').value = '';
    document.getElementById('height').value = '';
    document.getElementById('depth').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('zip_code').value = '';
    modal.classList.remove('show');
    button.classList.remove('show')
    preco.classList.remove('show')
    calculate.classList.add('show')
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
      this.showbutton();

      var weighttotal = weight * amount * 0.001 * 0.91;
      var picking = 0.28 * amount;
      var armz = wide * height * depth * 0.000001 * 49.98 * amount;
      var packing = 5.72;
      var frete = this.frete;

      var precofinal = weighttotal + picking + armz + packing + frete;
      return (precofinal.toFixed(2));
    }
  }
  
  // Aparecer botão
  
  showbutton(){
    const calculate = document.getElementById('calculate')
    calculate.classList.remove('show')
    const button = document.getElementById('buy')
    button.classList.add('show')
    const preco = document.getElementById('preco')
    preco.classList.add('show')
  }

  get frete(){
    var zip_code = document.getElementById('zip_code').value;
    for (let i = 0; i < this.model.codigosPorCep.length; i++) {
      if (this.model.codigosPorCep[i]['CEPInicial']<=zip_code<=this.model.codigosPorCep[i]['CEPFinal']) {
        var geografiacomercial = this.model.codigosPorCep[i]['GeografiaComercial'];
        return (this.precofrete(geografiacomercial))
      } 
    }
  }

  precofrete(geografiacomercial){
    var amount = document.getElementById('amount').value;
    var weight = document.getElementById('weight').value * amount * 0.001 * 0.91 ;
      for (let i = 0; i < this.model.precoporcodigo.length; i++) {

        let codigoRegiao = this.model.precoporcodigo[i]["codigo-regiao"].replace(/\s+/g, '');
        let pesostring = this.model.precoporcodigo[i]["peso-maximo"].replace(",",".");
        let peso = parseFloat(pesostring);

        if (codigoRegiao == geografiacomercial && weight<=peso) {
          var preco = this.model.precoporcodigo[i]["preco"].replace(",",".");
          return (parseFloat(preco))
        }        
    }     
  } 
}
