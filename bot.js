const { Bot } = require("grammy");

// Buat sebuah instance class `Bot` lalu masukkan token bot ke dalamnya.
const bot = new Bot("1399041007:AAFD5-cGzOP0EzN4iJ4vSZ7jWtFCxXRehwI"); // <-- taruh token bot-mu di antara ""

// Sekarang, kamu bisa menambahkan listener ke object `bot`.
// grammY akan memanggil listener ini ketika pengguna mengirim pesan ke bot.

// Tangani perintah /start.
bot.command("start", (ctx) => ctx.reply("Selamat datang! Bot siap digunakan."));
// Tangani pesan lainnya.
bot.on("message", (ctx) => ctx.reply("Dapat pesan baru!"));

// Setelah menentukan bagaimana pesan ditangani, kamu dapat menjalankan bot-mu.
// Bot akan melakukan koneksi ke server Telegram dan menunggu pesan masuk.

// Mulai bot-nya.
bot.start();