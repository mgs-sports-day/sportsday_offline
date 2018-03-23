(function(){
  "use strict";
  var sd = angular.module('sdApp',['ngRoute']);

  var c = {
    baseURL: "https://docs.google.com/spreadsheets/d/1UqlAiZXbSTsfUIqK64ya_VMt-hW11P23Tw5o93OiZZI/gviz/tq",
    t:{
      summary:{
        id:"1005036619",
        cols:{
          year:"A",
          form:"B",
          points:"C"
        }
      },
      year7:"1802224452",
      year8:"1858705415",
      year9:"112112243",
      year10:"398917913",
      yearX:{
        form:"A",
        definer:"B",
        overall:"C",
        lj:{
          A:"D",
          B:"E",
          C:"F",
          total:"G"
        },
        hj:{
          A:"H",
          B:"I",
          C:"J",
          total:"K"
        },
        sh:{
          A:"L",
          B:"M",
          C:"N",
          total:"O"
        }
      }
    }
  };

  function sdParseRes(res){
    res = res.replace('/*O_o*/\ngoogle.visualization.Query.setResponse(','');
    res = res.slice(0, -2);
    res = JSON.parse(res);
    return res;
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
    $http.get(c.baseURL+"?gid="+c.t.summary.id+"&tq="+encodeURIComponent("select "+c.t.summary.cols.year+","+c.t.summary.cols.form+","+c.t.summary.cols.points+" order by "+c.t.summary.cols.points+" desc limit 5"))
    .then(function(res){
      res = sdParseRes(res.data);
      $scope.forms = res.table.rows;
    });
  });

  sd.controller('y7',function($scope,$http){
    var arrays = {
      lj:[]
    };
    $http.get(c.baseURL+"?gid="+c.t.year7+"&tq="+encodeURIComponent("select "+c.t.yearX.form+","+c.t.yearX.overall+" where "+c.t.yearX.definer+" = 'Pts' order by "+c.t.yearX.overall+" desc limit 5"))
    .then(function(res){
      res = sdParseRes(res.data);
      $scope.forms = res.table.rows;
    });
    $http.get(c.baseURL+"?gid="+c.t.year7+"&tq="+encodeURIComponent("select "+c.t.yearX.form+","+c.t.yearX.lj.total+","+c.t.yearX.lj.A+","+c.t.yearX.lj.B+","+c.t.yearX.lj.C+" order by "+c.t.yearX.lj.total)+" desc limit 5").then(function(res){
      res = sdParseRes(res.data);
      for(var i = 0; i < 5; i++){
        arrays.lj.push(res.table.rows[i].c[0].v);
      }
      
      $http.get(c.baseURL+"?gid="+c.t.year7+"&tq="+encodeURIComponent("select "+c.t.yearX.lj.A+","+c.t.yearX.lj.B+","+c.t.yearX.lj.C+" where ("+c.t.yearX.form+" = '"+arrays.lj.join("' or "+c.t.yearX.form+" = '")+"') and "+c.t.yearX.definer+" = 'Name'"))
      .then(function(res){
        res = sdParseRes(res.data);
        console.log(res);
      });
      
      console.log(c.baseURL+"?gid="+c.t.year7+"&tq="+"select "+c.t.yearX.lj.A+","+c.t.yearX.lj.B+","+c.t.yearX.lj.C+" where ("+c.t.yearX.form+" = '"+arrays.lj.join("' or "+c.t.yearX.form+" = '")+"') and "+c.t.yearX.definer+" = 'Name'");
      
    });
  });
}());