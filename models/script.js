'use strict';

// экспортируем внешние функции
import {
    guid,
    isExists
} from './functions';

import {
    phoneList,
    tmp
} from './const';
import {
    Contact
} from './classes';

$(document).ready(function() {
    let add = $('#addbutton');
    let listWrap = $('.list');

    //****************danger***************
    //localStorage.clear();

    let phoneList = JSON.parse(localStorage.getItem("list")) || phoneList;
    localStorage.setItem("list", JSON.stringify(phoneList));

    add.click(function(event) {
        let firstName = $("input:text").eq(0).val();
        let lastName = $("input:text").eq(1).val();
        let phone = $("input:text").eq(2).val();
        let adress = $("input:text").eq(3).val();
        if (firstName !== '' && phone !== '') {
            phoneList.push(new Contact(firstName, lastName, phone, adress, guid()));
            localStorage.setItem("list", JSON.stringify(phoneList));
            showList();
        } else {
            alert('name and number are required');
        }
    })




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



    const showList = () => {
        let phoneList = JSON.parse(localStorage.getItem("list"));
        listWrap.text('');
        for (var i = 0; i < phoneList.length; i++) {
            let item = $(tmp);
            item.find('h2').text(phoneList[i].firstName + ' ' + phoneList[i].lastName);
            item.find('p').text(phoneList[i].phone + ', ' + phoneList[i].adress);
            listWrap.append(item);
        }
        localStorage.setItem("list", JSON.stringify(phoneList));
    }

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
})
