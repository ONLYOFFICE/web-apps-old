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
 *    Tooltip.js
 *
 *    Created by Maxim Kadushkin on 14 March 2014
 *    Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */
/*
*       Configuration
*       =============
*
*       @cfg {String} title
*
*       @cfg {String} placement
*       Default value is 'top'.
*       Describes tooltips position relatively of the parent component
*       acceptable values: 'top', 'bottom', 'right', 'left', 'top-right/left', 'bottom-right/left', 'cursor'
*       If placement = 'cursor', tooltip doesn't arrange position relatively
*       of the parent and shows relatively of the cursor position.
*
*       @cfg {String} offset
*       The number of pixels to offset the tooltip from the parent component
*
*       @cfg {String} cls
*       An extra CSS class that will be added to tooltip dom-element.
*
*
*       Methods
*       =======
*
*       @method setTitle
*
*       @method show
*       @params {Array} at - set predefined position for the tooltip
*
*
*       Events
*       ======
*
*       @event tooltip:show
*       Fires after the tooltip is shown
*
*       @event tooltip:hide
*       Fires after the tooltip is hidden
*
* */

 define([
    'tip',
    'backbone'
], function () {
    'use strict';

    var Tooltip = function(options) {
        this.$element =
        this.placement = undefined;
        this.init.call(this, options);
    };

    _.extend(Tooltip.prototype, Backbone.Events, {
        init: function(opts) {
            this.$element  = opts.owner instanceof Backbone.View ? opts.owner.$el : $(opts.owner);
            this.placement = opts.placement;

            if (this.$element.data('bs.tooltip'))
                this.$element.removeData('bs.tooltip');

            this.$element.tooltip({
                title       : opts.title,
                trigger     : 'manual',
                placement   : opts.placement,
                offset      : opts.offset,
                cls         : opts.cls,
                html        : opts.html,
                hideonclick : opts.hideonclick
            });

            if (opts.hideonclick) {
                var tip = this.$element.data('bs.tooltip');
                if (tip) tip.tip().on('click', function() {tip.hide();});
            }

            this.$element.on('shown.bs.tooltip', _.bind(this.onTipShown, this));
            this.$element.on('hidden.bs.tooltip', _.bind(this.onTipHidden, this));
        },

        show: function(at) {
            this.getBSTip().show(at);
        },

        hide: function() {
            this.getBSTip().hide();
        },

        setTitle: function(title) {
            var tip = this.getBSTip();
            if (tip) tip.options.title = title;
        },

        updateTitle: function() {
            var tip = this.getBSTip();
            tip.$tip.find('.tooltip-inner')[tip.options.html ? 'html' : 'text'](tip.options.title);
        },

        getBSTip: function() {
            return this.$element.data('bs.tooltip');
        },

        onTipShown: function() {
            this.trigger('tooltip:show', this);
        },

        onTipHidden: function() {
            this.trigger('tooltip:hide', this);
        },

        isVisible: function() {
            return this.getBSTip().tip().is(':visible');
        }
    });
    Common.UI = Common.UI || {};
    Common.UI.Tooltip = Tooltip;
});