import { guid } from '../utils/utils';

export default class Contact {
  constructor({ firstName = '', lastName = '', phone = '', address = '' }) {
    this.id = guid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
  }

  getState() {
    const { firstName, lastName, phone, address } = this;
    return { firstName, lastName, phone, address };
  }
}
