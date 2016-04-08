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
 *    Chat.js
 *
 *    Controller
 *
 *    Created by Maxim Kadushkin on 27 February 2014
 *    Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

define([
    'core',
    'common/main/lib/collection/Users',
    'common/main/lib/collection/ChatMessages',
    'common/main/lib/view/Chat'
], function () {
    'use strict';

    Common.Controllers.Chat = Backbone.Controller.extend(_.extend({
        models: [],
        collections: [
            'Common.Collections.Users',
            'Common.Collections.ChatMessages'
        ],
        views: [
            'Common.Views.Chat'
        ],

        initialize: function() {
            this.addListeners({
                'Common.Views.Chat': {
                    'message:add': _.bind(this.onSendMessage, this)
                }
            });
        },

        events: {
        },


        onLaunch: function() {
            this.panelChat = this.createView('Common.Views.Chat', {
                storeUsers: this.getApplication().getCollection('Common.Collections.Users'),
                storeMessages: this.getApplication().getCollection('Common.Collections.ChatMessages')
            });
        },

        setMode: function(mode) {
            this.mode = mode;

            if (this.api && this.mode.canCoAuthoring) {
                if (this.mode.canChat)
                    this.api.asc_registerCallback('asc_onCoAuthoringChatReceiveMessage', _.bind(this.onReceiveMessage, this));
                this.api.asc_registerCallback('asc_onAuthParticipantsChanged', _.bind(this.onUsersChanged, this));
                this.api.asc_registerCallback('asc_onConnectionStateChanged', _.bind(this.onUserConnection, this));

                this.api.asc_coAuthoringGetUsers();
                if (this.mode.canChat)
                    this.api.asc_coAuthoringChatGetMessages();
            }
            return this;
        },

        setApi: function(api) {
            this.api = api;

            return this;
        },

        onUsersChanged: function(users){
            if (!this.mode.canLicense) {
                var len = 0;
                for (name in users) {
                    if (undefined !== name) len++;
                }
                if (len>1 && this._isCoAuthoringStopped==undefined) {
                    this._isCoAuthoringStopped = true;
                    this.api.asc_coAuthoringDisconnect();
                    Common.NotificationCenter.trigger('api:disconnect');
                /*
                    setTimeout(_.bind(function(){
                        Common.UI.alert({
                            closable: false,
                            title: this.notcriticalErrorTitle,
                            msg: this.textUserLimit,
                            iconCls: 'warn',
                            buttons: ['ok']
                        });
                    }, this), 100);
                */
                    return;
                }
            }

            var usersStore = this.getApplication().getCollection('Common.Collections.Users');

            if (usersStore) {
                var arrUsers = [], name, user;

                for (name in users) {
                    if (undefined !== name) {
                        user = users[name];
                        if (user) {
                            arrUsers.push(new Common.Models.User({
                                id          : user.asc_getId(),
                                username    : user.asc_getUserName(),
                                online      : true,
                                color       : user.asc_getColor(),
                                view        : user.asc_getView()
                            }));
                        }
                    }
                }

                usersStore[usersStore.size() > 0 ? 'add' : 'reset'](arrUsers);
            }
        },

        onUserConnection: function(change){
            var usersStore = this.getApplication().getCollection('Common.Collections.Users');

            if (usersStore){
                var user = usersStore.findUser(change.asc_getId());
                if (!user) {
                    usersStore.add(new Common.Models.User({
                        id          : change.asc_getId(),
                        username    : change.asc_getUserName(),
                        online      : change.asc_getState(),
                        color       : change.asc_getColor(),
                        view        : change.asc_getView()
                    }));
                } else {
                    user.set({online: change.asc_getState()});
                }
            }
        },

        onReceiveMessage: function(messages, clear){
            var msgStore = this.getApplication().getCollection('Common.Collections.ChatMessages');

            if ( msgStore ) {
                var array = [];
                messages.forEach(function(msg) {
                    array.push(new Common.Models.ChatMessage({
                        userid      : msg.user,
                        message     : msg.message,
                        username    : msg.username
                    }));
                });

                msgStore[(msgStore.size() < 1 || clear) ? 'reset' : 'add'](array);
            }
        },

        onSendMessage: function(panel, text){
            if (text.length > 0){
                var splitString = function(string, chunkSize) {
                    var chunks = [];

                    while (string) {
                        if (string.length < chunkSize) {
                            chunks.push(string);
                            break;
                        } else {
                            chunks.push(string.substr(0, chunkSize));
                            string = string.substr(chunkSize);
                        }
                    }

                    return chunks;
                };

                var me = this;
                splitString(text, 2048).forEach(function(message) {
                    me.api.asc_coAuthoringChatSendMessage(message);
                });
            }
        },

        notcriticalErrorTitle: 'Warning',
        textUserLimit: 'You are using ONLYOFFICE Editors free version.<br>Only two users can co-edit the document simultaneously.<br>Want more? Consider buying ONLYOFFICE Editors Pro version.<br><a href=\"http:\/\/www.onlyoffice.com\" target=\"_blank\">Read more</a>'
    }, Common.Controllers.Chat || {}));
});