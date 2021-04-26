import calculatePayments from './calculatePayments';

class CreateElements {
  createInformationAboutCredit(data) {
    const payment = calculatePayments(data.sum, data.time, data.percent);
    const element = document.createElement('div');
    element.classList.add('info');

    const infoPayment = document.createElement('div');
    infoPayment.classList.add('info__payment');

    const infoTotal = document.createElement('div');
    infoTotal.classList.add('info__total');

    const paymentsElement = document.createElement('div');
    paymentsElement.classList.add('info__payment__value');
    paymentsElement.innerHTML = payment;

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('info__payment__description');
    descriptionElement.innerHTML = 'Ежемесячный платеж составит: ';

    infoPayment.append(descriptionElement, paymentsElement);

    const totalDescription = document.createElement('div');
    totalDescription.classList.add('info__total_description');
    totalDescription.innerHTML = 'Выплата составит: ';

    const totalValue = document.createElement('div');
    totalValue.classList.add('info__total_value');
    totalValue.innerHTML = payment * data.time;

    infoTotal.append(totalDescription, totalValue);
    element.append(infoPayment, infoTotal);

    return element;
  }

  createNewCreditElement(parent, data, callback, flag) {
    const element = document.createElement('div');
    element.classList.add('credit__list__item');

    const nameElement = document.createElement('div');
    nameElement.classList.add('credit__list__item__name');
    nameElement.innerHTML = data.name;

    const sumElement = document.createElement('div');
    sumElement.classList.add('credit__list__item__sum');

    const sumElementDescription = document.createElement('div');
    sumElementDescription.classList.add('credit__list__item__sum__description');
    sumElementDescription.innerHTML = 'Сумма:';

    const sumElementValue = document.createElement('div');
    sumElementValue.classList.add('credit__list__item__sum__value');
    sumElementValue.innerHTML = data.sum;

    sumElement.append(sumElementDescription, sumElementValue);

    const timeElement = document.createElement('div');
    timeElement.classList.add('credit__list__item__time');

    const timeElementDescription = document.createElement('div');
    timeElementDescription.classList.add('credit__list__item__time__description');
    timeElementDescription.innerHTML = 'Срок:';

    const timeElementValue = document.createElement('div');
    timeElementValue.classList.add('credit__list__item__time__value');
    timeElementValue.innerHTML = data.time;

    timeElement.append(timeElementDescription, timeElementValue);

    const percentElement = document.createElement('div');
    percentElement.classList.add('credit__list__item__percent');

    const percentElementDescription = document.createElement('div');
    percentElementDescription.classList.add('credit__list__item__percent__description');
    percentElementDescription.innerHTML = 'Процент:';

    const percentElementValue = document.createElement('div');
    percentElementValue.classList.add('credit__list__item__percent__value');
    percentElementValue.innerHTML = data.percent;

    percentElement.append(percentElementDescription, percentElementValue);

    const buttonElement = document.createElement('button');
    buttonElement.classList.add('credit__list__item__button');
    buttonElement.innerHTML = 'Удалить';
    buttonElement.disabled = flag;
    buttonElement.addEventListener('click', (event) => {
      event.preventDefault();
      callback(data.name);
    });

    element.append(nameElement,
      sumElement, timeElement, percentElement, buttonElement);
    parent.append(element);
  }

  createPayments(parent, array, callback) {
    array.forEach((element, index) => {
      const elem = document.createElement('div');
      elem.classList.add('credit__payments__item');
      const elemValue = document.createElement('div');
      elemValue.classList.add('credit__payments__item__value');
      elemValue.innerHTML = element.value;
      if (element.isPaid) elemValue.style = 'text-decoration: line-through;';
      elem.append(elemValue);
      if (array.findIndex((el) => !el.isPaid) === index) {
        const elemButton = document.createElement('button');
        elemButton.classList.add('credit__payments__item__button');
        elemButton.innerHTML = 'Оплачено';
        elemButton.addEventListener('click', (event) => {
          event.preventDefault();
          callback();
        });
        elem.append(elemButton);
      }
      parent.append(elem);
    });
  }

  createErrorInformation(parent) {
    const element = document.createElement('div');
    element.classList.add('information__error');

    const elementDescripton = document.createElement('div');
    elementDescripton.classList.add('information__error__description');
    elementDescripton.innerHTML = 'Некорректные данные. Название должно быть уникальным. Сумма, процент и срок должны содержать только положительные числовые значения.';

    const elementButton = document.createElement('button');
    elementButton.classList.add('information__error__button');
    elementButton.innerHTML = 'Хорошо';
    elementButton.addEventListener('click', (event) => {
      event.preventDefault();
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    });

    parent.append(elementDescripton, elementButton);
  }
}

const createElements = new CreateElements();
export default createElements;
