define([
    'underscore',
    'backbone',
    'text!templates/message.html'
],
function(_, Backbone, messageTemplate) {
    'use strict';

    App.Views.Message = Backbone.View.extend({
        tagName: 'li',

        className: 'message',

        template: _.template(messageTemplate),

        render: function() {
            var author = App.Data.contacts.get(this.model.get('author')),
                model = {
                    text: this.model.get('text'),
                    picture: author.get('picture')
                };
            this.$el.html(this.template(model));

            if (this.model.isMessageByCurrentUser()) {
                this.$el.addClass('message_by-me');
            }

            return this;
        }
    });

    App.Views.Messages = Backbone.View.extend({
        className: 'messages',

        initialize: function() {
            this.delay = 400;

            this.listenTo(this.collection, 'add', this.addOne.bind(this));
        },

        render: function() {
            this.collection.each(this.addOne.bind(this));

            return this;
        },

        addOne: function(message) {
            var messageView = new App.Views.Message({
                model: message,
                chatId: this.options.chatId
            });
            messageView.render().$el.hide().appendTo(this.$el).fadeIn(this.delay = 400);
            this.el.scrollTop = this.el.scrollHeight;
        }
    });

});