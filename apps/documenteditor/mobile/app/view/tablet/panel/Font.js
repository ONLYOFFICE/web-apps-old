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
Ext.define('DE.view.tablet.panel.Font', {
    extend: 'Common.view.PopoverPanel',
    alias: 'widget.fontpanel',

    requires: ([
        'Ext.NavigationView',
        'Common.component.PlanarSpinner'
    ]),

    initialize: function() {
        var me = this;

        me.add({
            xtype       : 'navigationview',
            id          : 'id-font-navigate',
            autoDestroy : false,
            cls         : 'plain',
            defaultBackButtonText: this.backText,
            navigationBar: {
                height      : 44,
                minHeight   : 44,
                hidden      : true,
                ui          : 'edit'
            },
            layout: {
                type        : 'card',
                animation   : null
            },
            items       : [
                {
                    xtype   : 'container',
                    layout  : 'hbox',
                    height  : 31,
                    id      : 'id-font-root',
                    style   : 'background: transparent;',
                    items   : [
                        {
                            xtype   : 'button',
                            id      : 'id-btn-fontname',
                            ui      : 'base',
                            style   : 'font-size: .7em;',
                            text    : this.fontNameText,
                            width   : 185
                        },
                        {
                            xtype   : 'spacer',
                            width   : 7
                        },
                        {
                            xtype       : 'planarspinnerfield',
                            width       : 135,
                            minValue    : 6,
                            maxValue    : 100,
                            stepValue   : 1,
                            cycle       : false,
                            component   : {
                                disabled : false
                            }
                        },
                        {
                            xtype   : 'spacer',
                            width   : 7
                        },
                        {
                            xtype   : 'segmentedbutton',
                            id      : 'id-toggle-baseline',
                            ui      : 'base',
                            cls     : 'divided',
                            allowDepress: true,
                            items   : [
                                {
                                    id      : 'id-btn-baseline-up',
                                    ui      : 'base',
                                    iconCls : 'superscript'
                                },
                                {
                                    id      : 'id-btn-baseline-down',
                                    ui      : 'base',
                                    iconCls : 'subscript'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.add({
            xtype   : 'settingslist',
            hidden  : true,
            title   : this.fontNameText,
            id      : 'id-font-name',
            disableSelection: false,
            variableHeights: false,
            store   : Ext.create('Common.store.SettingsList', {})
        });

        this.callParent(arguments);
    },

    fontNameText: 'Font Name',
    backText    : 'Back'
});