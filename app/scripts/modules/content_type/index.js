import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, RouteParams} from 'angular2/router';
import {CORE_DIRECTIVES, Component, View} from 'angular2/core';
import {FindValuePipe} from '../util/findValue'
import {MapToIterablePipe} from '../util/mapToIterable'

@Component({
  selector: 'content-type-list'
})
@View({
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  templateUrl: 'scripts/modules/content_type/views/list.html',
  pipes: [MapToIterablePipe]
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


@Component({
  selector: 'content-type'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: '<router-outlet></router-outlet>'
})
@RouteConfig([
  { path: '/list', component: ContentTypeList, name: 'ContentTypeList' },
//  //{ path: '/show/:id', component: ContentTypeShow, name: 'ContentTypeShow' },
//  //{ path: '/create', component: ContentTypeCreate, name: 'ContentTypeCreate' },
//  //{ path: '/edit/:id', component: ContentTypeEdit, name: 'ContentTypeEdit' }
])
export class ContentType {}




@Component({
  selector: 'content-type-show'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'scripts/modules/content_type/views/show.html'
})
export class ContentTypeShow {
}


@Component({
  selector: 'content-type-create'
})
@View({
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  templateUrl: 'scripts/modules/content_type/views/create.html',
  pipes: [MapToIterablePipe, FindValuePipe]
})
export class ContentTypeCreate {
  constructor(routeParams: RouteParams) {
    this.newItem = {};
  }
  onSubmit(){
    console.log('submitting');
  }
}


@Component({
  selector: 'content-type-edit'
})
@View({
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  templateUrl: 'scripts/modules/content_type/views/edit.html',
  pipes: [MapToIterablePipe, FindValuePipe]
})
export class ContentTypeEdit {
  constructor(routeParams: RouteParams) {
    this.item = {};
  }
  onSubmit(){
    console.log('submitting');
  }
}
