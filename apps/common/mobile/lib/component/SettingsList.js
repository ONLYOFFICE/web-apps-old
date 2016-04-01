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
Ext.define('Common.component.SettingsList', {
    extend: 'Ext.List',
    alias: 'widget.settingslist',

    config: {
        disableSelection: true,
        pinHeaders      : false,
        grouped         : true,
        cls             : 'settings',
        ui              : 'round',
        itemTpl         : Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '<tpl if="this.hasIcon(icon)">',
                    '<span class="list-icon {icon}"></span>',
                '</tpl>',
                '<tpl if="this.hasIcon(icon)">',
                    '<strong class="icon-offset">{setting}</strong>',
                '<tpl else>',
                    '<strong>{setting}</strong>',
                '</tpl>',
                '<tpl if="this.hasChild(child)">',
                    '<span class="list-icon disclosure"></span>',
                '</tpl>',
            '</tpl>',
            {
                hasIcon: function(icon){
                    return !Ext.isEmpty(icon);
                },
                hasChild: function(child){
                    return !Ext.isEmpty(child);
                }
            }
        )
    },

    //
    // Workaround Sencha Touch bug
    // See https://sencha.jira.com/browse/TOUCH-3718
    //

    findGroupHeaderIndices: function() {
        var me = this,
            store = me.getStore(),
            storeLn = store.getCount(),
            groups = store.getGroups(),
            groupLn = groups.length,
            headerIndices = me.headerIndices = {},
            footerIndices = me.footerIndices = {},
            i, previousIndex, firstGroupedRecord, storeIndex;


        me.groups = groups;

        for (i = 0; i < groupLn; i++) {
            firstGroupedRecord = groups[i].children[0];
            storeIndex = store.indexOf(firstGroupedRecord);
            headerIndices[storeIndex] = true;

            previousIndex = storeIndex - 1;
            if (previousIndex >= 0) {
                footerIndices[previousIndex] = true;
            }
        }

        footerIndices[storeLn - 1] = true;

        return headerIndices;
    }
});