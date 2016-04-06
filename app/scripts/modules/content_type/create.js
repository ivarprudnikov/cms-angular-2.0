import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {Component, View} from 'angular2/core';
import {FindValuePipe} from '../util/findValue'
import {MapToIterablePipe} from '../util/mapToIterable'

@Component({
  selector: 'content-type-create'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  pipes: [MapToIterablePipe, FindValuePipe],
  template: `
  <div class="page-head">
    <div class="container">
      <div class="title">
        <h1>Create new content type</h1>
      </div>
      <div class="actions">
        <a [routerLink]="['ContentTypeList']" class="btn btn-warning btn-sm">Cancel</a>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-sm-6">
        <h2>Content type definition</h2>
        <form (ngSubmit)="onSubmit()" #formCreate="ngForm">
          <div class="form-group">
            <label for="key">Key</label>
            <input type="text" id="key" class="form-control" placeholder="Content type key" [(ngModel)]="newItem.key" autofocus>
          </div>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" class="form-control" placeholder="Content type name" [(ngModel)]="newItem.name">
          </div>
          <hr>
          <label>Content type fields</label>
          <ul class="list-group">
            <li class="list-group-item" *ngFor="#entry of newItem.schema?.properties | mapToIterable">
              <a href="javascript:void(0)" class="pull-right btn btn-link btn-sm" (click)="editSchemaField(entry.key)">Edit</a>
              <a href="javascript:void(0)" class="pull-right btn btn-link btn-sm" (click)="deleteSchemaField(entry.key)">Delete</a>
              <p>
                <span>{{entry.key}}</span>
                <span>{{entry.value.type}}</span>
                <span *ngFor="#req of newItem.schema?.required | findValue:entry.key">Is required</span>
              </p>
              <p>{{entry.value.description}}</p>
            </li>
          </ul>
          <div class="form-group">
            <button type="button" class="btn btn-default" (click)="addSchemaField()">Add a content field</button>
          </div>
          <div class="form-group">
            <label for="name">Primary title field</label>
            <select id="titleField"
                    name="titleField"
                    [(ngModel)]="newItem.titleField"
                    class="form-control"
                    required>
              <option value="">None</option>
              <option *ngFor="#prop of newItem.schema?.properties | mapToIterable" [value]="prop.key">{{prop.key}}</option>
            </select>
            <p class="help-block">Select content type field which will be used as primary title.</p>
          </div>
          <hr>
          <div class="actions">
            <button type="submit"
                    class="btn btn-primary"
                    [disabled]="!formCreate.form.valid">Save</button>
          </div>
        </form>
      </div>
      <div class="col-sm-6">
        <pre>{{ newItem | json }}</pre>
      </div>
    </div>
  </div>
  `
})
export class ContentTypeCreate {
  constructor(routeParams: RouteParams) {
    this.newItem = {};
  }
  onSubmit(){
    console.log('submitting');
  }
}
