require('dotenv').config()
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.TOKEN)
const readline = require('readline')
const fs = require('fs')

bot.start(async ctx => {
    const nome = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${nome}!`)
    await ctx.reply(`
Eu sou um assistente robô, e para interagir comigo,
basta digitar o nome de um medicamento e se estiver
cadastrado em minha base de dados, poderei mostrar
a bula médica desse medicamento, ok?
Para mostrar essa mensagem de boas vindas novamente,
basta digitar /start.
Obrigado pela sua visita.`)
})
const rl = readline.createInterface({
  input: fs.createReadStream('base de dados.txt')
})

rl.on('line', (line) => {
    var bula = line.split(";",3)
    bot.hears(bula[0], ctx=>ctx.replyWithMarkdown(bula[1]+'\nfonte: '+bula[2]))
})

bot.startPolling()