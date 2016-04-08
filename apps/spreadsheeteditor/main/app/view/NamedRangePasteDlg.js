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
 *
 *  NamedRangePasteDlg.js
 *
 *  Created by Julia.Radzhabova on 05.06.15
 *  Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

define([
    'common/main/lib/view/AdvancedSettingsWindow',
    'common/main/lib/component/ListView'
], function () {
    'use strict';

    SSE.Views = SSE.Views || {};

    SSE.Views.NamedRangePasteDlg =  Common.Views.AdvancedSettingsWindow.extend(_.extend({
        options: {
            alias: 'NamedRangePasteDlg',
            contentWidth: 250,
            height: 282
        },

        initialize: function (options) {
            var me = this;

            _.extend(this.options, {
                title: this.txtTitle,
                template: [
                    '<div class="box" style="height:' + (me.options.height - 85) + 'px;">',
                        '<div class="content-panel" style="padding: 0;"><div class="inner-content">',
                            '<div class="settings-panel active">',
                                '<table cols="1" style="width: 100%;">',
                                    '<tr>',
                                        '<td class="padding-small">',
                                            '<label class="input-label">', me.textNames,'</label>',
                                            '<div id="named-range-paste-list" class="range-tableview" style="width:100%; height: 150px;"></div>',
                                        '</td>',
                                    '</tr>',
                                '</table>',
                            '</div></div>',
                        '</div>',
                    '</div>',
                    '<div class="separator horizontal"></div>',
                    '<div class="footer center">',
                    '<button class="btn normal dlg-btn primary" result="ok" style="margin-right: 10px;  width: 86px;">' + me.okButtonText + '</button>',
                    '<button class="btn normal dlg-btn" result="cancel" style="width: 86px;">' + me.cancelButtonText + '</button>',
                    '</div>'
                ].join('')
            }, options);

            this.handler    = options.handler;
            this.ranges     = options.ranges || [];

            Common.Views.AdvancedSettingsWindow.prototype.initialize.call(this, this.options);
        },
        render: function () {
            Common.Views.AdvancedSettingsWindow.prototype.render.call(this);
            var me = this;

            this.rangeList = new Common.UI.ListView({
                el: $('#named-range-paste-list', this.$window),
                store: new Common.UI.DataViewStore(),
                simpleAddMode: true,
                template: _.template(['<div class="listview inner" style=""></div>'].join('')),
                itemTemplate: _.template([
                    '<div style="pointer-events:none;">',
                        '<div id="<%= id %>" class="list-item" style="pointer-events:none;width: 100%;display:inline-block;">',
                            '<div class="listitem-icon <% if (isTable) {%>listitem-table<%} %>"></div>',
                            '<div style="width:186px;padding-right: 5px;"><%= name %></div>',
                        '</div>',
                    '</div>'
                ].join(''))
            });
            this.rangeList.store.comparator = function(item1, item2) {
                var n1 = item1.get('name').toLowerCase(),
                    n2 = item2.get('name').toLowerCase();
                if (n1==n2) return 0;
                return (n1<n2) ? -1 : 1;
            };
            this.rangeList.on('item:dblclick', _.bind(this.onDblClickFunction, this));
            this.rangeList.on('entervalue', _.bind(this.onPrimary, this));

            this.afterRender();
        },

        afterRender: function() {
            this._setDefaults();
        },

        _setDefaults: function () {
            if (this.ranges) {
                var me = this, arr = [], prev_name='';
                for (var i=0; i<this.ranges.length; i++) {
                    var name = this.ranges[i].asc_getName();
                    if (name !== prev_name) {
                        arr.push({
                            name: name,
                            scope: this.ranges[i].asc_getScope(),
                            range: this.ranges[i].asc_getRef(),
                            isTable: (this.ranges[i].asc_getIsTable()===true)
                        });
                    }
                    prev_name = name;
                }
                this.rangeList.store.reset(arr);
                this.rangeList.store.sort();
                if (this.rangeList.store.length>0)
                    this.rangeList.selectByIndex(0);
                this.rangeList.scroller.update({alwaysVisibleY: true});

                _.delay(function () {
                    me.rangeList.cmpEl.find('.listview').focus();
                }, 100, this);
            }
        },

        getSettings: function() {
            var rec = this.rangeList.getSelectedRec();
            return (rec.length>0) ? (new Asc.asc_CDefName(rec[0].get('name'), rec[0].get('range'), rec[0].get('scope'), rec[0].get('isTable'))) : null;
        },

        onPrimary: function() {
            this.handler && this.handler.call(this, 'ok', this.getSettings());
            this.close();
            return false;
        },

        onDlgBtnClick: function(event) {
            var state = event.currentTarget.attributes['result'].value;
            this.handler && this.handler.call(this, state,  (state == 'ok') ? this.getSettings() : undefined);
            this.close();
        },

        onDblClickFunction: function () {
            this.handler && this.handler.call(this, 'ok',  this.getSettings());
            this.close();
        },

        txtTitle: 'Paste Name',
        cancelButtonText : 'Cancel',
        okButtonText : 'Ok',
        textNames: 'Named Ranges'
    }, SSE.Views.NamedRangePasteDlg || {}));
});
