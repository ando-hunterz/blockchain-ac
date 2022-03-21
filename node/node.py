from web3 import Web3
import cv2
import os
from dotenv import load_dotenv
import json
import time
import pyzbar.pyzbar as pyzbar
from datetime import datetime, timezone
import requests

load_dotenv()

w3 = Web3(Web3.HTTPProvider('http://192.168.0.20:7545'))

LOG_CONTRACT_ADDR=os.getenv('VITE_LOG_CONTRACT_ADDR')
USER_CONTRACT_ADDR=os.getenv('VITE_USER_CONTRACT_ADDR')
DISABLED_ROLE=os.getenv('VITE_DISABLED_ROLE')

log_json = open('/home/pi/blockchain-ac/node/contracts/LogToken.sol/LogToken.json')
user_json = open('/home/pi/blockchain-ac/node/contracts/UserToken.sol/UserToken.json')

log_abi = json.load(log_json)
user_abi = json.load(user_json)

log_contract = w3.eth.contract(address=LOG_CONTRACT_ADDR,abi=log_abi['abi'])
user_contract = w3.eth.contract(address=USER_CONTRACT_ADDR,abi=user_abi['abi'])

def getAccount():
    global address
    global privateKey

    cap = cv2.VideoCapture(0)

    cap.set(3,640)
    cap.set(4,480)
    time.sleep(2)

    def decode(im) :
        decodedObjects = pyzbar.decode(im)
        return decodedObjects


    font = cv2.FONT_HERSHEY_SIMPLEX

    while(cap.isOpened()):
        # Capture frame-by-frame
        ret, frame = cap.read()
        # Our operations on the frame come here
        im = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        decodedObjects = decode(im)

        if len(decodedObjects) == 1:
            break

        cv2.imshow('frame',frame)
        key = cv2.waitKey(1)

    cap.release()
    cv2.destroyAllWindows()

    print(decodedObjects[0].data)

    # When everything done, release the capture
    (address, privateKey) = Web3.toText(decodedObjects[0].data).split('-')

    if user_contract.functions.hasRole(DISABLED_ROLE, address).call() == True:
        exit()



def getPicture():
    global response

    cam = cv2.VideoCapture(0)

    cam.set(3,640)
    cam.set(4,480)
    time.sleep(4)

    ret, capture = cam.read()
    timestamp = datetime.now().isoformat()
    img_name = 'img/{}.jpg'.format(timestamp)
    res = cv2.imwrite(img_name, capture)

    cam.release()

    url = 'http://192.168.0.20:5001/api/v0/add'
    files = {'file': open(img_name, 'rb')}
    r = requests.post(url, files=files)
    response = json.loads(r.text)
    os.remove(img_name)

    metadata = {
        'time': timestamp,
        'photo': response['Hash']
    }

    jsonMeta = json.dumps(metadata, indent = 3)
    files = {'file': jsonMeta}
    res = requests.post(url, files=files)
    response = json.loads(res.text)



def createLog():
    global address
    global privateKey

    tx = log_contract.functions.safeMint(address, response['Hash']).buildTransaction({'nonce': w3.eth.getTransactionCount(address), 'gasPrice': w3.eth.gas_price});

    signed_tx = w3.eth.account.sign_transaction(tx, private_key=privateKey)

    w3.eth.send_raw_transaction(signed_tx.rawTransaction)

    address, privateKey = None, None

def main():
    getAccount()
    getPicture()
    createLog()

if __name__ == '__main__':
    main()