from flask import Flask, render_template
from Bankingapp import NewBankAppSpring2024
from storage import SecureStorage

app = Flask(__name__)

# Initialize instances of your classes
banking_app = NewBankAppSpring2024()
secure_storage = SecureStorage("storage/data.txt", "your_secret_key")

# Define routes
@app.route('/')
def main():
    # Your main logic here
    return render_template('title.html')

@app.route('/exit')
def exit_page():
    return render_template('exit_page.html')

if __name__ == '__main__':
    app.run(debug=True)
