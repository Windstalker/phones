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

var tmp = exports.tmp = '<div class="item"><h2></h2><p class="phone-number"></p><div class="button-wrap"><input id="delete-button" type="button" name="delete" value="Удалить"><input id="change-button" type="button" name="change" value="Изменить"></div></div>';

},{"./classes":1}],3:[function(require,module,exports){
'use strict';

// проверка на существования у браузере localStorage

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isExists = isExists;
exports.guid = guid;
exports.rety = rety;
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

function rety() {
    return 3;
}

},{}],4:[function(require,module,exports){
'use strict';

// экспортируем внешние функции

var _functions = require('./functions');

var _const = require('./const');

var _classes = require('./classes');

$(document).ready(function () {
    var add = $('#addbutton');
    var listWrap = $('.list');

    //****************danger***************
    //localStorage.clear();

    var phoneList = JSON.parse(localStorage.getItem("list")) || phoneList;
    localStorage.setItem("list", JSON.stringify(phoneList));

    add.click(function (event) {
        var firstName = $("input:text").eq(0).val();
        var lastName = $("input:text").eq(1).val();
        var phone = $("input:text").eq(2).val();
        var adress = $("input:text").eq(3).val();
        if (firstName !== '' && phone !== '') {
            phoneList.push(new _classes.Contact(firstName, lastName, phone, adress, (0, _functions.guid)()));
            localStorage.setItem("list", JSON.stringify(phoneList));
            showList();
        } else {
            alert('name and number are required');
        }
    });

    /*add.click((event) => {
      if (!localStorage.getItem("list")) {
          localStorage.setItem("list", JSON.stringify(phoneList));
      }
      else {
        let phoneList = JSON.parse(localStorage.getItem("list"));
      }
          let name = $("input:text").eq(0).val();
        let lastname = $("input:text").eq(1).val();
        let number = $("input:text").eq(2).val();
        let adress = $("input:text").eq(3).val();
        if (name !== '' && number !== '') {
            phoneList.push({
                'firstName': name,
                'phone': number,
                'lastName': lastname,
                'adress': adress,
                'id': guid()
            });
            localStorage.setItem("list", JSON.stringify(phoneList));
        } else {
            alert('name and number are required')
        }
        showList();
    })*/

    var showList = function showList() {
        var phoneList = JSON.parse(localStorage.getItem("list"));
        listWrap.text('');
        for (var i = 0; i < phoneList.length; i++) {
            var item = $(_const.tmp);
            item.find('h2').text(phoneList[i].firstName + ' ' + phoneList[i].lastName);
            item.find('p').text(phoneList[i].phone + ', ' + phoneList[i].adress);
            listWrap.append(item);
        }
        localStorage.setItem("list", JSON.stringify(phoneList));
    };

    showList();

    /*let ul = $('ul');
    let add = $('#addbutton');
    let search = $('#searchbutton');
    let del = $('#deletebutton');
    let change = $('#changebutton');
    let phoneList = [];
    // в тел. справочнике уже есть несколько контактов
    phoneList.push({
        id: '395245ea-1651-d00a-266f-16eef8d7bcb0',
        name: 'Dave',
        lastname: 'Ghrol',
        number: '+140684755232',
        adress: 'LA, Maliboo street 45/9'
    });
    phoneList.push({
        id: '628b7bcf-e80e-ac13-6201-91c59b9cad22',
        name: 'Robert',
        lastname: 'Tall',
        number: '+140945774132',
        adress: 'NYC Sunshine avenue 45/7778'
    });
    phoneList.push({
        id: '345ccd60-8da7-c042-cf54-42fce952bfa9',
        name: 'Melina',
        lastname: 'Heart',
        number: '+1404578834132',
        adress: 'NYC Bronks avenue 178/13'
    });
    phoneList = JSON.parse(localStorage.getItem("list"));
    localStorage.setItem("list", JSON.stringify(phoneList));
     // отображения спаска контактов
    const showList = () => {
        ul.text('');
        let list = JSON.parse(localStorage.getItem("list"));
        for (var i = 0; i < list.length; i++) {
            let li = $('<li></li>');
            let p = $('<p></p>')
            li.text(list[i].name + ' ' + (list[i].lastname || ''));
            p.text('Phone: ' + list[i].number + ' Adress: ' + (list[i].adress || 'not added'));
            li.append(p);
            ul.append(li);
        }
    }
     if (isExists()) {
        showList();
    }
     // удаление контакта
    del.click((event) => {
        let name = $("input:text").eq(0).val();
        let list = JSON.parse(localStorage.getItem("list"));
        ul.text('');
        for (var i = 0; i < list.length; i++) {
            if (name == list[i].name) {
                list.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("list", JSON.stringify(list));
        showList();
    })
     // изменение контакта
    change.click((event) => {
        let name = $("input:text").eq(0).val();
        let number = $("input:text").eq(1).val();
        let lastname = $("input:text").eq(2).val();
        let adress = $("input:text").eq(3).val();
        let list = JSON.parse(localStorage.getItem("list"));
        ul.text('');
        for (let i = 0; i < list.length; i++) {
            if (name == list[i].name) {
                let newName = prompt('new Name');
                let newNum = prompt('new number');
                let newLastname = prompt('new last name');
                let newAdress = prompt('new adress');
                list.splice(i, 1, {
                    'name': newName,
                    'number': newNum,
                    'lastname': (newLastname || lastname),
                    'adress': (newAdress || adress)
                });
                break;
            }
        }
        localStorage.setItem("list", JSON.stringify(list));
        showList();
    })
     // поиск контакта
    search.click((event) => {
        let name = $("input:text").eq(0).val();
        let list = JSON.parse(localStorage.getItem("list"));
        let pattern = new RegExp(name);
        ul.text('');
        for (var i = 0; i < list.length; i++) {
            if (pattern.test(list[i].name)) {
                let li = $('<li></li>');
                let p = $('<p></p>')
                li.text(list[i].name + ' ' + (list[i].lastname || ''));
                p.text('Phone: ' + list[i].number + ' Adress: ' + (list[i].adress || 'not added'));
                li.append(p);
                ul.append(li);
            }
        }
    })
     // добавление контакта
    add.click((event) => {
        let name = $("input:text").eq(0).val();
        let number = $("input:text").eq(1).val();
        let lastname = $("input:text").eq(2).val();
        let adress = $("input:text").eq(3).val();
        if (name !== '' && number !== '') {
            phoneList.push({
                'name': name,
                'number': number,
                'lastname': lastname,
                'adress': adress,
                'id': guid()
            });
            localStorage.setItem("list", JSON.stringify(phoneList));
            showList();
        } else {
            alert('name and number are required')
        }
    })*/
});

},{"./classes":1,"./const":2,"./functions":3}]},{},[4]);
