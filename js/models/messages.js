define(['backbone'], function(Backbone) {
    'use strict';

    App.Models.Message = Backbone.Model.extend({
        defaults: {
            /**
             * {@link App.Models.Contact.id} - contact id.
             * @type {?number}
             */
            author: null,
            text: '',
        },
        isMessageByUser: function(userId) {
            return this.get('author') === userId;
        },
        isMessageByCurrentUser: function() {
            return this.isMessageByUser(App.Data.userId);
        }
    });

    App.Collections.Messages = Backbone.Collection.extend({
        model: App.Models.Message
    });

});