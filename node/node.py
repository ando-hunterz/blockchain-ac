from web3 import Web3
import cv2
import os
from dotenv import load_dotenv
import json
import time
import pyzbar.pyzbar as pyzbar
from datetime import datetime, timezone
import requests
import socket
import tkinter as tk
from PIL import Image, ImageTk
import facerecog
import newuser
from wrapt_timeout_decorator import *
from custom_exception import DisabledException, WrongFaceException, FaceTimeout, UnregisteredQRError
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from base64 import b64decode

load_dotenv()

LOG_CONTRACT_ADDR=os.getenv('LOG_CONTRACT_ADDR')
USER_CONTRACT_ADDR=os.getenv('USER_CONTRACT_ADDR')
DISABLED_ROLE=os.getenv('DISABLED_ROLE')
PROVIDER_ADDR=os.getenv('PROVIDER_ADDR')
IPFS_ADDR=os.getenv('IPFS_ADDR')+'/ipfs/'

w3 = Web3(Web3.HTTPProvider(PROVIDER_ADDR))

log_json = open('/home/pi/blockchain-ac/node/contracts/LogToken.sol/LogToken.json')
user_json = open('/home/pi/blockchain-ac/node/contracts/UserToken.sol/UserToken.json')

log_abi = json.load(log_json)
user_abi = json.load(user_json)

log_contract = w3.eth.contract(address=LOG_CONTRACT_ADDR,abi=log_abi['abi'])
user_contract = w3.eth.contract(address=USER_CONTRACT_ADDR,abi=user_abi['abi'])

detector = cv2.wechat_qrcode_WeChatQRCode(os.getcwd()+'/pi-configuration/detect.prototxt',os.getcwd()+'/pi-configuration/detect.caffemodel',os.getcwd()+'/pi-configuration/sr.prototxt',os.getcwd()+'/pi-configuration/sr.caffemodel')

root = tk.Tk()
root.attributes('-fullscreen',True)
root.columnconfigure(0,weight=1)
root.rowconfigure(0,weight=1)

unregister_tries = 0
registered_tries = 0

def mainPage():
    main_page = tk.Frame(root)
    main_page.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    enter_button = tk.Button(main_page, text="Enter", command= lambda: qrPage(main_page))
    enter_button.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    enter_button.pack()
    main_page.tkraise()

def qrPage(main_page):
    main_page.destroy()
    loading = loadingPage()
    qr_page = tk.Frame(root)
    qr_page.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    qr_canvas = tk.Label(qr_page, width=300, height=300)
    qr_canvas.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    qr_label = tk.Label(qr_page, text="Scan QR")
    qr_label.place(relx=0.5, rely=0, anchor=tk.N)
    qr_label.pack()
    qr_canvas.pack()
    qr_page.tkraise()
    loading.destroy()
    getAccount(qr_canvas, qr_page)

def loadingPage():
    loading_page = tk.Frame(root)
    loading_page.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    loading_label = tk.Label(loading_page, text="Loading")
    loading_label.pack()
    loading_page.tkraise()
    root.update()
    return loading_page

def picturePage():
    loading = loadingPage()
    picture_page = tk.Frame(root)
    picture_page.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    picture_label = tk.Label(picture_page, text="Show your face in the camera")
    picture_label.pack()
    face_image = tk.Label(picture_page, width=300, height=300)
    face_image.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    face_image.pack()
    picture_page.tkraise()
    loading.destroy()
    getPicture(face_image, picture_page)


def update_image(p_frame, canvas):
    canvas_im = cv2.cvtColor(p_frame, cv2.COLOR_BGR2RGB)
    canvas_im = Image.fromarray(canvas_im)
    canvas_im = canvas_im.resize((300,300), Image.ANTIALIAS)
    canvas_im = ImageTk.PhotoImage(canvas_im)

    canvas.imgtk = canvas_im
    canvas.configure(image=canvas_im)
    root.update()

def createLog(metadata, page):  
    def sendLog(loading, response):
        global address
        global privateKey

        tx = log_contract.functions.safeMint(address, response).buildTransaction({'nonce': w3.eth.getTransactionCount(address), 'gasPrice': w3.eth.gas_price, 'chainId': 51, 'from': address, "gas": 0});

        gas = w3.eth.estimate_gas(tx)
        print(gas)
        tx.update({'gas': gas})

        signed_tx = w3.eth.account.sign_transaction(tx, private_key=privateKey)
 
        sent_tx = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        w3.eth.wait_for_transaction_receipt(sent_tx)

        address, privateKey = None, None

        loading.destroy()
        mainPage()

    url = IPFS_ADDR
    print(metadata)
    jsonMeta = json.dumps(metadata, indent = 3)
    print(jsonMeta)
    res = requests.post(url, json=jsonMeta)
    response = res.headers['Ipfs-Hash']
    print(response)
    page.destroy()
    loading = loadingPage()
    sendLog(loading, response)

def getPhoto():

    cam = cv2.VideoCapture(0)

    cam.set(3,640)
    cam.set(4,480)
    time.sleep(2)

    # Capture frame-by-frame
    ret, capture = cam.read()
    # Our operations on the frame come here

    cam.release()
    cv2.destroyAllWindows()
    
    os.makedirs(os.getcwd()+'/img')
    timestamp = datetime.now().isoformat()
    img_name = 'img/{}.jpg'.format(timestamp)
    res = cv2.imwrite(img_name, capture)

    cam.release()


    url = IPFS_ADDR
    files = open(img_name, 'rb')
    r = requests.post(url, data=files)
    response = r.headers['Ipfs-Hash']
    print(response)
    os.remove(img_name)
    os.rmdir(os.getcwd()+'/img')
    return response

def getAccount(canvas, page):
    global address
    global privateKey

    cap = cv2.VideoCapture(0)

    cap.set(3,640)
    cap.set(4,480)

    def decode(im) :
        decodedObjects = pyzbar.decode(im)
        return decodedObjects

    def getImage(cap):
        while(cap.isOpened()):
            # Capture frame-by-frame
            ret, frame = cap.read()
            # Our operations on the frame come here
            im = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            update_image(frame, canvas)
            
            decodedObjects = decode(im)

            if len(decodedObjects) > 0:
                return decodedObjects


    def decodeAddress(decodedObjects):
        global address
        global privateKey
        global response

        cap.release()
        cv2.destroyAllWindows()

        print(decodedObjects[0].data)

        # When everything done, release the capture
        try:
            privateKeyPem = open(os.getcwd()+'/privateKey.pem')
            privateKey = RSA.importKey(privateKeyPem.read())
            cipher = PKCS1_OAEP.new(privateKey)
            raw_cipher_data = b64decode(decodedObjects[0].data)
            privateKey = (cipher.decrypt(raw_cipher_data)).decode("utf-8")
            account = w3.eth.account.privateKeyToAccount(Web3.toBytes(hexstr=privateKey))
            address = account.address
            print(address)
        except Exception as e:
            print(e)
            raise UnregisteredQRError

        if user_contract.functions.hasRole(DISABLED_ROLE, address).call() == True:
            photo = getPhoto()
            timestamp = datetime.now().isoformat()
            metadata = {
                'name': address,
                'location': os.getenv('NODE_NAME'),
                'time': timestamp,
                'type': 'disabled',
                'photo': photo
            }
            address = os.getenv('NODE_ADDR')
            privateKey = os.getenv('NODE_PRIVATE')
            createLog(metadata, page)
            raise DisabledException('account disabled')
        
        page.destroy()
        picturePage()

    def log_register():
        global address
        global privateKey
        global response
        
        photo = getPhoto()

        timestamp = datetime.now().isoformat()
        
        metadata = {
            'name': address,
            'location': os.getenv('NODE_NAME'),
            'time': timestamp,
            'type': 'face_timeout',
            'photo': photo
        }
        
        createLog(metadata, page)
    
    def log_unregister():
        global address
        global privateKey
        global response
        
        photo = getPhoto()

        timestamp = datetime.now().isoformat()
        
        metadata = {
            'name': os.getenv('NOACCOUNT_ADDR'),
            'location': os.getenv('NODE_NAME'),
            'time': timestamp,
            'type': 'QR_mismatch',
            'photo': photo
        }
        
        address = os.getenv('NODE_ADDR')
        privateKey = os.getenv('NODE_PRIVATE')
        createLog(metadata, page)
    
    def log_timeout():
        global address
        global privateKey
        global response
        
        photo = getPhoto()

        timestamp = datetime.now().isoformat()
        
        metadata = {
            'name': os.getenv('NOACCOUNT_ADDR'),
            'location': os.getenv('NODE_NAME'),
            'time': timestamp,
            'type': 'timeout',
            'photo': photo
        }
        
        address = os.getenv('NODE_ADDR')
        privateKey = os.getenv('NODE_PRIVATE')
        createLog(metadata, page)

    def log_wrong_address():
        global address
        global privateKey
        global response
        global face_capture
        
        timestamp = datetime.now().isoformat()
       
        os.makedirs(os.getcwd()+'/img')
        timestamp = datetime.now().isoformat()
        img_name = 'img/{}.jpg'.format(timestamp)
        res = cv2.imwrite(img_name, face_capture)

        url = IPFS_ADDR
        files = open(img_name, 'rb')
        r = requests.post(url, data=files)
        response = r.headers['Ipfs-Hash']
        print(response)
        os.remove(img_name)
        os.rmdir(os.getcwd()+'/img')
        
        metadata = {
            'name': address,
            'location': os.getenv('NODE_NAME'),
            'time': timestamp,
            'type': 'wrong_face',
            'photo': response
        }
        
        createLog(metadata, page)


    try:
        decodedObjects = getImage(cap)
        decodeAddress(decodedObjects) 
    except DisabledException: 
        address, privateKey = None, None
        cap.release()
        cv2.destroyAllWindows()
        page.destroy()
        mainPage()
    except FaceTimeout:
        print('face time')
        cv2.destroyAllWindows()
        global registered_tries
        if registered_tries > 0:
            log_register()
            registered_tries = 0
        registered_tries += 1
        mainPage()
    except WrongFaceException:
        log_wrong_address()
        mainPage()
    except UnregisteredQRError:
        cap.release()
        cv2.destroyAllWindows() 
        log_unregister()
        page.destroy()
        mainPage()
    except TimeoutError:
        cap.release()
        cv2.destroyAllWindows() 
        log_timeout()
        page.destroy()
        mainPage()
    except Exception as e:
        print(e)
        cap.release()
        cv2.destroyAllWindows() 
        global unregister_tries
        unregister_tries += 1
        if unregister_tries > 2:
            log_unregister()
            unregister_tries = 0
        page.destroy()
        mainPage()

def getPicture(canvas, frame):
    global response
    global address

    cam = cv2.VideoCapture(0)

    cam.set(3,640)
    cam.set(4,480)
    time.sleep(2)

    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    @timeout(30)
    def getImage():
        tries = 0
        while(cam.isOpened()):
            # Capture frame-by-frame
            ret, capture = cam.read()
            # Our operations on the frame come here
            im = cv2.cvtColor(capture, cv2.COLOR_BGR2GRAY)
            update_image(capture, canvas)

            faces = cascade.detectMultiScale(im, scaleFactor=1.1, minNeighbors=5);

            if len(faces) > 0 and tries >= 10:
                return capture
                break
            if len(faces) > 0:
                tries = tries + 1

    try:
        capture = getImage()
    except:
        cam.release()
        frame.destroy()
        raise FaceTimeout

    cam.release()
    cv2.destroyAllWindows()
    
    os.makedirs(os.getcwd()+'/img')
    timestamp = datetime.now().isoformat()
    img_name = 'img/{}.jpg'.format(timestamp)
    res = cv2.imwrite(img_name, capture)

    cam.release()

    print(img_name) 
    try:
        face_addr = facerecog.findFace(img_name)
    except:
        os.remove(img_name)
        os.rmdir(os.getcwd()+'/img')
        frame.destroy()
        raise Exception

    print('addr: '+face_addr == address)
    
    if face_addr != address:
        global face_capture
        os.remove(img_name)
        os.rmdir(os.getcwd()+'/img')
        face_capture = capture
        frame.destroy()
        raise WrongFaceException

    print('face addr: '+face_addr)

    url = IPFS_ADDR
    files = open(img_name, 'rb')
    r = requests.post(url, data=files)
    response = r.headers['Ipfs-Hash']
    print(response)
    os.remove(img_name)
    os.rmdir(os.getcwd()+'/img')

    metadata = {
        'location': os.getenv('NODE_NAME'),
        'time': timestamp,
        'photo': response,
        'type': 'allowed'
    }

    createLog(metadata, frame)

def main():
    if os.path.exists(os.getcwd()+'/db/') == False:
        print('new user')
        newuser.getUsers()
    newuser.checkUsers()
    newuser.listenNewUser()
    mainPage()
    root.mainloop()

if __name__ == '__main__':
    main()
