import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pickle

# Assuming data.csv is your dataset file
df = pd.read_csv('student_dataset.csv')

# Fill missing values in numeric columns with the mean of each column
numeric_cols = df.select_dtypes(include=[np.number]).columns
df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())

# Drop rows with NaN values in the target variable
df = df.dropna(subset=['CGPA_Category'])

# Assuming CGPA_Category is your target variable
X = df[['HSGA', 'SAT', 'GAT']]
y = df['CGPA_Category']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Initialize the model
model = LogisticRegression(max_iter=1000, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Evaluate the model
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy}")

# Save the model to a file
with open('logistic_regression_model.pkl', 'wb') as file:
    pickle.dump(model, file)
