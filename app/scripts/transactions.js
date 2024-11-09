const typeSelect = document.getElementById("type-select");
const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const notesInput = document.getElementById("notes-input");
const addTransactionsBtn = document.getElementById("add-transactions-btn");
const tableContent = document.getElementById("table-container");

const typeFilter = document.getElementById("type-filter");
const minPrice = document.getElementById("min-price");
const maxPrice = document.getElementById("max-price");
const incomeType = document.getElementById("type-income");
const expenseType = document.getElementById("type-expense");
const dateFilter = document.getElementById("date-filter");
const notesFilter = document.getElementById("notes-filter");
const applyFilterBtn = document.getElementById("add-filter-btn");

const expensesTable = document.getElementById("expense-table-body");
const totalAmount = document.getElementById("total-amount");

let total_sum = 0;
let TransactionList = [];
const userId = localStorage.userId;

fetchTransactions();
updateTable();

addTransactionsBtn.addEventListener("click", function () {
    if (typeSelect.value == "" || categorySelect.value == "" || Number(amountInput.value) == "" || dateInput.value == "" || notesInput.value == "") {
        alert("Make sure to fill all the values");
    } else if (amountInput.value < 0) {
        alert("Amount cannot be negative");
    } else {
        addTransaction(typeSelect.value, categorySelect.value, Number(amountInput.value), dateInput.value, notesInput.value);
    }
});

tableContent.addEventListener('click', function(event) {
    const target = event.target;
    if (target.id.startsWith('delete_')) {
        const index = parseInt(target.id.replace('delete_', ''));
        deleteTransaction(index);
    } else if (target.id.startsWith('edit_')) {
        const index = parseInt(target.id.replace('edit_', ''));
        editTransaction(index);
    }
});

applyFilterBtn.addEventListener("click", function () {
    filter();
    updateTable();
});

function fetchTransactions() {
    axios(`http://localhost/expense_tracker/server/getTransactions.php?id=${userId}`)
        .then((response) => {
            TransactionList = response.data.transactions || []; //to have a valid array incase empty
            total_sum = response.data.total_sum || 0;
            updateTable();
        })
        .catch(() => console.error("Error fetching transactions:"));
}


function addTransaction(type, category, amount, date, notes) {

    const data = new FormData()
    data.append("type", type)
    data.append("category", category)
    data.append("amount", amount)
    data.append("date", date)
    data.append("notes", notes)
    data.append("userId", userId)

    axios("http://localhost/expense_tracker/server/addTransaction.php",{
        method:"POST",
        data:data,
        })
        .then((response) => {
            console.log("Transaction added:", response.data);
            fetchTransactions();
        })
        .catch (()=>console.log("Error Adding"));
}


function deleteTransaction(index){
    const transactionId = TransactionList[index].transaction_id;
    axios(`http://localhost/expense_tracker/server/deleteTransaction.php?del_id=${transactionId}`).then(
        (response) => {
            console.log("Transaction delete:", response.data);
            fetchTransactions();
        }).catch (console.log("Error deleting"))
}


function editTransaction(index){
    const transactionId = TransactionList[index].transactionId;
    const data = new FormData();
    data.append("transaction_id", transactionId )
    data.append("type", type);
    data.append("category", category)
    data.append("amount", amount)
    data.append("date", date)
    data.append("notes", notes)


    axios(`http://localhost/expense_tracker/server/editTransaction.php`,{
        method:"POST",
        data:data,
    }).then(()=>{
        console.log("Edited transaction")
        fetchTransactions();
    }).catch(()=>console.log("Failed to edit"))
}

function updateTable(list = TransactionList){
    tableContent.innerHTML = 
                    "<tr><th>Type</th><th>Category</th><th>Amount</th><th>Date</th><th>Notes</th><th>Modify</th></tr>"
    totalAmount.innerHTML = total_sum
    for(let i=0; i<list.length;i++){
        let tableRow = document.createElement("tr")

        let typeType = document.createElement("td")
        let typeCategory = document.createElement("td")
        let typeAmount = document.createElement("td")
        let typeDate = document.createElement("td")
        let typeNotes = document.createElement("td")
        let typeModify = document.createElement("td")


        typeType.innerHTML= list[i].type
        tableRow.appendChild(typeType)
        tableContent.appendChild(tableRow)

        typeCategory.innerHTML= list[i].category
        tableRow.appendChild(typeCategory)
        tableContent.appendChild(tableRow) 

        typeAmount.innerHTML= list[i].amount
        tableRow.appendChild(typeAmount)
        tableContent.appendChild(tableRow)

        typeDate.innerHTML= list[i].date
        tableRow.appendChild(typeDate)
        tableContent.appendChild(tableRow)

        typeNotes.innerHTML= list[i].notes
        tableRow.appendChild(typeNotes)
        tableContent.appendChild(tableRow)

        typeModify.innerHTML= "<button id='edit_"+i+"' class='edit-button'>Edit</button><button id='delete_"+i+"' class='delete-button'>Delete</button>"
        tableRow.appendChild(typeModify)
        tableContent.appendChild(tableRow)
        
}
}


function filter() {
    let filteredTransactions = TransactionList;

    if (minPrice && minPrice.value) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.amount >= Number(minPrice.value));
    }

    if (maxPrice && maxPrice.value) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.amount <= Number(maxPrice.value));
    }

    if (incomeType && incomeType.checked) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.type === "income");
    }

    if (expenseType && expenseType.checked) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.type === "expense");
    }

    if (notesFilter && notesFilter.value) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.notes.includes(notesFilter.value));
    }

    if (dateFilter && dateFilter.value) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.date === dateFilter.value);
    }
    updateTable(filteredTransactions);
}

