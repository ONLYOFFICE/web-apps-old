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
 *  CellRangeDialog.js
 *
 *  Created by Julia Radzhabova on 6/3/14
 *  Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */


if (Common === undefined)
    var Common = {};

define([
    'common/main/lib/component/InputField',
    'common/main/lib/component/Window'
], function () { 'use strict';

    SSE.Views.CellRangeDialog = Common.UI.Window.extend(_.extend({
        options: {
            width   : 350,
            cls     : 'modal-dlg',
            modal   : false
        },

        initialize : function(options) {
            _.extend(this.options, {
                title: this.txtTitle
            }, options);

            this.template = [
                '<div class="box">',
                    '<div id="id-dlg-cell-range" class="input-row" style="margin-bottom: 5px;"></div>',
                '</div>',
                '<div class="footer right">',
                    '<button class="btn normal dlg-btn primary" result="ok" style="margin-right: 10px;">' + this.okButtonText + '</button>',
                    '<button class="btn normal dlg-btn" result="cancel">' + this.cancelButtonText + '</button>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template, this.options);

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var $window = this.getChild(),
                me = this;

            me.inputRange = new Common.UI.InputField({
                el          : $('#id-dlg-cell-range'),
                name        : 'range',
                style       : 'width: 100%;',
                allowBlank  : false,
                blankError  : this.txtEmpty,
                validateOnChange: true
            });

            $window.find('.dlg-btn').on('click',     _.bind(this.onBtnClick, this));
            me.inputRange.cmpEl.find('input').on('keypress', _.bind(this.onKeyPress, this));

            this.on('close', _.bind(this.onClose, this));

//            _.defer(function(){
//                $window.find('input[name="range"]').focus();
//            }, 10);
        },

        onPrimary: function() {
            this._handleInput('ok');
            return false;
        },

        setSettings: function(settings) {
            var me = this;

            this.inputRange.setValue(settings.range ? settings.range : '');

            if (settings.api) {
                me.api = settings.api;

                me.api.asc_setSelectionDialogMode(Asc.c_oAscSelectionDialogType.Chart, settings.range ? settings.range : '');
                me.api.asc_unregisterCallback('asc_onSelectionRangeChanged', _.bind(me.onApiRangeChanged, me));
                me.api.asc_registerCallback('asc_onSelectionRangeChanged', _.bind(me.onApiRangeChanged, me));
                Common.NotificationCenter.trigger('cells:range', Asc.c_oAscSelectionDialogType.Chart);
            }

            me.inputRange.validation = function(value) {
                var isvalid = me.api.asc_checkDataRange(Asc.c_oAscSelectionDialogType.Chart, value, false);
                return (isvalid==Asc.c_oAscError.ID.DataRangeError) ? me.txtInvalidRange : true;
            };
        },

        getSettings: function () {
            return this.inputRange.getValue();
        },

        onApiRangeChanged: function(info) {
            this.inputRange.setValue(info);
            if (this.inputRange.cmpEl.hasClass('error'))
                this.inputRange.cmpEl.removeClass('error');
        },

        onBtnClick: function(event) {
            this._handleInput(event.currentTarget.attributes['result'].value);
        },

        onClose: function(event) {
            if (this.api)
                this.api.asc_setSelectionDialogMode(Asc.c_oAscSelectionDialogType.None);
            Common.NotificationCenter.trigger('cells:range', Asc.c_oAscSelectionDialogType.None);

            SSE.getController('RightMenu').SetDisabled(false);
        },

        onKeyPress: function(event) {
            if (event.keyCode == Common.UI.Keys.RETURN) {
                this._handleInput('ok');
            }
        },

        _handleInput: function(state) {
            if (this.options.handler) {
                if (state == 'ok') {
                    if (this.inputRange.checkValidate() !== true)
                        return;
                }
                this.options.handler.call(this, this, state);
            }

            this.close();
        },

        show: function () {
            Common.UI.Window.prototype.show.call(this);
            SSE.getController('RightMenu').SetDisabled(true);
        },

        txtTitle   : 'Select Data Range',
        textCancel  : 'Cancel',
        txtEmpty    : 'This field is required',
        txtInvalidRange: 'ERROR! Invalid cells range',
        errorMaxRows: 'ERROR! The maximum number of data series per chart is 255.'
    }, SSE.Views.CellRangeDialog || {}))
});