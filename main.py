import logging
import urllib.request
from PIL import Image
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import telegram
from ocr import getReceiptString
from receipt_content_prediction import parseRecieptString
import requests
from datetime import datetime
TOKEN = "5291304290:AAGRl3EzpoEcObIT8sR10qWxhvM0OffzPYI"

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)


# Define a few command handlers. These usually take the two arguments update and
# context. Error handlers also receive the raised TelegramError object in error.
def start(update, context):
    reply_markup = telegram.ReplyKeyboardMarkup([['Add new invoice','Get expenses report']],
                                       one_time_keyboard=True,
                                       resize_keyboard=True)
    context.bot.send_message(chat_id=update.message.chat_id, text='Hi! What would you like to do today?', reply_markup=reply_markup)


def help(update, context):
    text = "This is a bot to help you track your daily expenses. \U0001F4B8 \n\nAdd a new invoice manually or simply send us a picture of your receipt and we will do the rest! \n\nYou can even try sending us voice commands "
    context.bot.send_message(chat_id=update.message.chat_id, text=text)

def save_image_from_message(message, context):
    print("Inside func")
    cid = message.chat_id

    image_id =  message.document.file_id

    context.bot.send_message(cid, '🔥 Analyzing image, be patient ! 🔥')

    # # prepare image for downlading
    file_path = context.bot.get_file(image_id).file_path

    urllib.request.urlretrieve(file_path, "sample.png")
    img = Image.open("sample.png")
    img.show()
    return img


def add_invoice(update, context):
    print("Checking")
    img = save_image_from_message(update.message, context)
    
    #text = "Received an image. Updating your expenses"
    text = getReceiptString(img)
    context.bot.send_message(chat_id=update.message.chat_id, text=text)
    
    parsedString = parseRecieptString(text)

    bodyData = {
        "invoice_id": "73776375",
        "telegram_id": update.message.chat.id,
        "billItems": ["Noodles", "Choco Lava"],
        "billCosts": [2.0, 3.0],
        "timeBought": datetime.now().isoformat(),
        "expenseType": "Grocery",
        "vendorName": "7 11",
        "amount": 5.0
    }

    response = requests.post("http://localhost:3000/bill/addBill", json=bodyData)

    print(response.json())

    return "Added bill data to database"

def respond_chat(update, context):
    if "new invoice" in update.message.text:
        text = "You can manually input your expenses as: \nCategory, Amount \nCategory, Amount \n... \n\n Or simply try uploading a picture of your receipt\U0001F4DD"
    elif update.message.text == "Get expenses report":
        text = "These are your expenses for this month:"
    else:
        text = "I didn't quite get that... \n\nPlease try again"
    context.bot.send_message(chat_id=update.message.chat_id, text=text)


def respond_voice(update, context):
    text = "Analyzing voice command..."
    context.bot.send_message(chat_id=update.message.chat_id, text=text)


def error(update, context):
    logger.warning('Update "%s" caused error "%s"', update, context.error)


def main():
    """Start the bot."""
    # Create the Updater and pass it your bot's token.
    # Make sure to set use_context=True to use the new context based callbacks
    # Post version 12 this will no longer be necessary
    updater = Updater(TOKEN, use_context=True)

    # Get the dispatcher to register handlers
    dp = updater.dispatcher

    # on different commands - answer in Telegram
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("help", help))

    # on noncommand i.e message - echo the message on Telegram
    dp.add_handler(MessageHandler(Filters.text, respond_chat))
    dp.add_handler(MessageHandler(Filters.document.image, add_invoice))
    dp.add_handler(MessageHandler(Filters.audio, respond_voice))

    # log all errors
    dp.add_error_handler(error)

    # Start the Bot
    updater.start_polling()

    updater.idle()


if __name__ == '__main__':
    main()