define([
    'underscore',
    'backbone',
    'text!templates/chat.html',
    'views/messages'
],
function(_, Backbone, chatTemplate) {
    'use strict';

    App.Views.Chat = Backbone.View.extend({
        template: _.template(chatTemplate),

        events: {
            'keypress': 'submit'
        },

        render: function() {
            this.$el.html(this.template());

            var messagesView = new App.Views.Messages({
                collection: this.collection,
                chatId: this.options.chatId
            });
            this.$('#messages').html(messagesView.render().el);

            return this;
        },

        submit: function(e) {
            if (e.keyCode == 13) {
                this.collection.add({
                    author: App.Data.userId,
                    text: e.target.value
                });
                // reply is a copy of your message
                this.collection.add({
                    author: this.options.chatId,
                    text: e.target.value
                });
                e.target.value = '';
            }
        }
    });

});