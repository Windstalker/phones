(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contact = exports.Contact = function Contact(firstName, lastName, phone, adress, id) {
    _classCallCheck(this, Contact);

    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.adress = adress;
    this.id = id;
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tmp = exports.phoneList = undefined;

var _classes = require('./classes');

var phoneList = exports.phoneList = [];

// изначально наш справочник имеет несколько контактов
phoneList.push(new _classes.Contact('Dave', 'Ghrol', '+140684755232', 'LA, Maliboo street 45/9', '395245ea-1651-d00a-266f-16eef8d7bcb0'));
phoneList.push(new _classes.Contact('Robert', 'Sting', '+140945774132', 'NYC Sunshine avenue 45/7778', '628b7bcf-e80e-ac13-6201-91c59b9cad22'));
phoneList.push(new _classes.Contact('Melina', 'Hunter', '+140995548232', 'NYC Bronks avenue 178/13', '345ccd60-8da7-c042-cf54-42fce952bfa9'));

var tmp = exports.tmp = '<div class="item"><h2></h2><p class="phone-number"></p><div class="button-wrap"><input class="delete-button" type="button" name="delete" value="Удалить"><input class="change-button" type="button" name="change" value="Изменить"></div></div>';

},{"./classes":1}],3:[function(require,module,exports){
'use strict';

// проверка на существования у браузере localStorage

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isExists = isExists;
exports.guid = guid;
function isExists() {
    if (typeof Storage !== 'undefined') {
        return true;
    } else {
        return false;
    }
}

// получение рандомного id
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

},{}],4:[function(require,module,exports){
'use strict';

// импортируем внешние функции

var _functions = require('./functions');

var _const = require('./const');

var _classes = require('./classes');

$(document).ready(function () {
    var listWrap = $('.list');
    var form = $('form');
    var reset = $('input:reset');
    var caseChange = null;
    var del = void 0;
    var change = void 0;

    if (!(0, _functions.isExists)()) {
        alert('no localStorage');
    }

    var phoneList = JSON.parse(localStorage.getItem("list")) || phoneList;
    localStorage.setItem("list", JSON.stringify(phoneList));

    // показать список контактов
    var showList = function showList() {
        var phoneList = JSON.parse(localStorage.getItem("list"));
        listWrap.text('');
        for (var i = 0; i < phoneList.length; i++) {
            var item = $(_const.tmp);
            item.find('h2').text(phoneList[i].firstName + ' ' + phoneList[i].lastName);
            item.find('p').text(phoneList[i].phone + ' ' + phoneList[i].adress);
            listWrap.append(item);
        }
        localStorage.setItem("list", JSON.stringify(phoneList));
    };

    showList();

    del = $('.delete-button');
    change = $('.change-button');

    reset.click(function () {
        caseChange = null;
    });

    // добавить или изменить контакт
    form.submit(function () {
        var phoneList = JSON.parse(localStorage.getItem("list"));
        var firstName = $("input:text").eq(0).val();
        var lastName = $("input:text").eq(1).val();
        var phone = $("input:text").eq(2).val();
        var adress = $("input:text").eq(3).val();
        if (caseChange) {
            phoneList.splice(caseChange, 1, new _classes.Contact(firstName, lastName, phone, adress, (0, _functions.guid)()));
        } else {
            phoneList.push(new _classes.Contact(firstName, lastName, phone, adress, (0, _functions.guid)()));
        }
        caseChange = null;
        localStorage.setItem("list", JSON.stringify(phoneList));
        showList();
    });

    // удаление контакта
    del.click(function () {
        var phoneList = JSON.parse(localStorage.getItem("list"));
        var self = $(this).parent().parent();
        phoneList.splice(self.index(), 1);
        localStorage.setItem("list", JSON.stringify(phoneList));
        self.remove();
    });

    // изменение контакта
    change.click(function () {
        var index = $(this).parent().parent().index();
        caseChange = index;
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        $("input:text").eq(0).val(phoneList[index].firstName);
        $("input:text").eq(1).val(phoneList[index].lastName);
        $("input:text").eq(2).val(phoneList[index].phone);
        $("input:text").eq(3).val(phoneList[index].adress);
    });
});

},{"./classes":1,"./const":2,"./functions":3}]},{},[4]);
