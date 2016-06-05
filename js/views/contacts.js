define([
    'underscore',
    'backbone',
    'text!templates/contact.html',
    'text!templates/contact-pane.html'
],
function(_, Backbone, contactTemplate, contactPaneTemplate) {
    'use strict';

    App.Views.Contact = Backbone.View.extend({
        tagName: 'li',

        className: 'contacts__item',

        template: _.template(contactTemplate),

        events: {
            'click': 'select'
        },

        initialize: function() {
            this.listenTo(this.model, 'change:selected', function(value) {
                this.$el.toggleClass('selected', value);
            });
        },

        render: function() {
            var model = this.model.toJSON();

            this.$el.toggleClass('selected', model.selected);

            this.$el.html(this.template(model));

            return this;
        },

        select: function() {
            var selected = this.model.get('selected');
            !selected && this.model.set('selected', true);
        }
    });

    App.Views.Contacts = Backbone.View.extend({
        render: function() {
            this.collection.each(function(contact) {
                var view = new App.Views.Contact({model: contact});

                this.$el.append(view.render().el);
            }.bind(this));

            return this;
        }
    });

    App.Views.ContactPane = Backbone.View.extend({
        className: 'contact-pane',

        template: _.template(contactPaneTemplate),

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });

});