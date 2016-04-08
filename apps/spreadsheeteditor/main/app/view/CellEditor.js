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
 *    CellEdit.js
 *
 *    Created by Maxim Kadushkin on 04 April 2014
 *    Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

define([
    'text!spreadsheeteditor/main/app/template/CellEditor.template',
    'common/main/lib/component/BaseView'
], function (template) {
    'use strict';

    SSE.Views.CellEditor = Common.UI.BaseView.extend(_.extend({
        template: _.template(template),

        initialize: function (options) {
            Common.UI.BaseView.prototype.initialize.call(this, options);
        },

        render: function () {
            $(this.el).html(this.template());

            this.btnNamedRanges = new Common.UI.Button({
                menu        : new Common.UI.Menu({
                    style   : 'min-width: 70px;max-width:400px;',
                    maxHeight: 250,
                    items: [
                        { caption: this.textManager, value: 'manager' },
                        { caption: '--' }
                    ]
                }).on('render:after', function(mnu) {
                        this.scroller = new Common.UI.Scroller({
                        el: $(this.el).find('.dropdown-menu '),
                        useKeyboard: this.enableKeyEvents && !this.handleSelect,
                        minScrollbarLength  : 40
                    });
                }).on('show:after', function () {
                    this.scroller.update({alwaysVisibleY: true});
                })
            });
            this.btnNamedRanges.render($('#ce-cell-name-menu'));
            this.btnNamedRanges.setVisible(false);
            this.btnNamedRanges.menu.setOffset(-55);

            this.$cellname = $('#ce-cell-name', this.el);
            this.$btnexpand = $('#ce-btn-expand', this.el);
            this.$btnfunc = $('#ce-func-label', this.el);

            var me = this;
            this.$cellname.on('focusin', function(e){
                me.$cellname.select().one('mouseup', function (e) {e.preventDefault();});
            });

            this.$btnfunc.addClass('disabled');
            this.$btnfunc.tooltip({
                title       : this.tipFormula,
                placement   : 'cursor'
            });

            return this;
        },

        updateCellInfo: function(info) {
            if (info) {
                this.$cellname.val(typeof(info)=='string' ? info : info.asc_getName());
            }
        },

        tipFormula: 'Insert Function',
        textManager: 'Manager'
    }, SSE.Views.CellEditor || {}));
});
