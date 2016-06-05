define(['backbone', 'messages'], function(Backbone) {
    'use strict';

    /**
     * Chats
     */

    App.Models.Chat = Backbone.Model.extend({
        defaults: {
            id: null,
            messages: new App.Collections.Messages()
        }
    });

    App.Collections.Chats = Backbone.Collection.extend({
        model: App.Models.Chat
    });

});