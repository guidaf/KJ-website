import Component from '@glimmer/component';
import { action } from '@ember/object';


export default class BotoesComponent extends Component {
    @action
    calculate() {
        console.log('IM WORKING');
    }
}

