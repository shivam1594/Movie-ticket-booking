'use strict';
(function(){

class SeatComponent {
  constructor($http,$scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.seat = [];
    this.shivMapping =[];

    $scope.rows = ['A','B','C','D','E','F','G','H','I','J'];
    $scope.cols = [1,2,3,4,5,6,7,8];

    $scope.$on('$destroy',function(){
      socket.unsysncUpdates('seat');
    });
  }

  $onInit() {
    this.$http.get('/api/seat')
    .then(response => {
      this.awesomeThings = response.data;

      this.socket.syncUpdates('seat', this.seat);
    });
    this.$http.get('/api/mapping')
    .then(response => {
      this.shivMapping = response.data;
      this.socket.syncUpdates('mapping', this.shivMapping);
    });
  }

  addThing() {
    if (this.SeatNo) {
      this.$http.post('/api/seat' , {
        SeatNo: this.SeatNo
      });
    }
  }
  deleteThing(seat) {
    this.$http.delete('/api/seat/' + seat._id);
  }
  addInfo(){
    this.$http.post('/api/seat' , {
      shivCity: this.shivCity,
      shivLocation: this.shivLocation,
      shivName: this.shivName,
      movieTitle: this.movieTitle,
      shivDate: this.shivDate,
      shivTime: this.shivTime
    });
  }

}

angular.module('yomastertemplateApp')
  .component('seat', {
    templateUrl: 'app/seat/seat.html',
    controller: SeatComponent,
    // controllerAs: 'seatCtrl'
  });

})();
