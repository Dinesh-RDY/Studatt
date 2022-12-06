import cv2
import os

cam = cv2.VideoCapture(0)
face_detector = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
face_id = input("Enter roll number")
count = 0
os.mkdir(os.path.join(os.getcwd() , "data/" + face_id))
while (True):
    ret, img = cam.read()
    img = cv2.flip(img, 1)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_detector.detectMultiScale(gray, 1.3, 5)
    cv2.imshow('image', img)
    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w+50, y+h+50), (0, 255, 0), 2)
        gray = gray[y- 30:y+h +30, x - 30:x+w + 30]
        gray = cv2.resize(gray , (256 ,256))
        cv2.imwrite(f"data/{face_id}/" + str(count) + ".jpg", gray)
        count += 1
        print("hello")
        cv2.imshow('image', img)

    k = cv2.waitKey(10) & 0xff  
    if k == ord('q'):
        break
    elif count > 200:
        break

print("\n [INFO] Exiting Program and cleanup stuff")
cam.release()
cv2.destroyAllWindows()
