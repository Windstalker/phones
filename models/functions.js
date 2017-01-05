'use strict';

// проверка на существования у браузере localStorage
export function isExists() {
    if (typeof(Storage) !== 'undefined') {
        return true;
    } else {
        return false;
    }
}

// получение рандомного id
export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
