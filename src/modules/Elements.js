class Elements {
  constructor() {
    this.formName = document.querySelector('.form__name');
    this.formSum = document.querySelector('.form__sum');
    this.formPercent = document.querySelector('.form__percent');
    this.formTime = document.querySelector('.form__time');
    this.formButtonCalc = document.querySelector('.form__button_calc');
    this.formButtonAdd = document.querySelector('.form__button_add');
    this.information = document.querySelector('.information');
    this.creditList = document.querySelector('.credit__list');
    this.creditPayments = document.querySelector('.credit__payments');
  }

  getData() {
    return {
      sum: this.formSum.value,
      name: this.formName.value,
      percent: this.formPercent.value,
      time: this.formTime.value,
    };
  }

  clearInformation() {
    if (this.information.firstChild) this.information.removeChild(this.information.firstChild);
  }

  clearPayments() {
    while (this.creditPayments.firstChild) {
      this.creditPayments.removeChild(this.creditPayments.firstChild);
    }
  }

  clearCreditList() {
    while (this.creditList.firstChild) {
      this.creditList.removeChild(this.creditList.firstChild);
    }
  }
}

const elements = new Elements();

export default elements;
