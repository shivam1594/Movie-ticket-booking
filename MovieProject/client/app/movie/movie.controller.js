'use strict';

(function(){

class MovieComponent {
  constructor($http,$scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.shivMovie = [];
    this.movieData = [];

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
  }

  SearchMovie()
  {
    if(this.Title||this.Year)
    {
      this.$http.get('http://www.omdbapi.com/?t='+this.Title+'&y='+this.Year+'&r=json')
      .then(response => {
        this.movieData = response.data;
        this.socket.syncUpadtes('Movie',this.movieData);
      });
    }
  }

  addMovie() {
      this.$http.post('/api/movie' , {
        Title: this.movieData.Title,
        Year: this.movieData.Year,
        Genre: this.movieData.Genre,
        Poster: this.movieData.Poster,
        Status: false
      });
    }

  deleteMovie(movie) {
    var x=window.confirm('Do you really want to delete this movie?');
    if(x){
    this.$http.delete('/api/movie/' + movie._id);
  }
}
}

angular.module('yomastertemplateApp')
  .component('movie', {
    templateUrl: 'app/movie/movie.html',
    controller: MovieComponent,
      authenticate: 'admin'
    // controllerAs: 'movieCtrl'
  });

})();
