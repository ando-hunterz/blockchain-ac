from deepface import DeepFace
import pandas as pd
import cv2
import socket
from PIL import Image
import io
import numpy as np
from pathlib import Path
from threading import Thread
from web3 import Web3
from dotenv import load_dotenv
import json
import os
import time
import requests

load_dotenv()
port = 8480
host = ''
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

s.bind((host, port))
s.listen(5)

BUFFER_SIZE=4096
USER_CONTRACT_ADDR=os.getenv('VITE_USER_CONTRACT_ADDR')
print(USER_CONTRACT_ADDR)
w3 = Web3(Web3.HTTPProvider('http://192.168.0.20:7545'))

contract_json = json.load(open('contracts/UserToken.sol/UserToken.json'))

contract = w3.eth.contract(address=USER_CONTRACT_ADDR, abi=contract_json['abi'])

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

def getFile(path, image_path):
    res = requests.get('http://192.168.0.20:8080/ipfs/'+path)
    res_content = res.content.decode()
    print(res_content)
    print(type(res_content))
    res_dict = json.loads(res_content)
    print(res_dict['photo'])
    index = 1
    for hash in res_dict['photo']:
        print(hash)
        result = requests.get('http://192.168.0.20:8080/ipfs/'+hash)
        with open(image_path+'/'+str(index)+'.jpg', 'wb') as file:
            file.write(result.content)
        index = index + 1
        

def handle_event(event):
    os.mkdir('db/'+event.args.to)
    path = contract.functions.tokenURI(event.args.tokenId).call()
    getFile(path, 'db/'+event.args.to)

def log_loop(event_filter, pool_interval):
    while True:
        for event in event_filter.get_new_entries():
            handle_event(event)
        time.sleep(pool_interval)

def listenNewUser():
    block_filter = contract.events.userMint.createFilter(fromBlock='latest')
    worker = Thread(target=log_loop, args=(block_filter, 2), daemon=True)
    worker.start()

def main():
    listenNewUser()
    while True:
        threads = []
        print('ready to launch!')
        conn, addr = s.accept()
        t = Thread(target=handleClient, args=(conn, addr))
        t.start()
        threads.append(t)

if __name__ == '__main__':
    main()
