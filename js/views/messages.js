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

            if (this.model.get('author') == App.Data.userId) {
                this.$el.addClass('message_by-me');
            }

            return this;
        }
    });

    App.Views.Messages = Backbone.View.extend({
        className: 'messages',

        initialize: function() {
            var self = this;

            this.listenTo(this.collection, 'add', function(message) {
                var messageView = new App.Views.Message({
                    model: message,
                    chatId: self.options.chatId
                });
                this.$el.append(messageView.render().el);
                this.el.scrollTop = this.el.scrollHeight;
            });

            Backbone.View.prototype.initialize.apply(this, arguments);
        },

        render: function() {
            this.collection.each(function(message) {
                var messageView = new App.Views.Message({
                    model: message,
                    chatId: this.options.chatId
                });
                this.$el.append(messageView.render().el);
            }.bind(this));

            return this;
        }
    });

});