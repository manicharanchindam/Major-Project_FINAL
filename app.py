from flask import Flask, render_template, request, jsonify
import pandas as pd
import pickle

app = Flask(__name__)

# Load the pre-trained logistic regression model
with open('logistic_regression_model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    # Get the uploaded file
    file = request.files['dataset']

    # Read the CSV file
    df = pd.read_csv(file)

    # Perform predictions using the model
    predictions = model.predict(df[['HSGA', 'SAT', 'GAT']])

    # Add predictions to the DataFrame
    df['CGPA_Category_Predicted'] = predictions

    # Convert DataFrame to HTML table
    table_html = df.to_html(index=False)

    # Render a new template with the predictions
    return render_template('predictions.html', data=table_html)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    hsga = float(data['hsga'])
    sat = float(data['sat'])
    gat = float(data['gat'])

    # Perform prediction using the model
    prediction = model.predict([[hsga, sat, gat]])[0]

    # Return the predicted CGPA category as JSON
    return jsonify({'predicted_category': prediction})


if __name__ == '__main__':
    app.run(debug=True)

