define(['backbone'], function(Backbone) {
    'use strict';

    /**
     * Contacts
     */

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

            Backbone.Model.prototype.initialize.apply(this, arguments);
        }
    });

    App.Collections.Contacts = Backbone.Collection.extend({
        model: App.Models.Contact,

        initialize: function() {
            this.listenTo(this, 'change:selected', this.radioSelection);

            Backbone.Collection.prototype.initialize.apply(this, arguments);
        },

        radioSelection: function(contact, selected) {
            selected && this.some(function(model) {
                model != contact && model.get('selected') && model.set('selected', false);
            });
        }
    });

});