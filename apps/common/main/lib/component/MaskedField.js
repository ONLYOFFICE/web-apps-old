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

define([
    'common/main/lib/component/BaseView'
], function () {
    'use strict';

    Common.UI.MaskedField = Common.UI.BaseView.extend({
        options : {
            maskExp: '',
            maxLength: 999
        },

        initialize : function(options) {
            Common.UI.BaseView.prototype.initialize.call(this, options);

            var me = this,
                el = $(this.el);

            el.addClass('masked-field user-select');
            el.attr('maxlength', me.options.maxLength);
            el.on('keypress', function(e) {
                var charCode = String.fromCharCode(e.which);
                if(!me.options.maskExp.test(charCode) && !e.ctrlKey && e.keyCode !== Common.UI.Keys.DELETE && e.keyCode !== Common.UI.Keys.BACKSPACE &&
                    e.keyCode !== Common.UI.Keys.LEFT && e.keyCode !== Common.UI.Keys.RIGHT && e.keyCode !== Common.UI.Keys.HOME &&
                    e.keyCode !== Common.UI.Keys.END && e.keyCode !== Common.UI.Keys.ESC && e.keyCode !== Common.UI.Keys.INSERT &&
                    e.keyCode !== Common.UI.Keys.TAB /* || el.val().length>=me.options.maxLength*/){
                    if (e.keyCode==Common.UI.Keys.RETURN) me.trigger('changed', me, el.val());
                    e.preventDefault();
                    e.stopPropagation();
                }

            });
            el.on('input', function(e) {
                me.trigger('change', me, el.val());
            });
            el.on('blur',  function(e) {
                me.trigger('changed', me, el.val());
            });
        },

        render : function() {
            return this;
        },

        setValue: function(value) {
            if (this.options.maskExp.test(value) && value.length<=this.options.maxLength)
                $(this.el).val(value);
        },

        getValue: function() {
            $(this.el).val();
        }
    });
});