from flask import Flask, jsonify, request
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///metrics.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# Metric model for the database
class Metric(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    metric_name = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


# Initialize the database
with app.app_context():
    db.create_all()


# Endpoint to capture operational challenges and metrics
@app.route('/api/metrics', methods=['POST'])
def add_metric():
    data = request.json
    metric_name = data.get('metric_name')
    value = data.get('value')

    if not metric_name or not isinstance(value, int):
        return jsonify({'error': 'Invalid data'}), 400

    new_metric = Metric(metric_name=metric_name, value=value)
    db.session.add(new_metric)
    db.session.commit()

    return jsonify({
        "metric_name": new_metric.metric_name,
        "value": new_metric.value,
        "timestamp": new_metric.timestamp.strftime('%Y-%m-%d %H:%M:%S')
    }), 201


# Endpoint to retrieve key performance metrics
@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    metrics = Metric.query.all()
    metrics_list = [{
        "metric_name": metric.metric_name,
        "value": metric.value,
        "timestamp": metric.timestamp.strftime('%Y-%m-%d %H:%M:%S')
    } for metric in metrics]

    return jsonify(metrics_list), 200


# Automation: Calculate performance insights
@app.route('/api/insights', methods=['GET'])
def get_insights():
    metrics = Metric.query.all()
    total_metrics = len(metrics)
    if total_metrics == 0:
        return jsonify({
            "total_metrics_collected": 0,
            "average_metric_value": 0,
            "suggested_action": "No metrics available."
        }), 200

    average_value = sum(metric.value for metric in metrics) / total_metrics

    if average_value < 50:
        suggested_action = "Increase resource allocation to reduce turnaround time"
    elif 50 <= average_value <= 75:
        suggested_action = "Maintain current process with periodic reviews"
    else:
        suggested_action = "Process is efficient. Focus on further optimizations."

    return jsonify({
        "total_metrics_collected": total_metrics,
        "average_metric_value": average_value,
        "suggested_action": suggested_action
    }), 200


if __name__ == '__main__':
    app.run(debug=True)
