const { Bot, webhookCallback } = require("grammy");
const express = require('express')
require('dotenv').config()

// Buat sebuah instance class `Bot` lalu masukkan token bot ke dalamnya.
const bot = new Bot(process.env.TOKEN_BOT); // <-- taruh token bot-mu di antara ""

// Sekarang, kamu bisa menambahkan listener ke object `bot`.
// grammY akan memanggil listener ini ketika pengguna mengirim pesan ke bot.

// Tangani perintah 
bot.command("start", async (ctx) => {
  await ctx.reply("Halo, saya Patrick Star, Saya akan menemani Anda");
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnSF5e-bo4yEneAc4jmC7gCkvCM2N1cQAC1QADlp-MDtnJFaLyNwN9GgQ");
});

bot.command("version", (ctx) => ctx.reply("Patrick Star 2.0 Final Version"));

bot.command("code", (ctx) => ctx.reply("Mintalah izin kepada @Rahmat710, sebelum download source code patrick"));

bot.command("about", async (ctx) => {
  await ctx.api.sendPhoto(ctx.chat.id, "https://drive.google.com/uc?export=download&id=13K79fBcHXkqiZyppS7UohsIb0UY2kbEd")
  await ctx.reply("Hai Tuan, nama saya Patrick! Saya seorang chatbot yang dibuat oleh @Rahmat710. Anda dapat menemukan daftar perintah yang tersedia dengan /help.");
});

bot.command("off", async (ctx) => {
  let user = ctx.from.first_name;
  await ctx.reply(`Selamat tinggal ${user}`);
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnSIhe-bs2otetLU8iYwq36HdGb7nNFgAC3QADlp-MDrozs7WFjg_RGgQ");
});

bot.command("donation", (ctx) => ctx.reply("Terima kasih karena Anda mau mendonasikan sebagian uang anda untuk ChatBOT sederhana ini.\npaypal.me/orangbiasa710"));

bot.command("help", async (ctx) => {
  await ctx.reply("Apa yang bisa Patrick bantu, coba ketikkan beberapa perintah berikut :\n/start - Memulai Patrick\n/about - Tentang Patrick\n/code - Source Code Patrick\n/donation - Donasi Patrick\n/help - Bantuan Patrick\n/off - Berpisah Patrick\n/version - Versi Patrick\nDan coba juga tanyakan beberapa kata berikut :\n- Hai\n- Jam\n- Puisi\n- Wkwk\n- Bosan\n- Mantap\n- Sahabat")
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnSO1e-b0b1GDzYAr9XzwZz3sAAQTonHAAAuIAA5afjA5cJvF6FyFYGBoE");
});

// Mencocokkan teks pesan dengan sebuah string atau regular expression (regex).
bot.hears(/halo *(.+)?/i, async (ctx) => {
  let user = ctx.from.first_name;
  await ctx.reply(`Hai ${user}`, { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnPHxe-W6K0DiaPnYFLFj9Wohi30KdXwAC7gADlp-MDoU4Gst0NQvbGgQ");
});

bot.hears(/mantap *(.+)?/i, async (ctx) => {
  await ctx.reply("Yoi", { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnPHxe-W6K0DiaPnYFLFj9Wohi30KdXwAC7gADlp-MDoU4Gst0NQvbGgQ");
});

bot.hears(/wkwk *(.+)?/i, async (ctx) => {
  await ctx.reply("wkwk", { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnOAxe-UuMHjlrQQJI4A3Ok41z12kZkQAC1AADlp-MDkHTIxgFu0ZiGgQ");
});

bot.hears(/sahabat *(.+)?/i, async (ctx) => {
  await ctx.reply("Pengetahuan tidak dapat menggantikan persahabatan. Aku lebih suka jadi idiot daripada kehilanganmu.", { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnPBBe-WvawB8_iiijq7DGSbMUrsSM-QAC2wADlp-MDtbofjzE_R91GgQ");
});

bot.hears(/bosan *(.+)?/i, async (ctx) => {
  await ctx.reply("Sama cuy, saya juga bosan", { reply_to_message_id: ctx.msg.message_id, });
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnxaVe_VVTt0HM5UXlna2nTmW7hcLufQAC7QADlp-MDjgJmJ5XSoroGgQ");
});

bot.hears(/puisi *(.+)?/i, async (ctx) => {
  // indicate that the bot is typing
  await bot.api.sendChatAction(ctx.chat.id, 'typing');
  // Membuat waktu agar lebih lama
  await new Promise(resolve => setTimeout(resolve, 2000))
  await ctx.reply("Puisi karya Patrick Star\nMawar itu Biru\nViolet itu Merah\nAku ingin pergi ke Kamar Mandi", { reply_to_message_id: ctx.msg.message_id, });
  // indicate that the typing has stopped
  await bot.api.sendChatAction(ctx.chat.id, 'cancel');
  await ctx.api.sendSticker(ctx.chat.id, "CAACAgIAAxkBAAEnxAte_UL69Ye-p_PcnthJ4Wua7T8odgACyQADlp-MDsHYR0YXGAzXGgQ");
});


// Tangani pesan lainnya.
bot.on("message", async (ctx) => {
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