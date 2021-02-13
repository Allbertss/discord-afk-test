const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'NzkxODE1Mjk5Nzg3NjUzMTIy.X-Updg.78BCsxpd-v5_YxaV5e3EVwt9hlg'; // pypupypu

const prefix = '!afk';

client.on('ready', () => {
    console.log('pypupypu... (afk)');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix))
        return;

    const command = message.content.substring(0, prefix.length);
    const arguments = message.content.slice(prefix.length).trim().split(/ +/);

    if (command === prefix) {
        if (arguments[0] == '' || isNaN(arguments[0]))
            message.reply('!afk minutes [reason]');
        else {
            const nickname = message.member.displayName;
            let time = arguments[0] * 60;

            message.member.voice.setMute(true);
            message.member.setNickname(formatNickname(nickname, getMinutes(time), getSeconds(time), arguments));

            const interval = setInterval(() => {
                time -= 5;
                message.member.setNickname(formatNickname(nickname, getMinutes(time), getSeconds(time), arguments));
                if (time <= 0) {
                    message.member.setNickname(nickname);
                    message.member.voice.setMute(false);
                    clearInterval(interval);
                }
            }, 5000);
        }
    }
});

function formatNickname(nickname, mins, secs, args) {
    let temp = '[';
    if (mins < 10)
        temp += '0' + mins + ':';
    else
        temp += mins;

    if (secs < 10)
        temp += '0' + secs;
    else
        temp += secs;

    temp += '] - ';

    if (args.length == 2)
        temp += args[1];
    else
        temp += nickname;

    return temp;
}

function getMinutes(seconds) {
    return Math.floor(seconds / 60);
}

function getSeconds(seconds) {
    return seconds - getMinutes(seconds) * 60;
}

client.login(token);