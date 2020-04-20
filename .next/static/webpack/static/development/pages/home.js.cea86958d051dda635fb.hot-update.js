webpackHotUpdate("static\\development\\pages\\home.js",{

/***/ "./pages/home.js":
/*!***********************!*\
  !*** ./pages/home.js ***!
  \***********************/
/*! exports provided: __N_SSP, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSP", function() { return __N_SSP; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Container */ "./components/Container.tsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var LOCALHOST = 'http://localhost:3000';
var __N_SSP = true;
/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var todos = _ref.todos;
  return __jsx(_components_Container__WEBPACK_IMPORTED_MODULE_1__["Container"], null, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
    children: "Home page",
    variant: "h6"
  }), __jsx("h5", null, "Welcome page "), todos.map(function (todo) {
    return __jsx("h6", null, todo.name);
  }));
});

/***/ })

})
//# sourceMappingURL=home.js.cea86958d051dda635fb.hot-update.js.map