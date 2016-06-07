define(['backbone'], function(Backbone) {
    'use strict';

    App.Models.Contact = Backbone.Model.extend({
        defaults: {
            id: null,
            name: '',
            picture: '',
            status: 'offline',
            selected: false,
            messages: new App.Collections.Messages
        },
        initialize: function() {
            var messages = this.get('messages');
            if (messages instanceof Array) {
                this.set('messages', new App.Collections.Messages(messages));
            }
        }
    });

    App.Collections.Contacts = Backbone.Collection.extend({
        model: App.Models.Contact,

        initialize: function() {
            this.listenTo(this, 'change:selected', this.radioSelection);
        },

        radioSelection: function(contact, selected) {
            selected && this.some(function(model) {
                model != contact && model.get('selected') && model.set('selected', false);
            });
        }
    });

});