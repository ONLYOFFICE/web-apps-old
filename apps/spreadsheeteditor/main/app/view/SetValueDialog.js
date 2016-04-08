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
 *  SetValueDialog.js
 *
 *  Created by Julia Radzhabova on 4/21/14
 *  Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

define([
    'common/main/lib/component/Window',
    'common/main/lib/component/ComboBox'
], function () { 'use strict';

    SSE.Views.SetValueDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 214,
            header: true,
            style: 'min-width: 214px;',
            cls: 'modal-dlg'
        },

        initialize : function(options) {
            _.extend(this.options, {
                title: this.textTitle
            }, options || {});

            this.template = [
                '<div class="box">',
                    '<div class="input-row">',
                        '<div id="id-spin-set-value"></div>',
                    '</div>',
                '<div class="footer center">',
                '<button class="btn normal dlg-btn primary" result="ok" style="margin-right: 10px;">' + this.okButtonText + '</button>',
                '<button class="btn normal dlg-btn" result="cancel">' + this.cancelButtonText + '</button>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template, this.options);
            this.startvalue = this.options.startvalue;
            this.maxvalue = this.options.maxvalue;
            this.defaultUnit = this.options.defaultUnit;
            this.step = this.options.step;

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            this.spnSize = new Common.UI.MetricSpinner({
                el: $('#id-spin-set-value'),
                width: 182,
                step: this.step,
                defaultUnit : this.defaultUnit,
                minValue    : 0,
                maxValue    : this.maxvalue,
                value       : (this.startvalue!==null) ? (this.startvalue + ' ' + this.defaultUnit) : ''
            });

            if (this.startvalue!==null) {
                var me = this;
                setTimeout(function() {
                    var input = me.spnSize.$input[0];
                    if (document.selection) { // IE
                        me.spnSize.$input.select();
                    } else { //FF и Webkit
                        input.selectionStart = 0;
                        input.selectionEnd = (me.startvalue).toString().length;
                    }
                }, 10);
            }

            var $window = this.getChild();
            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));
            this.spnSize.on('entervalue', _.bind(this.onEnterValue, this));
            this.spnSize.on('change', _.bind(this.onChange, this));
            this.spnSize.$el.find('input').focus();
        },

        _handleInput: function(state) {
            if (this.options.handler) {
                this.options.handler.call(this, this, state);
            }

            this.close();
        },

        onBtnClick: function(event) {
            this._handleInput(event.currentTarget.attributes['result'].value);
        },

        onEnterValue: function(event) {
            this._handleInput('ok');
        },

        onChange: function () {
            var val = this.spnSize.getNumberValue();
            val = val / this.step; val = (val | val) * this.step;
            this.spnSize.setValue(val, true);
        },

        getSettings: function() {
            return this.spnSize.getNumberValue();
        },

        cancelButtonText: 'Cancel',
        okButtonText:   'Ok',
        txtMinText: 'The minimum value for this field is {0}',
        txtMaxText: 'The maximum value for this field is {0}'
    }, SSE.Views.SetValueDialog || {}))
});