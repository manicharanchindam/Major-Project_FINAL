// Handle file name update when uploading dataset
function updateFileName() {
    const fileInput = document.getElementById('dataset');
    const fileNameDisplay = document.getElementById('file-name');
    fileNameDisplay.textContent = `Selected file: ${fileInput.files[0].name}`;
}

// Handle prediction form submission
function submitPredictionForm(event) {
    event.preventDefault();

    const hsga = document.getElementById('hsga').value;
    const sat = document.getElementById('sat').value;
    const gat = document.getElementById('gat').value;

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hsga, sat, gat })
    })
    .then(response => response.json())
    .then(data => {
        const predictionResultTextbox = document.getElementById('prediction-result-textbox');
        predictionResultTextbox.value = `The predicted CGPA category is: ${data.predicted_category}`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while predicting the CGPA category.');
    });
}
