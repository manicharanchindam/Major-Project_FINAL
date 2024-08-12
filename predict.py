from flask import Flask, request, render_template
import pickle

app = Flask(__name__)

# Load the trained model
with open('models/logistic_regression_model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get input data from the form
    hsga = float(request.form['hsga'])
    sat = float(request.form['sat'])
    gat = float(request.form['gat'])

    # Make a prediction
    prediction = model.predict([[hsga, sat, gat]])

    # Display the prediction on the result page
    return render_template('result.html', prediction=prediction)

if __name__ == '__main__':
    app.run(debug=True)
