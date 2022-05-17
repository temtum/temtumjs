function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),Object.defineProperty(a,"prototype",{writable:!1}),a}var request=require("request-promise-native"),crypto=require("crypto"),secp256k1=require("secp256k1");require("regenerator-runtime/runtime");var Transaction=require("./transaction"),Wallet=/*#__PURE__*/function(){function a(b){_classCallCheck(this,a),this.url=b}return _createClass(a,[{key:"getTokenForDataCreation",value:function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function d(a,b,c){var e,f,g,h;return regeneratorRuntime.wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return e=[a,c],f=Transaction.sha256Hex(e.join("")),g=secp256k1.sign(Buffer.from(f,"hex"),Buffer.from(b,"hex")),h=g.signature.toString("hex"),d.abrupt("return",request({method:"POST",url:"".concat(this.url,"/address/").concat(a,"/createToken"),json:{signature:h,expirationTime:c}}).then(function(a){return a.token}).catch(function(a){console.log(a)}));case 5:case"end":return d.stop();}},d,this)}));return function getTokenForDataCreation(){return a.apply(this,arguments)}}()},{key:"sendTransaction",value:function sendTransaction(a){return request({method:"POST",uri:"".concat(this.url,"/transaction/send"),json:{txHex:a}})}},{key:"getUnspent",value:function getUnspent(a){return request({method:"GET",uri:"".concat(this.url,"/address/").concat(a,"/unspent"),json:!0})}}],[{key:"generateKeyPair",value:function generateKeyPair(){var a=crypto.randomBytes(32),b=secp256k1.publicKeyCreate(a);return{privateKey:a.toString("hex"),address:b.toString("hex")}}}]),a}();module.exports=Wallet;