import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Component, View} from 'angular2/core';

@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <header class="navbar navbar-default navbar-main navbar-static-top" role="banner">
    <div class="container" ng-init="collapsed = true">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" ng-click="collapsed = !collapsed">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a [routerLink]="['Main']" class="navbar-brand logo">Admin client</a>
      </div>
      <nav class="collapse navbar-collapse" collapse="collapsed" role="navigation">
        <ul class="nav navbar-nav navbar-left">
          <li>
            <a [routerLink]="['ContentType', 'ContentTypeList']">Content Types</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  `
})
@Component({
  selector: 'app-header'
})
export class Header {}
