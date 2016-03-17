import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Component, View} from 'angular2/core';

@Component({
  selector: 'content-type-show'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div class="page-head">
    <div class="container">
      <div class="title">
        <h1>Content type - {{item.name}}</h1>
      </div>
      <div class="actions">
        <a ui-sref="^.list" class="btn btn-default btn-sm">List all</a>
        <a ui-sref="^.create" class="btn btn-default btn-sm">Create new</a>
        <a ui-sref="^.edit({id:item.key})" class="btn btn-default btn-sm">Edit this content type</a>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <h2>Content type properties</h2>
        <dl>
          <dt>Key</dt>
          <dd>{{item.key}}</dd>

          <dt>Name</dt>
          <dd>{{item.name}}</dd>
        </dl>
        <h3>Content type fields</h3>
        <p class="alert alert-danger" ng-hide="fieldKeys.length">
          Please specify which fields are used by this content type
          <a ui-sref="^.edit({id:item.key})" class="btn btn-default btn-sm">Edit this content type</a>
        </p>
        <table class="table table-bordered table-condensed" ng-show="fieldKeys.length">
          <thead>
            <tr>
              <th>Key</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Is required</th>
              <th>Displayed as</th>
              <th>Used as title</th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="field in fieldKeys" ng-class="{'active': item.titleField === field}">
              <td>{{field}}</td>
              <td>{{item.schema.properties[field].title}}</td>
              <td>{{item.schema.properties[field].description}}</td>
              <td>{{item.schema.properties[field].type}}</td>
              <td>{{item.schema.required.indexOf(field) > -1}}</td>
              <td>{{item.schema.properties[field]['x-schema-form'].type || 'default'}}</td>
              <td>{{ item.titleField === field ? 'Yes' : '' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-4">
        <pre>{{ item | json }}</pre>
      </div>
    </div>
  </div>
  `
})
export class ContentTypeShow {
}
