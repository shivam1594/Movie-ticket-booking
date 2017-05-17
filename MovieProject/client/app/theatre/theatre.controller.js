'use strict';

(function(){

class TheatreComponent {
  constructor($http,$scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.shivTheatre = [];


    $scope.$on('$destroy',function(){
      socket.unsysncUpdates('theatre');
    });
  }

  $onInit() {
    this.$http.get('/api/theatre')
    .then(response => {
      this.shivTheatre = response.data;
      this.socket.syncUpdates('theatre', this.shivTheatre);
    });
  }

  addTheatre() {
    // if (this.Name&&this.Location&&this.City) {
      this.$http.post('/api/theatre' , {
        Name: this.Name,
        Location: this.Location,
        City: this.City
      });
  // }
}

  deleteTheatre(theatre) {
    var x=window.confirm('Do you really want to delete this theatre?');
    if(x){
    this.$http.delete('/api/theatre/' + theatre._id);
  }
}
}
angular.module('yomastertemplateApp')
  .component('theatre', {
    templateUrl: 'app/theatre/theatre.html',
    controller: TheatreComponent,
    authenticate: 'admin'
      // controllerAs: 'theatreCtrl'
  });

})();
