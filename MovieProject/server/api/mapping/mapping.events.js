/**
 * Mapping model events
 */

'use strict';

import {EventEmitter} from 'events';
import Mapping from './mapping.model';
var MappingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MappingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Mapping.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MappingEvents.emit(event + ':' + doc._id, doc);
    MappingEvents.emit(event, doc);
  }
}

export default MappingEvents;
