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

def findFace(file):
        
    df = DeepFace.find(img_path=file, db_path="./db")
    
    print(df)
    
    path = Path(df.iloc[0].identity)

    return path.parts[1]
