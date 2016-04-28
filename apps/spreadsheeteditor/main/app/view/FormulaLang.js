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
define([
], function () {
    'use strict';

    SSE.Views = SSE.Views || {};

    SSE.Views.FormulaLang = new(function() {
        var langJson = {},
            langDescJson = {};

        var _createXMLHTTPObject = function() {
            var xmlhttp;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (E) {
                    xmlhttp = false;
                }
            }
            if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
                xmlhttp = new XMLHttpRequest();
            }
            return xmlhttp;
        };

        var _get = function(lang) {
            if (!lang) return '';
            lang = lang.toLowerCase() ;

            if (langJson[lang])
                return langJson[lang];
            else if (lang == 'en')
                return undefined;
            else {
                try {
                    var xhrObj = _createXMLHTTPObject();
                    if (xhrObj && lang) {
                        xhrObj.open('GET', 'resources/formula-lang/' + lang + '.json', false);
                        xhrObj.send('');
                        langJson[lang] = eval("(" + xhrObj.responseText + ")");
                        return langJson[lang];
                    }
                }
                catch (e) {
                }
            }

            return null;
        };


        var _getDescription = function(lang) {
            if (!lang) return '';
            lang = lang.toLowerCase() ;

            if (langDescJson[lang])
                return langDescJson[lang];
            else {
                try {
                    var xhrObj = _createXMLHTTPObject();
                    if (xhrObj && lang) {
                        xhrObj.open('GET', 'resources/formula-lang/' + lang + '_desc.json', false);
                        xhrObj.send('');
                        if (xhrObj.status == 200)
                            langDescJson[lang] = eval("(" + xhrObj.responseText + ")");
                        else {
                            xhrObj.open('GET', 'resources/formula-lang/en_desc.json', false);
                            xhrObj.send('');
                            langDescJson[lang] = eval("(" + xhrObj.responseText + ")");
                        }
                        return langDescJson[lang];
                    }
                }
                catch (e) {
                }
            }

            return null;
        };

        return {
            get: _get,
            getDescription: _getDescription
        };
    })();
});
