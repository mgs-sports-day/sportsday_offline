var sd = angular.module('sdApp',['ngRoute']);

var config = {
  baseURL: "https://docs.google.com/spreadsheets/d/1k6qV5-y3HW6YoYfTREFyXNGybfp8iSDVOJxT4zadmUc/gviz/tq"
}

sd.config(function($routeProvider){
  $routeProvider
  .when("/",{
    templateUrl: "views/home.htm",
    controller: "home"
  })
  .when("/y7",{
    templateUrl: "views/y7.htm",
    controller: "y7"
  });
});

sd.controller('home',function($scope,$http){
  $http.get(config.baseURL+"?gid=1530158974&tq="+encodeURIComponent("select A,B order by B desc limit 5"))
  .then(function(res){
    res = res.data.replace('/*O_o*/\ngoogle.visualization.Query.setResponse(','');
    res = res.slice(0, -2);
    res = JSON.parse(res);
    $scope.forms = res.table.rows;
  });
});

sd.controller('y7',function($scope,$http){
  var ref;
  var forms = [];
  var points = [];
  var scores = [];
  $http.get(config.baseURL+"?gid=1918224905&tq="+encodeURIComponent("select *"))
  .then(function(res){
    res = res.data.replace('/*O_o*/\ngoogle.visualization.Query.setResponse(','');
    res = res.slice(0, -2);
    res = JSON.parse(res);
    
    for(var i = 0; i < res.table.cols.length - 1; i++){
      forms.push(res.table.cols[i].label);
    }
    forms = forms.filter(function(c,index){
      return index !== 0;
    });
    for(var i = 0; i < forms.length; i++){
      if(forms[i].includes("Senior School Sportsday")){
        forms[i] = forms[i].replace(/(Senior) (School) (Sportsday) ....\s/g,"");
      }
    }
    
    for(var i = 0; i < res.table.rows[0].c.length - 1; i++){
      points.push(res.table.rows[0].c[i].v);
    }
    points = points.filter(function(q,index){
      return index !== 0;
    });
    
    for(var i = 0; i < points.length; i++){
      scores.push({
        form: forms[i],
        score: points[i]
      });
    }
    
    scores = scores.sort(function(a,b){
      return a.score - b.score;
    });
    
    console.log(scores);
    
    $scope.scores = scores;
  });
});