const Telegraf = require('telegraf')
const readline = require('readline')
const fs = require('fs')
require('dotenv').config()
const bot = new Telegraf(process.env.TOKEN)var encontrado = 0
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
bot.on('text', ctx => {
	var med = ctx.update.message.text.toLowerCase()
	const rl = readline.createInterface({
  		input: fs.createReadStream('base de dados.txt')
	})
	rl.on('line', (line) => {
		var bula = line.split(";",3)
		if(med==bula[0]){
			ctx.replyWithMarkdown(bula[1]+'\nfonte: '+bula[2])
			encontrado = 1
		}
		if(bula[0]=='eof'&&encontrado==0){
			ctx.reply(med+' não foi encontrado em nossa base de dados\ntente novamente')
		}	
	})
	encontrado=0
})
bot.startPolling()
