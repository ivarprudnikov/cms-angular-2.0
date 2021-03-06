import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {CORE_DIRECTIVES, Component, View} from 'angular2/core';
import {FindValuePipe} from '../util/findValue'
import {MapToIterablePipe} from '../util/mapToIterable'

@Component({
  selector: 'content-type-edit'
})
@View({
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  pipes: [MapToIterablePipe, FindValuePipe],
  template: `
    <div class="page-head">
    <div class="container">
      <div class="title">
        <h1>Content type - {{item.name}}</h1>
      </div>
      <div class="actions">
        <a ui-sref="^.list" class="btn btn-default btn-sm">List all</a>
        <a ui-sref="^.show({id:item.key})" class="btn btn-default btn-sm">Preview this content type</a>
        <a ui-sref="^.create" class="btn btn-default btn-sm">Create new</a>
      </div>
    </div>
  </div>

  <div class="container">

    <div class="row">

      <div class="col-sm-8">

        <form name="editForm" novalidate ng-submit="save(editForm)">

          <h2>Content type definition</h2>

          <fieldset>
            <legend>Fields</legend>

            <div class="form-group">
              <label for="key">Key</label>
              <input type="text"
                     id="key"
                     class="form-control"
                     placeholder="Content type key"
                     ng-model="item.key"
                     ng-disabled="item.key != null"
                     ng-required="">
              <p class="help-block ">Key is not editable as content might already exist that relies on it.</p>
            </div>

            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" class="form-control" placeholder="Content type name" ng-model="item.name" ng-required="">
            </div>

            <!-- schema fields -->

            <label>Content type fields</label>

            <ul class="list-group">
              <li class="list-group-item" ng-repeat="(k,v) in item.schema.properties">
                <a href="javascript:void(0)" class="pull-right btn btn-link btn-sm" ng-click="editSchemaField(k)">
                  <span class="glyphicon glyphicon-edit"></span>
                  Edit
                </a>
                <a href="javascript:void(0)" class="pull-right btn btn-link btn-sm" ng-click="deleteSchemaField(k)">
                  <span class="glyphicon glyphicon-remove"></span>
                  Remove
                </a>
                <p>
                  <span class="">{{v.title || k}}</span>
                  <span class="label label-default">Key: {{k}}</span>
                  <span class="label label-info">{{v['x-schema-form'].type || v.type}}</span>
                  <span class="label label-warning" ng-repeat="req in item.schema.required | filter:k">Is required</span>
                </p>
                <p>{{v.description}}</p>
              </li>
            </ul>

            <div class="form-group text-right">
              <button type="button" class="btn btn-default btn-sm" ng-click="addSchemaField()">
                <span class="glyphicon glyphicon-plus"></span>
                Add a content field
              </button>
            </div>

            <div class="form-group">
              <label for="name">Primary title field</label>
              <select id="titleField" name="titleField"
                      ng-model="item.titleField"
                      class="form-control"
                      ng-required=""
                      ng-options="k as k for (k,field) in item.schema.properties">
                <!-- id field as default -->
                <option value="">None</option>
              </select>
              <p class="help-block ">Select content type field which will be used as primary title.</p>
            </div>

          </fieldset>

          <p ng-show="editForm.$submitted && editForm.$invalid" class="alert alert-danger">Form is not valid, you need to fix issues before saving</p>

          <div class="form-group text-right">
            <a ui-sref="^.show({id:item.key})" class="btn btn-link btn-lg">Cancel</a>
            <button type="submit" class="btn btn-primary btn-lg" ng-disabled="editForm.$submitted && editForm.$invalid">
              <span class="glyphicon glyphicon-floppy-disk"></span>
              Save changes
            </button>
          </div>

        </form>

        <hr>

        <div class="panel panel-danger">
          <div class="panel-heading">
            Danger zone
          </div>
          <div class="panel-body">
            <div class="actions">
              <a href="javascript:void(0)" ng-click="delete()" class="btn btn-danger" ng-disabled="deleteInProgress">
                <span class="glyphicon glyphicon-remove-circle"></span>
                Delete this content type
              </a>
            </div>
          </div>
        </div>

      </div>

      <div class="col-sm-4">
        <pre>{{item | json}}</pre>
      </div>

    </div>

  </div>
  `
})
export class ContentTypeEdit {
  constructor(routeParams: RouteParams) {
    this.item = {};
  }
  onSubmit(){
    console.log('submitting');
  }
}
