const http = require('http');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200)
});
app.listen(process.env.PORT);
const Discord = require("discord.js");
const fs = require("fs");
const DBL = require("dblapi.js");
const db = require('quick.db'); 
const ms = require('ms')
const config = require("./config.json"); 
const currency = config.currency
// Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
//so u know what the problem is? 
var devs = ['602259629820346385']
const ownerID = "602259629820346385"; 
const client = new Discord.Client();
const server = http.createServer(app);
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTQ1NDUyNjUxNzg3MDYwNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTY3MDIwMTYyfQ.Fzd-9qxPrj7IQycboAFb_WlphfaBfUWYgF0o-hrmLGA', { webhookAuth: 'password', webhookServer: server });
let prefix = config.prefix
let bot = client; 
bot.commands = new Discord.Collection();

dbl.webhook.on('ready', hook => {
  console.log(`Webhook running with path ${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
});

app.get('/', (req, res) => {
  // ...
});

server.listen(5000, () => {
  console.log('Listening');
});

dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})


function game2(){
        bot.user.setPresence({
        game: {
            name: client.users.size,
            type: "LISTENING"
        }
      });
    setTimeout(game3, 300000);
};

function game3(){
            bot.user.setPresence({
        game: {
            name: `Prefix: s!`,
            type: "PLAYING"
        }
      });
    setTimeout(game2, 300000);
};

client.on("debug", (e) => console.info(e));
client.on("ready", () => {
  setTimeout(game2, 15000);
  // This event will run if the bot starts, and logs in, successfully. 
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    console.log("Connected as " + client.user.tag) 
    console.log(` `);
    console.log(`Will Now be Logging Commands`);
    console.log(`====================================`);
    console.log(`Command Logs:`);
    console.log(` `);  
client.user.setActivity(`With ${client.guilds.size} Guilds`, {type: "PLAYING"}) 
  setInterval(() => {
        dbl.postStats(client.guilds.size, client.shards.Id, client.shards.total);
    }, 1800000);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
client.channels.get('613154435551461386').send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
client.user.setActivity(`With ${client.guilds.size} Guilds`, {type: "WATCHING"}) 
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
client.channels.get('613154435551461386').send(`I have been removed from: ${guild.name} (id: ${guild.id})`);
client.user.setActivity(`With ${client.guilds.size} Guilds`, {type: "LISTENING"}) 
});

client.on("message", async (message) => {   
  // This event will run on every single message received, from any channel or DM.
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot)return;
  
  if(!message.content.startsWith(prefix))return;
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(":ping_pong: Pong! " + Math.round(bot.ping) + "ms!");
	console.log(`${message.author.tag} used "ping" command.`);
    client.channels.get("613154435551461386").send(`${message.author.tag} used "ping" command.`);
  }
  
  if(command === 'balance' || command === 'bal') {
   let user = message.mentions.users.first() || message.author;
    let balance = await db.fetch(`money.${user.id}`);
    if(balance === null) balance = 0;
console.log(balance) 

    message.channel.send({embed: {
        title: `${user.tag} Balance`,
        color: 0x66cc00,
        description: `**$${balance}**`
    }});

  }
  
  if (command === 'serverinfo') {
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };
    const embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .addField("Name", message.guild.name, true)
        .addField("ID", message.guild.id, true)
        .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField("Region", region[message.guild.region], true)
        .addField("Total | Humans | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
        .addField("Verification Level", verifLevels[message.guild.verificationLevel], true)
        .addField("Channels", message.guild.channels.size, true)
        .addField("Roles", message.guild.roles.size, true)
        .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        .setThumbnail(message.guild.iconURL)
    message.channel.send({embed});
    console.log(`${message.author.tag} used serverinfo command`);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "serverinfo" command`);
  }
  
  if(command === "createinv"){
     if(!devs.includes(message.author.id)) return message.channel.send(`You can't do that.`) 
      if(args[0]){
     const guild = args[0]
    let channelID;
    let channels = bot.guilds.get(guild).channels
    channelLoop:
    for(let c of channels){
    let channelType =c[1].type;
    if(channelType === "text"){
    channelID = c[0]
   break channelLoop
  }}
  bot.channels.get(channelID).createInvite({maxAge: 0})
.then(invite=>message.author.send(`${invite}`))
}else{
message.channel.send("Please state a server ID")
}}
  
  if(command === 'work') {
    console.log(await db.fetch(`money.${message.author.id}`))
    var max = 100
    var min = 20
    var random = Math.random() * (+max - +min) + +min; 
    var bal = Math.round(random)
    db.add(`money.${message.author.id}`, bal);
    message.channel.send('You earned $' + bal)
  }
  
  if(command === 'autowork') {
    if(!devs.includes(message.author.id)) return message.channel.send(`you can\'t do that.`) 
    let status = await db.fetch(`${message.author.id}.autowork`)
    if(status === 1) return message.channel.send(`You already have autowork on! Use s!end first`)
    var max = 100
    var min = 20
    console.log(`${message.member.tag} has started to autowork`)
     client.autowork = setInterval(function() {
      var random = Math.random() * (+max - +min) + +min; 
    var bal = Math.round(random)
      db.add(`money.${message.author.id}`, bal);
      message.channel.send(`${message.author} earned $${bal}`) 
    }, 10000)
    message.channel.send(`Autowork Started. Use ${prefix}end to stop.`)
    db.add(`${message.author.id}.autowork`, 1)
  }
  if(command === 'end') {
    let autostatus = await db.fetch(`${message.author.id}.autowork`)
    if(autostatus !== 1) return message.channel.send(`Autowork is not enabled.`)
    db.subtract(`${message.author.id}.autowork`, 1)
    clearInterval(client.autowork)
    message.channel.send(`Ending Autowork`)
    
  }

   if(command === 'add') { 
    if(!devs.includes(message.author.id)) return message.channel.send(`You can't do that.`)
    let user = message.mentions.users.first() || args[0]
    if(!user) return message.channel.send(`Couldn't find user.`)
    if(args.slice(1).join(" ") === 'all') {
      var amt = await db.fetch(`money.${user.id}`)
    } else {
    var amt = parseInt(args.slice(1).join(" "), 10)
    }
    console.log(amt)
    if(!amt) return message.channel.send(`Couldn't find amount.`)
    db.add(`money.${user.id}`, amt)
    var oldbal = await db.fetch(`money.${user.id}`)-amt
    var newbal = await db.fetch(`money.${user.id}`)
    let balembed = new Discord.RichEmbed()
    .setTitle(`Balance Added`)
    .addField('Old Balance', oldbal)
    .addField('New Balance', newbal)
    .addField('Amount Added', amt)
    .setColor('GREEN')
    message.channel.send(balembed)
  } 
  
  if(command === 'remove') {
    if(!devs.includes(message.author.id)) return message.channel.send(`You can't do that.`)
    let user = message.mentions.users.first()  
     let balance = await db.fetch(`money.${user.id}`);
    console.log(balance)
    if(!user) return message.channel.send(`Couldn't find user.`)
    if(args.slice(1).join(' ') === 'all') {
      var amt = balance
    } else {
    var amt = parseInt(args.slice(1).join(' '), 10)
    }
    console.log(amt)
    if(!amt) return message.channel.send(`Couldn't find amount.`)
    db.subtract(`money.${user.id}`, amt)
    var oldbal = await db.fetch(`money.${user.id}`)+amt
    var newbal = await db.fetch(`money.${user.id}`)
    let balembed = new Discord.RichEmbed()
    .setTitle(`Balance Removed`)
    .addField('Old Balance', oldbal)
    .addField('New Balance', newbal)
    .addField('Amount Removed', amt)
    .setColor('RED')
    message.channel.send(balembed)
  }
  if(command === 'pay') {
     let user = message.mentions.users.first() || args[0]

    let mybal = db.fetch(`money.${message.author.id}`)
    if(args[1] === 'all') {
      let amt = mybal
    } else {
      let amt = args[1]
    }


    if (!user) {
        return message.channel.send(`Couldn't find user.`)
    }
    if(user === message.author) {
      return message.channel.send(`You can't pay yourself!`)
    }
    
    if(user.bot) {
     return message.channel.send(`You can't pay a bot!`)
    }
  
    if (!amt) {
        return message.channel.send('Please specify an amount.')
    }  if (amt.includes('-')) { // if the message includes "-" do this.
        return message.channel.send(`You can't pay a negative amount!`)
    }

    if (mybal < amt) {
        return message.channel.send(`You don't have enough money.`) 
    }
    db.add(`money.${user.id}`, parseInt(amt, 10))
    db.subtract(`money.${message.author.id}`, parseInt(amt, 10))
    let youroldbal = await db.fetch(`money.${message.author.id}`)+parseInt(amt, 10)
    let yournewbal = await db.fetch(`money.${message.author.id}`)
    let theiroldbal = await db.fetch(`money.${user.id}`)-parseInt(amt, 10)
    let theirnewbal = await db.fetch(`money.${user.id}`)
    
    let payEmbed = new Discord.RichEmbed()
    .setTitle(`Amount Payed`)
    .addField(`Your Money`, `Former: $${youroldbal}\n Now: $${yournewbal}`)
    .addField(`${user.user.username}'s Money`, `Former: $${theiroldbal}\n Now: $${theirnewbal}`)
    .setColor(`#ffa500`)
    message.channel.send(payEmbed)
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
	console.log(`${message.author.tag} used "say" command. Check #deleted-messages-log to see the original message. `);
    client.channels.get("613154435551461386").send(`${message.author.tag} used "say" command. Check #deleted-messages-log to see the original message.`);
  }
  
  else if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator", "Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
	 console.log(`${message.author.tag} used "kick" command. ${member.user.tag} has been kicked by ${message.author.tag} because: ${reason} `);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "kick" command. 
    ${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  else if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator", "Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
	console.log(`${message.author.tag} used "ban" command. ${member.user.tag} has been banned by ${message.author.tag} because: ${reason} `);
    client.channels.get("598335234425094146").send(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    const deleteCount = parseInt(args[0], 10);
    if(!message.member.roles.some(r=>["Owner", "Admin", "Moderator", "Staff"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

      if(!deleteCount || deleteCount < 5 || deleteCount > 1000)
      return message.reply("Please provide a number between 5 and 1000 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
      console.log(`${message.author.tag} used "purge" command`);
      client.channels.get("613154435551461386").send(`${message.author.tag} Used the "purge" command. 
      Check #deleted-messages-log to see what was deleted.`);
  }
  
  if (command === "asl") {
  let age = args[0]; // Remember arrays are 0-based!.
  let sex = args[1];
  let location = args[2];
  message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
   console.log(`${message.author.tag} used asl command`);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "asl" command`);
  } 
  
  if (command === "avatar") {
 let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }
  else if (args.id) {
    user = await bot.utils.fetchMember(message.guild, args.id);
    if (user) {
      user = user.user;
    }
  }
  if (!user) {
    user = message.author;
  }

  await message.channel.send({
    embed: {
      color: 3015751,
      fields: [
        {
          name: 'Avatar',
          value: user.tag
        }
      ],
      image: {
        url: user.displayAvatarURL
      },
      footer: {
       text: `Requested By: ${message.author.username}`,
       icon_url: message.author.displayAvatarURL
      },
    }
  });
	 console.log(`${message.author.tag} used avatar command`);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "avatar" command`);
  }
  
  if(command === 'usercount') {
    let total = bot.users.size
    let inserver = message.guild.members.size
    let cEmbed = new Discord.RichEmbed()
    .setTitle('User Count')
    .addField('In This Server', inserver)
    .addField('Total Users', total)
    message.channel.send(cEmbed)
      console.log(`${message.author.tag} used usercount command`);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "usercount" command`);
	
  }
  
  if(command === "whois") { //Checks if messages starts with "k!whois"
        let memberToFind = message.mentions.members.first(); //Checks for a mentioned user (@eSkuzi#0001)
 
        if (!memberToFind) { //If no member is mentioned, throw this error
            return message.channel.send('You must mention a member for this command'); //Send message and stop executing code
        }
 
        let embed = new Discord.RichEmbed()
              .setAuthor(memberToFind.user.tag, memberToFind.user.avatarURL) //This will show the users tag and avatar - there was no need to stringify that text :P
            .addField('Account Created', memberToFind.user.createdAt, true) //Shows when the user was registered
            .addField('Joined this Server', message.guild.members.find('id', memberToFind.id).joinedAt, true) //Shows when the user joined the guild
            .addField('User ID', memberToFind.id, true) //Shows the user ID
            .setColor(0xffffff) //Make the embed white
            .setFooter('Searched User') //Add a footer
            .setTimestamp() //Timestamp the footer
 
 
        message.channel.send(embed);
    console.log(`${message.author.tag} used whois command`);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "whois" command`); 
	  
  } 
  
  if(command === "beep") {
    const m = await message.channel.send(`Gathering hot to boop....`);
     m.edit(`boop`);
	  console.log(`${message.author.tag} used beep command`);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "beep" command`);

  } 
  
  if(command === "invite") { 

     const exampleEmbed = new Discord.RichEmbed()
  	 .addField(`Invite Link`, `https://discordapp.com/api/oauth2/authorize?client_id=605454526517870604&permissions=930327783&scope=bot`) 
	   .setColor(``)
     message.channel.send(exampleEmbed);
	  console.log(`${message.author.tag} used invite command`);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "invite" command`);
  
  } 
  
  if(command === "support") { 
    const m = await message.channel.send(`Gathering Support Server`); 
	 m.edit(`join the support server here --> https://discord.io/Storm1294`); 
	  console.log(`${message.author.tag} used support command`);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "support" command`);
	 
  } 
  
    if(command === "help") {
      const embed = new Discord.RichEmbed()
  .setTitle('Storm Jr. Commands')
  .setColor('#00FFFF')
  .addField('s!help','displays all commands')
  .addField('s!ban','bans a user from your server')
  .addField('s!kick','kicks a user from your server')
  .addField('s!say','Makes the bot say what you want')
  .addField('s!purge','deletes messages up to 100')
  .addField('s!invite','posts a link to invite the bot to your server')
  .addField('s!usercount','shows total users')
  .addField('s!support','sends support server link')
  .addField('s!uptime','shows uptime for bot')
  .addField('s!avatar','shows your avatar or s!avatar @playerid')
  .addField('s!cointoss','flips heads or tails')
  .addField('s!beep','simply replies with boop')
  .addField('s!ping','replies with latency and api latency')
  .addField('s!mute','mute someone')
  .addField('s!unmute','unmutes someone')
  .addField('s!bal | s!balance','shows your balance')
  .addField('s!work','earns money')
  .addField('s!whois','shows info about userid')
  .addField('s!botinfo', 'shows info about the bot')
  .addField('s!serverinfo', 'shows info about the server')
  .addField('s!asl', 'sets your asl (age, sex, and location)')
  
    message.channel.send(embed);
    const m = await message.channel.send(`Getting Help Page`);
    console.log(`${message.author.tag} used help command`);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "help" command`);
  }
  
  if(command === "botinfo") { 
  
     const exampleEmbed = new Discord.RichEmbed()
	.setTitle(`Made By Stormy#7828`)
	.addField(`Amount Of Servers`, `${bot.guilds.size}`) 
	.addField(`Account Created`, `Mon, Jul 29, 2019 1:40 PM`, `true`) 
  .addField(`Users`, `${client.users.size}`)
	.addField(`User ID`, `605454526517870604`) 
	.addField(`Status:`, `Online`) 
  .setThumbnail(``)	 
	.setColor(`#0099ff`)

     message.channel.send(exampleEmbed);
      console.log(`${message.author.tag} used botinfo command`);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "botinfo" command`);
  } 
  
  if(command === 'argsinfo') {
	if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	message.channel.send(`Command name: ${command}\nArguments: ${args}`);
   console.log(`${message.author.tag} used argsinfo command`);
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "argsinfo" command`);
  }
  
  if(command === "mute") {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply('I don\'t have the permission to do that, give me permissions!');

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.reply("You need to write someones ID or mention someone!");

    if(toMute.id === message.author.id) return message.reply("You can\'t mute yourself!");
    if(toMute.id === bot.user.id) return message.reply("**nice try :)**");
    if(toMute.id === message.guild.owner.id) return message.reply("you can't mute the Owner of this Guild.")
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.reply("You can\'t mute someone with a higher role or the same as yours!");

    let role = message.guild.roles.find(r => r.name === "Muted");
    if(!role) {
        try {
            role = message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            });
        message.guild.channels.forEach((channel, id) => {
            channel.overwritePermissions(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
        } catch(e) {
            console.log(e.stack);
        }
    }
    if(toMute.roles.has(role)) return message.reply("This user is already muted!");

    toMute.addRole(role);
    message.channel.send(`${toMute} successfully muted`).then(message => {
        message.react("✅")
    });
    console.log(`${toMute.user.tag} got muted by ${message.author.tag} in ${message.channel.name}`)
    toMute.send(`You got *muted* in the Discord server **${message.guild.name}**`)
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "mute" command`); 
  } 
  
  if(command === "unmute") {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply('I don\'t have the permission to do that, give me permissions!');

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.reply("You need to write someones ID or memtion someone!");

    let role = message.guild.roles.find(r => r.name === "Muted");

    if(!role || !toMute.roles.has(role.id)) return message.reply("This member is not muted!");

    toMute.removeRole(role);
    message.channel.send(toMute +" successfully unmuted!").then(message => {
        message.react("✅")
    });
    console.log(`${toMute.user.tag} got unmuted by ${message.author.tag} in ${message.channel.name}`)
    toMute.send("You got *unmuted* in the Discord server **MoneyDropLoby**")
    return;
	  client.channels.get("613154435551461386").send(`${message.author.tag} Used the "unmute" command`);
  } 
  
  if(command === "cointoss") {

    var cointoss = [
        "Heads",
        "Tails"
    ]
    var randomCointoss = cointoss[Math.floor(Math.random() * cointoss.length)];

     message.channel.send("You flipped.. **" + randomCointoss + "**")
    console.log(`${message.author.tag} used cointoss command`)
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "cointoss" command`);
  } 

  if(command === "uptime") {
let totalSeconds = (bot.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
  let uptime = `${days} days, ${hours} hours, and ${minutes} minutes`;
   message.channel.send(uptime)
    console.log(`${message.author.tag} used uptime command`)
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "uptime" command`);
  }
  
  if(command === 'servers') {
    if(!devs.includes(message.author.id)) return message.channel.send(`You can't do that.`) 
    var format = '\n'
    let slist = bot.guilds.map(g=>`${g.name} (${g.id})`).join(format)
    let sembed = new Discord.RichEmbed()
    .setTitle('Servers')
    .setDescription(slist)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTimestamp()
    .setColor('BLURPLE')
    
    message.channel.send({embed: sembed}) 
    message.channel.send(`Serving ${bot.guilds.size} servers`)
    console.log(`${message.author.tag} used servers command`)
    client.channels.get("613154435551461386").send(`${message.author.tag} Used the "servers" command`);
  } 
  
  if(command === "eval") {
    console.log(devs)
if(devs.includes(message.author.id)) {
      try {
        const code = args.join(" ");
        if(code.includes('process.env.token')) return message.channel.send('You can\'t reveal my token!')
        let evaled = eval(code);
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        console.log();((evaled), {code:"xl"});
      }catch (err) {
        console.log(`\`ERROR\` \`\`\`xl\n${(err)}\n\`\`\``);
      }
    }
  } 
   
  if(command === 'status') { 
    if(devs.includes(message.author.id))
    bot.user.setActivity(`${args.join(' ')}`)
    message.channel.send(':white_check_mark: Successfully changed status')
  }
  
  if(command === "reset") {
    if(!devs.includes(message.author.id)) return message.channel.send(`you can\'t do that.`) 
    resetBot(message.channel);
   function resetBot(channel) {
     message.channel.send('Bot is restarting')
   bot.user.setActivity(`Restarting...`)
  message.reply(':white_check_mark: Bot has been restarted successfully!')
    .then(msg => bot.destroy())
    .then(() => client.login(process.env.token))
   }
  }
});
client.login(process.env.token); 
