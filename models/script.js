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
    let listWrap = $('.list');
    let form = $('form');
    let reset = $("input:reset");
    let caseChange = null;

    if (!isExists()) {
        alert('no localStorage');
    }

    let phoneList = JSON.parse(localStorage.getItem("list")) || phoneList;
    localStorage.setItem("list", JSON.stringify(phoneList));

    reset.click(function() {
        caseChange = null;
    })

    // показать список контактов
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

    let del = $('.delete-button');
    let change = $('.change-button');

    // добавить или изменить контакт
    form.submit(function() {
        let phoneList = JSON.parse(localStorage.getItem("list"));
        let firstName = $("input:text").eq(0).val();
        let lastName = $("input:text").eq(1).val();
        let phone = $("input:text").eq(2).val();
        let adress = $("input:text").eq(3).val();
        if (caseChange) {
            phoneList.splice(caseChange, 1, new Contact(firstName, lastName, phone, adress, guid()));
        } else {
            if (firstName !== '' && phone !== '') {
                phoneList.push(new Contact(firstName, lastName, phone, adress, guid()));
            } else {
                alert('name and number are required');
            }
        }
        caseChange = null;
        localStorage.setItem("list", JSON.stringify(phoneList));
        showList();
    })

    // удаление контакта
    del.click(function() {
        let phoneList = JSON.parse(localStorage.getItem("list"));
        let index = $(this).parent().parent().index();
        phoneList.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(phoneList));
        showList();
        location.reload();
    })

    // изменение контакта
    change.click(function() {
        let index = $(this).parent().parent().index();
        caseChange = index;
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        $("input:text").eq(0).val(phoneList[index].firstName);
        $("input:text").eq(1).val(phoneList[index].lastName);
        $("input:text").eq(2).val(phoneList[index].phone);
        $("input:text").eq(3).val(phoneList[index].adress);
    })
})
