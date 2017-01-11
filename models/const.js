'use strict';

import {Contact} from './classes';

export let phoneList = [];

// изначально наш справочник имеет несколько контактов
phoneList.push(new Contact('Dave', 'Ghrol', '+140684755232', 'LA, Maliboo street 45/9', '395245ea-1651-d00a-266f-16eef8d7bcb0'));
phoneList.push(new Contact('Robert', 'Sting', '+140945774132', 'NYC Sunshine avenue 45/7778', '628b7bcf-e80e-ac13-6201-91c59b9cad22'));
phoneList.push(new Contact('Melina', 'Hunter', '+140995548232', 'NYC Bronks avenue 178/13', '345ccd60-8da7-c042-cf54-42fce952bfa9'));

export const tmp = '<div class="item"><h2></h2><p class="phone-number"></p><div class="button-wrap"><input class="delete-button" type="button" name="delete" value="Удалить"><input class="change-button" type="button" name="change" value="Изменить"></div></div>'
