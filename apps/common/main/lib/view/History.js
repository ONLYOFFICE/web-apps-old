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
 * User: Julia.Radzhabova
 * Date: 06.03.15
 * Time: 11:46
 */

if (Common === undefined)
    var Common = {};

Common.Views = Common.Views || {};

define([
    'common/main/lib/util/utils',
    'common/main/lib/component/BaseView',
    'common/main/lib/component/Layout'
], function (template) {
    'use strict';

    Common.Views.History = Common.UI.BaseView.extend(_.extend({
        el: '#left-panel-history',

        storeHistory: undefined,
        template: _.template([
            '<div id="history-box" class="layout-ct vbox">',
                '<div id="history-header" class="">',
                    '<div id="history-btn-back"><%=scope.textHistoryHeader%></div>',
                '</div>',
                '<div id="history-list" class="">',
                '</div>',
            '</div>'
        ].join('')),

        initialize: function(options) {
            _.extend(this, options);
            Common.UI.BaseView.prototype.initialize.call(this, arguments);
        },

        render: function(el) {
            el = el || this.el;
            $(el).html(this.template({scope: this})).width( (parseInt(Common.localStorage.getItem('de-mainmenu-width')) || MENU_SCALE_PART) - SCALE_MIN);

            this.viewHistoryList = new Common.UI.DataView({
                el: $('#history-list'),
                store: this.storeHistory,
                enableKeyEvents: false,
                itemTemplate: _.template([
                    '<div id="<%= id %>" class="history-item-wrap" style="display: block;">',
                        '<div class="user-date"><%= created %></div>',
                        '<% if (markedAsVersion) { %>',
                        '<div class="user-version">ver.<%=version%></div>',
                        '<% } %>',
                        '<div class="user-name">',
                            '<div class="color" style="display: inline-block; background-color:' + '<%=usercolor%>;' + '" >',
                            '</div><%= Common.Utils.String.htmlEncode(username) %>',
                        '</div>',
                    '</div>'
                ].join(''))
            });

            this.btnBackToDocument = new Common.UI.Button({
                el: $('#history-btn-back'),
                enableToggle: false
            });
            
            this.trigger('render:after', this);
            return this;
        },

        textHistoryHeader: 'Back to Document'
        
    }, Common.Views.History || {}))
});