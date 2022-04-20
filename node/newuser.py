from deepface import DeepFace
from threading import Thread
from web3 import Web3
from dotenv import load_dotenv
from pathlib import Path
import json
import os
import time
import requests
import shutil

load_dotenv()
print(os.getcwd())

USER_CONTRACT_ADDR=os.getenv('VITE_USER_CONTRACT_ADDR')
print(USER_CONTRACT_ADDR)
w3 = Web3(Web3.HTTPProvider('http://192.168.0.19:7545'))

contract_json = json.load(open('contracts/UserToken.sol/UserToken.json'))

contract = w3.eth.contract(address=USER_CONTRACT_ADDR, abi=contract_json['abi'])



def getUsers():
    os.makedirs(os.getcwd()+'/db') 
    source = os.getcwd()+'/pi-configuration/vgg_face_weights.h5'
    destination = str(Path.home())+'/.deepface/weights/vgg_face_weights.h5'
    shutil.copyfile(source, destination)
    total_user = contract.functions.totalSupply().call()
    for i in range(0, total_user):
        user_address = contract.functions.ownerOf(i).call()
        user_path = os.getcwd()+'/db/'+user_address
        os.makedirs(user_path)
        uri = contract.functions.tokenURI(i).call()
        getFile(uri, user_path)

def getFile(path, image_path):
    res = requests.get('http://192.168.0.19:8080/ipfs/'+path)
    res_content = res.content.decode()
    res_dict = json.loads(res_content)
    index = 1
    for hash in res_dict['photo']:
        print(hash)
        result = requests.get('http://192.168.0.19:8080/ipfs/'+hash)
        with open(image_path+'/'+str(index)+'.jpg', 'wb') as file:
            file.write(result.content)
        index = index + 1
    if os.path.exists('db/representations_vgg_face.pkl'):
        os.remove('db/representations_vgg_face.pkl') 

def handle_event(event):
    img_path = os.getcwd()+'/db/'+event.args.to   
    os.mkdir(img_path)
    path = contract.functions.tokenURI(event.args.tokenId).call()
    getFile(path, img_path)

def log_loop(event_filter, pool_interval):
    while True:
        for event in event_filter.get_new_entries():
            handle_event(event)
        time.sleep(pool_interval)

def listenNewUser():
    block_filter = contract.events.userMint.createFilter(fromBlock='latest')
    worker = Thread(target=log_loop, args=(block_filter, 2), daemon=True)
    worker.start()
