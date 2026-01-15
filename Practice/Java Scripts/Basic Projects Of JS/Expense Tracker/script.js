// ================== SELECT ELEMENTS ==================
const balance = document.getElementById("balance");
const moneyPlus = document.querySelector(".incomeRemove .plus");
const moneyMinus = document.querySelector(".expRemove .plus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const expenseTab = document.querySelector(".expense");
const incomeTab = document.querySelector(".income");

// ================== STATE ==================
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let currentTab = "expense"; // default tab

// ================== ADD TRANSACTION ==================
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter name and amount");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    updateLocalStorage();
    init();

    text.value = "";
    amount.value = "";
}

// ================== ADD TO DOM ==================
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
        ${transaction.text}
        <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// ================== UPDATE TOTALS ==================
function updateValues() {
    const amounts = transactions.map(item => item.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const expense = (
        amounts.filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);

    balance.innerText = `₹ ${total}`;
    moneyPlus.innerText = `₹ +${income}`;
    moneyMinus.innerText = `₹ -${expense}`;
}

// ================== REMOVE ==================
function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    init();
}

// ================== LOCAL STORAGE ==================
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ================== TABS ==================
expenseTab.addEventListener("click", () => {
    currentTab = "expense";
    setActiveTab();
    init();
});

incomeTab.addEventListener("click", () => {
    currentTab = "income";
    setActiveTab();
    init();
});

function setActiveTab() {
    expenseTab.classList.remove("active");
    incomeTab.classList.remove("active");

    currentTab === "expense"
        ? expenseTab.classList.add("active")
        : incomeTab.classList.add("active");
}

// ================== INIT ==================
function init() {
    list.innerHTML = "";

    const filteredTransactions = transactions.filter(t => {
        return currentTab === "expense"
            ? t.amount < 0
            : t.amount > 0;
    });

    filteredTransactions.forEach(addTransactionDOM);
    updateValues();
}

// ================== START ==================
setActiveTab();
init();
form.addEventListener("submit", addTransaction);
