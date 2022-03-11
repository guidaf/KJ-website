import EmberRouter from '@ember/routing/router';
import config from 'kj-tabelas/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('new-order');
  this.route('orders');
  this.route('pedidos');
});

// App.UsersRoute = Ember.Router.extend({
//   model: function(){
//     Ember.$.getCSV('//app/components/codigo-por-cep.csv')

//   console.log(data)
//   }
// });
