const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db.json')
const exp = require('./exp.json')



client.on('message', async message => {
    let addExp = Math.floor(Math.random() * 5) + 1;
   
    if(!exp[message.author.id]) {
      exp[message.author.id] = {
      exp: 0,
      niveau: 1
  
      };
    }
  
    let currentExp = exp[message.author.id].exp;
    let currentNiv = exp[message.author.id].niveau;
    let nextLevel = currentNiv * 100;
    exp[message.author.id].exp = currentExp + addExp;
  
    if(nextLevel <= currentExp) {
      exp[message.author.id].niveau += 1;
      message.reply(`**Bravo, tu es passé niveau ${currentNiv + 1} !**`)
      .then(message => {
        message.delete(5000);
      });
    }
    fs.writeFileSync('./exp.json', JSON.stringify(exp), err => {
      if (err) console.log(err);
    });
  })
fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});

client.login('NzA5NzExNzM4MTk0MzYyMzcpQ')