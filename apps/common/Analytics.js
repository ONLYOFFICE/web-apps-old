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

Common.component = Common.component || {};

Common.Analytics = Common.component.Analytics = new(function() {
    var _category;

    return {
        initialize: function(id, category) {

            if (typeof id === 'undefined')
                throw 'Analytics: invalid id.';

            if (typeof category === 'undefined' || Object.prototype.toString.apply(category) !== '[object String]')
                throw 'Analytics: invalid category type.';

            _category = category;

            $('head').append(
                '<script type="text/javascript">' +
                    'var _gaq = _gaq || [];' +
                    '_gaq.push(["_setAccount", "' + id + '"]);' +
                    '_gaq.push(["_trackPageview"]);' +
                    '(function() {' +
                    'var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;' +
                    'ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";' +
                    'var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);' +
                    '})();' +
                    '</script>'
            );
        },

        trackEvent: function(action, label, value) {

            if (typeof action !== 'undefined' && Object.prototype.toString.apply(action) !== '[object String]')
                throw 'Analytics: invalid action type.';

            if (typeof label !== 'undefined' && Object.prototype.toString.apply(label) !== '[object String]')
                throw 'Analytics: invalid label type.';

            if (typeof value !== 'undefined' && !(Object.prototype.toString.apply(value) === '[object Number]' && isFinite(value)))
                throw 'Analytics: invalid value type.';

            if (typeof _gaq === 'undefined')
                return;

            if (_category === 'undefined')
                throw 'Analytics is not initialized.';

            _gaq.push(['_trackEvent', _category, action, label, value]);
        }
    }
})();