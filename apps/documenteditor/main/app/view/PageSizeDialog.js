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
 *  PageSizeDialog.js
 *
 *  Created by Julia Radzhabova on 2/16/16
 *  Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

define([
    'common/main/lib/component/Window',
    'common/main/lib/component/MetricSpinner'
], function () { 'use strict';

    DE.Views.PageSizeDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 215,
            header: true,
            style: 'min-width: 216px;',
            cls: 'modal-dlg',
            id: 'window-page-size'
        },

        initialize : function(options) {
            _.extend(this.options, {
                title: this.textTitle
            }, options || {});

            this.template = [
                '<div class="box" style="height: 40px;">',
                    '<table cols="2" style="width: 100%;margin-bottom: 10px;">',
                        '<tr>',
                            '<td class="padding-small" style="padding-right: 10px;">',
                                '<label class="input-label">' + this.textWidth + '</label>',
                                '<div id="page-size-spin-width"></div>',
                            '</td>',
                            '<td class="padding-small">',
                                '<label class="input-label">' + this.textHeight + '</label>',
                                '<div id="page-size-spin-height"></div>',
                            '</td>',
                        '</tr>',
                    '</table>',
                '</div>',
                '<div class="separator horizontal"/>',
                '<div class="footer center">',
                    '<button class="btn normal dlg-btn primary" result="ok" style="margin-right: 10px;">' + this.okButtonText + '</button>',
                    '<button class="btn normal dlg-btn" result="cancel">' + this.cancelButtonText + '</button>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template, this.options);

            this.spinners = [];
            this._noApply = false;

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            this.spnWidth = new Common.UI.MetricSpinner({
                el: $('#page-size-spin-width'),
                step: .1,
                width: 86,
                defaultUnit : "cm",
                value: '10 cm',
                maxValue: 55.88,
                minValue: 0
            });
            this.spinners.push(this.spnWidth);

            this.spnHeight = new Common.UI.MetricSpinner({
                el: $('#page-size-spin-height'),
                step: .1,
                width: 86,
                defaultUnit : "cm",
                value: '20 cm',
                maxValue: 55.88,
                minValue: 0
            });
            this.spinners.push(this.spnHeight);

            var $window = this.getChild();
            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));
            $window.find('input').on('keypress', _.bind(this.onKeyPress, this));

//            this.updateMetricUnit();
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

        onKeyPress: function(event) {
            if (event.keyCode == Common.UI.Keys.RETURN) {
                this._handleInput('ok');
            }
        },

        setSettings: function (props) {
            if (props) {
                this.spnWidth.setMinValue(parseFloat((props.get_LeftMargin()/10+props.get_RightMargin()/10.).toFixed(4)) + 1.27);
                this.spnWidth.setValue(props.get_W()/10, true); // this.spnWidth.setValue(Common.Utils.Metric.fnRecalcFromMM(props[0]), true);
                this.spnHeight.setMinValue(parseFloat((props.get_TopMargin()/10+props.get_BottomMargin()/10.).toFixed(4)) + 0.26);
                this.spnHeight.setValue(props.get_H()/10, true);
            }
        },

        getSettings: function() {
            return [this.spnWidth.getNumberValue()*10, this.spnHeight.getNumberValue()*10]; //Common.Utils.Metric.fnRecalcToMM(this.spnWidth.getNumberValue())
        },

        updateMetricUnit: function() {
            if (this.spinners) {
                for (var i=0; i<this.spinners.length; i++) {
                    var spinner = this.spinners[i];
                    spinner.setDefaultUnit(Common.Utils.Metric.metricName[Common.Utils.Metric.getCurrentMetric()]);
                    spinner.setStep(Common.Utils.Metric.getCurrentMetric()==Common.Utils.Metric.c_MetricUnits.pt ? 1 : 0.1);
                }
            }

        },

        textTitle: 'Page Size',
        textWidth: 'Width',
        textHeight: 'Height',
        cancelButtonText:   'Cancel',
        okButtonText:       'Ok'
    }, DE.Views.PageSizeDialog || {}))
});