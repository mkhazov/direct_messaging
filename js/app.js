'use strict';

/*global require*/
'use strict';

window.App = {
    Collections: {},
    Models: {},
    Views: {},
    Data: {
        userId: 4
    }
};

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../node_modules/underscore/underscore',
        backbone: '../node_modules/backbone/backbone',
        text: '../node_modules/requirejs-text/text',

        chats: 'models/chats',
        contacts: 'models/contacts',
        messages: 'models/messages'
    }
});

require(['backbone'], function (Backbone) {

    // 'options' binding
    Backbone.View = (function(View) {
       return View.extend({
            constructor: function(options) {
                this.options = options || {};
                View.apply(this, arguments);
            }
        });
    })(Backbone.View);

    require(['data/contacts', 'router', 'messages', 'chats', 'contacts'], function (contactsData) {

        var contacts = App.Data.contacts = new App.Collections.Contacts(contactsData);

        var router = new App.Router();
        Backbone.history.start();

        router.listenTo(App.Data.contacts, 'change:selected', function(contact, selected) {
            selected && router.navigate('chat/' + contact.get('id'), true);
        });

    });

});