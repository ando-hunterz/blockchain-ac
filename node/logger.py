import os
import requests
from dotenv import load_dotenv


load_dotenv()

LOG_ADDR = os.getenv('LOGGER_ADDR')

def read_qr_log():
    try:
        res = requests.post(LOG_ADDR+'/qr.node', json={"status": "begin read qr"})
    except Exception as e:
        print(e)


def finish_qr_log():
    try:
        res = requests.post(LOG_ADDR+'/qr.node', json={"status": "qr read finished"})
    except Exception as e:
        print(e)


def read_face_log():
    try:
        res = requests.post(LOG_ADDR+'/face.node', json={"status": "begin read face"})
    except Exception as e:
        print(e)


def finish_face_log():
    try:
        res = requests.post(LOG_ADDR+'/face.node', json={"status": "read face finish"})
    except Exception as e:
        print(e)


def send_log_log():
    try:
        res = requests.post(LOG_ADDR+'/log.node', json={"status": "begin sending log"})
    except Exception as e:
        print(e)


def finish_log_log():
    try:
        res = requests.post(LOG_ADDR+'/log.node', json={"status": "finish sending log"})
    except Exception as e:
        print(e)




