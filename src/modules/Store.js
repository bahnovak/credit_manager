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
      const obj = {
        value: 0,
        isPaid: false,
      };
      if (result[i]) {
        const sum = result[i].value + element.payments;
        result[i].value = +sum.toFixed(2);
      } else {
        obj.value = element.payments;
        result = [...result, obj];
      }
    }
  });

  return result;
};

class Store {
  constructor() {
    this.creditList = [];
    this.creditPayments = [];
    this.isBlock = false;
  }

  updateLocalStorage() { // Обновление данных в localStorage
    localStorage.store = JSON.stringify({
      creditList: this.creditList,
      creditPayments: this.creditPayments,
      isBlock: this.isBlock,
    });
  }

  initStore() { // Иницилизация store
    if (!localStorage.store) {
      this.updateLocalStorage();
    } else {
      this.creditList = JSON.parse(localStorage.store).creditList;
      this.creditPayments = JSON.parse(localStorage.store).creditPayments;
      this.isBlock = JSON.parse(localStorage.store).isBlock;
    }
  }

  setData(data) { // Обновление данных
    this.creditList = [...this.creditList, createCreditObject(data)];
    this.creditPayments = createArrayPayments(this.creditList);
    this.updateLocalStorage();
  }

  setIsBlock() { // Установка флага режима редактирования
    this.isBlock = !this.isBlock;
    this.updateLocalStorage();
  }

  deleteCredit(context, callback) { // Удалить кредит
    return (value) => {
      context.creditList = context.creditList.filter((element) => element.name !== value);
      context.creditPayments = createArrayPayments(context.creditList);
      context.updateLocalStorage();
      callback();
    };
  }

  checkName(name) { // Проверка на уникальное имя
    return this.creditList.find((element) => element.name === name);
  }

  toPay(context, callback) { // Установка оплаченного платежа
    return () => {
      this.creditPayments.find((element) => !element.isPaid).isPaid = true;
      context.updateLocalStorage();
      callback();
    };
  }

  getBalance() { // Получить остаток по кредитам
    return this.creditPayments.reduce((acc, current) => {
      if (!current.isPaid) return acc + current.value;
      return acc;
    }, 0).toFixed(2);
  }
}

const store = new Store();
store.initStore();

export default store;
