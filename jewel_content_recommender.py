#!/usr/bin/env python
# coding: utf-8

import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

# List of required packages
required_packages = [
    "supabase", "pandas", "numpy", "scikit-learn", "flask", "waitress", 'flask-cors'
]

# Install missing packages
for package in required_packages:
    try:
        __import__(package)
    except ImportError:
        install(package)

import pandas as pd
import numpy as np
from flask_cors import CORS
from supabase import create_client, Client
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import logging
from flask import Flask, jsonify
from waitress import serve
import json

# Your Supabase project details
URL = "https://czturgxbwepdvhiybhjn.supabase.co"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6dHVyZ3hid2VwZHZoaXliaGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0MTk2NTEsImV4cCI6MjAyNjk5NTY1MX0.tMpOuyHQ4824mE_IjjxwpvHvDsBUpJSJPrQEZNaByq4"
supabase: Client = create_client(URL, KEY)

def convert_table_to_pandas_dataframe(supabase, table_name):
    # Retrieve data from Supabase
    data = supabase.table(table_name).select("*").execute()
    # Convert to DataFrame
    df = pd.DataFrame(data.data)
    return df

products_df = convert_table_to_pandas_dataframe(supabase, "Products")
catalogs_df = convert_table_to_pandas_dataframe(supabase, "Catalogs")

products_df = products_df.merge(catalogs_df[['Id','Name']], left_on='CatalogId', right_on='Id')
products_df.drop(columns=['Id_y'], inplace=True)
products_df = products_df.rename(columns={'Id_x': 'Id', 'Name_x': 'Name', 'Name_y': 'CatalogName'})
products_df['information_aggregate'] = products_df['Name'] + ' ' + products_df['CatalogName']
products_df['information_aggregate'] = products_df['information_aggregate'].fillna('')

# Define a TF-IDF Vectorizer Object
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(products_df['information_aggregate'])

# Compute the cosine similarity matrix
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
indices = pd.Series(products_df.index, index=products_df['Id']).drop_duplicates()

def get_original_product_id(id):
    return products_df.loc[products_df['Id'] == id, 'Id'].values[0]

def get_top_five_recommendations(product_id, cosine_sim=cosine_sim):
    idx = indices[product_id]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[:10]
    product_indices = [i[0] for i in sim_scores]
    ids = [get_original_product_id(products_df['Id'].iloc[i]) for i in product_indices]
    return ids

app = Flask(__name__)
CORS(app)  # Enable CORS

def get_title(id):
    return products_df[products_df['Id'] == id]['Name'].values[0]

@app.route('/predict/<string:id>', methods=['GET'])
def predict(id):
    logging.info(f"Predict request received for product ID: {id}")
    try:
        title = get_title(id)
        logging.info(f"Product name for ID {id}: {title}")
        prediction_result = [x for x in get_top_five_recommendations(id)]
        logging.info(f"Prediction result for product ID {id}: {prediction_result}")
        return json.dumps(prediction_result)
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/predict_with_title/<string:id>', methods=['GET'])
def predict_with_title(id):
    logging.info(f"Predict with name request received for product ID: {id}")
    try:
        title = get_title(id)
        logging.info(f"Book title for ID {id}: {title}")
        prediction_result = [get_title(x) for x in get_top_five_recommendations(id)]
        response = {
            'name': title,
            'recommendations': prediction_result
        }
        logging.info(f"Prediction result with names for product ID {id}: {response}")
        return jsonify(response)
    except Exception as e:
        logging.error(f"Error during prediction with name: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print('Starting Flask application, host on localhost:6001 with two apis: ')
    print('/predict/{product_id}')
    print('/predict_with_title/{product_id}')
    serve(app, host="0.0.0.0", port=6001)

