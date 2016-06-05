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
            var text = e.target.value,
                delay = 800; // delay for auto-reply

            if (text.length && e.keyCode == 13) {
                e.target.value = '';

                this.collection.add({
                    author: App.Data.userId,
                    text: text
                });

                window.setTimeout(function() {
                    // auto-reply (the copy of the sent message)
                    this.collection.add({
                        author: this.options.chatId,
                        text: text
                    });
                }.bind(this), delay);

            }
        }
    });

});