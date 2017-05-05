(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var Component = _videoJs2['default'].getComponent('Component');
var Button = _videoJs2['default'].getComponent('Button');
var defaults = {};

var ChapterNavButton = (function (_Button) {
  _inherits(ChapterNavButton, _Button);

  function ChapterNavButton(player, options) {
    var _this = this;

    _classCallCheck(this, ChapterNavButton);

    _get(Object.getPrototypeOf(ChapterNavButton.prototype), 'constructor', this).call(this, player, options);
    if (this.options_.direction == "prev") {
      this.controlText("Previous");
    } else {
      this.controlText("Next");
    }

    this.update();

    var chaptersButton = this.player_.controlBar.chaptersButton;
    this.on(chaptersButton, 'change', this.update);
    this.on('dispose', function () {
      _this.off(chaptersButton, 'change', _this.update);
    });
  }

  _createClass(ChapterNavButton, [{
    key: 'buildCSSClass',
    value: function buildCSSClass() {
      return 'vjs-chapter-nav-button jump-' + this.options_.direction + ' ' + _get(Object.getPrototypeOf(ChapterNavButton.prototype), 'buildCSSClass', this).call(this);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.player_.controlBar.chaptersButton.hasClass('vjs-hidden')) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      var player = this.player_;
      var track = player.controlBar.chaptersButton.track_;
      if (!track) return;

      var cues = track.cues;
      if (!cues.length) return;

      var len = cues.length;
      var now = player.currentTime();

      for (var n = 0; n < len; n++) {
        var _cues$n = cues[n];
        var startTime = _cues$n.startTime;
        var endTime = _cues$n.endTime;

        if (this.options_.direction == "prev") {
          if (now > startTime && now <= endTime + 4) {
            player.currentTime(startTime);
            break;
          }
        } else {
          if (now >= startTime && now < endTime) {
            player.currentTime(endTime);
            break;
          }
        }
      }
    }
  }]);

  return ChapterNavButton;
})(Button);

var chapterNav = function chapterNav(options) {
  var player = this;
  player.ready(function () {
    var opts = _videoJs2['default'].mergeOptions(defaults, options);

    player.controlBar.chapterPrev = player.controlBar.addChild('ChapterNavButton', {
      direction: 'prev'
    });
    player.controlBar.el().insertBefore(player.controlBar.chapterPrev.el(), player.controlBar.chaptersButton.el());

    player.controlBar.chapterNext = player.controlBar.addChild('ChapterNavButton', {
      direction: 'next'
    });
    player.controlBar.el().insertBefore(player.controlBar.chapterNext.el(), player.controlBar.chaptersButton.el().nextSibling);
  });
};

Component.registerComponent('ChapterNavButton', ChapterNavButton);
_videoJs2['default'].plugin('chapterNav', chapterNav);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
