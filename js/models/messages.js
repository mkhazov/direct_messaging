define(['backbone'], function(Backbone) {
    'use strict';

    /**
     * Messages
     */

    App.Models.Message = Backbone.Model.extend({
        defaults: {
            /**
             * {@link App.Models.Contact.id} - contact id.
             * @type {?number}
             */
            author: null,
            text: '',
        }
    });

    App.Collections.Messages = Backbone.Collection.extend({
        model: App.Models.Message
    });

});