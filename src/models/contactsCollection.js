import Contact from './contactModel';

export default class ContactsList {
  constructor(list = []) {
    this.list = list.map(item => new Contact(item));
  }

  add(contact) {
    this.push(contact instanceof Contact ? contact : new Contact(contact));
  }

  remove(id) {
    this.list = this.list.filter(contact => contact.id === id);
  }

  getState() {
    return this.list.map(contact => contact.getState());
  }
}
