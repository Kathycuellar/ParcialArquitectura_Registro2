const TelegramBot = require('node-telegram-bot-api');

const token = '586099753:AAGkd79bHua3GIehjVrcVLSHz2SmwUxqQD8';//Cambiar por el token de telegram
const bot = new TelegramBot(token, {
  polling: true
});
var IdMiChat =43263448;//cambiar por tu ID del chat

var SerialPort = require('serialport');
var MiPuerto = new SerialPort('COM6', {
  baudRate: 9600,
  autoOpen: true
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  var Mensaje = msg.text;
  if(Mensaje=="/start")
  {
    bot.sendChatAction(msg.chat.id,"typing");
    bot.sendMessage(msg.chat.id,"Selecciona Apagar o encender la Alarma⏰",{
      "reply_markup":{
        "resize_keyboard":true,
        "keyboard":
        [
          ['Encender','Apagar']]
      }
    });
    }
  else if (Mensaje == "Apagar")
  {
    console.log("Apagando Alarma");
    bot.sendMessage(chatId, 'Apagar Alarma');
    MiPuerto.write("H");
  } else if (Mensaje == "Encender")
  {
    console.log("Encender Alarma");
    bot.sendMessage(chatId, 'Encendere alarma');
    MiPuerto.write("L");
  }
});

MiPuerto.setEncoding('utf8');

MiPuerto.on('data', function(data) {
  console.log("Lo que entro es " + data);
  if (data[0] == 'H') {
    console.log("Boton Precionado");
    bot.sendMessage(IdMiChat, "Se preciono el boton");
  }
});

/*const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '528729968:AAF-29P_IF1rVLOW9Sr0euwTkx5PBnUR4QA';
var SerialPort = require('serialport');
var port = new SerialPort("COM6", {
  baudRate: 9600,
  autoOpen: true
});

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
var IdMiChat = 377055235;
// Matches "/echo [whatever]"

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  var respuesta = msg.text;
  if (respuesta== "encender") {
    console.log("endender led");
      bot.sendMessage(chatId, 'Encendiendo led');
      miSerial.write("H");
  } else if (respuesta =="apagar"){
    console.log("apagar led");
      bot.sendMessage(chatId, 'Apagando Led');
            miSerial.write("L");
  }
miSerial.setEncoding('utf8');

miSerial.on('data',function(data){
  console.log('Data:', data);
  if(data[0]=='H'){
    console.log("Boton presionado");
    bot.sendMessage(IdMiChat, "Presionador del boton");
  }
})
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});*/
