import calculatePayments from './calculatePayments';

const createCreditObject = (data) => ({
  name: data.name,
  sum: data.sum,
  time: data.time,
  percent: data.percent,
  payments: +calculatePayments(data.sum, data.time, data.percent),
});

const createArrayPayments = (array) => {
  let result = [];
  array.forEach((element) => {
    for (let i = 0; i < element.time; i += 1) {
      if (result[i]) {
        const sum = result[i] + element.payments;
        result[i] = +sum.toFixed(2);
      } else { result = [...result, element.payments]; }
    }
  });

  return result;
};

class Store {
  constructor() {
    this.creditList = [];
    this.creditPayments = [];
  }

  updateLocalStorage() {
    localStorage.store = JSON.stringify({
      creditList: this.creditList,
      creditPayments: this.creditPayments,
    });
  }

  initStore() {
    if (!localStorage.store) {
      this.updateLocalStorage();
    } else {
      this.creditList = JSON.parse(localStorage.store).creditList;
      this.creditPayments = JSON.parse(localStorage.store).creditPayments;
    }
  }

  getStore() {
    return {
      creditList: this.creditList,
      creditPayments: this.creditPayments,
    };
  }

  setData(data) {
    this.creditList = [...this.creditList, createCreditObject(data)];
    this.creditPayments = createArrayPayments(this.creditList);
    this.updateLocalStorage();
  }

  deliteCredit(value) {
    this.creditList = this.creditList.filter((element) => element.name !== value);
    this.creditPayments = createArrayPayments(this.creditList);
    this.updateLocalStorage();
  }
}

const store = new Store();
store.initStore();

export default store;
