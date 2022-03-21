FROM python:3.8.10-slim-buster
workdir /app
RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY ./facerecog.py ./facerecog.py
COPY ./db ./db
CMD ["python3","facerecog.py"]


