'use strict';

function ContentType(){}
ContentType.annotations = [
  new ng.router.RouteConfig([
    { path: '/', component: ContentTypeList, name: 'ContentTypeList' },
    { path: '/show/:id', component: ContentTypeShow, name: 'ContentTypeShow' },
    { path: '/create', component: ContentTypeCreate, name: 'ContentTypeCreate' },
    { path: '/edit/:id', component: ContentTypeEdit, name: 'ContentTypeEdit' }
  ]),
  new ng.core.Component({
    selector: 'content-type',
    directives: [ng.router.ROUTER_DIRECTIVES],
    template: '<router-outlet></router-outlet>'
  })
];

function ContentTypeList(){
  this.items = [
    { key: 'test', name: 'Test item', schema: { properties: { first: '', second: '' } } }
  ];
}
ContentTypeList.annotations = [
  new ng.core.Component({
    selector: 'content-type-list',
    directives: [ng.router.ROUTER_DIRECTIVES, ng.common.CORE_DIRECTIVES],
    pipes: [window.app.MapToIterablePipe],
    templateUrl: 'scripts/modules/content_type/views/list.html'
  })
];

function ContentTypeShow(){}
ContentTypeShow.annotations = [
  new ng.core.Component({
    selector: 'content-type-show',
    directives: [ng.router.ROUTER_DIRECTIVES],
    templateUrl: 'scripts/modules/content_type/views/show.html'
  })
];

function ContentTypeCreate(){}
ContentTypeCreate.annotations = [
  new ng.core.Component({
    selector: 'content-type-create',
    directives: [ng.router.ROUTER_DIRECTIVES],
    templateUrl: 'scripts/modules/content_type/views/create.html'
  })
];

function ContentTypeEdit(){}
ContentTypeEdit.annotations = [
  new ng.core.Component({
    selector: 'content-type-edit',
    directives: [ng.router.ROUTER_DIRECTIVES],
    templateUrl: 'scripts/modules/content_type/views/edit.html'
  })
];

window.app = window.app || {};
window.app.ContentType = ContentType;
window.app.ContentTypeList = ContentTypeList;
