'use strict';

angular
  .module('admin.webclient.schema', [
    'ui.bootstrap',
    'admin.webclient.modals'
  ])
  .constant('FIELD_TYPES', {
    string: 'string',
    boolean: 'boolean',
    number: 'number'
  })
  .constant('FIELD_EDITORS', {
    boolean: ['checkbox'], // alternatives: select,radios
    number: ['number'],
    string: ['text', 'textarea']
  });
