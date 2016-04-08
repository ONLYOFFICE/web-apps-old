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
Ext.define('DE.view.tablet.panel.Spacing', {
    extend: 'Common.view.PopoverPanel',
    alias: 'widget.spacingpanel',

    requires: ([
        'Ext.NavigationView',
        'Common.component.SettingsList'
    ]),

    initialize: function() {
        var me = this;

        me.add({
            xtype       : 'navigationview',
            id          : 'id-spacing-navigate',
            autoDestroy : false,
            defaultBackButtonText: this.backText,
            navigationBar: {
                height      : 44,
                minHeight   : 44,
                ui          : 'edit'
            },

            items: [
                {
                    xtype   : 'settingslist',
                    title   : this.spacingText,
                    id      : 'id-spacing-root',
                    ui      : 'round',
                    scrollable: {
                        disabled: true
                    },
                    store   : Ext.create('Common.store.SettingsList', {
                        data: [
                            {
                                setting : this.lineSpacingText,
                                icon    : 'spacing',
                                group   : 'line',
                                child   : 'id-spacing-linespacing'
                            },
                            {
                                setting : this.incIndentText,
                                icon    : 'indent-inc',
                                group   : 'indent',
                                id      : 'id-linespacing-increaseindent'
                            },
                            {
                                setting : this.decIndentText,
                                icon    : 'indent-dec',
                                group   : 'indent',
                                id      : 'id-linespacing-decrementindent'
                            }
                        ]
                    })
                }
            ]
        });

        me.add({
            title           : this.spacingText,
            hidden          : true,
            id              : 'id-spacing-linespacing',
            xtype           : 'settingslist',
            disableSelection: false,
            allowDeselect   : true,
            store           : Ext.create('Common.store.SettingsList', {
                data: [
                    {setting: '1.0',    group: 'spacing'},
                    {setting: '1.15',   group: 'spacing'},
                    {setting: '1.5',    group: 'spacing'},
                    {setting: '2',      group: 'spacing'},
                    {setting: '2.5',    group: 'spacing'},
                    {setting: '3.0',    group: 'spacing'}
                ]
            })
        });

        this.callParent(arguments);
    },

    backText        : 'Back',
    spacingText     : 'Spacing',
    lineSpacingText : 'Paragraph Line Spacing',
    incIndentText   : 'Increase Indent',
    decIndentText   : 'Decrement Indent'
});