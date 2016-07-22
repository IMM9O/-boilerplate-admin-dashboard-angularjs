<!doctype html>
<html lang="en" ng-app="RDash">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

	<title>RDash AngularJS</title>
  <!-- STYLES -->
  <!-- build:css lib/css/main.min.css -->
  <link rel="stylesheet" type="text/css" href="../bower_components/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="../bower_components/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="../bower_components/rdash-ui/dist/css/rdash.min.css">
  <!-- endbuild -->
</head>
<body ng-controller="MasterCtrl">
   <div ui-view></div>
  <!-- SCRIPTS -->
  <!-- build:js lib/js/main.min.js -->
  <script type="text/javascript" src="../bower_components/angular/angular.min.js"></script>
  <script type="text/javascript" src="../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
  <script type="text/javascript" src="../bower_components/angular-cookies/angular-cookies.min.js"></script>
  <script type="text/javascript" src="../bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
  <script type="text/javascript" src="../bower_components/satellizer/dist/satellizer.min.js"></script>
  <!-- endbuild -->
  <!-- Custom Scripts -->
  <script type="text/javascript" src="js/dashboard.min.js"></script>
</body>
</html>
