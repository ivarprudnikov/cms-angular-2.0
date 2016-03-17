import {ROUTER_DIRECTIVES, RouteConfig, RouteParams} from 'angular2/router';
import {Component, View} from 'angular2/core';
import {ContentTypeList} from './list';
import {ContentTypeShow} from './show';
import {ContentTypeCreate} from './create';
import {ContentTypeEdit} from './edit';

@Component({
  selector: 'content-type'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: '<router-outlet></router-outlet>'
})
@RouteConfig([
  { path: '/list', component: ContentTypeList, name: 'ContentTypeList' },
  { path: '/show/:id', component: ContentTypeShow, name: 'ContentTypeShow' },
  { path: '/create', component: ContentTypeCreate, name: 'ContentTypeCreate' },
  { path: '/edit/:id', component: ContentTypeEdit, name: 'ContentTypeEdit' }
])
export class ContentType {}
