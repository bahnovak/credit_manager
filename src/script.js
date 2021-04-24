import './style.css';
import store from './modules/Store';
import elements from './modules/Elements';
import createElements from './modules/CreateElements';

class App {
  reRender(name) {
    const context = this;
    store.deliteCredit(name);
    elements.clearCreditList();
    elements.clearPayments();
    store.creditList.forEach((element) => {
      createElements.createNewCreditElement(elements.creditList, element, context.reRender);
    });
    createElements.createPayments(elements.creditPayments, store.creditPayments);
  }

  setHandlers() {
    const context = this;
    elements.formButtonCalc.addEventListener('click', (elem) => {
      elem.preventDefault();
      elements.clearInformation();
      const newElement = createElements.createInformationAboutCredit(elements.getData());

      elements.information.append(newElement);
    });

    elements.formButtonAdd.addEventListener('click', (elem) => {
      elem.preventDefault();
      elements.clearInformation();
      createElements.createNewCreditElement(elements.creditList, elements.getData(), context.reRender);

      store.setData(elements.getData());
      elements.clearPayments();
      createElements.createPayments(elements.creditPayments, store.creditPayments);
    });
  }

  init() {
    const context = this;
    store.creditList.forEach((element) => {
      createElements.createNewCreditElement(elements.creditList, element, context.reRender);
    });
    createElements.createPayments(elements.creditPayments, store.creditPayments);
    this.setHandlers();
  }
}

const app = new App();
app.init();
