import pytesseract
import cv2
img = cv2.imread('receipt.jpg')

print(pytesseract.image_to_string(img))
cv2.imshow('Result', img)
cv2.waitKey(0)