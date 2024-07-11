document.addEventListener('DOMContentLoaded', () => {
    const categoryInput = document.getElementById('category');
    const amountInput = document.getElementById('amount');
    const dateInput = document.getElementById('date');
    const addButton = document.getElementById('add-button');
    const entriesTableBody = document.querySelector('#entries-table tbody');
    const totalAmountSpan = document.getElementById('total-amount');

    const updateTable = (entries) => {
        entriesTableBody.innerHTML = '';
        let total = 0;

        entries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.category}</td>
                <td>${entry.amount}</td>
                <td>${entry.date}</td>
            `;
            entriesTableBody.appendChild(row);
            total += parseFloat(entry.amount);
        });

        totalAmountSpan.textContent = total;
    };

    addButton.addEventListener('click', async () => {
        const category = categoryInput.value;
        const amount = amountInput.value;
        const date = dateInput.value;

        const response = await fetch('/add-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category, amount, date }),
        });

        const result = await response.json();
        if (result.status === 'success') {
            updateTable(result.entries);
        }

        categoryInput.value = '';
        amountInput.value = '';
        dateInput.value = '';
    });

    // Fetch initial entries
    fetch('/entries')
        .then(response => response.json())
        .then(entries => {
            updateTable(entries);
        });
});
