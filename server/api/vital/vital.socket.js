/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Vital = require('./vital.model');

exports.register = function(socket) {
  Vital.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Vital.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('vital:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('vital:remove', doc);
}