function Header(){}

Header.annotations = [
  new ng.core.View({
    templateUrl: 'scripts/modules/header/views/header.html',
    directives: [ng.router.ROUTER_DIRECTIVES]
  }),
  new ng.core.Component({
    selector: 'app-header'
  })
];

window.app = window.app || {};
window.app.Header = Header;
