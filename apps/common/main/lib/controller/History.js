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
 * Time: 12:13
 */

define([
    'core',
    'common/main/lib/collection/HistoryVersions',
    'common/main/lib/view/History'
], function () {
    'use strict';

    Common.Controllers.History = Backbone.Controller.extend(_.extend({
        models: [],
        collections: [
            'Common.Collections.HistoryVersions'
        ],
        views: [
            'Common.Views.History'
        ],

        initialize: function() {
            this.currentChangeId = -1;
            this.currentArrColors = [];
            this.currentDocId = '';
            this.currentDocIdPrev = '';
        },

        events: {
        },

        onLaunch: function() {
            this.panelHistory= this.createView('Common.Views.History', {
                storeHistory: this.getApplication().getCollection('Common.Collections.HistoryVersions')
            });
            this.panelHistory.on('render:after', _.bind(this.onAfterRender, this));
            Common.Gateway.on('sethistorydata', _.bind(this.onSetHistoryData, this));
        },

        setApi: function(api) {
            this.api = api;
            return this;
        },

        setMode: function(mode) {
            if (!mode.canHistoryClose) {
                this.panelHistory.$el.find('#history-header').hide();
                this.panelHistory.$el.find('#history-list').css('padding-top', 0);
            }
        },

        onAfterRender: function(historyView) {
            historyView.viewHistoryList.on('item:click', _.bind(this.onSelectRevision, this));
            historyView.btnBackToDocument.on('click', _.bind(this.onClickBackToDocument, this));
        },

        onSelectRevision: function(picker, item, record) {
            var url         = record.get('url'),
                rev         = record.get('revision'),
                urlGetTime  = new Date();

            this.currentChangeId = record.get('changeid');
            this.currentArrColors = record.get('arrColors');
            this.currentDocId = record.get('docId');
            this.currentDocIdPrev = record.get('docIdPrev');

            if ( _.isEmpty(url) || (urlGetTime - record.get('urlGetTime') > 5 * 60000)) {
                 _.delay(function() {
                    Common.Gateway.requestHistoryData(rev); // получаем url-ы для ревизий
                 }, 10);
            } else {
                var urlDiff = record.get('urlDiff'),
                    hist = new Asc.asc_CVersionHistory();
                hist.asc_setDocId(_.isEmpty(urlDiff) ? this.currentDocId : this.currentDocIdPrev);
                hist.asc_setUrl(url);
                hist.asc_setUrlChanges(urlDiff);
                hist.asc_setCurrentChangeId(this.currentChangeId);
                hist.asc_setArrColors(this.currentArrColors);
                this.api.asc_showRevision(hist);

                var commentsController = this.getApplication().getController('Common.Controllers.Comments');
                if (commentsController) commentsController.onApiHideComment();
            }
        },

        onSetHistoryData: function(opts) {
            if (opts.data.error) {
                 var config = {
                    closable: false,
                    title: this.notcriticalErrorTitle,
                    msg: opts.data.error,
                    iconCls: 'warn',
                    buttons: ['ok']
                };
                Common.UI.alert(config);
            } else {
                var data = opts.data;
                var historyStore = this.getApplication().getCollection('Common.Collections.HistoryVersions');
                if (historyStore && data!==null) {
                    var rev, revisions = historyStore.findRevisions(data.version),
                        urlGetTime = new Date();
                    var diff = opts.data.urlDiff || opts.data.changesUrl;
                    if (revisions && revisions.length>0) {
                        for(var i=0; i<revisions.length; i++) {
                            rev = revisions[i];
                            rev.set('url', opts.data.url, {silent: true});
                            rev.set('urlDiff', diff, {silent: true});
                            rev.set('urlGetTime', urlGetTime, {silent: true});
                        }
                    }
                    var hist = new Asc.asc_CVersionHistory();
                    hist.asc_setUrl(opts.data.url);
                    hist.asc_setUrlChanges(diff);
                    hist.asc_setDocId(_.isEmpty(diff) ? this.currentDocId : this.currentDocIdPrev);
                    hist.asc_setCurrentChangeId(this.currentChangeId);
                    hist.asc_setArrColors(this.currentArrColors);
                    this.api.asc_showRevision(hist);

                    var commentsController = this.getApplication().getController('Common.Controllers.Comments');
                    if (commentsController) commentsController.onApiHideComment();
                }
            }
        },

        onClickBackToDocument: function () {
            // reload editor
            Common.Gateway.requestHistoryClose();
        },

        notcriticalErrorTitle: 'Warning'

    }, Common.Controllers.History || {}));
});
