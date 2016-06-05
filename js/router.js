define(['backbone', 'views/chat', 'views/contacts'], function(Backbone) {
    'use strict';

    App.Router = Backbone.Router.extend({

        routes: {
            'chat/:id': 'chat',
            '': 'defaultRoute',
            '!/': 'defaultRoute',
            '*other': 'defaultRoute'
        },

        chat: function(id) {
            var contact = App.Data.contacts.get(id);
            if (!contact) {
                console.log('there is no chat with the specified id! (#' + id + ')');
                return this.defaultRoute();
            }

            console.log('chat with ' + contact.get('name'));

            contact.set('selected', true);

            var contactsView = new App.Views.Contacts({
                collection: App.Data.contacts
            });
            Backbone.$('#contacts').html(contactsView.render().el);

            var chatView = new App.Views.Chat({
                collection: contact.get('messages'),
                chatId: id
            });
            Backbone.$('#chat').html(chatView.render().el);

            var contactPaneView = new App.Views.ContactPane({
                model: contact
            });
            Backbone.$('#contact-pane').html(contactPaneView.render().el);
        },

        defaultRoute: function(other) {
            App.Data.contacts.get(3) && this.navigate('chat/3', true);
        }
    });

});