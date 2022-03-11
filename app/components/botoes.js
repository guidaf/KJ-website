import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BotoesComponent extends Component {
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
      zip_code <= 0
    ) {
      alert('Por favor, coloque um valor válido!');
      return;
    } else {
      var weighttotal = weight * amount * 0.001 * 0.91;
      var picking = 0.28 * amount;
      var armz = wide * height * depth * 0.000001 * 49.98 * amount;
      var packing = 5.72;
      // var preçofinal = weighttotal + picking + armz + packing + frete
      console.log('Im calculate');
    }
  }
}
