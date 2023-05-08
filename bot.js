const { Bot, webhookCallback } = require("grammy");
const express = require('express')
require('dotenv').config()

// Buat sebuah instance class `Bot` lalu masukkan token bot ke dalamnya.
const bot = new Bot(process.env.TOKEN_BOT); // <-- taruh token bot-mu di antara ""

// Sekarang, kamu bisa menambahkan listener ke object `bot`.
// grammY akan memanggil listener ini ketika pengguna mengirim pesan ke bot.

// Tangani perintah /start.
bot.command("start", (ctx) => ctx.reply("Selamat datang! Bot siap digunakan."));
// Tangani pesan lainnya.
bot.on("message", (ctx) => ctx.reply("Dapat pesan baru!"));

// Setelah menentukan bagaimana pesan ditangani, kamu dapat menjalankan bot-mu.
// Bot akan melakukan koneksi ke server Telegram dan menunggu pesan masuk.

// Mulai bot-nya.
if (process.env.NODE_ENV === "production") {
  // Use Webhooks for the production server
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
} else {
  // Use Long Polling for development
  bot.start();
}