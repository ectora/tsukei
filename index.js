require('dotenv').config();
const { Client, WebhookClient } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });
const hook = new WebhookClient({
      url: process.env.WEBHOOK
});

client.on('ready', () => client.user.setStatus('dnd'));
client.on('messageCreate', async (message) => {
      if (message.author.bot || message.channel.type !== 'GUILD_TEXT') return;
      if (message.guild.id !== process.env,TARGET_GUILD) return;

      await hook.send({
            username: `${message.author.tag} - ${message.author.id}`,
            avatarURL: message.author.displayAvatarURL(),
            content: message.content ? message.content : null,
            files: message.attachments.size ? Array.from(message.attachments.values()) : null
      });
});

client.login(process.env.TOKEN);