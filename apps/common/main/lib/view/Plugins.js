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
 * Date: 17.05.16
 * Time: 15:38
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

    Common.Views.Plugins = Common.UI.BaseView.extend(_.extend({
        el: '#left-panel-plugins',

        storePlugins: undefined,
        template: _.template([
            '<div id="plugins-box" class="layout-ct vbox">',
                '<label style="font-weight: bold;"><%= scope.strPlugins %></label>',
                '<div id="plugins-list" class="">',
                '</div>',
            '</div>'
        ].join('')),

        initialize: function(options) {
            _.extend(this, options);
            this.pluginsPath = '../../../../sdkjs-plugins/';
            Common.UI.BaseView.prototype.initialize.call(this, arguments);
        },

        render: function(el) {
            el = el || this.el;
            $(el).html(this.template({scope: this})).width( (parseInt(Common.localStorage.getItem('de-mainmenu-width')) || MENU_SCALE_PART) - SCALE_MIN);

            this.viewPluginsList = new Common.UI.DataView({
                el: $('#plugins-list'),
                store: this.storePlugins,
                enableKeyEvents: false,
                itemTemplate: _.template('<div id="<%= id %>" class="item-plugins" style="background-image: url(' + this.pluginsPath + '<%= icons[(window.devicePixelRatio > 1) ? 1 : 0] %>); background-position: 0 0;"></div>')
//                itemTemplate: _.template('<div id="<%= id %>" class="item-plugins" style="background-image: url(' + this.pluginsPath + 'chess/icon.png' + '); background-position: 0 0;"></div>')
            });

            this.trigger('render:after', this);
            return this;
        },

        strPlugins: 'Plugins'

    }, Common.Views.Plugins || {}))
});