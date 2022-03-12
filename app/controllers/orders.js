import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class PedidosController extends Controller {
  get QuandadeDePedidos() {
    return this.model.pedidos.length;
  }

  @action             // botão de compra
  adicionarPedidos() {
    
    

    if(this.calculate() !== false){

      var name = document.getElementById('name').value;
      var weight = document.getElementById('weight').value;
      var wide = document.getElementById('wide').value;
      var height = document.getElementById('height').value;
      var depth = document.getElementById('depth').value;
      var amount = document.getElementById('amount').value;
      var zip_code = document.getElementById('zip_code').value;

      this.model.pedidos.pushObject({
        Produto: name,
        Data: 'aknsakdjf',
        Quantidade: amount,
        PesoDoProduto: weight,
        Valor: 0,
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
  show(){
    const modal = document.getElementById('modalID');
    modal.classList.add('show');
  }
    
  @action
  close(){
    const modal = document.getElementById('modalID');
    modal.classList.remove('show')
    console.log('Close');
    document.getElementById('name').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('wide').value = '';
    document.getElementById('height').value = '';
    document.getElementById('depth').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('zip_code').value = '';
  }


 // Verificando se o valor é válido
  @action
  calculate() {
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
      zip_code <= 0) { //Alet
      alert('Por favor, coloque um valor válido!');
      return false;
    } else { //calculate total 
      var weighttotal = weight * amount * 0.001 * 0.91;
      var picking = 0.28 * amount;
      var armz = wide * height * depth * 0.000001 * 49.98 * amount;
      var packing = 5.72;
      // var preçofinal = weighttotal + picking + armz + packing + frete
      return;
    }
  }
}
