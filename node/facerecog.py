from deepface import DeepFace
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

def findFace(file):
        
    df = DeepFace.find(img_path=file, db_path="./db")
    
    if df.shape[0] == 0:
        return None

    path = Path(df.iloc[0].identity)

    return path.parts[1]
