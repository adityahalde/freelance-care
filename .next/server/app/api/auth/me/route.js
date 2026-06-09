"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/me/route";
exports.ids = ["app/api/auth/me/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5CAditya%5COneDrive%5CDesktop%5Cfreelance-care%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAditya%5COneDrive%5CDesktop%5Cfreelance-care&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5CAditya%5COneDrive%5CDesktop%5Cfreelance-care%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAditya%5COneDrive%5CDesktop%5Cfreelance-care&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Aditya_OneDrive_Desktop_freelance_care_src_app_api_auth_me_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/me/route.ts */ \"(rsc)/./src/app/api/auth/me/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/me/route\",\n        pathname: \"/api/auth/me\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/me/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Aditya\\\\OneDrive\\\\Desktop\\\\freelance-care\\\\src\\\\app\\\\api\\\\auth\\\\me\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Aditya_OneDrive_Desktop_freelance_care_src_app_api_auth_me_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/me/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbWUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZtZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZtZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBZGl0eWElNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUNmcmVlbGFuY2UtY2FyZSU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDQWRpdHlhJTVDT25lRHJpdmUlNUNEZXNrdG9wJTVDZnJlZWxhbmNlLWNhcmUmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3VDO0FBQ3BIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJlZWxhbmNlLWNhcmUvPzBjMWIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcQWRpdHlhXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcZnJlZWxhbmNlLWNhcmVcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxtZVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9tZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvbWVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvbWUvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxBZGl0eWFcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxmcmVlbGFuY2UtY2FyZVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXG1lXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL21lL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5CAditya%5COneDrive%5CDesktop%5Cfreelance-care%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAditya%5COneDrive%5CDesktop%5Cfreelance-care&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/me/route.ts":
/*!**************************************!*\
  !*** ./src/app/api/auth/me/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\nasync function GET() {\n    const user = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.getCurrentUser)();\n    if (!user) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        user: null\n    }, {\n        status: 200\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        user: {\n            id: user.id,\n            email: user.email,\n            name: user.name,\n            role: user.role,\n            avatar: user.avatar,\n            freelancerProfile: user.freelancerProfile ?? undefined\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL21lL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNDO0FBRXJDLGVBQWVFO0lBQ3BCLE1BQU1DLE9BQU8sTUFBTUYseURBQWNBO0lBQ2pDLElBQUksQ0FBQ0UsTUFBTSxPQUFPSCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1FBQUVELE1BQU07SUFBSyxHQUFHO1FBQUVFLFFBQVE7SUFBSTtJQUNsRSxPQUFPTCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUFDO1FBQ3ZCRCxNQUFNO1lBQ0pHLElBQUlILEtBQUtHLEVBQUU7WUFDWEMsT0FBT0osS0FBS0ksS0FBSztZQUNqQkMsTUFBTUwsS0FBS0ssSUFBSTtZQUNmQyxNQUFNTixLQUFLTSxJQUFJO1lBQ2ZDLFFBQVFQLEtBQUtPLE1BQU07WUFDbkJDLG1CQUFtQlIsS0FBS1EsaUJBQWlCLElBQUlDO1FBQy9DO0lBQ0Y7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyZWVsYW5jZS1jYXJlLy4vc3JjL2FwcC9hcGkvYXV0aC9tZS9yb3V0ZS50cz81OGJmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBnZXRDdXJyZW50VXNlciB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpO1xyXG4gIGlmICghdXNlcikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgdXNlcjogbnVsbCB9LCB7IHN0YXR1czogMjAwIH0pO1xyXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICB1c2VyOiB7XHJcbiAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICByb2xlOiB1c2VyLnJvbGUsXHJcbiAgICAgIGF2YXRhcjogdXNlci5hdmF0YXIsXHJcbiAgICAgIGZyZWVsYW5jZXJQcm9maWxlOiB1c2VyLmZyZWVsYW5jZXJQcm9maWxlID8/IHVuZGVmaW5lZCxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldEN1cnJlbnRVc2VyIiwiR0VUIiwidXNlciIsImpzb24iLCJzdGF0dXMiLCJpZCIsImVtYWlsIiwibmFtZSIsInJvbGUiLCJhdmF0YXIiLCJmcmVlbGFuY2VyUHJvZmlsZSIsInVuZGVmaW5lZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/me/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearSession: () => (/* binding */ clearSession),\n/* harmony export */   createToken: () => (/* binding */ createToken),\n/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),\n/* harmony export */   getSession: () => (/* binding */ getSession),\n/* harmony export */   setSession: () => (/* binding */ setSession),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/node/esm/jwt/verify.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ \"(rsc)/./src/lib/db.ts\");\n\n\n\nconst SECRET = new TextEncoder().encode(process.env.JWT_SECRET || \"default-secret-change-me\");\nasync function createToken(payload) {\n    return new jose__WEBPACK_IMPORTED_MODULE_2__.SignJWT({\n        ...payload\n    }).setProtectedHeader({\n        alg: \"HS256\"\n    }).setExpirationTime(\"7d\").setIssuedAt().sign(SECRET);\n}\nasync function verifyToken(token) {\n    try {\n        const { payload } = await (0,jose__WEBPACK_IMPORTED_MODULE_3__.jwtVerify)(token, SECRET);\n        return payload;\n    } catch  {\n        return null;\n    }\n}\nconst COOKIE_NAME = \"session\";\nasync function setSession(token) {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n    cookieStore.set(COOKIE_NAME, token, {\n        httpOnly: true,\n        secure: \"development\" === \"production\",\n        sameSite: \"lax\",\n        maxAge: 60 * 60 * 24 * 7,\n        path: \"/\"\n    });\n}\nasync function getSession() {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n    const token = cookieStore.get(COOKIE_NAME)?.value;\n    if (!token) return null;\n    return verifyToken(token);\n}\nasync function clearSession() {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)();\n    cookieStore.delete(COOKIE_NAME);\n}\nasync function getCurrentUser() {\n    const session = await getSession();\n    if (!session) return null;\n    const user = await _db__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n        where: {\n            id: session.userId\n        },\n        select: {\n            id: true,\n            email: true,\n            name: true,\n            role: true,\n            avatar: true,\n            freelancerProfile: true\n        }\n    });\n    return user;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUEwQztBQUNIO0FBQ1Q7QUFFOUIsTUFBTUksU0FBUyxJQUFJQyxjQUFjQyxNQUFNLENBQ3JDQyxRQUFRQyxHQUFHLENBQUNDLFVBQVUsSUFBSTtBQVVyQixlQUFlQyxZQUFZQyxPQUFnQztJQUNoRSxPQUFPLElBQUlYLHlDQUFPQSxDQUFDO1FBQUUsR0FBR1csT0FBTztJQUFDLEdBQzdCQyxrQkFBa0IsQ0FBQztRQUFFQyxLQUFLO0lBQVEsR0FDbENDLGlCQUFpQixDQUFDLE1BQ2xCQyxXQUFXLEdBQ1hDLElBQUksQ0FBQ1o7QUFDVjtBQUVPLGVBQWVhLFlBQVlDLEtBQWE7SUFDN0MsSUFBSTtRQUNGLE1BQU0sRUFBRVAsT0FBTyxFQUFFLEdBQUcsTUFBTVYsK0NBQVNBLENBQUNpQixPQUFPZDtRQUMzQyxPQUFPTztJQUNULEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGO0FBRUEsTUFBTVEsY0FBYztBQUViLGVBQWVDLFdBQVdGLEtBQWE7SUFDNUMsTUFBTUcsY0FBYyxNQUFNbkIscURBQU9BO0lBQ2pDbUIsWUFBWUMsR0FBRyxDQUFDSCxhQUFhRCxPQUFPO1FBQ2xDSyxVQUFVO1FBQ1ZDLFFBQVFqQixrQkFBeUI7UUFDakNrQixVQUFVO1FBQ1ZDLFFBQVEsS0FBSyxLQUFLLEtBQUs7UUFDdkJDLE1BQU07SUFDUjtBQUNGO0FBRU8sZUFBZUM7SUFDcEIsTUFBTVAsY0FBYyxNQUFNbkIscURBQU9BO0lBQ2pDLE1BQU1nQixRQUFRRyxZQUFZUSxHQUFHLENBQUNWLGNBQWNXO0lBQzVDLElBQUksQ0FBQ1osT0FBTyxPQUFPO0lBQ25CLE9BQU9ELFlBQVlDO0FBQ3JCO0FBRU8sZUFBZWE7SUFDcEIsTUFBTVYsY0FBYyxNQUFNbkIscURBQU9BO0lBQ2pDbUIsWUFBWVcsTUFBTSxDQUFDYjtBQUNyQjtBQUVPLGVBQWVjO0lBQ3BCLE1BQU1DLFVBQVUsTUFBTU47SUFDdEIsSUFBSSxDQUFDTSxTQUFTLE9BQU87SUFDckIsTUFBTUMsT0FBTyxNQUFNaEMsdUNBQU1BLENBQUNnQyxJQUFJLENBQUNDLFVBQVUsQ0FBQztRQUN4Q0MsT0FBTztZQUFFQyxJQUFJSixRQUFRSyxNQUFNO1FBQUM7UUFDNUJDLFFBQVE7WUFDTkYsSUFBSTtZQUNKRyxPQUFPO1lBQ1BDLE1BQU07WUFDTkMsTUFBTTtZQUNOQyxRQUFRO1lBQ1JDLG1CQUFtQjtRQUNyQjtJQUNGO0lBQ0EsT0FBT1Y7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyZWVsYW5jZS1jYXJlLy4vc3JjL2xpYi9hdXRoLnRzPzY2OTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2lnbkpXVCwgand0VmVyaWZ5IH0gZnJvbSBcImpvc2VcIjtcclxuaW1wb3J0IHsgY29va2llcyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIi4vZGJcIjtcclxuXHJcbmNvbnN0IFNFQ1JFVCA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShcclxuICBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8IFwiZGVmYXVsdC1zZWNyZXQtY2hhbmdlLW1lXCJcclxuKTtcclxuXHJcbmV4cG9ydCB0eXBlIEpXVFBheWxvYWQgPSB7XHJcbiAgdXNlcklkOiBzdHJpbmc7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICByb2xlOiBzdHJpbmc7XHJcbiAgZXhwOiBudW1iZXI7XHJcbn07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlVG9rZW4ocGF5bG9hZDogT21pdDxKV1RQYXlsb2FkLCBcImV4cFwiPik6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgcmV0dXJuIG5ldyBTaWduSldUKHsgLi4ucGF5bG9hZCB9KVxyXG4gICAgLnNldFByb3RlY3RlZEhlYWRlcih7IGFsZzogXCJIUzI1NlwiIH0pXHJcbiAgICAuc2V0RXhwaXJhdGlvblRpbWUoXCI3ZFwiKVxyXG4gICAgLnNldElzc3VlZEF0KClcclxuICAgIC5zaWduKFNFQ1JFVCk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlUb2tlbih0b2tlbjogc3RyaW5nKTogUHJvbWlzZTxKV1RQYXlsb2FkIHwgbnVsbD4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGF3YWl0IGp3dFZlcmlmeSh0b2tlbiwgU0VDUkVUKTtcclxuICAgIHJldHVybiBwYXlsb2FkIGFzIHVua25vd24gYXMgSldUUGF5bG9hZDtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgQ09PS0lFX05BTUUgPSBcInNlc3Npb25cIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXRTZXNzaW9uKHRva2VuOiBzdHJpbmcpIHtcclxuICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcclxuICBjb29raWVTdG9yZS5zZXQoQ09PS0lFX05BTUUsIHRva2VuLCB7XHJcbiAgICBodHRwT25seTogdHJ1ZSxcclxuICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiLFxyXG4gICAgc2FtZVNpdGU6IFwibGF4XCIsXHJcbiAgICBtYXhBZ2U6IDYwICogNjAgKiAyNCAqIDcsXHJcbiAgICBwYXRoOiBcIi9cIixcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlc3Npb24oKTogUHJvbWlzZTxKV1RQYXlsb2FkIHwgbnVsbD4ge1xyXG4gIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpO1xyXG4gIGNvbnN0IHRva2VuID0gY29va2llU3RvcmUuZ2V0KENPT0tJRV9OQU1FKT8udmFsdWU7XHJcbiAgaWYgKCF0b2tlbikgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIHZlcmlmeVRva2VuKHRva2VuKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsZWFyU2Vzc2lvbigpIHtcclxuICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcclxuICBjb29raWVTdG9yZS5kZWxldGUoQ09PS0lFX05BTUUpO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudFVzZXIoKSB7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24oKTtcclxuICBpZiAoIXNlc3Npb24pIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgIHdoZXJlOiB7IGlkOiBzZXNzaW9uLnVzZXJJZCB9LFxyXG4gICAgc2VsZWN0OiB7XHJcbiAgICAgIGlkOiB0cnVlLFxyXG4gICAgICBlbWFpbDogdHJ1ZSxcclxuICAgICAgbmFtZTogdHJ1ZSxcclxuICAgICAgcm9sZTogdHJ1ZSxcclxuICAgICAgYXZhdGFyOiB0cnVlLFxyXG4gICAgICBmcmVlbGFuY2VyUHJvZmlsZTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgcmV0dXJuIHVzZXI7XHJcbn1cclxuIl0sIm5hbWVzIjpbIlNpZ25KV1QiLCJqd3RWZXJpZnkiLCJjb29raWVzIiwicHJpc21hIiwiU0VDUkVUIiwiVGV4dEVuY29kZXIiLCJlbmNvZGUiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsImNyZWF0ZVRva2VuIiwicGF5bG9hZCIsInNldFByb3RlY3RlZEhlYWRlciIsImFsZyIsInNldEV4cGlyYXRpb25UaW1lIiwic2V0SXNzdWVkQXQiLCJzaWduIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsIkNPT0tJRV9OQU1FIiwic2V0U2Vzc2lvbiIsImNvb2tpZVN0b3JlIiwic2V0IiwiaHR0cE9ubHkiLCJzZWN1cmUiLCJzYW1lU2l0ZSIsIm1heEFnZSIsInBhdGgiLCJnZXRTZXNzaW9uIiwiZ2V0IiwidmFsdWUiLCJjbGVhclNlc3Npb24iLCJkZWxldGUiLCJnZXRDdXJyZW50VXNlciIsInNlc3Npb24iLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaWQiLCJ1c2VySWQiLCJzZWxlY3QiLCJlbWFpbCIsIm5hbWUiLCJyb2xlIiwiYXZhdGFyIiwiZnJlZWxhbmNlclByb2ZpbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsR0FBRztBQUVyQixJQUFJSSxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcmVlbGFuY2UtY2FyZS8uL3NyYy9saWIvZGIudHM/OWU0ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcclxuXHJcbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IHByaXNtYTogUHJpc21hQ2xpZW50IH07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpc21hID1cclxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hIHx8XHJcbiAgbmV3IFByaXNtYUNsaWVudCgpO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcclxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2Fme%2Froute&page=%2Fapi%2Fauth%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5CAditya%5COneDrive%5CDesktop%5Cfreelance-care%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CAditya%5COneDrive%5CDesktop%5Cfreelance-care&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();