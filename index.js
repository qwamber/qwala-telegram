let Telegraf = require('telegraf');
let urlRegExp = require('url-regex')({ strict: false });
let config = require('./config.json');
let qwala = require('qwala');

let bot = new Telegraf(config.token);

let intoText = (
    'Hi there! I am QwalaBot, and I can help you shorten links.\n\nTo shorten '
        + 'a URL with QwalaBot, simply use the `/qwala` command. I can detect all '
        + 'all of the links in your message and turn them into Qwala links!\n\n'
        + 'For example, `/qwala example.com` would make me shorten the URL `example.com`.\n\n'
        + 'Go ahead, give it a try!'
);

bot.command(['start', 'help'], (context) => {
    context.replyWithMarkdown(intoText);
});

bot.mention(config.username, (context) => {
    context.replyWithMarkdown(intoText);
});

bot.command(config.command, async (context) => {
    let text = context.message.text;

    if (text === '/' + config.command) {
        context.replyWithMarkdown(intoText);
        return;
    }

    let urls = text.match(urlRegExp);

    if (!urls || urls.length === 0) {
        context.reply('Sorry, no URLs were found in your message!');
        return;
    }

    let shortLinkIDs = await Promise.all(urls.map(async (url) => {
        let shortLinkID;

        try {
            shortLinkID = await qwala.shorten(url);
        } catch (error) {
            return url + ' → Error: ' + error;
        };

        return url + ' → ' + config.urlPrefix + shortLinkID;
    }));

    context.reply(shortLinkIDs.join('\n'));
});

bot.startPolling();

console.log('Bot is running!');
