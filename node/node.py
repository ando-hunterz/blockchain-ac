from web3 import Web3
import cv2
import os
import sys
from dotenv import load_dotenv
import json
import time
import pyzbar.pyzbar as pyzbar
from datetime import datetime, timezone
import requests
import tkinter as tk
from PIL import Image, ImageTk
import facerecog
import newuser
from wrapt_timeout_decorator import *
from custom_exception import DisabledException, WrongFaceException, FaceTimeout, UnregisteredQRError
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from base64 import b64decode
from logger import read_qr_log, finish_qr_log, read_face_log, finish_face_log, send_log_log, finish_log_log
import RPi.GPIO as GPIO
import shutil

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

root = tk.Tk()
root.attributes('-fullscreen',True)
root.columnconfigure(0,weight=1)
root.rowconfigure(0,weight=1)

unregister_tries = 0
registered_tries = 0

GPIO.setmode(GPIO.BCM)
GPIO.setup(16, GPIO.OUT)

def errorPage():
    error_page = tk.Frame(root)
    error_page.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    error_label = tk.Label(error_page, text="Network Error, please contact admin or wait")
    error_label.pack()
    error_page.tkraise()
    root.update()
    return error_page

def mainPage():
    main_page = tk.Frame(root)
    main_page.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    enter_button = tk.Button(main_page, text="Enter", command= lambda: qrPage(main_page))
    enter_button.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    enter_button.pack()
    main_page.tkraise()

def loadingPage():
    loading_page = tk.Frame(root)
    loading_page.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    loading_label = tk.Label(loading_page, text="Loading")
    loading_label.pack()
    loading_page.tkraise()
    root.update()
    return loading_page

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


def accessPage():
    access_page = tk.Frame(root)
    access_page.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    access_label = tk.Label(access_page, text="Loading")
    access_label.pack()
    access_page.tkraise()
    root.update()
    return access_page

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

def log_wrong_address(capture):
    global address
    global privateKey
    global response
    
    timestamp = datetime.now().isoformat()
   
    os.makedirs(os.getcwd()+'/img')
    timestamp = datetime.now().isoformat()
    img_name = 'img/{}.jpg'.format(timestamp)
    res = cv2.imwrite(img_name, capture)

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
    
    createLog(metadata)



def allowedLog(metadata, page):
    createLog(metadata, page)
    access_page = accessPage()
    GPIO.output(16, True)
    time.sleep(5)
    GPIO.output(16, False)
    access_page.destroy()
    mainPage()

def createLog(metadata, page=None):  
    
    global address
    global privateKey
    
    send_log_log()
    
    url = IPFS_ADDR
    jsonMeta = json.dumps(metadata, indent = 3)
    res = requests.post(url, json=jsonMeta)
    response = res.headers['Ipfs-Hash']
    
    if page:
        page.destroy()
    
    loading = loadingPage()

    tx = log_contract.functions.safeMint(address, response).buildTransaction({'nonce': w3.eth.getTransactionCount(address), 'gasPrice': w3.eth.gas_price, 'chainId': 51, 'from': address, "gas": 0});

    gas = w3.eth.estimate_gas(tx)
    
    tx.update({'gas': gas})

    signed_tx = w3.eth.account.sign_transaction(tx, private_key=privateKey)

    sent_tx = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    
    w3.eth.wait_for_transaction_receipt(sent_tx)

    finish_log_log()
    
    address, privateKey = None, None
    
    loading.destroy()


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
    

    @timeout(60, timeout_exception=TimeoutError)
    def getImage(cap):
        while(cap.isOpened()):
            ret, frame = cap.read()
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

    try:
        read_qr_log()
        decodedObjects = getImage(cap)
        decodeAddress(decodedObjects) 
    except DisabledException: 
        address, privateKey = None, None
        page.destroy()
        mainPage()
    except UnregisteredQRError:
        log_unregister()
        page.destroy()
        mainPage()
    except TimeoutError:
        cap.release()
        cv2.destroyAllWindows()
        page.destroy()
        global unregister_tries
        unregister_tries += 1
        if unregister_tries > 2:
            log_unregister()
            unregister_tries = 0
        else:
            mainPage()
    except Exception as e:
        repr(e)
        cap.release()
        cv2.destroyAllWindows() 
        page.destroy()
        

def getPicture(canvas, frame):
    global response
    global address

    cam = cv2.VideoCapture(0)

    cam.set(3,640)
    cam.set(4,480)
    time.sleep(2)

    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    read_face_log()

    @timeout(30, timeout_exception=TimeoutError)
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
    except TimeoutError:
        cam.release()
        cv2.destroyAllWindows()
        frame.destroy()
        global registered_tries
        if registered_tries > 0:
            log_register()
            registered_tries = 0
        else:
            mainPage()
        registered_tries += 1
    except Exception as e:
        repr(e)
        raise e 

    cam.release()
    cv2.destroyAllWindows()

    os.makedirs(os.getcwd()+'/img')
    timestamp = datetime.now().isoformat()
    img_name = 'img/{}.jpg'.format(timestamp)
    res = cv2.imwrite(img_name, capture)

    frame.destroy()
    
    loading = loadingPage()
    print(img_name) 
    try:
        face_addr = facerecog.findFace(img_name)
        print(face_addr)
    except ValueError:
        print('Value-Error')
        os.remove(img_name)
        os.rmdir(os.getcwd()+'/img')
        loading.destroy()
        log_wrong_address(capture)
    except Exception as e:
        repr(e)
        os.remove(img_name)
        os.rmdir(os.getcwd()+'/img')
        loading.destroy()
        raise Exception
    finally:
        mainPage()
        return 

    print('called')
    if face_addr != address or face_addr == None:
        os.remove(img_name)
        os.rmdir(os.getcwd()+'/img')
        loading.destroy()
        log_wrong_address(capture)
        mainPage()
    
    finish_face_log()

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

    loading.destroy()

    allowedLog(metadata, frame)

def main():
    loading = loadingPage()
    if os.path.exists(os.getcwd()+'/db/') == False:
        print('New User Found!')
        newuser.getUsers()
    newuser.checkUsers()
    newuser.listenNewUser()
    loading.destroy()
    mainPage()
    root.mainloop()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        if os.path.exists(os.getcwd()+'/img/'):
            shutil.rmtree(os.getcwd()+'/img')
        GPIO.cleanup()
    except requests.exceptions.HTTPError:
        print('Network Error')
        error_page = errorPage(root)
        time.sleep(10)
        error_page.destroy()
        os.execl(sys.executable, sys.executable, *sys.argv)
    except requests.exceptions.ReadTimeout:
        error_page = errorPage(root)
        print('Network Error')
        time.sleep(10)
        error_page.destroy()
        os.execl(sys.executable, sys.executable, *sys.argv)
    except Exception as e:
        print(repr(e))
