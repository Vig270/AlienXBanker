document.addEventListener("DOMContentLoaded", function() {
    const userInfoForm = document.getElementById("userInfoForm");
    const menuOptions = document.getElementById("menuOptions");
    const userName = document.getElementById("userName");
    const userID = document.getElementById("userID");
    let balance = 0;
    let previousTransaction = 0;

    userInfoForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(userInfoForm);
        userName.textContent = formData.get("name");
        userID.textContent = formData.get("id");

        menuOptions.style.display = "block"; // Show menu options
    });

    // Check Balance
    document.getElementById("checkBalanceBtn").addEventListener("click", function() {
        alert("Your balance is: $" + balance);
    });

    // Deposit
    document.getElementById("depositBtn").addEventListener("click", function() {
        const amount = prompt("Enter the amount to deposit (maximum $500):");
        if (amount !== null) {
            const depositAmount = parseInt(amount);
            if (!isNaN(depositAmount) && depositAmount > 0 && depositAmount <= 500) {
                balance += depositAmount;
                alert(`You have deposited: $${depositAmount}\nYour balance is now: $${balance}`);
                saveTransactionToLocalStorage("Deposit", depositAmount);
            } else {
                alert("Invalid amount. Please enter a valid amount (maximum $500).");
            }
        }
    });

    // Withdraw
    document.getElementById("withdrawBtn").addEventListener("click", function() {
        const amount = prompt("Enter the amount to withdraw (maximum $500):");
        if (amount !== null) {
            const withdrawAmount = parseInt(amount);
            if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= balance) {
                balance -= withdrawAmount;
                previousTransaction = -withdrawAmount;
                balance -= 1; // Charge a small fee
                alert(`You have withdrawn: $${withdrawAmount}\nYour balance is now: $${balance}`);
                saveTransactionToLocalStorage("Withdrawal", withdrawAmount);
            } else {
                alert("Invalid amount or insufficient balance.");
            }
        }
    });

    // Transaction History
    document.getElementById("transactionHistoryBtn").addEventListener("click", function() {
        const transactionHistory = getTransactionHistoryFromLocalStorage();
        alert("Transaction history:\n" + transactionHistory.join("\n"));
    });

    // Exit
    document.getElementById("exitBtn").addEventListener("click", function() {
        window.location.href = "/exit_page.html"; // Redirect to the exit page
    });

    function saveTransactionToLocalStorage(transactionType, amount) {
        const transaction = `${new Date().toLocaleString()}: ${transactionType} $${amount}`;
        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function getTransactionHistoryFromLocalStorage() {
        return JSON.parse(localStorage.getItem("transactions")) || [];
    }
});
