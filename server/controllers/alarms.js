// Generated by CoffeeScript 1.6.3
var Alarm, User, time;

time = require('time');

User = require('../models/user');

Alarm = require('../models/alarm');

module.exports.fetch = function(req, res, next, id) {
  var _this = this;
  return Alarm.find(id, function(err, alarm) {
    if (err || !alarm) {
      return res.send({
        error: true,
        msg: "Alarm not found"
      }, 404);
    } else {
      req.alarm = alarm;
      return next();
    }
  });
};

module.exports.all = function(req, res) {
  var _this = this;
  return Alarm.all(function(err, alarms) {
    var alarm, index, _i, _len;
    if (err) {
      return res.send({
        error: 'Server error occurred while retrieving data'
      });
    } else {
      for (index = _i = 0, _len = alarms.length; _i < _len; index = ++_i) {
        alarm = alarms[index];
        alarms[index] = alarm.timezoned();
      }
      return res.send(alarms);
    }
  });
};

module.exports.read = function(req, res) {
  return res.send(req.alarm.timezoned());
};

module.exports.create = function(req, res) {
  var data,
    _this = this;
  data = Alarm.toUTC(req.body);
  return Alarm.create(data, function(err, alarm) {
    if (err) {
      return res.send({
        error: "Server error while creating alarm."
      }, 500);
    } else {
      alarm = alarm.timezoned();
      return res.send(alarm, 201);
    }
  });
};

module.exports.update = function(req, res) {
  var data,
    _this = this;
  data = Alarm.toUTC(req.body);
  return req.alarm.updateAttributes(data, function(err, alarm) {
    if (err != null) {
      return res.send({
        error: "Server error while saving alarm"
      }, 500);
    } else {
      alarm = alarm.timezoned();
      return res.send(alarm, 200);
    }
  });
};

module.exports["delete"] = function(req, res) {
  return req.alarm.destroy(function(err) {
    if (err != null) {
      return res.send({
        error: "Server error while deleting the alarm"
      }, 500);
    } else {
      return res.send({
        success: true
      }, 200);
    }
  });
};