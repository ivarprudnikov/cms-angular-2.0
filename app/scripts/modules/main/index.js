function Main(){}

Main.annotations = [
  new ng.core.Component({
    selector: 'main',
    templateUrl: 'scripts/modules/main/views/landing.html'
  })
];

window.app = window.app || {};
window.app.Main = Main;
