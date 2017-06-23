'use strict';
require('newrelic');
var st = require('st');
var express = require('express');
var fs = require('fs');
var cons = require('consolidate');
var hbs = require('handlebars');
var app = express();
var dev = app.get('env') === 'development';
var config = require('./data/config.json');
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var querystring = require('querystring');
var B = require('bluebird');

var bodyParser = require('body-parser');
var conversion = require('phantom-html-to-pdf')();

/**
 * Static files
 */
var st_conf = {
  path: dev ? 'app' :'dist',
  url: '/',
  index: 'index.html',
  passthrough: true,
  cache: dev ? false : {
    content: {
      cacheControl: 'public, max-age=' + process.env.ST_MAX_AGE || '600'
    }
  }
};
app.use(st(st_conf));

/**
 * Templating
 */
cons.requires.handlebars = hbs;
cons.requires.handlebars.registerHelper('math', function(lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        '+': lvalue + rvalue,
        '-': lvalue - rvalue,
        '*': lvalue * rvalue,
        '/': lvalue / rvalue,
        '%': lvalue % rvalue
    }[operator];
});
app.set('views', './views');
app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');

/**
 * Checklist exports
 */
app.use(bodyParser.json());
app.post('/api/email', function(req, res){
  req.body.permalink = config.baseUrl + req.body.permalink;
  app.render('email', req.body, function(err, text){
    if (err) {
      return res.status(500).send(err.message);
    }
    var from_email = new helper.Email(config.mailer_from);
    var to_email = new helper.Email(req.body.recipient);
    var content = new helper.Content('text/plain', text);
    var mail = new helper.Mail(from_email, config.mailer_subject, to_email, content);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, function(error){
      if (error) {
        res.status(500).send(error.message);
      }
      res.sendStatus(200);
    });
  });


app.post('/api/feedback', function(req, res){
  req.body.version = process.env.npm_package_version;
  req.body.timestamp = new Date().toISOString();
  app.render('feedback', req.body, function(err, text){
    if (err) {
      return res.status(500).send(err.message);
    }
    var from_email = new helper.Email(config.mailer_from);
    var to_email = new helper.Email(config.feedback_to);
    var content = new helper.Content('text/plain', text);
    var mail = new helper.Mail(from_email, config.feedback_subject, to_email, content);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, function(error){
      if (error) {
        res.status(500).send(error.message);
      }
      res.sendStatus(200);
    });
  });
});

if (config.sms && process.env.NEXMO_KEY && process.env.NEXMO_SECRET) {
  var nexmo = require('easynexmo');
  nexmo.initialize(process.env.NEXMO_KEY, process.env.NEXMO_SECRET, 'https', process.env.NODE_ENV !== 'production');
  app.post('/api/sms', function(req, res){
    var send = B.promisify(nexmo.sendTextMessage, nexmo);
    // Format phone number
    var recipient = req.body.recipient.replace(/\s/g, '');
    recipient = recipient.replace(/^\+/, '');
    recipient = recipient.replace(/^0/, '44');
    app.render('sms', req.body, function(err, text){
      var msgs = [text];
      if (querystring.stringify(text).length > 3600) {
        msgs = text.split('\n');
      }
      B.all(msgs.map(function(msg){
        return send(config.sms_from, recipient, msg, {});
      })).then(function(){
        res.sendStatus(200);
      }).catch(function(err){
        res.sendStatus(500).send(err);
      });
    });
  });
}

app.get('/api/pdf', function(req, res){
  var data = JSON.parse(req.query.data);
  data.permalink = config.baseUrl + data.permalink;
  data.app_domain = config.app_domain;
  fs.readFile('./app/styles/main.css', function(err, styles) {
    data.styles = styles.toString();
    app.render('pdf', data, function(err, html) {
      if (err) {
        return res.status(500).send(err.message);
      }
      conversion({ html: html }, function(err, pdf) {
        if (err) {
          return res.status(500).send(err.message);
        }
        res.attachment('checklist.pdf');
        pdf.stream.pipe(res);
      });
    });
    //console.log('rendering as html');
    //res.render('pdf', data);
  });
});

/**
 * Legacy Routes
 */
app.get('/static/client/index.html', function(req, res){
  res.redirect('/');
});

/**
 * Startup
 */
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
  console.log('App env is ' + app.get('env'));
});
