# Discord TCG

This is a Trading Card Game (discord) bot.

> Development is under progress. Bugs and issues can be encountered!

## How to use

Discord Bots run on a physical machine and need high resource (ram, cpu, internet). Recommended to use VM's or dedicated services.

### Requirements

1. MySQL `Compulsory` [See Website](https://www.mysql.com/).
2. Nodejs `v20 or higher` [See Website](https://nodejs.org/en).
3. Git [See Website](https://git-scm.com/).
4. A Discord Developer Account.
   - A registered application.
   - A registered bot.
5. A Discord Server/Guild.

### Setup

1. **Clone Repo**

    `git clone https://github.com/cimba615/discord-cad-game.git`

    `cd discord-card-game`

2. **MySQL Setup**
    - Make sure to use generic MySQL or its derivatives.
    - Create a database `TCG`.
    - Create a user with password.
    - Make sure to give proper privileges.

2. **Nodejs/DB Client Setup:**

    - `npm install`
    - `npx prisma migrate deploy`
    - `prisma generate`

3. **Environment Setup**
    - Rename `.env.sample` to `.env`.
    - Replace the credentials with your's as described in the file.
4. **Guild Setup**
   - You may first setup your guild; `npm run setup-guild`, this command will create all necessary channels and register commands on your Server.
5. **Operating Bot**
    - `npm run start` is the main command to make bot **_On-Air_**.
  
  > **Important Note:** Discord bot needs to remain active with the `start` command. Otherwise bot will not respond to any of the interaction. Any interruption to `start` process (system-failure/process termination) will imidiately kill the bot and every ongoing process i.e., matches, trades-brockership will be lost.



Latest Progress and Updates are available in `ToDo.md`.