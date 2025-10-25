let id = crypto.randomUUID();

export function createExpense(category, description, amount) {
  return {
    id: id,
    description: description,
    category: category,
    amount: amount,
  };
}

export function addExpense(category, description, amount, arr) {
  let newArr = arr.push({
    category: category,
    description: description,
    amount: amount,
  });
  return newArr;
}

export function getTotalByCategory(arr, category) {
  let filter = arr.filter((elem) => elem.category === category);
  let red = filter.reduce((total, curr) => total + curr.amount, 0);
  return red;
}

export function getOverallTotal(arr) {
  let reduce = arr.reduce((total, current) => total + current.amount, 0);
  return reduce;
}
export function filterByAmount(min, max, arr) {
  let filterAmount = arr.filter(
    (exp) => exp.amount >= min && exp.amount <= max
  );

  return filterAmount;
}

export function deleteExpense(id, arr) {
  let findElem = arr.find((elem) => elem.id === id);
  if (findElem) {
    let indexOfElem = arr.indexOf(findElem);
    arr.splice(indexOfElem, 1);
  } else {
    return;
  }
  return arr;
}
