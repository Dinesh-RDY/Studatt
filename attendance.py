import requests
import cv2
import numpy as np
from datetime import date, datetime
from timetable import timings
myData = ''
import tensorflow as tf
from tensorflow import keras
import os
import cv2
import numpy as np
model = keras.models.load_model("model1ANN.h5")  # type: ignore
labels = []
for dir in os.listdir("data/"):
    labels.append(dir)
print(model.summary())

def findRoll():
    detector = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
    cam = cv2.VideoCapture(0)
    while True:
        _ , img = cam.read()
        img = cv2.flip(img, 1)
        faces = detector.detectMultiScale(img)
        for (x , y , w , h) in faces:
            try:
                gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                gray = gray[y- 30:y+h +30, x - 30:x+w + 30]
                gray = cv2.resize(gray , (256 ,256))
            except:
                continue
            gray = gray.reshape(-1, 256, 256, 1).astype('float') / 255.
            ans = model.predict(gray)
            print(ans)
            n = np.argmax(ans)
        return labels[n]
            
while True:
    print("hello")
    previousData = myData
    myData = findRoll()
    print(myData)
    if previousData != myData:
        present_time = datetime.now()
        current_hour = present_time.strftime('%H')
        current_day = present_time.strftime("%A")
        todays_timetable = timings[current_day]
        if not todays_timetable:
            print("Sorry you dont have any classes today")
        else:
            present_subject = todays_timetable[current_hour]
            original_time = datetime.strptime(current_hour, '%H')
            diff = present_time - original_time
            if(diff.seconds / 60 < 20):
                print("Sorry you are late to class")
            elif not present_subject:
                print("You dont have any class")
            else:
                r = requests.post(url='http://127.0.0.1:3000/markAttendance',
                                    data={'roll': myData, 'subject': present_subject})
                print(r.text)
    