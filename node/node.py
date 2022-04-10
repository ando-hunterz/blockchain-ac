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

load_dotenv()

w3 = Web3(Web3.HTTPProvider('http://192.168.0.19:7545'))
LOG_CONTRACT_ADDR=os.getenv('VITE_LOG_CONTRACT_ADDR')
USER_CONTRACT_ADDR=os.getenv('VITE_USER_CONTRACT_ADDR')
DISABLED_ROLE=os.getenv('VITE_DISABLED_ROLE')

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


# def getFace(img_name):
#     global address
#     s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#     s.connect(('192.168.0.19',8480))
#     BUFFER_SIZE=4096
#     with open(img_name, 'rb') as file:
#         file_data = file.read(BUFFER_SIZE)

#         while file_data:
#             s.send(file_data)
#             file_data = file.read(BUFFER_SIZE)
#     time.sleep(1)
#     s.send(b"%COMPLETE_SEND%")
#     s.settimeout(90)
#     recv_data = s.recv(BUFFER_SIZE)
#     print(recv_data.decode("utf-8"))
#     print(address)
#     if recv_data.decode('utf-8') != address:
#         exit()

def update_image(p_frame, canvas):
    canvas_im = cv2.cvtColor(p_frame, cv2.COLOR_BGR2RGB)
    canvas_im = Image.fromarray(canvas_im)
    canvas_im = canvas_im.resize((300,300), Image.ANTIALIAS)
    canvas_im = ImageTk.PhotoImage(canvas_im)

    canvas.imgtk = canvas_im
    canvas.configure(image=canvas_im)
    root.update()

def getAccount(canvas, page):
    global address
    global privateKey

    cap = cv2.VideoCapture(0)

    cap.set(3,640)
    cap.set(4,480)

    def decode(im) :
        decodedObjects = pyzbar.decode(im)
        return decodedObjects


    while(cap.isOpened()):
        # Capture frame-by-frame
        ret, frame = cap.read()
        # Our operations on the frame come here
        im = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        update_image(frame, canvas)

        decodedObjects = decode(im)

        if len(decodedObjects) == 1:
            break


    cap.release()
    cv2.destroyAllWindows()

    print(decodedObjects[0].data)

    # When everything done, release the capture
    (address, privateKey) = Web3.toText(decodedObjects[0].data).split('-')
    print(address)

    if user_contract.functions.hasRole(DISABLED_ROLE, address).call() == True:
        address, privateKey = None, None
        page.destroy()
        mainPage()
    page.destroy()
    picturePage()



def getPicture(canvas, frame):
    global response

    cam = cv2.VideoCapture(0)

    cam.set(3,640)
    cam.set(4,480)
    time.sleep(2)

    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    tries = 0

    while(cam.isOpened()):
        # Capture frame-by-frame
        ret, capture = cam.read()
        # Our operations on the frame come here
        im = cv2.cvtColor(capture, cv2.COLOR_BGR2GRAY)
        update_image(capture, canvas)

        faces = cascade.detectMultiScale(im, scaleFactor=1.1, minNeighbors=5);

        if len(faces) > 0 and tries >= 10:
            break
        if len(faces) > 0:
            tries = tries + 1

    cam.release()
    cv2.destroyAllWindows()

    timestamp = datetime.now().isoformat()
    img_name = 'img/{}.jpg'.format(timestamp)
    res = cv2.imwrite(img_name, capture)

    cam.release()

    facerecog.findFace(img_name)

    url = 'http://192.168.0.19:8080/ipfs/'
    files = open(img_name, 'rb')
    r = requests.post(url, data=files)
    response = r.headers['Ipfs-Hash']
    print(response)
    os.remove(img_name)

    metadata = {
        'time': timestamp,
        'photo': response
    }

    jsonMeta = json.dumps(metadata, indent = 3)
    print(jsonMeta)
    res = requests.post(url, json=jsonMeta)
    response = res.headers['Ipfs-Hash']
    print(response)

    frame.destroy()
    loading = loadingPage()
    createLog(loading)


def createLog(loading):
    global address
    global privateKey

    tx = log_contract.functions.safeMint(address, response).buildTransaction({'nonce': w3.eth.getTransactionCount(address), 'gasPrice': w3.eth.gas_price});

    signed_tx = w3.eth.account.sign_transaction(tx, private_key=privateKey)

    w3.eth.send_raw_transaction(signed_tx.rawTransaction)

    address, privateKey = None, None

    loading.destroy()
    mainPage()

def main():
    newuser.listenNewUser()
    mainPage()
    root.mainloop()

if __name__ == '__main__':
    main()
