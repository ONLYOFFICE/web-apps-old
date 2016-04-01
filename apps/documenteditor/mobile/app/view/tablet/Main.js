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
Ext.define('DE.view.tablet.Main', {
    extend: 'DE.view.Main',
    alias: 'widget.detabletmain',

    requires: ([
        'Common.view.PopClip',
        'DE.view.tablet.panel.FontStyle',
        'DE.view.tablet.panel.Insert',
        'DE.view.tablet.panel.ListStyle',
        'DE.view.tablet.panel.ParagraphAlignment',
        'DE.view.tablet.panel.Spacing',
        'DE.view.tablet.panel.TextColor',
        'DE.view.tablet.toolbar.Edit',
        'DE.view.tablet.toolbar.Search',
        'DE.view.tablet.toolbar.View'
    ]),

    config: {
        cls: 'de-tablet-main',
        fullscreen: true,
        layout: {
            type: 'vbox',
            pack: 'center'
        }
    },

    initialize: function() {
        var me = this;

        this.add(Ext.create('DE.view.tablet.toolbar.Edit', {
            hidden      : true
        }));

        this.add(Ext.create('DE.view.tablet.toolbar.View', {
            hidden      : true
        }));

        this.add(Ext.create('DE.view.tablet.toolbar.Search', {
            hidden      : true
        }));

        this.add({
            xtype   : 'container',
            layout  : 'vbox',
            id      : 'id-conteiner-document',
            flex    : 1,
            items   : [
                {
                    xtype   : 'container',
                    flex    : 1,
                    id      : 'id-sdkeditor'
                }
            ]
        });

        this.add({
            xtype   : 'popclip',
            hidden  : true
        });

        this.callParent(arguments);
    }
});
