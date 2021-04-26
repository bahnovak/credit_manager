import calculatePayments from './calculatePayments';

class CreateElements {
  createInformationAboutCredit(data) {
    const element = document.createElement('div');
    element.classList.add('info');

    const paymentsElement = document.createElement('div');
    paymentsElement.classList.add('info__payments');
    paymentsElement.innerHTML = calculatePayments(data.sum, data.time, data.percent);

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('info__description');
    descriptionElement.innerHTML = 'Ежемесячная выплата составит: ';

    element.append(descriptionElement, paymentsElement);

    return element;
  }

  createNewCreditElement(parent, data, callback) {
    const element = document.createElement('div');
    element.classList.add('credit__list__item');

    const nameElement = document.createElement('div');
    nameElement.classList.add('credit__list__item__name');
    nameElement.innerHTML = data.name;

    const sumElement = document.createElement('div');
    sumElement.classList.add('credit__list__item__sum');
    sumElement.innerHTML = data.sum;

    const timeElement = document.createElement('div');
    timeElement.classList.add('credit__list__item__time');
    timeElement.innerHTML = data.time;

    const percentElement = document.createElement('div');
    percentElement.classList.add('credit__list__item__percent');
    percentElement.innerHTML = data.percent;

    const paymentsElement = document.createElement('div');
    paymentsElement.classList.add('credit__list__item__payments');
    paymentsElement.innerHTML = calculatePayments(data.sum, data.time, data.percent);

    const buttonElement = document.createElement('button');
    buttonElement.classList.add('credit__list__item__button');
    buttonElement.innerHTML = 'Удалить';
    buttonElement.addEventListener('click', (event) => {
      event.preventDefault();
      callback(data.name);
    });

    element.append(nameElement,
      sumElement, timeElement, percentElement, paymentsElement, buttonElement);
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
