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
 *  InsertTableDialog.js
 *
 *  Created by Alexander Yuzhin on 2/17/14
 *  Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

if (Common === undefined)
    var Common = {};

define([
    'common/main/lib/component/Window'
], function () { 'use strict';

    Common.Views.InsertTableDialog = Common.UI.Window.extend(_.extend({
        options: {
            width: 230,
            height: 170,
            header: false,
            style: 'min-width: 230px;',
            cls: 'modal-dlg'
        },

        initialize : function(options) {
            _.extend(this.options, options || {});

            this.template = [
                '<div class="box">',
                    '<h4>' + this.txtTitle + '</h4>',
                    '<div class="input-row" style="margin: 10px 0;">',
                        '<label class="text columns-text" style="width: 130px;">' + this.txtColumns + '</label><div class="columns-val" style="float: right;"></div>',
                    '</div>',
                    '<div class="input-row" style="margin: 10px 0;">',
                        '<label class="text rows-text" style="width: 130px;">' + this.txtRows + '</label><div class="rows-val" style="float: right;"></div>',
                    '</div>',
                '</div>',
                '<div class="footer center">',
                    '<button class="btn normal dlg-btn primary" result="ok" style="margin-right: 10px;">' + this.okButtonText + '</button>',
                    '<button class="btn normal dlg-btn" result="cancel">' + this.cancelButtonText + '</button>',
                '</div>'
            ].join('');

            this.options.tpl = _.template(this.template, this.options);

            Common.UI.Window.prototype.initialize.call(this, this.options);
        },

        render: function() {
            Common.UI.Window.prototype.render.call(this);

            var $window = this.getChild();
            $window.find('.dlg-btn').on('click', _.bind(this.onBtnClick, this));

            this.udColumns = new Common.UI.MetricSpinner({
                el          : $window.find('.columns-val'),
                step        : 1,
                width       : 64,
                value       : 2,
                defaultUnit : '',
                maxValue    : 63,
                minValue    : 1,
                allowDecimal: false
            });

            this.udRows = new Common.UI.MetricSpinner({
                el          : $window.find('.rows-val'),
                step        : 1,
                width       : 64,
                value       : 2,
                defaultUnit : '',
                maxValue    : 100,
                minValue    : 1,
                allowDecimal: false
            });
//            this.udColumns.on('entervalue', _.bind(this.onPrimary, this));
//            this.udRows.on('entervalue', _.bind(this.onPrimary, this));
        },

        onBtnClick: function(event) {
            if (this.options.handler) {
                this.options.handler.call(this, event.currentTarget.attributes['result'].value, {
                    columns : this.udColumns.getValue(),
                    rows    : this.udRows.getValue()
                });
            }

            this.close();
        },

        onPrimary: function() {
            if (this.options.handler) {
                this.options.handler.call(this, 'ok', {
                    columns : this.udColumns.getValue(),
                    rows    : this.udRows.getValue()
                });
            }

            this.close();
            return false;
        },

        txtTitle: 'Table size',
        txtColumns: 'Number of Columns',
        txtRows: 'Number of Rows',
        textInvalidRowsCols: 'You need to specify valid rows and columns count.',
        cancelButtonText: 'Cancel',
        okButtonText:   'Ok',
        txtMinText: 'The minimum value for this field is {0}',
        txtMaxText: 'The maximum value for this field is {0}'
    }, Common.Views.InsertTableDialog || {}))
});