'use strict';

(function(){

class RatingComponent {
  constructor($http,$scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.shivMovie = [];
    this.ratingData = [];

    $scope.$on('$destroy',function(){
      socket.unsysncUpdates('Movie');
    });
  }

  $onInit() {
    this.$http.get('/api/movie')
    .then(response => {
      this.shivMovie = response.data;
      this.socket.syncUpdates('Movie', this.shivMovie);
    });
    this.$http.get('/api/rating')
    .then(response => {
      this.shivMovie = response.data;
      this.socket.syncUpdates('Rating', this.shivRating);
    });
  }
  addRating() {
      this.$http.post('/api/rating' , {
        Title: this.ratingData.Title,
        Year: this.ratingData.Year,
        Genre: this.ratingData.Genre,
        Poster: this.ratingData.Poster,
        Status: false
      });
    }

  deleteMovie(rating) {
    var x=window.confirm('Do you really want to delete this rating?');
    if(x){
    this.$http.delete('/api/rating/' + rating._id);
  }
}
}

angular.module('yomastertemplateApp')
  .component('rating', {
    templateUrl: 'app/rating/rating.html',
    controller: RatingComponent,
    controllerAs: 'ratingCtrl'
  });

})();
