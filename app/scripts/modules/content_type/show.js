import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Component, View} from 'angular2/core';
import {MapToIterablePipe} from '../util/mapToIterable'
import {CollectionSizePipe} from '../util/collectionSize'


@Component({
  selector: 'content-type-show'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  pipes: [MapToIterablePipe, CollectionSizePipe],
  template: `
  <div class="page-head">
    <div class="container">
      <div class="title">
        <h1>Content type - {{item?.name}}</h1>
      </div>
      <div class="actions">
        <a [routerLink]="['ContentTypeList']" class="btn btn-default btn-sm">List all</a>
        <a [routerLink]="['ContentTypeCreate']" class="btn btn-default btn-sm">Create new</a>
        <a *ngIf="item" [routerLink]="['ContentTypeEdit', {id:item.key}]" class="btn btn-default btn-sm">Edit this content type</a>
      </div>
    </div>
  </div>
  <div class="container" *ngIf="item">
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
        <p class="alert alert-danger" *ngIf="!(item.schema.properties | collectionSize)">
          Please specify which fields are used by this content type
          <a [routerLink]="['ContentTypeEdit', {id:item.key}]" class="btn btn-default btn-sm">Edit this content type</a>
        </p>
        <table class="table table-bordered table-condensed" *ngIf="item.schema.properties | collectionSize">
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
            <tr *ngFor="#field of item.schema.properties | mapToIterable" [ngClass]="{'active': item.titleField === field}">
              <td>{{field.key}}</td>
              <td>{{field.value.title}}</td>
              <td>{{field.value.description}}</td>
              <td>{{field.value.type}}</td>
              <td>{{item.schema.required && item.schema.required.indexOf(field.key) > -1}}</td>
              <td>{{field.value['x-schema-form']?.type || 'default'}}</td>
              <td>{{item.titleField === field ? 'Yes' : '' }}</td>
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
  constructor() {
    this.item = null;
  }

  routerOnActivate(nextInstruction, prevInstruction){
    this.item = {key: 'test', name: 'Test item', schema: {properties: {first: '', second: ''}}};
  }
}
