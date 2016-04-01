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
 *  Scroller.js
 *
 *  Created by Alexander Yuzhin on 3/14/14
 *  Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

if (Common === undefined)
    var Common = {};

define([
    'jmousewheel',
    'perfectscrollbar',
    'common/main/lib/component/BaseView'
], function () { 'use strict';

    Common.UI.Scroller = (function(){
        var mouseCapture;

        return _.extend(Common.UI.BaseView.extend({
            options: {
                wheelSpeed              : 20,
                wheelPropagation        : false,
                minScrollbarLength      : null,
                useBothWheelAxes        : false,
                useKeyboard             : true,
                suppressScrollX         : false,
                suppressScrollY         : false,
                scrollXMarginOffset     : 5,
                scrollYMarginOffset     : 5,
                includePadding          : true,
                includeMargin           : true,
                alwaysVisibleX          : false,
                alwaysVisibleY          : false
            },

            initialize: function(options) {
                Common.UI.BaseView.prototype.initialize.call(this, options);

                if (this.options.el) {
                    this.render();
                }
            },

            render: function() {
                var me = this;

                me.cmpEl = $(this.el);

                if (!me.rendered) {
                    me.cmpEl.perfectScrollbar(_.extend({}, me.options));
                    me.rendered = true;

                    this.setAlwaysVisibleX(me.options.alwaysVisibleX);
                    this.setAlwaysVisibleY(me.options.alwaysVisibleY);
                }

                return this;
            },

            remove: function() {
                this.destroy();
                Backbone.View.prototype.remove.call(this);
            },

            update: function(config) {
                var options = this.options;
                if (config) {
                    this.destroy();
                    options = _.extend(this.options, config);
                    this.cmpEl.perfectScrollbar(options);
                } else {
                    this.cmpEl.perfectScrollbar('update');
                }

                this.setAlwaysVisibleX(options.alwaysVisibleX);
                this.setAlwaysVisibleY(options.alwaysVisibleY);

                // Emulate capture scroller
                var mouseDownHandler = function(e) {
                    mouseCapture = true;

                    var upHandler = function(e) {
                        $(document).unbind('mouseup', upHandler);
                        _.delay(function() {
                            mouseCapture = false;
                        }, 10);
                    };

                    $(document).mouseup(upHandler);
                };

                $('.ps-scrollbar-x-rail, .ps-scrollbar-y-rail, .ps-scrollbar-x, .ps-scrollbar-y', this.cmpEl)
                    .off('mousedown', mouseDownHandler).on('mousedown', mouseDownHandler);
            },

            destroy: function() {
                this.cmpEl.perfectScrollbar('destroy');
            },

            scrollLeft: function(pos) {
                this.cmpEl.scrollLeft(pos);
                this.update();
            },

            scrollTop: function(pos) {
                this.cmpEl.scrollTop(pos);
                this.update();
            },

            getScrollTop: function () {
                return this.cmpEl.scrollTop();
            },

            getScrollLeft: function () {
                return this.cmpEl.scrollLeft();
            },
            setAlwaysVisibleX: function(flag) {
                if (flag) {
                    $(this.el).find('.ps-scrollbar-x-rail').addClass('always-visible-x');
                    $(this.el).find('.ps-scrollbar-x').addClass('always-visible-x');
                } else {
                    $(this.el).find('.ps-scrollbar-x-rail').removeClass('always-visible-x');
                    $(this.el).find('.ps-scrollbar-x').addClass('always-visible-x');
                }
            },
            setAlwaysVisibleY: function(flag) {
                if (flag) {
                    $(this.el).find('.ps-scrollbar-y-rail').addClass('always-visible-y');
                    $(this.el).find('.ps-scrollbar-y').addClass('always-visible-y');
                } else {
                    $(this.el).find('.ps-scrollbar-y-rail').removeClass('always-visible-y');
                    $(this.el).find('.ps-scrollbar-y').addClass('always-visible-y');
                }
            }
        }), {
            isMouseCapture: function() {
                return mouseCapture
            }
        })
    })();
});