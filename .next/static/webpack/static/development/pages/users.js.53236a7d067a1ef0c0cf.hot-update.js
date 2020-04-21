webpackHotUpdate("static\\development\\pages\\users.js",{

/***/ "./pages/users.js":
/*!************************!*\
  !*** ./pages/users.js ***!
  \************************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__N_SSG", function() { return __N_SSG; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Container */ "./components/Container.tsx");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var __N_SSG = true;
/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var users = _ref.users;
  return __jsx(_components_Container__WEBPACK_IMPORTED_MODULE_1__["Container"], null, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
    children: "Home page",
    variant: "h6"
  }), __jsx("h4", null, "List of users from /api/v2/users-nosql"), __jsx("h6", null, "Data fetched with Next.js method getStaticProps"), __jsx("ul", null, users.map(function (user) {
    return __jsx("li", {
      key: user.id
    }, user.name);
  })));
});

/***/ })

})
//# sourceMappingURL=users.js.53236a7d067a1ef0c0cf.hot-update.js.map