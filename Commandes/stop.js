const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
  
if(!'592020332928565354'.includes(message.author.id)){ return message.channel.send(":warning: Vous n'avez pas la permission !"); }
    
	let emmbed = new Discord.RichEmbed()
	.setTitle(`Eteint par ${message.author.tag}`)
	.setColor('RANDOM');
	
	message.channel.send(emmbed)

	
	}
  
module.exports.help = {
    name: 'stop',
};
