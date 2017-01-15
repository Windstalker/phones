import $ from 'jquery';
import { guid } from '../../utils/utils';

export default class View {
  constructor(model, id = guid()) {
    this.model = model;
    this.el = document.createElement('div');
    this.$el = $(this.el);

    this.el.className = `view_${id}`;
    this.init();
  }

  init() { // eslint-disable-line class-methods-use-this

  }

  template() { // eslint-disable-line class-methods-use-this
    return '';
  }

  render() {
    const state = this.model.getState();
    const html = this.template({ state });

    this.$el.html(html);

    return this;
  }
}
