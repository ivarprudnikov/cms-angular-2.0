import {Main} from './modules/main/index'
import {Header} from './modules/header/index'
import {ContentType} from './modules/content_type/index'
import {APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, RouteParams, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {provide, Component, View, Input} from 'angular2/core';

@Component({
  selector: '#application',
  viewProviders: [
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
  ]
})
@View({
  directives: [ROUTER_DIRECTIVES, Header],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
@RouteConfig([
  { path: '/', component: Main, name: 'Main', useAsDefault: true },
  { path: '/content_type/...', component: ContentType, name: 'ContentType'}
])
export class App {}
