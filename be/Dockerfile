# python image
FROM python:3.12

# set up working directory in the container
WORKDIR /app

# copy the source code to the container
COPY requirements.txt .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# copy the source code to the container
COPY . .

# run Flask app
CMD ["python", "-u", "src/run.py"]
