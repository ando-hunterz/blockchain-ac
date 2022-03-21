from deepface import DeepFace
import pandas as pd
import cv2
import socket
from PIL import Image
import io
import numpy as np
from pathlib import Path
from threading import Thread

port = 8480
host = ''
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.bind((host, port))
s.listen(5)

BUFFER_SIZE=4096

def findFace(file):
        
    df = DeepFace.find(img_path=np.array(file), db_path="./db")

    path = Path(df.iloc[0].identity)

    return path.parts[1]


def handleClient(connection, address):
    print('address {}'.format(addr))
    file_steam = io.BytesIO()
    recv_data = conn.recv(BUFFER_SIZE)

    while recv_data:
        file_steam.write(recv_data)
        recv_data = conn.recv(BUFFER_SIZE)
        print(recv_data)
        if recv_data == b'%COMPLETE_SEND%':
            print('data complete')
            break
    
    image = Image.open(file_steam)
    result = findFace(image)
    print(result)
    conn.send(result.encode())
    conn.close()



while True:
    threads = []
    print('ready to launch!')
    conn, addr = s.accept()
    t = Thread(target=handleClient, args=(conn, addr))
    t.start()
    threads.append(t)
