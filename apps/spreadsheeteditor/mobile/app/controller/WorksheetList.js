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
Ext.define('SSE.controller.WorksheetList', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            worksheetList: {
                selector: 'seworksheetlist list'
            }

        }
    },

    init: function() {
        this.control({
            'seworksheetlist list': {
                itemtap: this._worksheetSelect
            }
        })
    },

    setApi: function(o) {
        this.api = o;

        if (this.api){
            this.api.asc_registerCallback('asc_onEndAction', Ext.bind(this.onLongActionEnd, this));
        }
    },

    _worksheetSelect: function(dataview, index, target, record, event, eOpts){
        if (this.api){
            var dataIndex = record.data.index;
            if ((dataIndex > -1) && (this.api.asc_getActiveWorksheetIndex() != dataIndex))
                this.api.asc_showWorksheet(dataIndex);
        }
    },

    _loadWorksheets: function(){
        if (this.api) {
            var worksheetsStore = Ext.getStore('Worksheets'),
                worksheetList = this.getWorksheetList();

            if (worksheetsStore && worksheetList){
                worksheetsStore.removeAll(false);

                var worksheetsCount = this.api.asc_getWorksheetsCount();
                if (worksheetsCount){
                    for(var i = 0; i < worksheetsCount; i++){
                        var result = {
                            text    : this.api.asc_getWorksheetName(i),
                            index   : i
                        };
                        worksheetsStore.add(result);
                    }

                    var rec = worksheetsStore.findRecord('index', this.api.asc_getActiveWorksheetIndex());
                    if (rec)
                        worksheetList.select(rec);
                    else
                        worksheetList.select(worksheetsStore.getAt(0));
                }
            }

        }
    },

    onLongActionEnd: function(type, id) {
        if (type === c_oAscAsyncActionType['BlockInteraction']){
            switch (id) {
                case c_oAscAsyncAction['Open']:
                    this._loadWorksheets();
                    break;
            }
        }
    }
});