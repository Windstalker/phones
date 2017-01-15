import { guid, isExists } from './functions';
import { phoneList, tmp } from './const';
import { Contact } from './classes';

$(document).ready(() => {
  const listWrap = $('.list');
  const form = $('form');
  const reset = $('input:reset');
  let caseChange = null;
  let del;
  let change;

  if (!isExists()) {
    alert('no localStorage');
  }

  const phoneList = JSON.parse(localStorage.getItem('list')) || phoneList;
  localStorage.setItem('list', JSON.stringify(phoneList));

    // показать список контактов
  const showList = () => {
    const phoneList = JSON.parse(localStorage.getItem('list'));
    listWrap.text('');
    for (let i = 0; i < phoneList.length; i++) {
      const item = $(tmp);
      item.find('h2').text(`${phoneList[i].firstName} ${phoneList[i].lastName}`);
      item.find('p').text(`${phoneList[i].phone} ${phoneList[i].adress}`);
      listWrap.append(item);
    }
    localStorage.setItem('list', JSON.stringify(phoneList));
  };

  showList();

  del = $('.delete-button');
  change = $('.change-button');

  reset.click(() => {
    caseChange = null;
  });

    // добавить или изменить контакт
  form.submit(() => {
    const phoneList = JSON.parse(localStorage.getItem('list'));
    const firstName = $('input:text').eq(0).val();
    const lastName = $('input:text').eq(1).val();
    const phone = $('input:text').eq(2).val();
    const adress = $('input:text').eq(3).val();
    if (caseChange) {
      phoneList.splice(caseChange, 1, new Contact(firstName, lastName, phone, adress, guid()));
    } else {
      phoneList.push(new Contact(firstName, lastName, phone, adress, guid()));
    }
    caseChange = null;
    localStorage.setItem('list', JSON.stringify(phoneList));
    showList();
  });

    // удаление контакта
  del.click(function () {
    const phoneList = JSON.parse(localStorage.getItem('list'));
    const self = $(this).parent().parent();
    phoneList.splice(self.index(), 1);
    localStorage.setItem('list', JSON.stringify(phoneList));
    self.remove();
  });

    // изменение контакта
  change.click(function () {
    const index = $(this).parent().parent().index();
    caseChange = index;
    $('html, body').animate({
      scrollTop: 0,
    }, 'slow');
    $('input:text').eq(0).val(phoneList[index].firstName);
    $('input:text').eq(1).val(phoneList[index].lastName);
    $('input:text').eq(2).val(phoneList[index].phone);
    $('input:text').eq(3).val(phoneList[index].adress);
  });
});
