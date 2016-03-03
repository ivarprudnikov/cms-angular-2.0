'use strict';

angular
  .module('admin.webclient.schema')
  .controller('SchemaFieldModalController', ['FIELD_TYPES', 'FIELD_EDITORS', '$scope', '$modalInstance', 'existingData', 'SchemaService',
    function (FIELD_TYPES, FIELD_EDITORS, $scope, $modalInstance, existingData, SchemaService){

      /* jshint eqeqeq:false, eqnull:true */

      // DEFAULTS
      //////////////////////////////////

      $scope.newFieldItem = {};
      $scope.newFieldItemType = '';
      $scope.fieldTypes = FIELD_TYPES;
      $scope.availableEditorsForField = [];

      // for field preview
      var PREVIEW_FIELD_KEY = '____key';
      $scope.previewFormSchema = {};
      $scope.previewFormUI = ['*'];
      $scope.previewFormModel = {};
      function resetPreviewModel(){
        $scope.previewFormModel = {};
      }
      resetPreviewModel();

      /**
       * get internal field type representation for schema field
       */
      function parseFieldItemType(fieldItem){
        if(fieldItem.type === 'object' && fieldItem.properties && (fieldItem.properties.lat && fieldItem.properties.lon)){
          return FIELD_TYPES.location;
        }
        if(fieldItem.type === 'object' &&
          fieldItem.properties &&
          Object.keys(fieldItem.properties).length === 2 &&
          (fieldItem.properties.id && fieldItem.properties.key)
        ){
          return FIELD_TYPES.entry;
        }
        if(fieldItem.type === 'array' &&
          fieldItem.items &&
          fieldItem.items.type === 'object' &&
          fieldItem.items.properties &&
          Object.keys(fieldItem.items.properties).length === 2 &&
          (fieldItem.items.properties.id && fieldItem.items.properties.key)
        ){
          return FIELD_TYPES.collection;
        }
        return fieldItem.type;
      }

      /**
       * pre-populate data in case field is being edited
       */
      if(existingData != null && angular.isObject(existingData)){

        if(!angular.isObject(existingData.initialValue)){
          throw new TypeError('initialValue {object} is required');
        }
        if(!angular.isString(existingData.key)){
          throw new TypeError('key {string} is required');
        }
        if(existingData.isInitiallyRequired !== true && existingData.isInitiallyRequired !== false){
          throw new TypeError('isInitiallyRequired {boolean} is required');
        }
        $scope.newFieldItem = existingData.initialValue;
        $scope.newFieldItem.key = existingData.key;
        $scope.newFieldItem.isRequired = existingData.isInitiallyRequired;
        $scope.newFieldItemType = parseFieldItemType(existingData.initialValue);
      }

      /**
       * if and when field changes - show available editors, update field metadata
       */
      $scope.$watch('newFieldItemType', function(newVal,oldVal){

        resetPreviewModel();

        if(newVal == null || newVal === ''){
          return;
        }

        var itemBasedOnType = angular.copy($scope.newFieldItem);

        // MANAGE SCHEMA
        ///////////////////////

        delete itemBasedOnType.properties;
        delete itemBasedOnType.required;
        delete itemBasedOnType.items;

        itemBasedOnType.type = newVal;

        // MANAGE FIELD TYPE
        ///////////////////////

        var editors = FIELD_EDITORS[newVal];
        var selectedEditor;

        if(angular.isDefined(editors) && angular.isArray(editors)){
          $scope.availableEditorsForField = editors;

          if( itemBasedOnType['x-schema-form'] && itemBasedOnType['x-schema-form'].type ){
            selectedEditor = itemBasedOnType['x-schema-form'].type;
          }
          if( !selectedEditor || editors.indexOf(selectedEditor) < 0){
            selectedEditor = editors[0];
          }

        } else {
          $scope.availableEditorsForField = [];
        }

        if(!selectedEditor){
          delete itemBasedOnType['x-schema-form'];
        } else {
          itemBasedOnType['x-schema-form'] = { type: selectedEditor };
        }

        $scope.newFieldItem = itemBasedOnType;

      }, true);

      /**
       * after actual type changes, update preview
       */
      $scope.$watch('newFieldItem.type', function(newVal,oldVal){
        var fieldItemForPreview = angular.copy($scope.newFieldItem);
        fieldItemForPreview.key = PREVIEW_FIELD_KEY;
        $scope.previewFormSchema = SchemaService.modifySchemaField({}, fieldItemForPreview);
      }, true);


      // PUBLIC METHODS
      ////////////////////////////

      $scope.save = function (){
        if($scope.newSchemaFieldForm && $scope.newSchemaFieldForm.$valid){
          $modalInstance.close($scope.newFieldItem);
        }
      };

      $scope.cancel = function () {
        $modalInstance.dismiss();
      };

    }]);
