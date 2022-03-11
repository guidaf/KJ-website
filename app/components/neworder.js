import Component from '@glimmer/component';
import { action,set } from '@ember/object';


export default class NeworderComponent extends Component {
    @action
    toggleShowing() {
        console.log('im working')
        // set(this, 'isShowing', !this.isShowing);
        var test = 0;
    }
}
