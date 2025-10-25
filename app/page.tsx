"use client";

import { useState } from "react";
import {
  createExpense,
  filterByAmount,
  getOverallTotal,
  getTotalByCategory,
  deleteExpense,
} from "./func/utils.js";

export default function Home() {
  const [visibleState, setVisibleState] = useState(false);
  const [globalExpensesCategory, setGlobalExpensesCategory] = useState("");
  const [globalExpensesAmount, setGlobalExpensesAmount] = useState("");
  const [globalExpensesDescription, setGlobalExpensesDescription] =
    useState("");
  const [totalCategory, setTotalCategory] = useState("");
  const [filterCategoryInputValue, setFilterCategoryInputValue] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minMaxFilterValue, setMinMaxFilterValue] = useState([]);
  const [expenseArr, setExpenseArr] = useState([]);

  function resyncUI() {
    setGlobalExpensesCategory("");
    setGlobalExpensesAmount("");
    setGlobalExpensesDescription("");
  }

  function handleCreateExpense() {
    setExpenseArr((prev) => [
      ...prev,
      createExpense(
        globalExpensesCategory,
        globalExpensesDescription,
        globalExpensesAmount
      ),
    ]);
    resyncUI();
  }

  function handleFilterVisibility() {
    return setVisibleState((prev) => (prev === true ? false : true));
  }
  function handleAdvancedFilter() {
    setTotalCategory(getTotalByCategory(expenseArr, filterCategoryInputValue));
    setTotalExpenses(getOverallTotal(expenseArr));
    setMinMaxFilterValue((prev) => [
      ...prev,
      ...filterByAmount(minValue, maxValue, expenseArr),
    ]);
  }

  function handleDeleteExpense(id) {
    setExpenseArr((prev) => {
      const updatedArr = deleteExpense(id, [...prev]);
      return [...updatedArr];
    });
  }
  return (
    <div className="big_wrapper">
      <div
        className="advanced_filtering_container"
        style={{ display: visibleState ? "block" : "none" }}
      >
        <input
          value={filterCategoryInputValue}
          name="filter-category"
          placeholder="filter category"
          type="text"
          onChange={(e) => setFilterCategoryInputValue(e.target.value)}
        />
        <input
          type="text"
          name="filter-min-value"
          placeholder="filter min value"
          onChange={(e) => setMinValue(+e.target.value)}
        />
        <input
          type="text"
          name="filter-max-value"
          placeholder="filter max value"
          onChange={(e) => setMaxValue(+e.target.value)}
        />
        <button onClick={handleAdvancedFilter}>advanced informations</button>
        <div className="advanced_info_container">
          total amount category: {totalCategory}
          total amount expenses : {totalExpenses}
          <ul>
            filter by amount :{" "}
            {minMaxFilterValue.map((elem, id) => (
              <li key={id}>
                <button onClick={() => handleDeleteExpense(id)}>delete</button>{" "}
                {elem.category}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="expense_input_container">
        <input
          type="text"
          name="category"
          value={globalExpensesCategory}
          placeholder="category"
          onChange={(e) => setGlobalExpensesCategory(e.target.value)}
        />
        <input
          type="text"
          name="description"
          value={globalExpensesDescription}
          placeholder="description"
          onChange={(e) => setGlobalExpensesDescription(e.target.value)}
        />

        <input
          type="number"
          name="amount"
          value={globalExpensesAmount}
          placeholder="amount"
          onChange={(e) => setGlobalExpensesAmount(+e.target.value)}
        />

        <button onClick={handleCreateExpense}>add expense</button>

        <span onClick={handleFilterVisibility} className="advanced_filter_btn">
          {visibleState ? "advanced filter hide" : "advanced filter show"}
        </span>
      </div>
      <div>
        {expenseArr.map((exp) => (
          <li key={exp.id}>
            <button onClick={() => handleDeleteExpense(exp.id)}>delete</button>
            {exp.category} - {exp.description} - {exp.amount}
          </li>
        ))}
      </div>
    </div>
  );
}
