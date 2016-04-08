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
 *  ColorPalette.js
 *
 *  Created by Alexander Yuzhin on 2/20/14
 *  Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

if (Common === undefined)
    var Common = {};

define([
    'common/main/lib/component/BaseView'
], function () { 'use strict';

    Common.UI.ColorPalette = Common.UI.BaseView.extend({
        options: {
            allowReselect: true,
            cls: '',
            style: ''
        },

        template:_.template([
            '<div class="palette-color">',
                '<% _.each(colors, function(color, index) { %>',
                    '<span class="color-item" data-color="<%= color %>" style="background-color: #<%= color %>;"></span>',
                '<% }) %>',
            '</div>'
        ].join('')),

        initialize : function(options) {
            Common.UI.BaseView.prototype.initialize.call(this, options);

            var me = this;

            this.id = me.options.id;
            this.cls = me.options.cls;
            this.style = me.options.style;
            this.colors = me.options.colors || [];
            this.value = me.options.value;

            if (me.options.el) {
                me.render();
            }
        },

        render: function (parentEl) {
            var me = this;

            if (!me.rendered) {
                this.cmpEl = $(this.template({
                    id          : this.id,
                    cls         : this.cls,
                    style       : this.style,
                    colors      : this.colors
                }));

                if (parentEl) {
                    this.setElement(parentEl, false);
                    parentEl.html(this.cmpEl);
                } else {
                    $(this.el).html(this.cmpEl);
                }
            } else {
                this.cmpEl = $(this.el);
            }

            if (!me.rendered) {
                var el = this.cmpEl;

                el.on('click', 'span.color-item', _.bind(this.itemClick, this));
            }

            me.rendered = true;

            return this;
        },

        itemClick: function(e) {
            var item = $(e.target);

            this.select(item.attr('data-color'));
        },

        select: function(color, suppressEvent) {
            if (this.value != color) {
                var me = this;

                // Remove selection with other elements
                $('span.color-item', this.cmpEl).removeClass('selected');

                this.value = color;

                if (color && /#?[a-fA-F0-9]{6}/.test(color)) {
                    color = /#?([a-fA-F0-9]{6})/.exec(color)[1].toUpperCase();

                    $('span[data-color=' + color + ']', this.cmpEl).addClass('selected');

                    if (!suppressEvent)
                        me.trigger('select', me, this.value);
                }
            }
        }
    });
});