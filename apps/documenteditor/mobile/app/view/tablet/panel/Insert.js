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
Ext.define('DE.view.tablet.panel.Insert', {
    extend: 'Common.view.PopoverPanel',
    alias: 'widget.insertpanel',

    requires: ([
        'Ext.NavigationView',
        'Common.component.PlanarSpinner'
    ]),

    initialize: function() {
        var me = this;

        me.add({
            xtype       : 'navigationview',
            id          : 'id-insert-navigate',
            autoDestroy : false,
            defaultBackButtonText: this.backText,
            navigationBar: {
                height      : 44,
                minHeight   : 44,
                ui          : 'edit'
            },
            items       : [
                {
                    xtype   : 'settingslist',
                    title   : this.insertText,
                    id      : 'id-insert-root',
                    scrollable: {
                        disabled: true
                    },
                    store   : Ext.create('Common.store.SettingsList', {
                        data: [
                            {
                                setting : this.insertTableText,
                                icon    : 'table',
                                group   : 'table',
                                child   : 'id-insert-table-container'
                            },
                            {
                                setting : this.insertRowText,
                                icon    : 'insert-row',
                                group   : 'table',
                                id      : 'id-insert-table-row'
                            },
                            {
                                setting : this.insertColumnText,
                                icon    : 'insert-column',
                                group   : 'table',
                                id      : 'id-insert-table-column'
                            },
                            {
                                setting : this.insertPicture,
                                icon    : 'picture',
                                group   : 'image',
                                child   : 'id-insert-picture-container'
                            }
                        ]
                    })
                }
            ]
        });

        me.add({
            xtype   : 'container',
            hidden  : true,
            title   : this.tableText,
            id      : 'id-insert-table-container',
            padding : 10,
            cls     : 'round',
            items   : [
                {
                    xtype       : 'planarspinnerfield',
                    id          : 'id-spinner-table-columns',
                    margin      : '9',
                    label       : this.columnsText,
                    labelWidth  : '55%',
                    minValue    : 2,
                    maxValue    : 20,
                    stepValue   : 1,
                    cycle       : false
                },
                {
                    xtype       : 'spacer',
                    height      : 2
                },
                {
                    xtype       : 'planarspinnerfield',
                    id          : 'id-spinner-table-rows',
                    margin      : '9',
                    label       : this.rowsText,
                    labelWidth  : '55%',
                    minValue    : 2,
                    maxValue    : 20,
                    stepValue   : 1,
                    cycle       : false
                },
                {
                    xtype   : 'container',
                    padding : '5 5',
                    items   : [
                        {
                            xtype   : 'button',
                            id      : 'id-btn-insert-table',
                            ui      : 'light',
                            cls     : 'border-radius-10',
                            height  : 44,
                            text    : this.insertTableText
                        }
                    ]
                }
            ]
        });

        me.add({
            xtype   : 'settingslist',
            title   : this.pictureText,
            hidden  : true,
            id      : 'id-insert-picture-container',
            ui      : 'round',
            scrollable: {
                disabled: true
            },
            store   : Ext.create('Common.store.SettingsList', {
                data: [
                    {
                        setting : '<div class="btn-input-image" style="display: inline-block;" id="id-insert-picture-inline">' + this.pictureUploadInline + '<input style="height: 44px;" type="file" accept="image/*" capture="camera"></div>',
//                        icon    : 'spacing',
                        group   : 'wrap'
                    },
                    {
                        setting : '<div class="btn-input-image" style="display: inline-block;" id="id-insert-picture-float">' + this.pictureUploadFloat + '<input style="height: 44px;" type="file" accept="image/*" capture="camera"></div>',
//                        icon    : 'indent-inc',
                        group   : 'wrap'
                    }
                ]
            })
        });

        this.callParent(arguments);
    },

    backText            : 'Back',
    insertText          : 'Insert',
    insertTableText     : 'Insert Table',
    insertRowText       : 'Insert Row',
    insertColumnText    : 'Insert Column',
    insertPicture       : 'Insert Picture',
    tableText           : 'Table',
    columnsText         : 'Columns',
    rowsText            : 'Rows',
    pictureText         : 'Picture',
    pictureUploadInline : 'Insert Inline',
    pictureUploadFloat  : 'Insert Float'
});