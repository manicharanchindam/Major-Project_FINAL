document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    // Display the selected file name
    const fileNameDiv = document.getElementById('selected-file-name');
    fileNameDiv.textContent = file.name;

    const formData = new FormData();
    formData.append('dataset', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('Dataset uploaded successfully!');
        console.log(data);
        // Update the UI with the prediction results
        const resultsDiv = document.getElementById('prediction-results');
        resultsDiv.innerHTML = '';
        const table = document.createElement('table');
        table.setAttribute('border', '1');

        // Add table headers
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        Object.keys(data[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Add table body
        const tbody = document.createElement('tbody');
        data.forEach(rowData => {
            const row = document.createElement('tr');
            Object.values(rowData).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        resultsDiv.appendChild(table);
    })
    .catch(error => {
        alert('An error occurred while uploading the dataset.');
        console.error(error);
    });
    fileInput.value = ''; // Clear the file input after uploading
});

document.querySelector('#predict-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const hsga = parseFloat(document.querySelector('#hsga').value);
    const sat = parseFloat(document.querySelector('#sat').value);
    const gat = parseFloat(document.querySelector('#gat').value);

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hsga, sat, gat })
    })
    .then(response => response.json())
    .then(data => {
        const predictionDiv = document.getElementById('prediction-result');
        predictionDiv.textContent = `Predicted CGPA Category: ${data.predicted_category}`;
    })
    .catch(error => {
        alert('An error occurred while predicting the CGPA category.');
        console.error(error);
    });
    
});
