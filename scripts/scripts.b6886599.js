"use strict";

function MapToIterablePipe() {
    this.transform = function(val) {
        if ("object" === typeof val && val) {
            return Object.keys(val).map(function(k) {
                return {
                    key: k,
                    value: val[k]
                };
            });
        }
        return val;
    };
}

MapToIterablePipe.annotations = [ new ng.core.Pipe({
    name: "mapToIterable"
}) ];

window.app = window.app || {};

window.app.MapToIterablePipe = MapToIterablePipe;

"use strict";

function FindValuePipe() {
    this.transform = function() {
        var val = arguments[0];
        var key = arguments[1];
        if ("object" === typeof val && val && "string" === typeof key) {
            return val[key];
        } else if (Array.isArray(val)) {
            return val.filter(function(v) {
                return v === key;
            });
        }
        return val;
    };
}

FindValuePipe.annotations = [ new ng.core.Pipe({
    name: "findValue"
}) ];

window.app = window.app || {};

window.app.FindValuePipe = FindValuePipe;

function Header() {}

Header.annotations = [ new ng.core.View({
    templateUrl: "scripts/modules/header/views/header.html",
    directives: [ ng.router.ROUTER_DIRECTIVES ]
}), new ng.core.Component({
    selector: "app-header"
}) ];

window.app = window.app || {};

window.app.Header = Header;

"use strict";

function ContentType() {}

ContentType.annotations = [ new ng.router.RouteConfig([ {
    path: "/",
    component: ContentTypeList,
    name: "ContentTypeList"
}, {
    path: "/show/:id",
    component: ContentTypeShow,
    name: "ContentTypeShow"
}, {
    path: "/create",
    component: ContentTypeCreate,
    name: "ContentTypeCreate"
}, {
    path: "/edit/:id",
    component: ContentTypeEdit,
    name: "ContentTypeEdit"
} ]), new ng.core.Component({
    selector: "content-type",
    directives: [ ng.router.ROUTER_DIRECTIVES ],
    template: "<router-outlet></router-outlet>"
}) ];

function ContentTypeList() {
    this.items = [ {
        key: "test",
        name: "Test item",
        schema: {
            properties: {
                first: "",
                second: ""
            }
        }
    } ];
}

ContentTypeList.annotations = [ new ng.core.Component({
    selector: "content-type-list",
    directives: [ ng.router.ROUTER_DIRECTIVES, ng.common.CORE_DIRECTIVES ],
    pipes: [ window.app.MapToIterablePipe ],
    templateUrl: "scripts/modules/content_type/views/list.html"
}) ];

function ContentTypeShow() {}

ContentTypeShow.annotations = [ new ng.core.Component({
    selector: "content-type-show",
    directives: [ ng.router.ROUTER_DIRECTIVES ],
    templateUrl: "scripts/modules/content_type/views/show.html"
}) ];

function ContentTypeCreate() {
    this.newItem = {};
    this.onSubmit = function() {
        console.log("submitting");
    };
}

ContentTypeCreate.annotations = [ new ng.core.Component({
    selector: "content-type-create",
    directives: [ ng.router.ROUTER_DIRECTIVES, ng.common.CORE_DIRECTIVES ],
    pipes: [ window.app.MapToIterablePipe, window.app.FindValuePipe ],
    templateUrl: "scripts/modules/content_type/views/create.html"
}) ];

function ContentTypeEdit() {}

ContentTypeEdit.annotations = [ new ng.core.Component({
    selector: "content-type-edit",
    directives: [ ng.router.ROUTER_DIRECTIVES ],
    templateUrl: "scripts/modules/content_type/views/edit.html"
}) ];

window.app = window.app || {};

window.app.ContentType = ContentType;

window.app.ContentTypeList = ContentTypeList;

function Main() {}

Main.annotations = [ new ng.core.Component({
    selector: "main",
    templateUrl: "scripts/modules/main/views/landing.html"
}) ];

window.app = window.app || {};

window.app.Main = Main;

function App() {}

App.annotations = [ new ng.router.RouteConfig([ {
    path: "/",
    component: window.app.Main,
    name: "Main",
    useAsDefault: true
}, {
    path: "/content_type/...",
    component: window.app.ContentType,
    name: "ContentType"
} ]), new ng.core.View({
    template: "" + "<app-header></app-header>" + "<router-outlet></router-outlet>" + "<app-footer></app-footer>",
    directives: [ ng.router.ROUTER_DIRECTIVES, window.app.Header ]
}), new ng.core.Component({
    selector: "#application",
    providers: [ ng.router.ROUTER_BINDINGS, ng.router.ROUTER_PROVIDERS, ng.core.provide(ng.router.APP_BASE_HREF, {
        useValue: "/"
    }), ng.core.provide(ng.router.LocationStrategy, {
        useClass: ng.router.HashLocationStrategy
    }) ]
}) ];

window.app = window.app || {};

window.app.App = App;

"use strict";

document.addEventListener("DOMContentLoaded", function() {
    ng.platform.browser.bootstrap(window.app.App);
});