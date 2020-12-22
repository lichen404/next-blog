"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignIn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _getDatabaseConnection = _interopRequireDefault(require("../../lib/getDatabaseConnection"));

var _User = require("../entity/User");

var _md = _interopRequireDefault(require("md5"));

var SignIn = /*#__PURE__*/function () {
  function SignIn(username, password) {
    (0, _classCallCheck2["default"])(this, SignIn);
    (0, _defineProperty2["default"])(this, "username", void 0);
    (0, _defineProperty2["default"])(this, "password", void 0);
    (0, _defineProperty2["default"])(this, "user", void 0);
    (0, _defineProperty2["default"])(this, "errors", {
      username: [],
      password: []
    });
    this.username = username;
    this.password = password;
  }

  (0, _createClass2["default"])(SignIn, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var conn, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.username.trim() === '')) {
                  _context.next = 4;
                  break;
                }

                this.errors.username.push('请填写用户名');
                _context.next = 11;
                break;

              case 4:
                _context.next = 6;
                return (0, _getDatabaseConnection["default"])();

              case 6:
                conn = _context.sent;
                _context.next = 9;
                return conn.manager.findOne(_User.User, {
                  where: {
                    username: this.username
                  }
                });

              case 9:
                user = _context.sent;

                if (user) {
                  if (user.passwordDigest !== (0, _md["default"])(this.password)) {
                    this.errors.password.push('密码与用户名不匹配');
                  } else {
                    this.user = user;
                  }
                } else {
                  this.errors.username.push('用户名不存在');
                }

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validate() {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "hasErrors",
    value: function hasErrors() {
      return !!Object.values(this.errors).find(function (v) {
        return v.length > 0;
      });
    }
  }]);
  return SignIn;
}();

exports.SignIn = SignIn;