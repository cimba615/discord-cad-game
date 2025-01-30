const { REST, Routes, Client, GatewayIntentBits, ChannelType } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config();

// Environment variables
const clientId = process.env.BOT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;

// Log the configuration
console.log(`\n================ BOT CONFIGURATION ================`);
console.log(`Bot ID:      ${clientId}`);
console.log(`Guild ID:    ${guildId}`);
console.log(`Token:       ${token ? 'Loaded successfully' : 'Missing!'}`);
console.log(`===================================================\n`);

// Initialize the Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
	console.log(`🤖 Bot is online and ready!`);

	// Get the guild
	const guild = client.guilds.cache.get(guildId);
	if (!guild) {
		console.error(`❌ Guild with ID ${guildId} not found.`);
		process.exit(1);
	}

	// Ensure the "TCG" category exists
	const categoryName = "TCG";
	let category = guild.channels.cache.find(
		(channel) => channel.name === categoryName && channel.type === ChannelType.GuildCategory
	);

	if (!category) {
		console.log(`⚙️ Creating category "${categoryName}"...`);
		category = await guild.channels.create({
			name: categoryName,
			type: ChannelType.GuildCategory,
			permissionOverwrites: [
				{
					id: guild.roles.everyone.id,
					allow: ['ViewChannel'],
				},
			],
		});
		console.log(`✅ Category "${categoryName}" created.`);
	} else {
		console.log(`✅ Category "${categoryName}" already exists.`);
	}

	// Load and deploy commands
	const commands = [];
	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		// Ensure a text channel exists for the folder
		const channelName = folder;
		let textChannel = guild.channels.cache.find(
			(channel) => channel.name === channelName && channel.type === ChannelType.GuildText
		);

		if (!textChannel) {
			console.log(`⚙️ Creating text channel "${channelName}" under "${categoryName}"...`);
			textChannel = await guild.channels.create({
				name: channelName,
				type: ChannelType.GuildText,
				parent: category,
				permissionOverwrites: [
					{
						id: guild.roles.everyone.id,
						allow: ['ViewChannel'],
					},
				],
			});
			console.log(`✅ Text channel "${channelName}" created.`);
		} else {
			console.log(`✅ Text channel "${channelName}" already exists.`);
		}

		// Load commands from the folder
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);

			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
				console.log(`✔️ Loaded command from file: ${file}`);
			} else {
				console.warn(`⚠️ Skipped invalid command file: ${file}`);
			}
		}
	}

	// Deploy commands to the guild
	const rest = new REST().setToken(token);
	try {
		console.log(`\n🚀 Deploying ${commands.length} application (/) commands...`);
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands }
		);
		console.log(`✅ Successfully deployed ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(`❌ Error deploying commands:`, error);
		process.exit(1);
	}

	console.log(`\n🎉 Setup complete! Exiting process.`);
	process.exit(0); // Exit the process cleanly
});

// Log in the bot
client.login(token).catch((error) => {
	console.error(`❌ Failed to log in:`, error);
	process.exit(1);
});
