FROM python

# Make a directory for our application
WORKDIR /app

# Install Dependencies
COPY requirements.txt .

RUN pip install -r requirements.txt

# Copy our source code
COPY . .

# Expose the port 5000
EXPOSE 5000

# Run the application
CMD ["python", "-u", "app.py"]
