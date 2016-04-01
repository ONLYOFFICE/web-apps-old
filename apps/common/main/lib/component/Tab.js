/*
 *
 * (c) Copyright Ascensio System Limited 2010-2016
 *
 * This program is freeware. You can redistribute it and/or modify it under the terms of the GNU 
 * General Public License (GPL) version 3 as published by the Free Software Foundation (https://www.gnu.org/copyleft/gpl.html).
 * In accordance with Section 7(a) of the GNU GPL its Section 15 shall be amended to the effect that 
 * Ascensio System SIA expressly excludes the warranty of non-infringement of any third-party rights.
 *
 * THIS PROGRAM IS DISTRIBUTED WITHOUT ANY WARRANTY; WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR
 * FITNESS FOR A PARTICULAR PURPOSE. For more details, see GNU GPL at https://www.gnu.org/copyleft/gpl.html
 *
 * You can contact Ascensio System SIA by email at sales@onlyoffice.com
 *
 * The interactive user interfaces in modified source and object code versions of ONLYOFFICE must display 
 * Appropriate Legal Notices, as required under Section 5 of the GNU GPL version 3.
 *
 * Pursuant to Section 7  3(b) of the GNU GPL you must retain the original ONLYOFFICE logo which contains 
 * relevant author attributions when distributing the software. If the display of the logo in its graphic 
 * form is not reasonably feasible for technical reasons, you must include the words "Powered by ONLYOFFICE" 
 * in every copy of the program you distribute.
 * Pursuant to Section 7  3(e) we decline to grant you any rights under trademark law for use of our trademarks.
 *
*/
/**
 *    Tab.js
 *
 *    Created by Maxim Kadushkin on 01 April 2014
 *    Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */


if (Common === undefined)
    var Common = {};

define([
    'common/main/lib/component/BaseView'
], function (base) {
    'use strict';

    var Tab = function(opts) {
        this.active     = false;
        this.label      = 'Tab';
        this.cls        = '';
        this.template   = _.template(['<li class="<% if(active){ %>active<% } %> <% if(cls.length){%><%= cls %><%}%>" data-label="<%= label %>">',
                                            '<a><%- label %></a>',
                                        '</li>'].join(''));

        this.initialize.call(this, opts);
        return this;
    };

    _.extend(Tab.prototype, {
        initialize: function(options) {
            _.extend(this, options);
        },

        render: function() {
            var el      = this.template(this);
            this.$el    = $(el);

            this.rendered = true;
            this.disable(this.disabled);
            return this;
        },

        isActive: function() {
            return this.$el.hasClass('active');
        },

        activate: function(){
            if (!this.$el.hasClass('active'))
                this.$el.addClass('active');
        },

        deactivate: function(){
            this.$el.removeClass('active');
        },

        on: function() {
            this.$el.on.apply(this, arguments);
        },

        disable: function(val) {
            this.disabled = val;

            if (this.rendered) {
                if (val && !this.$el.hasClass('disabled'))
                    this.$el.addClass('disabled'); else
                    this.$el.removeClass('disabled');
            }
        },

        addClass: function(cls) {
            if (cls.length && !this.$el.hasClass(cls))
                this.$el.addClass(cls);
        },

        removeClass: function(cls) {
            if (cls.length && this.$el.hasClass(cls))
                this.$el.removeClass(cls);
        },

        hasClass: function(cls) {
            return this.$el.hasClass(cls);
        },

        setCaption: function(text) {
            this.$el.find('> a').text(text);
        }
    });

    Common.UI.Tab = Tab;
});

