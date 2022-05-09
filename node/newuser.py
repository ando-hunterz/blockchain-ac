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

USER_CONTRACT_ADDR=os.getenv('USER_CONTRACT_ADDR')
PROVIDER_ADDR=os.getenv('PROVIDER_ADDR')
IPFS_ADDR=os.getenv('IPFS_ADDR')+'/ipfs/'

print(USER_CONTRACT_ADDR)
w3 = Web3(Web3.HTTPProvider(PROVIDER_ADDR))

contract_json = json.load(open('contracts/UserToken.sol/UserToken.json'))

contract = w3.eth.contract(address=USER_CONTRACT_ADDR, abi=contract_json['abi'])

def checkUsers():
    total_user = contract.functions.totalSupply().call()
    if len(next(os.walk('db'))[1]) < total_user:
        for i in range(0, total_user):
            user_address = contract.functions.ownerOf(i).call()
            user_path = os.getcwd()+'/db/'+user_address
            if os.path.exists(user_path) == False:
                os.makedirs(user_path)
                uri = contract.functions.tokenURI(i).call()
                getFile(uri, user_path)
        os.remove(os.getcwd()+'/db/representations_vgg_face.pkl')

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
    res = requests.get(IPFS_ADDR+path)
    res_content = res.content.decode()
    res_dict = json.loads(res_content)
    index = 1
    for hash in res_dict['photo']:
        print(hash)
        result = requests.get(IPFS_ADDR+hash)
        with open(image_path+'/'+str(index)+'.jpg', 'wb') as file:
            file.write(result.content)
        index = index + 1
    if os.path.exists(os.getcwd()+'/db/representations_vgg_face.pkl'):
        os.remove(os.getcwd()+'/db/representations_vgg_face.pkl') 

def handle_event(event):
    img_path = os.getcwd()+'/db/'+event.args.to   
    if os.path.exists(img_path) == False:
        os.mkdir(img_path)
        path = contract.functions.tokenURI(event.args.tokenId).call()
        getFile(path, img_path)

def log_loop():
    while True:
        for event in contract.events.userMint.getLogs(fromBlock='latest'):
            print('new user found')
            handle_event(event)
        time.sleep(2)

def listenNewUser():
    worker = Thread(target=log_loop, daemon=True)
    worker.start()
