'use strict';

// импортируем внешние функции
import {guid, isExists} from './functions';
import {phoneList, tmp} from './const';
import {Contact} from './classes';

$(document).ready(function() {
    let listWrap = $('.list');
    let form = $('form');
    let reset = $('input:reset');
    let caseChange = null;
    let del;
    let change;

    if (!isExists()) {
        alert('no localStorage');
    }

    let phoneList = JSON.parse(localStorage.getItem("list")) || phoneList;
    localStorage.setItem("list", JSON.stringify(phoneList));

    // показать список контактов
    const showList = () => {
        let phoneList = JSON.parse(localStorage.getItem("list"));
        listWrap.text('');
        for (var i = 0; i < phoneList.length; i++) {
            let item = $(tmp);
            item.find('h2').text(`${phoneList[i].firstName} ${phoneList[i].lastName}`);
            item.find('p').text(`${phoneList[i].phone} ${phoneList[i].adress}`);
            listWrap.append(item);
        }
        localStorage.setItem("list", JSON.stringify(phoneList));
    }

    showList();

    del = $('.delete-button');
    change = $('.change-button');

    reset.click(function() {
        caseChange = null;
    })

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
            phoneList.push(new Contact(firstName, lastName, phone, adress, guid()));
        }
        caseChange = null;
        localStorage.setItem("list", JSON.stringify(phoneList));
        showList();
    })

    // удаление контакта
    del.click(function() {
        let phoneList = JSON.parse(localStorage.getItem("list"));
        let self = $(this).parent().parent();
        phoneList.splice(self.index(), 1);
        localStorage.setItem("list", JSON.stringify(phoneList));
        self.remove();
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
