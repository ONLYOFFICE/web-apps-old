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
if (Common === undefined) {
    var Common = {};
}

Common.Gateway = new(function() {
    var me = this,
        $me = $(me);

    var commandMap = {
        'init': function(data) {
            $me.trigger('init', data);
        },

        'openDocument': function(data) {
            $me.trigger('opendocument', data);
        },

        'showMessage': function(data) {
            $me.trigger('showmessage', data);
        },

        'applyEditRights': function(data) {
            $me.trigger('applyeditrights', data);
        },

        'processSaveResult': function(data) {
            $me.trigger('processsaveresult', data);
        },

        'processRightsChange': function(data) {
            $me.trigger('processrightschange', data);
        },

        'refreshHistory': function(data) {
            $me.trigger('refreshhistory', data);
        },

        'setHistoryData': function(data) {
            $me.trigger('sethistorydata', data);
        },

        'setEmailAddresses': function(data) {
            $me.trigger('setemailaddresses', data);
        },

        'processMailMerge': function(data) {
            $me.trigger('processmailmerge', data);
        },

        'downloadAs': function() {
            $me.trigger('downloadas');
        },

        'processMouse': function(data) {
            $me.trigger('processmouse', data);
        },

        'internalCommand': function(data) {
            $me.trigger('internalcommand', data);
        },

        'resetFocus': function(data) {
            $me.trigger('resetfocus', data);
        }
    };

    var _postMessage = function(msg) {
        // TODO: specify explicit origin
        if (window.parent && window.JSON) {
            window.parent.postMessage(window.JSON.stringify(msg), "*");
        }
    };

    var _onMessage = function(msg) {
        // TODO: check message origin
        var data = msg.data;
        if (Object.prototype.toString.apply(data) !== '[object String]' || !window.JSON) {
            return;
        }

        var cmd, handler;

        try {
            cmd = window.JSON.parse(data)
        } catch(e) {
            cmd = '';
        }

        if (cmd) {
            handler = commandMap[cmd.command];
            if (handler) {
                handler.call(this, cmd.data);
            }
        }
    };

    var fn = function(e) { _onMessage(e); };

    if (window.attachEvent) {
        window.attachEvent('onmessage', fn);
    } else {
        window.addEventListener('message', fn, false);
    }

    return {

        ready: function() {
            _postMessage({ event: 'onReady' });
        },

        save: function(url) {
            _postMessage({
                event: 'onSave',
                data: url
            });
        },

        requestEditRights: function() {
            _postMessage({ event: 'onRequestEditRights' });
        },

        requestHistory: function() {
            _postMessage({ event: 'onRequestHistory' });
        },

        requestHistoryData: function(revision) {
            _postMessage({
                event: 'onRequestHistoryData',
                data: revision
            });
        },

        requestEmailAddresses: function() {
            _postMessage({ event: 'onRequestEmailAddresses' });
        },

        requestStartMailMerge: function() {
            _postMessage({event: 'onRequestStartMailMerge'});
        },

        requestHistoryClose: function(revision) {
            _postMessage({event: 'onRequestHistoryClose'});
        },

        reportError: function(code, description) {
            _postMessage({
                event: 'onError',
                data: {
                    errorCode: code,
                    errorDescription: description
                }
            });
        },

        sendInfo: function(info) {
            _postMessage({
                event: 'onInfo',
                data: info
            });
        },

        setDocumentModified: function(modified) {
            _postMessage({
                event: 'onDocumentStateChange',
                data: modified
            });
        },

        internalMessage: function(type, data) {
            _postMessage({
                event: 'onInternalMessage',
                data: {
                    type: type,
                    data: data
                }
            });
        },

        updateVersion: function() {
            _postMessage({ event: 'onOutdatedVersion' });
        },

        downloadAs: function(url) {
            _postMessage({
                event: 'onDownloadAs',
                data: url
            });
        },
        
        collaborativeChanges: function() {
            _postMessage({event: 'onCollaborativeChanges'});
        },

        on: function(event, handler){
            var localHandler = function(event, data){
                handler.call(me, data)
            };

            $me.on(event, localHandler);
        }
    }

})();