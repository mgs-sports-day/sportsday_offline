/* jshint esversion:6*/

// MGS Sports Day Website
// https://github.com/tti0/sportsday

(function(){
  "use strict";
  var sd = angular.module('sdApp',['ngRoute']);

  var c = {
    baseURL: "https://docs.google.com/spreadsheets/d/15wn9g55Mg8P67-UDjg_QEcfMCR_A0v4dZ5sG19h__Kg/gviz/tq?gid=1608509347",
    listURL: "https://docs.google.com/spreadsheets/d/15wn9g55Mg8P67-UDjg_QEcfMCR_A0v4dZ5sG19h__Kg/gviz/tq?gid=2146682450",
    newsURL: "https://docs.google.com/spreadsheets/d/15wn9g55Mg8P67-UDjg_QEcfMCR_A0v4dZ5sG19h__Kg/gviz/tq?gid=979864642",
    t:{
      year:"A",
      form:"B",
      total:"C",
      yearpos:"D",
      schoolpos:"E",
      combined:"DL",
      d:{
        long_jump:{
          a:{
            pts:"G",
            name:"H"
          },
          b:{
            pts:"J",
            name:"K"
          },
          c:{
            pts:"M",
            name:"N"
          },
          total:"O"
        },
        high_jump:{
          a:{
            pts:"Q",
            name:"R"
          },
          b:{
            pts:"T",
            name:"U"
          },
          c:{
            pts:"W",
            name:"X"
          },
          total:"Y"
        },
        shot:{
          a:{
            pts:"AA",
            name:"AB"
          },
          b:{
            pts:"AD",
            name:"AE"
          },
          c:{
            pts:"AG",
            name:"AH"
          },
          total:"AI"
        },
        javelin:{
          a:{
            pts:"AK",
            name:"AL"
          },
          b:{
            pts:"AN",
            name:"AO"
          },
          c:{
            pts:"AQ",
            name:"AR"
          },
          total:"AS"
        },
        "100m":{
          a:{
            pts:"AU",
            name:"AV"
          },
          b:{
            pts:"AX",
            name:"AY"
          },
          c:{
            pts:"BA",
            name:"BB"
          },
          total:"BC"
        },
        "200m":{
          a:{
            pts:"BE",
            name:"BF"
          },
          b:{
            pts:"BH",
            name:"BI"
          },
          c:{
            pts:"BK",
            name:"BL"
          },
          total:"BM"
        },
        "300m":{
          a:{
            pts:"BO",
            name:"BP"
          },
          b:{
            pts:"BR",
            name:"BS"
          },
          c:{
            pts:"BU",
            name:"BV"
          },
          total:"BW"
        },
        "800m":{
          a:{
            pts:"BY",
            name:"BZ"
          },
          b:{
            pts:"CB",
            name:"CC"
          },
          c:{
            pts:"CE",
            name:"CF"
          },
          total:"CG"
        },
        "1500m":{
          a:{
            pts:"CI",
            name:"CJ"
          },
          b:{
            pts:"CL",
            name:"CM"
          },
          c:{
            pts:"CO",
            name:"CP"
          },
          total:"CQ"
        },
        "4x300m":{
          a:{
            pts:"CS",
            name:"CT"
          },
          b:{
            pts:"CV",
            name:"CW"
          },
          c:{
            pts:"CY",
            name:"CZ"
          },
          total:"DA"
        },
        "4x100m":{
          a:{
            pts:"DC",
            name:"DD"
          },
          b:{
            pts:"DF",
            name:"DG"
          },
          c:{
            pts:"DI",
            name:"DJ"
          },
          total:"DK"
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

  function sdBuildQuery(string,base){
    string = string.replace(/(#)([^#]*)(#)/g, function(s){
      s = s.replace(/#/g,"");
      return eval("c.t."+s);
    });
    string = base + "&tq=" + encodeURIComponent(string);
    return string;
  }

  function sdPrettifyName(string){
    string = string.split("_");
    for(var i = 0; i < string.length; i++){
      string[i] = `${string[i][0].toUpperCase()}${string[i].slice(1)}`;
    }
    string = string.join(" ");
    return string;
  }

  function sdPrettifyNameSem(string){
    switch(string){
      case "longjump":
        return "long_jump";
      case "highjump":
        return "high_jump";
      default:
        return string;
    }
  }

  function sdPrettifyNameSpecial(string){
    switch(string){
      case "longjump":
        return "Long Jump";
      case "highjump":
        return "High Jump";
      case "shot":
        return "Shot";
      case "javelin":
        return "Javelin";
      default:
        return string;
    }
  }

  sd.config(function($routeProvider){
    $routeProvider
    .when("/",{
      templateUrl: "views/home.htm",
      controller: "home"
    })
    .when("/activities",{
      templateUrl: "views/activities.htm",
      controller: "activities"
    })
    .when("/a/:activityID",{
      templateUrl:"views/activity.htm",
      controller: "activity"
    })
    .when("/forms",{
      templateUrl:"views/forms.htm",
      controller:"forms"
    })
    .when("/f/:formID",{
      templateUrl:"views/form.htm",
      controller:"form"
    })
    .when("/newsfeed",{
      templateUrl:"views/newsfeed.htm",
      controller:"newsfeed"
    })
    .when("/about",{
      templateUrl:"views/about.htm"
    });
  });

  sd.controller('home',function($scope,$http){
    $http.get(sdBuildQuery("select #year#, #form#, #total#, #schoolpos# order by #total# desc",c.baseURL))
    .then(function(res){
      res = sdParseRes(res.data);
      $scope.topfive = res.table.rows.slice(0,5);
      $scope.all = res.table.rows;
    });
  });

  sd.controller('activities',function($scope,$http){
    $http.get(sdBuildQuery("select A, B",c.listURL))
    .then(function(res){
      res = sdParseRes(res.data);
      $scope.activities = res.table.rows;
    });
  });

  sd.controller('activity',function($scope,$http,$routeParams){
    var activityName = $routeParams.activityID;
    $scope.activityName = sdPrettifyName(activityName);
    var cr = c.t.d[activityName];
    var gets = [cr.a.pts,cr.a.name,cr.b.pts,cr.b.name,cr.c.pts,cr.c.name,cr.total];
    var query = "select #year#,#form#,"+gets.join(",")+" order by "+cr.total+" desc";
    $http.get(sdBuildQuery(query,c.baseURL))
    .then(function(res){
      res = sdParseRes(res.data);
      $scope.activity = res.table.rows;
    });
  });

  sd.controller('forms',function($scope,$http){
    $http.get(sdBuildQuery("select #year#, #form#, #total#, #schoolpos#, #yearpos#, #combined#",c.baseURL))
    .then(function(res){
      res = sdParseRes(res.data);
      $scope.forms = res.table.rows;
      $scope.year7 = res.table.rows.slice(0,8);
      $scope.year8 = res.table.rows.slice(8,16);
      $scope.year9 = res.table.rows.slice(16,24);
      $scope.year10 = res.table.rows.slice(24,33); //year 10 has 9 forms, not 8
    });
  });

  sd.controller('form',function($scope,$http,$routeParams){
    var formName = $routeParams.formID.replace('SLASH','/');
    $scope.formName = formName;
    var query = "select * where #combined# = '"+formName+"'";
    $http.get(sdBuildQuery(query,c.baseURL))
    .then(function(res){
      res = sdParseRes(res.data);
      $scope.form = res.table.rows;
      var formActivities = {};
      for(var i = 0; i < res.table.cols.length; i++){
        if(/(.*)(_)([^_]*)(_)(.*)/.test(res.table.cols[i].label)){
          var col = res.table.cols[i].label;
          col = col.split("_");
          var colCat = col[0];
          if(!formActivities[colCat]){
            formActivities[colCat] = {
              name:sdPrettifyNameSpecial(colCat),
              sem_name:sdPrettifyNameSem(colCat)
            };
          }
          if(res.table.rows[0].c[i]===null){
            res.table.rows[0].c[i] = {v:""};
          }
          var name = col[1]+col[2];
          formActivities[colCat][name] = res.table.rows[0].c[i].f || res.table.rows[0].c[i].v;
        }
      }
      $scope.formActivities = formActivities;
    });
  });

  sd.controller('newsfeed',function($scope,$http){
    $http.get(sdBuildQuery("select A, B order by A desc",c.newsURL))
    .then(function(res){
      res = sdParseRes(res.data);
      console.log(res);
      $scope.newsitems = res.table.rows;
      console.log($scope.newsitems);
    });
  });

}());
