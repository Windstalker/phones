(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

// экспортируем внешние функции

var _functions = require('./functions');

$(document).ready(function () {
    var ul = $('ul');
    var add = $('#addbutton');
    var search = $('#searchbutton');
    var del = $('#deletebutton');
    var change = $('#changebutton');
    var phoneList = [];
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
    var showList = function showList() {
        ul.text('');
        var list = JSON.parse(localStorage.getItem("list"));
        for (var i = 0; i < list.length; i++) {
            var li = $('<li></li>');
            var p = $('<p></p>');
            li.text(list[i].name + ' ' + (list[i].lastname || ''));
            p.text('Phone: ' + list[i].number + ' Adress: ' + (list[i].adress || 'not added'));
            li.append(p);
            ul.append(li);
        }
    };

    if ((0, _functions.isExists)()) {
        showList();
    }

    // удаление контакта
    del.click(function (event) {
        var name = $("input:text").eq(0).val();
        var list = JSON.parse(localStorage.getItem("list"));
        ul.text('');
        for (var i = 0; i < list.length; i++) {
            if (name == list[i].name) {
                list.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("list", JSON.stringify(list));
        showList();
    });

    // изменение контакта
    change.click(function (event) {
        var name = $("input:text").eq(0).val();
        var number = $("input:text").eq(1).val();
        var lastname = $("input:text").eq(2).val();
        var adress = $("input:text").eq(3).val();
        var list = JSON.parse(localStorage.getItem("list"));
        ul.text('');
        for (var i = 0; i < list.length; i++) {
            if (name == list[i].name) {
                var newName = prompt('new Name');
                var newNum = prompt('new number');
                var newLastname = prompt('new last name');
                var newAdress = prompt('new adress');
                list.splice(i, 1, {
                    'name': newName,
                    'number': newNum,
                    'lastname': newLastname || lastname,
                    'adress': newAdress || adress
                });
                break;
            }
        }
        localStorage.setItem("list", JSON.stringify(list));
        showList();
    });

    // поиск контакта
    search.click(function (event) {
        var name = $("input:text").eq(0).val();
        var list = JSON.parse(localStorage.getItem("list"));
        var pattern = new RegExp(name);
        ul.text('');
        for (var i = 0; i < list.length; i++) {
            if (pattern.test(list[i].name)) {
                var li = $('<li></li>');
                var p = $('<p></p>');
                li.text(list[i].name + ' ' + (list[i].lastname || ''));
                p.text('Phone: ' + list[i].number + ' Adress: ' + (list[i].adress || 'not added'));
                li.append(p);
                ul.append(li);
            }
        }
    });

    // добавление контакта
    add.click(function (event) {
        var name = $("input:text").eq(0).val();
        var number = $("input:text").eq(1).val();
        var lastname = $("input:text").eq(2).val();
        var adress = $("input:text").eq(3).val();
        if (name !== '' && number !== '') {
            phoneList.push({
                'name': name,
                'number': number,
                'lastname': lastname,
                'adress': adress,
                'id': (0, _functions.guid)()
            });
            localStorage.setItem("list", JSON.stringify(phoneList));
            showList();
        } else {
            alert('name and number are required');
        }
    });
});

},{"./functions":1}]},{},[2]);
