import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Component, View} from 'angular2/core';

@View({
  templateUrl: 'scripts/modules/header/views/header.html',
  directives: [ROUTER_DIRECTIVES]
})
@Component({
  selector: 'app-header'
})
export class Header {}
