require('dotenv').config();
const { Client, WebhookClient, MessageEmbed } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });
const hook = new WebhookClient({
      url: process.env.WEBHOOK
});

client.on('ready', () => client.user.setStatus('invisible'));

client.on('messageUpdate', async (oldMsg, newMsg) => {
      hook.send({
            embeds: [
                  new MessageEmbed()
                        .setColor('BLURPLE')
                        .setAuthor({ name: `${message.author.tag} (${message.author.id})`, iconURL: newMsg.author.displayAvatarURL() })
                        .addFields([
                              { name: 'Before', value: oldMsg.content },
                              { name: 'After', value: newMsg.content }
                        ])
            ]
      });
});

client.on('messageCreate', async (message) => {
      if (message.author.bot || message.channel.type !== 'GUILD_TEXT') return;
      if (message.guild.id !== process.env.TARGET_GUILD) return;

      await hook.send({
            username: `${message.author.tag} - ${message.author.id}`,
            avatarURL: message.author.displayAvatarURL(),
            content: message.content ? message.content : null,
            files: message.attachments.size ? Array.from(message.attachments.values()) : null
      });
});

client.login(process.env.TOKEN);
