var fs = require('fs');
var nodemailer = require('nodemailer');
var argv = require('minimist')(process.argv.slice(2));

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'foo@gmail.com',
        pass: 'pswd'
    }
});
var mailOptions = {
    from: 'From <foo@from.com>',
    to: 'foo@example.com',
    subject: 'Hello ✔',
    text: 'Hello world ✔',
    html: '<b>Hello world ✔</b>'
};

if(argv.h || argv.html) {
    mailOptions.html = fs.createReadStream(argv.h || argv.html);
}


if(argv.a || argv.attachDir) {
    mailOptions.attachments = [{
        filename: 'example.pdf',
        content: fs.createReadStream(argv.a || argv.attachDir)
    }];
}

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});