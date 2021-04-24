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

  createPayments(parent, array) {
    array.forEach((element) => {
      const div = document.createElement('div');
      div.classList.add('credit__payments__item');
      div.innerHTML = element;
      parent.append(div);
    });
  }
}

const createElements = new CreateElements();
export default createElements;
