const calculatePayments = (sum, time, percent) => {
  const p = percent / 100 / 12;
  const result = sum * (p + p / ((1 + p) ** time - 1));
  return result.toFixed(2);
};

export default calculatePayments;
