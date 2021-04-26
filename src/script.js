import './style.css';
import store from './modules/Store';
import elements from './modules/Elements';
import createElements from './modules/CreateElements';

class App {
  checkData(data) {
    if (Number(data.sum) > 0
    && Number(data.time) > 0
    && Number(data.percent) > 0) {
      return true;
    }
    return false;
  }

  render(context) {
    return () => {
      elements.clearPayments();
      elements.clearCreditList();
      store.creditList.forEach((element) => {
        createElements.createNewCreditElement(elements.creditList, element,
          store.deleteCredit(store, context.render(context)));
      });
      createElements.createPayments(elements.creditPayments,
        store.creditPayments, store.toPay(store, context.render(context)));
      elements.creditBalance.innerHTML = store.getBalance();
    };
  }

  setHandlers() {
    elements.formButtonCalc.addEventListener('click', (elem) => {
      elem.preventDefault();
      elements.clearInformation();
      if (this.checkData(elements.getData())) {
        const newElement = createElements.createInformationAboutCredit(elements.getData());
        elements.information.append(newElement);
      } else {
        createElements.createErrorInformation(elements.information);
      }
    });

    elements.formButtonAdd.addEventListener('click', (elem) => {
      elem.preventDefault();
      elements.clearInformation();

      if (store.checkName(elements.getData().name) || !this.checkData(elements.getData())) {
        createElements.createErrorInformation(elements.information);
      } else {
        createElements.createNewCreditElement(elements.creditList,
          elements.getData(), store.deleteCredit(store, this.render(this)));

        store.setData(elements.getData());
        elements.clearPayments();
        createElements.createPayments(elements.creditPayments,
          store.creditPayments, store.toPay(store, this.render(this)));
        elements.clearData();
      }
      elements.creditBalance.innerHTML = store.getBalance();
    });
  }

  init() {
    store.creditList.forEach((element) => {
      createElements.createNewCreditElement(elements.creditList, element,
        store.deleteCredit(store, this.render(this)));
    });
    createElements.createPayments(elements.creditPayments,
      store.creditPayments, store.toPay(store, this.render(this)));
    this.setHandlers();
    elements.creditBalance.innerHTML = store.getBalance();
  }
}

const app = new App();
app.init();
