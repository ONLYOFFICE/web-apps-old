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
 *    LocalStorage.js
 *
 *    Created by Maxim Kadushkin on 31 July 2015
 *    Copyright (c) 2015 Ascensio System SIA. All rights reserved.
 *
 */

Common.localStorage = new (function() {
    var _storeName, _filter;
    var _store = {};

    var ongetstore = function(data) {
        if (data.type == 'localstorage') {
            _store = data.keys;
        }
    };

    Common.Gateway.on('internalcommand', ongetstore);

    var _refresh = function() {
        if (!_lsAllowed)
            Common.Gateway.internalMessage('localstorage', {cmd:'get', keys:_filter});
    };

    var _save = function() {
        if (!_lsAllowed)
            Common.Gateway.internalMessage('localstorage', {cmd:'set', keys:_store});
    };

    var _setItem = function(name, value, just) {
        if (_lsAllowed) {
            localStorage.setItem(name, value);
        } else {
            _store[name] = value;

            if (just===true) {
                Common.Gateway.internalMessage('localstorage', {
                    cmd:'set',
                    keys: {
                        name: value
                    }
                });
            }
        }
    };

    var _getItem = function(name) {
        if (_lsAllowed)
            return localStorage.getItem(name);
        else
            return _store[name]===undefined ? null : _store[name];
    };

    try {
        var _lsAllowed = !!window.localStorage;
    } catch (e) {
        _lsAllowed = false;
    }

    return {
        getId: function() {
            return _storeName;
        },
        setId: function(name) {
            _storeName = name;
        },
        getItem: _getItem,
        setItem: _setItem,
        setKeysFilter: function(value) {
            _filter = value;
        },
        sync: _refresh,
        save: _save
    };
})();