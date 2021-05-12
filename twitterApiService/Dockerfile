#FROM python
FROM python:3.8-slim-buster

# Make a directory for our application
WORKDIR /app

# Install Dependencies
COPY requirements.txt .

#RUN pip install -r requirements.txt
RUN pip3 install -r requirements.txt

# Copy our source code
COPY . .

# Expose the port 5000
EXPOSE 5000

# Run the application
#CMD ["python", "-u", "app.py"]
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
