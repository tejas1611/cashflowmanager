from cv2 import extractChannel

FUEL_CAT= []
GROCERY_CAT = ["Giant NTU"]
FOOD_CAT = ["Little C"]

AMT_CONSTANTS = ["VISA","TOTAL", "AMOUNT"]
INVOICE_ID = ["5324767"]
from ocr import getReceiptString
import random, cv2

def parseRecieptString(rct_str):

  extract_dict = {}

  newlines = rct_str.split("\n")
  index = 0
  #print(newlines)
  for line in newlines:
    
    items = line.split(" ")
    if index == 0:

      extract_dict["Vendor"] = line

    if len(items) == 2 and index >1:

      if items[0] in AMT_CONSTANTS:
        extract_dict["Amount"] = float(items[1])

    index += 1

  vendor = extract_dict["Vendor"].upper()

  if vendor in FUEL_CAT:

    extract_dict["Category"] = "Fuel"

  elif vendor in FOOD_CAT:

    extract_dict["Category"] = "Food"
  
  elif vendor in GROCERY_CAT:

    extract_dict["Category"] = "Grocery"

  extract_dict ["Invoice ID"] = random.choice(INVOICE_ID)

  return extract_dict



print(parseRecieptString(getReceiptString(cv2.imread("sample.png"))))




