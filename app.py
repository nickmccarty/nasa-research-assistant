from flask import Flask, render_template, request, jsonify

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

# Define a route for the homepage
@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        user_query = request.form.get('query-text')
        print("User Query:", user_query)  # Check if user_query is received correctly

        # Implement your research logic here

        message = "ChatGPT output will go here: " + user_query
        print("Message:", message)  # Check if the message is generated correctly

        # Return a JSON response with the message
        return jsonify({'message': message})

if __name__ == '__main__':
    app.run(debug=True)
