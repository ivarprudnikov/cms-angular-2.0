import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Component, View} from 'angular2/core';
import {MapToIterablePipe} from '../util/mapToIterable'

@Component({
  selector: 'content-type-list'
})
@View({
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  pipes: [MapToIterablePipe],
  template: `
  <div class="page-head">
    <div class="container">
      <div class="title">
        <h1>Content types</h1>
      </div>
      <div class="actions">
        <a [routerLink]="['ContentTypeCreate']" class="btn btn-default btn-sm">Create new</a>
      </div>
    </div>
  </div>
  <div class="container">
    <table class="table table-bordered table-striped">
      <thead>
      <tr>
        <th>Key</th>
        <th>Name</th>
        <th>Properties</th>
      </tr>
      </thead>
      <tbody>
        <tr *ngFor="#item of items">
          <td>
            <a [routerLink]="['ContentTypeShow', {id:item.key} ]">{{ item.key }}</a>
          </td>
          <td>{{ item.name }}</td>
          <td>
            <span class="label label-default" *ngFor="#entry of item.schema.properties | mapToIterable">{{entry.key}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
export class ContentTypeList {

  constructor() {
    this.items = [];
  }

  routerOnActivate(nextInstruction, prevInstruction){
    this.items = [
      {key: 'test', name: 'Test item', schema: {properties: {first: '', second: ''}}}
    ];
  }
}
