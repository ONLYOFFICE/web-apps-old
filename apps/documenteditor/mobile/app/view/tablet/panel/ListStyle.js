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
Ext.define('DE.view.tablet.panel.ListStyle', {
    extend: 'Common.view.PopoverPanel',
    alias: 'widget.liststylepanel',

    requires: ([
        'Ext.NavigationView',
        'Common.component.SettingsList'
    ]),

    initialize: function() {
        var me = this;

        me.add({
            xtype       : 'navigationview',
            id          : 'id-liststyle-navigate',
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
                    title   : this.listStyleText,
                    id      : 'id-liststyle-root',
                    ui      : 'round',
                    scrollable: {
                        disabled: true
                    },
                    store   : Ext.create('Common.store.SettingsList', {
                        data: [
                            {
                                setting : this.bulletsText,
                                icon    : 'bullets',
                                group   : 'markers',
                                child   : 'id-liststyle-bullets'
                            },
                            {
                                setting : this.numberingText,
                                icon    : 'numbering',
                                group   : 'markers',
                                child   : 'id-liststyle-numbering'
                            },
                            {
                                setting : this.outlineText,
                                icon    : 'outline',
                                group   : 'markers',
                                child   : 'id-liststyle-outline'
                            },
                            {
                                setting : this.incIndentText,
                                icon    : 'indent-inc',
                                group   : 'indent',
                                id      : 'id-list-indent-increment'
                            },
                            {
                                setting : this.decIndentText,
                                icon    : 'indent-dec',
                                group   : 'indent',
                                id      : 'id-list-indent-decrement'
                            }
                        ]
                    })
                }
            ]
        });

        me.add({
            title   : this.bulletsText,
            hidden  : true,
            id      : 'id-liststyle-bullets',
            xtype   : 'container',
            layout  : 'vbox',
            cls     : 'round',
            items   : [
                {
                    xtype   : 'dataview',
                    flex    : 1,
                    cls     : 'icon-view bullets',
                    action  : 'style',
                    style   : 'display: inline-block;',
                    disableSelection: true,
                    scrollable: {
                        disabled: true
                    },
                    store   : {
                        field   : ['bullet', 'cls', 'type', 'subtype'],
                        data    : [
                            {bullet: 'none',     type: 0, subtype:-1, cls: 'top-left'},
                            {bullet: 'bullet-0', type: 0, subtype: 1, cls: ''},
                            {bullet: 'bullet-1', type: 0, subtype: 2, cls: ''},
                            {bullet: 'bullet-2', type: 0, subtype: 3, cls: 'top-right'},
                            {bullet: 'bullet-3', type: 0, subtype: 4, cls: 'bottom-left'},
                            {bullet: 'bullet-4', type: 0, subtype: 5, cls: ''},
                            {bullet: 'bullet-5', type: 0, subtype: 6, cls: ''},
                            {bullet: 'bullet-6', type: 0, subtype: 7, cls: 'bottom-right'}
                        ]
                    },
                    itemTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '<div class="item-inner {cls}">',
                                '<tpl if="bullet == \'none\'">',
                                    '<div class="text">' + me.noneText + '</div>',
                                '<tpl else>',
                                    '<div class="icon {bullet}">&nbsp;</div>',
                                '</tpl>',
                            '</div>',
                        '</tpl>'
                    )
                }
            ]
        });

        me.add({
            title   : this.numberingText,
            hidden  : true,
            id      : 'id-liststyle-numbering',
            xtype   : 'container',
            layout  : 'vbox',
            cls     : 'round',
            items   : [
                {
                    xtype   : 'dataview',
                    flex    : 1,
                    cls     : 'icon-view numbering',
                    action  : 'style',
                    style   : 'display: inline-block;',
                    disableSelection: true,
                    scrollable: {
                        disabled: true
                    },
                    store   : {
                        field   : ['numbering', 'cls', 'type', 'subtype'],
                        data    : [
                            {numbering: 'none',        type: 1, subtype:-1, cls: 'top-left'},
                            {numbering: 'numbering-0', type: 1, subtype: 4, cls: ''},
                            {numbering: 'numbering-1', type: 1, subtype: 5, cls: ''},
                            {numbering: 'numbering-2', type: 1, subtype: 6, cls: 'top-right'},
                            {numbering: 'numbering-3', type: 1, subtype: 1, cls: 'bottom-left'},
                            {numbering: 'numbering-4', type: 1, subtype: 2, cls: ''},
                            {numbering: 'numbering-5', type: 1, subtype: 3, cls: ''},
                            {numbering: 'numbering-6', type: 1, subtype: 7, cls: 'bottom-right'}
                        ]
                    },
                    itemTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '<div class="item-inner {cls}">',
                                '<tpl if="numbering == \'none\'">',
                                    '<div class="text">' + me.noneText + '</div>',
                                '<tpl else>',
                                    '<div class="icon {numbering}">&nbsp;</div>',
                                '</tpl>',
                            '</div>',
                        '</tpl>'
                    )
                }
            ]
        });


        me.add({
            title   : this.outlineText,
            hidden  : true,
            id      : 'id-liststyle-outline',
            xtype   : 'container',
            layout  : 'vbox',
            cls     : 'round',
            items   : [
                {
                    xtype   : 'dataview',
                    flex    : 1,
                    cls     : 'icon-view outline',
                    action  : 'style',
                    style   : 'display: inline-block;',
                    disableSelection: true,
                    scrollable: {
                        disabled: true
                    },
                    store   : {
                        field   : ['outline', 'cls', 'type', 'subtype'],
                        data    : [
                            {outline: 'none',      type: 2, subtype:-1, cls: 'top-left bottom-left'},
                            {outline: 'outline-0', type: 2, subtype: 1, cls: ''},
                            {outline: 'outline-1', type: 2, subtype: 2, cls: ''},
                            {outline: 'outline-2', type: 2, subtype: 3, cls: 'top-right bottom-right'}
                        ]
                    },
                    itemTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '<div class="item-inner {cls}">',
                                '<tpl if="outline == \'none\'">',
                                    '<div class="text">' + me.noneText + '</div>',
                                '<tpl else>',
                                    '<div class="icon {outline}">&nbsp;</div>',
                                '</tpl>',
                            '</div>',
                        '</tpl>'
                    )
                }
            ]
        });

        this.callParent(arguments);
    },

    backText        : 'Back',
    listStyleText   : 'List Style',
    bulletsText     : 'Bullets',
    numberingText   : 'Numbering',
    outlineText     : 'Outline',
    incIndentText   : 'Increment indent',
    decIndentText   : 'Decrement Indent',
    noneText        : 'none'
});