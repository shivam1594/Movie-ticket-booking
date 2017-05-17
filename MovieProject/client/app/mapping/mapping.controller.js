'use strict';

(function(){

class MappingComponent {
  constructor($http,$scope, socket) {
  this.$http = $http;
  this.socket = socket;
  this.shivMapping = [];
  this.shivTheatre = [];
  this.shivMovie = [];

  $scope.$on('$destroy',function(){
    socket.unsysncUpdates('mapping');
  });
}

$onInit() {
  this.$http.get('/api/movie')
  .then(response => {
    this.shivMovie = response.data;
    this.socket.syncUpdates('Movie', this.shivMovie);
  });

  this.$http.get('/api/theatre')
  .then(response => {
    this.shivTheatre = response.data;
    this.socket.syncUpdates('theatre', this.shivTheatre);
  });

  this.$http.get('/api/mapping')
  .then(response => {
    this.shivMapping = response.data;
    this.socket.syncUpdates('mapping', this.shivMapping);
  });
  }

addData() {
  // if (this.theatreCity&&this.theatreLocation&&this.theatreName&&this.movieName&&this.Date&&this.Time) {
    this.$http.post('/api/mapping' , {
      theatreCity: this.theatreCity,
      theatreLocation: this.theatreLocation,
      theatreName: this.theatreName,
      movieName: this.movieName,
      movieDate: this.movieDate,
      movieTime: this.movieTime
    });
  }
// }

deleteThing(mapping) {
  this.$http.delete('/api/mapping/' + mapping._id);
}





}

angular.module('yomastertemplateApp')
  .component('mapping', {
    templateUrl: 'app/mapping/mapping.html',
    controller: MappingComponent,
      authenticate: 'admin'
    // controllerAs: 'mappingCtrl'
  });

})();
