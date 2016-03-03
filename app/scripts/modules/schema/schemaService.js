'use strict';

angular
  .module('admin.webclient.schema')
  .factory('SchemaService',['SchemaFieldModalFactory', 'ModalFactoryForDelete', function(SchemaFieldModalFactory, ModalFactoryForDelete){

    function modifySchemaField(schema, field){

      schema = schema || {};
      schema.type = 'object';
      schema.properties = schema.properties || {};
      schema.required = schema.required || [];

      var requiredIndex = schema.required.indexOf(field.key);
      var isAlreadyRequired = (requiredIndex > -1);

      if(field.isRequired && !isAlreadyRequired){
        schema.required.push(field.key);
      } else if(!field.isRequired && isAlreadyRequired) {
        schema.required.splice(requiredIndex,1);
      }

      schema.properties[field.key] = {
        type: field.type,
        title: field.title
      };

      if(field.description){
        schema.properties[field.key].description = field.description;
      } else {
        schema.properties[field.key].description = '';
      }

      if(field.type === 'array'){
        schema.properties[field.key].items = field.items;
      }

      if(field.type === 'object'){
        schema.properties[field.key].properties = field.properties;
      }

      if(field['x-schema-form']){
        schema.properties[field.key]['x-schema-form'] = field['x-schema-form'];
      }

      if(field.required && field.required.length){
        schema.properties[field.key].required = field.required;
      }

      return schema;
    }

    function addField(schema){
      SchemaFieldModalFactory.open().then(function(field){
        modifySchemaField(schema, field);
      });
    }

    function editField(schema, key){

      schema = schema || {};
      schema.properties = schema.properties || {};
      schema.required = schema.required || [];

      var initialValue = angular.copy(schema.properties[key]);
      var isInitiallyRequired = (schema.required.indexOf(key) > -1);

      SchemaFieldModalFactory.open({
        key: key,
        initialValue:initialValue,
        isInitiallyRequired:isInitiallyRequired
      }).then(function(field){
        modifySchemaField(schema, field);
      });
    }

    function deleteField(schema, key){

      schema = schema || {};
      schema.properties = schema.properties || {};
      schema.required = schema.required || [];

      ModalFactoryForDelete.open().then(function(){
        delete schema.properties[key];

        schema.required = schema.required || [];
        var requiredIndex = schema.required.indexOf(key);
        var isAlreadyRequired = (requiredIndex > -1);
        if(isAlreadyRequired){
          schema.required.splice(requiredIndex,1);
        }
      });
    }

    return {
      modifySchemaField: modifySchemaField,
      addField: addField,
      editField: editField,
      deleteField: deleteField
    };

  }]);
