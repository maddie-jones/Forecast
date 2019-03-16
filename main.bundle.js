/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";

	var location = document.getElementById("location");
	var locationButton = document.getElementById("location-button");
	var favoriteButton = document.getElementById("favorite-button");

	function background(location) {
	  fetch("https://sweater-weather-mine.herokuapp.com/api/v1/backgrounds?location=" + location).then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    return renderBackground(data);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	}

	function renderBackground(data) {
	  var url = data["data"]["attributes"].backgroud_url;
	  document.getElementById('background').style.backgroundImage = "url(" + url + ")";
	}

	function weatherAtLocation() {
	  var userLocation = location.value;
	  if (userLocation) {
	    background(userLocation);
	    forecast(userLocation);
	    document.getElementById("change-button").style.visibility = "visible";
	    document.getElementById("change-button").style.visibility = "visible";
	    document.getElementById("favorite-button").style.visibility = "visible";
	    document.getElementById("details").innerHTML = "Details";
	    document.getElementById("city").innerHTML = userLocation;
	  };
	}

	function renderForecast(data) {
	  var summary = data["data"]["attributes"]["currently"].summary;
	  var temp = data["data"]["attributes"]["currently"].temperature;
	  document.getElementById("summary").innerHTML = summary;
	  document.getElementById("temp").innerHTML = temp + "°";
	}

	function forecast(location) {
	  fetch("https://sweater-weather-mine.herokuapp.com/api/v1/forecast?location=" + location).then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    return renderForecast(data);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	}

	function renderFavorites(data) {
	  var attributes = data["data"];
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var value = _step.value;

	      var pel = document.createElement("P");
	      var t = document.createTextNode(value["attributes"]["location"]);
	      pel.appendChild(t);
	      document.getElementById("current-favorites").appendChild(pel);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}

	function listFavorites(location) {
	  fetch("https://sweater-weather-mine.herokuapp.com/api/v1/favorites?api_key=7ca3f5426c369b8763a73fc0c4").then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    return renderFavorites(data);
	  }).catch(function (error) {
	    return console.error({ error: error });
	  });
	}

	function favorite(location) {
	  fetch("https://sweater-weather-mine.herokuapp.com/api/v1/favorites?location=" + location + "&api_key=7ca3f5426c369b8763a73fc0c4", {
	    method: 'post',
	    headers: {
	      'Content-Type': 'application/json'
	    }
	  });
	}

	function addFavorite() {
	  var userLocation = location.value;
	  favorite(userLocation);
	  listFavorites(userLocation);
	}

	locationButton.addEventListener('click', weatherAtLocation);
	favoriteButton.addEventListener('click', addFavorite);

/***/ })
/******/ ]);