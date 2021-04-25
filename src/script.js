import './style.css';
import store from './modules/Store';
import elements from './modules/Elements';
import createElements from './modules/CreateElements';

class App {
  render(context) {
    return () => {
      elements.clearPayments();
      elements.clearCreditList();
      store.creditList.forEach((element) => {
        createElements.createNewCreditElement(elements.creditList, element,
          store.deleteCredit(store, context.render(context)));
      });
      createElements.createPayments(elements.creditPayments, store.creditPayments);
    };
  }

  setHandlers() {
    elements.formButtonCalc.addEventListener('click', (elem) => {
      elem.preventDefault();
      elements.clearInformation();
      const newElement = createElements.createInformationAboutCredit(elements.getData());

      elements.information.append(newElement);
    });

    elements.formButtonAdd.addEventListener('click', (elem) => {
      elem.preventDefault();
      elements.clearInformation();
      createElements.createNewCreditElement(elements.creditList,
        elements.getData(), store.deleteCredit(store, this.render(this)));

      store.setData(elements.getData());
      elements.clearPayments();
      createElements.createPayments(elements.creditPayments, store.creditPayments);
    });
  }

  init() {
    store.creditList.forEach((element) => {
      createElements.createNewCreditElement(elements.creditList, element,
        store.deleteCredit(store, this.render(this)));
    });
    createElements.createPayments(elements.creditPayments, store.creditPayments);
    this.setHandlers();
  }
}

const app = new App();
app.init();
