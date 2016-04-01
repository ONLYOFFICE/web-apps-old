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
 *  MultiSliderGradient.js
 *
 *  Created by Julia Radzhabova on 2/19/14
 *  Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

if (Common === undefined)
    var Common = {};
define([
    'common/main/lib/component/Slider',
    'underscore'
], function (base, _) {
    'use strict';

    Common.UI.MultiSliderGradient = Common.UI.MultiSlider.extend({

        options : {
            width: 100,
            minValue: 0,
            maxValue: 100,
            values: [0, 100],
            colorValues: ['#000000', '#ffffff'],
            currentThumb: 0
        },

        disabled: false,

        template    : _.template([
            '<div class="slider multi-slider-gradient">',
            '<div class="track"></div>',
            '<% _.each(items, function(item) { %>',
            '<div class="thumb img-commonctrl" style=""></div>',
            '<% }); %>',
            '</div>'
        ].join('')),

        initialize : function(options) {
            this.styleStr = '';
            if (Common.Utils.isChrome && Common.Utils.chromeVersion<10 || Common.Utils.isSafari && Common.Utils.safariVersion<5.1)
                this.styleStr = '-webkit-gradient(linear, left top, right top, color-stop({1}%,{0}), color-stop({3}%,{2})); /* Chrome,Safari4+ */';
            else if (Common.Utils.isChrome || Common.Utils.isSafari)
                this.styleStr = '-webkit-linear-gradient(left, {0} {1}%, {2} {3}%)';
            else if (Common.Utils.isGecko)
                this.styleStr = '-moz-linear-gradient(left, {0} {1}%, {2} {3}%)';
            else if (Common.Utils.isOpera && Common.Utils.operaVersion>11.0)
                this.styleStr = '-o-linear-gradient(left, {0} {1}%, {2} {3}%)';
            else if (Common.Utils.isIE)
                this.styleStr = '-ms-linear-gradient(left, {0} {1}%, {2} {3}%)';

            this.colorValues = this.options.colorValues;

            Common.UI.MultiSlider.prototype.initialize.call(this, options);
        },

        render : function(parentEl) {
            Common.UI.MultiSlider.prototype.render.call(this, parentEl);

            var me = this,
                style = '';

            me.trackEl = me.cmpEl.find('.track');

            for (var i=0; i<me.thumbs.length; i++) {
                me.thumbs[i].thumb.on('dblclick', null, function() {
                    me.trigger('thumbdblclick', me);
                });
            }

            if (me.styleStr!=='') {
                style = Common.Utils.String.format(me.styleStr, me.colorValues[0], 0, me.colorValues[1], 100);
                me.trackEl.css('background', style);
            }
            if (Common.Utils.isIE) {
                style = Common.Utils.String.format('progid:DXImageTransform.Microsoft.gradient( startColorstr={0}, endColorstr={1},GradientType=1 )',
                    me.colorValues[0], me.colorValues[1]);
                me.trackEl.css('filter', style);
            }
            style = Common.Utils.String.format('linear-gradient(to right, {0} {1}%, {2} {3}%)', me.colorValues[0], 0, me.colorValues[1], 100);
            me.trackEl.css('background', style);

            me.on('change', _.bind(me.changeGradientStyle, me));
        },

        setColorValue: function(color, index) {
            var ind = (index!==undefined) ? index : this.currentThumb;
            this.colorValues[ind] = color;
            this.changeGradientStyle();
        },

        getColorValue: function(index) {
            var ind = (index!==undefined) ? index : this.currentThumb;
            return this.colorValues[ind];
        },

        setValue: function(index, value) {
            Common.UI.MultiSlider.prototype.setValue.call(this, index, value);
            this.changeGradientStyle();
        },

        changeGradientStyle: function() {
            if (!this.rendered) return;
            var style;
            if (this.styleStr!=='') {
                style = Common.Utils.String.format(this.styleStr, this.colorValues[0], this.getValue(0), this.colorValues[1], this.getValue(1));
                this.trackEl.css('background', style);
            }
            if (Common.Utils.isIE) {
                style = Common.Utils.String.format('progid:DXImageTransform.Microsoft.gradient( startColorstr={0}, endColorstr={1},GradientType=1 )',
                    this.colorValues[0], this.colorValues[1]);
                this.trackEl.css('filter', style);
            }
            style = Common.Utils.String.format('linear-gradient(to right, {0} {1}%, {2} {3}%)',  this.colorValues[0], this.getValue(0), this.colorValues[1], this.getValue(1));
            this.trackEl.css('background', style);
        }
    });
});
