function App(){}

App.annotations = [
  new ng.router.RouteConfig([
    { path: '/', component: window.app.Main, name: 'Main', useAsDefault: true },
    { path: '/content_type/...', component: window.app.ContentType, name: 'ContentType'}
  ]),
  new ng.core.View({
    template: '' +
      '<app-header></app-header>' +
      '<router-outlet></router-outlet>' +
      '<app-footer></app-footer>',
    directives: [ng.router.ROUTER_DIRECTIVES, window.app.Header]
  }),
  new ng.core.Component({
    selector: '#application',
    providers: [
      ng.router.ROUTER_BINDINGS,
      ng.router.ROUTER_PROVIDERS,
      ng.core.provide(ng.router.APP_BASE_HREF, {useValue: '/'}),
      ng.core.provide(ng.router.LocationStrategy, {useClass: ng.router.HashLocationStrategy})
    ]
  })
];

window.app = window.app || {};
window.app.App = App;

