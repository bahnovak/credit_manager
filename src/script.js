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
          store.deleteCredit(store, context.render(context)), store.isBlock);
      });
      createElements.createPayments(elements.creditPayments,
        store.creditPayments, store.toPay(store, context.render(context)));
      elements.creditBalance.innerHTML = store.getBalance();
      elements.formButtonAdd.disabled = store.isBlock;
      elements.creditBalance.innerHTML = store.getBalance();
      elements.clickAccept(store.isBlock);
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
        store.setData(elements.getData());
        elements.clearData();
        this.render(this)();
      }
    });

    elements.creditAcceptButton.addEventListener('click', () => {
      store.setIsBlock();
      this.render(this)();
    });
  }

  init() {
    this.render(this)();
    this.setHandlers();
  }
}

const app = new App();
app.init();
