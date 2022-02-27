from cv2 import extractChannel

FUEL_CAT= []
GROCERY_CAT = ["GIANT NTU"]
FOOD_CAT = ["Little C"]
LENGTH = 8
AMT_CONSTANTS = ["VISA","TOTAL", "AMOUNT"]
import string

from ocr import getReceiptString
import random, cv2
import re


def parseRecieptString(rct_str):

  extract_dict = {}
  extract_dict["billInfo"]= {}

  newlines = rct_str.split("\n")
  index = 0
  #print(newlines)
  
  for line in newlines:
    
    items = line.split(" ")
    
    try:
      price = float (items[-1])
      item = " ".join(items[:len(items)-1])
      extract_dict["billInfo"][item] = price
    except:
      pass
    
    if index == 0:

      extract_dict["vendorName"] = line

    if len(items) == 2 and index >1:

      if items[0] in AMT_CONSTANTS:
        extract_dict["amount"] = float(items[1])

    index += 1

  vendor = extract_dict["vendorName"].upper()
  if vendor in FUEL_CAT:

    extract_dict["expenseType"] = "Fuel"

  elif vendor in FOOD_CAT:

    extract_dict["expenseType"] = "Food"
  
  elif vendor in GROCERY_CAT:

    extract_dict["expenseType"] = "Grocery"

  extract_dict ["invoice_id"] = ''.join((random.choice(string.ascii_uppercase) for x in range(LENGTH))) 
  if '' in extract_dict["billInfo"]:
    del extract_dict["billInfo"]['']
  if 'TERMENAL: SO5BO61S APPR CODE:' in extract_dict["billInfo"]:
    del extract_dict["billInfo"]['TERMENAL: SO5BO61S APPR CODE:']
  if 'pw 19218' in extract_dict["billInfo"]:
    del extract_dict["billInfo"]['pw 19218']
  if 'VISA' in extract_dict["billInfo"]:
    del extract_dict["billInfo"]['VISA']
  if 'SUBTOTAL' in extract_dict["billInfo"]:
    del extract_dict["billInfo"]['SUBTOTAL']
  if 'GST AMT' in extract_dict["billInfo"]:
    del extract_dict["billInfo"]['GST AMT']
  extract_dict["billCosts"] = list(extract_dict["billInfo"].values())
  extract_dict["billItems"] = list(extract_dict["billInfo"].keys())
  del extract_dict["billInfo"]
  return extract_dict



print(parseRecieptString(getReceiptString(cv2.imread("sample.png"))))




