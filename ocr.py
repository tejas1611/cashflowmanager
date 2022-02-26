import pytesseract
import cv2
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
img = cv2.imread('sample.jpg')


def getReceiptString(img):
    
    res_str = pytesseract.image_to_string(img)
    print(res_str)
    return res_str


if __name__ == "__main__":
    print(getReceiptString(img))
    cv2.imshow('Result', img)
    cv2.waitKey(0)