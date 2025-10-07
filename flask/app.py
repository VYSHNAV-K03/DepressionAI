import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import shap

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load model and preprocessing objects
model = pickle.load(open("mental_health_model.pkl", "rb"))
scaler = pickle.load(open("mental_health_scaler.pkl", "rb"))
encoders = pickle.load(open("mental_health_encoders.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    print(data)
    
    # Create input in same order as training
    columns = ['Age','Choose_your_gender','What_is_your_course',
               'Your_current_year_of_Study','What_is_your_CGPA',
               'Marital_status','Do_you_have_Anxiety',
               'Do_you_have_Panic_attack','Did_you_seek_any_specialist_for_a_treatment']
    
    input_data = []
    for col in columns:
        value = data[col]
        print(value)
        if col in encoders:
            value = encoders[col].transform([value])[0]
            print(value)
        input_data.append(value)
    print(input_data)
    input_scaled = scaler.transform([input_data])
    prediction = model.predict(input_scaled)[0]
    
    result = "Depressed" if prediction == 1 else "Not Depressed"

     # === SHAP Explainability ===
    explainer = shap.Explainer(model)
    shap_values = explainer(input_scaled)
    shap_contributions = shap_values.values[0]

    feature_impact = {
        columns[i]: float(np.sum(shap_contributions[i])) for i in range(len(columns))
    }

    # Sort by absolute importance (optional)
    feature_impact_sorted = dict(
        sorted(feature_impact.items(), key=lambda x: abs(x[1]), reverse=True)
    )

    return jsonify({
        "prediction": result,
        "feature_importance": feature_impact_sorted
    })


if __name__ == "__main__":
    app.run(debug=True)
