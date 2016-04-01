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
if (Common === undefined)
    var Common = {};

Common.IrregularStack = function(config) {

    var _stack = [];

    var _compare = function(obj1, obj2){
        if (typeof obj1 === 'object' && typeof obj2 === 'object' && window.JSON)
            return window.JSON.stringify(obj1) === window.JSON.stringify(obj2);
        return obj1 === obj2;
    }

    config = config || {};
    var _strongCompare = config.strongCompare || _compare;
    var _weakCompare = config.weakCompare || _compare;

    var _indexOf = function(obj, compare) {
        for (var i = _stack.length - 1; i >= 0; i--) {
            if (compare(_stack[i], obj))
                return i;
        }
        return -1;
    }

    var _push = function(obj) {
        _stack.push(obj);
    }

    var _pop = function(obj) {
        var index = _indexOf(obj, _strongCompare);
        if (index != -1) {
            var removed = _stack.splice(index, 1);
            return removed[0];
        }
        return undefined;
    }

    var _get = function(obj) {
        var index = _indexOf(obj, _weakCompare);
        if (index != -1) 
            return _stack[index];
        return undefined;
    }

    var _exist = function(obj) {
        return !(_indexOf(obj, _strongCompare) < 0);
    }

    return {
        push: _push,
        pop: _pop,
        get: _get,
        exist: _exist
    }
};