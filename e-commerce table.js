async function addItemToDatabaseAndTable(item) {
    try {
        const response = await fetch('/api/add-item', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        if (!response.ok) throw new Error('Failed to add item to database');

        addItemToTable(item);
        showMessage('Item added successfully!', 'green');
    } catch (error) {
        showMessage('Error: ' + error.message, 'red');
    }
}

function addItemToTable(item) {
    const tableBody = document.querySelector('.table-container table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.price}</td>
        <td>${item.stock}</td>
    `;
    tableBody.appendChild(row);
}

function showMessage(msg, color) {
    const message = document.getElementById('message');
    message.textContent = msg;
    message.style.color = color;
}

document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const item = {
        id: document.getElementById('productId').value.trim(),
        name: document.getElementById('productName').value.trim(),
        category: document.getElementById('category').value.trim(),
        price: document.getElementById('price').value.trim(),
        stock: document.getElementById('stock').value.trim()
    };
    addItemToDatabaseAndTable(item);
    this.reset();
});