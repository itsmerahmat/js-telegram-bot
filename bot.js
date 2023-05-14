const { Bot, webhookCallback } = require("grammy");
const express = require('express');
const axios = require('axios');
require('dotenv').config();

// Buat sebuah instance class `Bot` lalu masukkan token bot ke dalamnya.
const bot = new Bot(process.env.TOKEN_BOT); // <-- taruh token bot-mu di antara ""

// Sekarang, kamu bisa menambahkan listener ke object `bot`.
// grammY akan memanggil listener ini ketika pengguna mengirim pesan ke bot.

// Tangani perintah 
bot.command("start", async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');  // membuat bot mengetik
  await new Promise(resolve => setTimeout(resolve, 2000));  // Membuat waktu ngetik agar lebih lama
  await ctx.reply("Halo, saya Patrick Star, Saya akan menemani Anda");
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnSF5e-bo4yEneAc4jmC7gCkvCM2N1cQAC1QADlp-MDtnJFaLyNwN9GgQ");
});

bot.command("version", async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 1500));
  await ctx.reply("Patrick Star 3.0 Final Version");
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEI9otkXwPebQAB5H8gE3ld0Z9KSxoyScYAAtoAA5afjA6X9c7X7V431y8E");
});

bot.command("code", async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await ctx.reply("Mintalah izin kepada @Rahmat710, sebelum download source code patrick");
});

bot.command("about", async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 3000));
  await ctx.reply("Hai Tuan, nama saya Patrick! Saya seorang chatbot yang dibuat oleh @Rahmat710. Anda dapat menemukan daftar perintah yang tersedia dengan /help.");
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEI9pdkXwVf77_grAwbvp5mw85K83o6KwAC1QADlp-MDtnJFaLyNwN9LwQ");
});

bot.command("off", async (ctx) => {
  let user = ctx.from.first_name;
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 1500));
  await ctx.reply(`Selamat tinggal ${user}`);
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEI9ghkXn3TkJwfF6_Nxpo-2vlpakinNgAC5AADlp-MDscIDPUzftb3LwQ");
});

bot.command("donation", async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await ctx.reply("Terima kasih karena Anda mau mendonasikan sebagian uang anda untuk ChatBOT sederhana ini.\npaypal.me/orangbiasa710");
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEI9o9kXwQ5_slbxEdFibrfv3Sl-ypkIAACxwADlp-MDg3QFiknUCeBLwQ");
});

bot.command("help", async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 1500));
  await ctx.reply("Apa yang bisa Patrick bantu, coba ketikkan beberapa perintah berikut :\n/start - Memulai Patrick\n/about - Tentang Patrick\n/code - Source Code Patrick\n/donation - Donasi Patrick\n/help - Bantuan Patrick\n/off - Berpisah Patrick\n/version - Versi Patrick\nDan coba juga tanyakan beberapa kata berikut :\n- Hai\n- Jam\n- Puisi\n- Wkwk\n- Bosan\n- Mantap\n- Sahabat");
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnSO1e-b0b1GDzYAr9XzwZz3sAAQTonHAAAuIAA5afjA5cJvF6FyFYGBoE");
});

bot.command('cuaca', async (ctx) => {
  const city = ctx.message.text.split(' ')[1];
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_WEATHER}&units=metric`;
  try {
    const response = await axios.get(url);
    const weatherText = `Cuaca ${response.data.weather[0].description}, suhu sekitar ${response.data.main.temp} °C di kota ${response.data.name}!`;
    await bot.api.sendChatAction(ctx.chat.id, 'typing');
    await new Promise(resolve => setTimeout(resolve, 1500));
    ctx.reply(weatherText);
  } catch (error) {
    console.log(error);
    await bot.api.sendChatAction(ctx.chat.id, 'typing');
    await new Promise(resolve => setTimeout(resolve, 1000));
    ctx.reply('Terjadi kesalahan saat mengambil data');
  }
});

// Mencocokkan teks pesan dengan sebuah string atau regular expression (regex).
bot.hears(/halo *(.+)?/i, async (ctx) => {
  let user = ctx.from.first_name;
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 1500));
  await ctx.reply(`Hai ${user}`, { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnPHxe-W6K0DiaPnYFLFj9Wohi30KdXwAC7gADlp-MDoU4Gst0NQvbGgQ");
});

bot.hears(/salah *(.+)?/i, async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 1500));
  await ctx.reply("Ya maaf", { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEI9ptkXwa5hUnCIgw_2bLzBrR7gQIMPAAC7QADlp-MDjgJmJ5XSoroLwQ");
});

bot.hears(/jam *(.+)?/i, async (ctx) => {
  // Fungsi untuk mencari jam sekarang
  function getTime() {
    let date = new Date();
    let options = {
      timeZone: "Asia/Makassar",
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    return date.toLocaleTimeString("id-ID", options);
  }

  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 1500));
  await ctx.reply("Sekarang jam " + getTime() + " WITA", { reply_to_message_id: ctx.msg.message_id, });
});

bot.hears(/(tanggal|hari)/i, async (ctx) => {
  // Fungsi untuk mencari hari sekarang
  function getTime() {
    let date = new Date();
    let options = {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    return date.toLocaleDateString("id-ID", options);
  }

  // Menentukan regex mana yang digunakan
  function checkInput(inputStr) {
    const regexPattern = /(tanggal|hari)/i;
    const match = inputStr.match(regexPattern);

    if (match) {
      if (match[0].toLowerCase() === 'tanggal') {
        return "Sekarang tanggal ";
      } else {
        return "Sekarang hari ";
      }
    }
  }

  let pesan = checkInput(ctx.message.text) + getTime();

  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 1500));
  await ctx.reply(pesan, { reply_to_message_id: ctx.msg.message_id, });
});

bot.hears(/makanan *(.+)?/i, async (ctx) => {
  let user = ctx.from.first_name;
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 1500));
  await ctx.reply(`Yoo makanan, ${user}`, { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEI9pNkXwT9P0sy_n3RDnU7erICS9uTfQAC1wADlp-MDgGdg9cjNMC5LwQ");
});

bot.hears(/mantap *(.+)?/i, async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 1000));
  await ctx.reply("Yoi", { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnPHxe-W6K0DiaPnYFLFj9Wohi30KdXwAC7gADlp-MDoU4Gst0NQvbGgQ");
});

bot.hears(/wkwk *(.+)?/i, async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await ctx.reply("wkwk", { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnOAxe-UuMHjlrQQJI4A3Ok41z12kZkQAC1AADlp-MDkHTIxgFu0ZiGgQ");
});

bot.hears(/sahabat *(.+)?/i, async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await ctx.reply("Pengetahuan tidak dapat menggantikan persahabatan. Aku lebih suka jadi idiot daripada kehilanganmu.", { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnPBBe-WvawB8_iiijq7DGSbMUrsSM-QAC2wADlp-MDtbofjzE_R91GgQ");
});

bot.hears(/bosan *(.+)?/i, async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await ctx.reply("Sama cuy, saya juga bosan", { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnxaVe_VVTt0HM5UXlna2nTmW7hcLufQAC7QADlp-MDjgJmJ5XSoroGgQ");
});

bot.hears(/puisi *(.+)?/i, async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 2000))
  await ctx.reply("Puisi karya Patrick Star\nMawar itu Biru\nViolet itu Merah\nAku ingin pergi ke Kamar Mandi", { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnxAte_UL69Ye-p_PcnthJ4Wua7T8odgACyQADlp-MDsHYR0YXGAzXGgQ");
});


// Tangani pesan lainnya.
bot.on("message", async (ctx) => {
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await ctx.reply("Hmm.. saya tidak mengerti, coba kata yang lain")
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnO71e-Wh3XBRBaWeDERMNo9gbv_9cngAC4AADlp-MDlK-PV2Yy4fHGgQ");
});

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