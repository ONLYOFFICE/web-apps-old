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
 *  BaseView.js
 *
 *  Created by Alexander Yuzhin on 1/17/14
 *  Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

if (Common === undefined)
    var Common = {};

define([
    'backbone'
], function (Backbone) {
    'use strict';

    Common.UI = _.extend(Common.UI || {}, {
        Keys : {
            BACKSPACE:  8,
            TAB:        9,
            RETURN:     13,
            SHIFT:      16,
            CTRL:       17,
            ALT:        18,
            ESC:        27,
            LEFT:       37,
            UP:         38,
            RIGHT:      39,
            DOWN:       40,
            DELETE:     46,
            HOME:       36,
            END:        35,
            SPACE:      32,
            PAGEUP:     33,
            PAGEDOWN:   34,
            INSERT:     45,
            NUM_PLUS:   107,
            NUM_MINUS:  109,
            F1:         112,
            F2:         113,
            F3:         114,
            F4:         115,
            F5:         116,
            F6:         117,
            F7:         118,
            F8:         119,
            F9:         120,
            F10:        121,
            F11:        122,
            F12:        123,
            EQUALITY:   187,
            MINUS:      189
        },

        BaseView: Backbone.View.extend({
            isSuspendEvents: false,

            initialize : function(options) {
                this.options = this.options ? _({}).extend(this.options, options) : options;
            },

            setVisible: function(visible) {
                return this[visible ? 'show': 'hide']();
            },

            isVisible: function() {
                return $(this.el).is(":visible");
            },

            suspendEvents: function() {
                this.isSuspendEvents = true;
            },

            resumeEvents: function() {
                this.isSuspendEvents = false;
            }
        }),

        getId: function(prefix) {
            return _.uniqueId(prefix || "asc-gen");
        }
    });
});