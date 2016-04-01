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
Ext.define('DE.controller.tablet.Main', {
    extend: 'DE.controller.Main',

    requires: [
        'Ext.Anim'
    ],

    config: {
        refs: {
            editToolbar     : 'edittoolbar',
            viewToolbar     : 'viewtoolbar',
            searchToolbar   : 'searchtoolbar',
            readableBtn     : '#id-tb-btn-readable'
        },

        control: {
        }
    },

    launch: function() {
        this.callParent(arguments);
    },
    
    initControl: function() {
        this.callParent(arguments);
    },
    
    initApi: function() {
        this.callParent(arguments);
    },

    setApi: function(o){
        this.api = o;
    },

    setMode: function(mode){
        var editToolbar         = this.getEditToolbar(),
            viewToolbar         = this.getViewToolbar(),
            searchToolbar       = this.getSearchToolbar(),
            popClipController   = this.getApplication().getController('Common.controller.PopClip');

        if (mode == 'edit') {
            viewToolbar         && viewToolbar.hide();
            searchToolbar       && searchToolbar.hide();
            editToolbar         && editToolbar.show();
            this.api            && this.api.asc_enableKeyEvents(true);
            this.api            && this.api.asc_setViewMode(false);
        } else {
            editToolbar         && editToolbar.hide();
            viewToolbar         && viewToolbar.show();
            this.api            && this.api.asc_enableKeyEvents(false);
            this.api            && this.api.asc_setViewMode(true);
        }

        if (popClipController) {
            popClipController.setMode(mode);
        }
    },

    setReadableMode: function(readable) {
        var readableBtn = this.getReadableBtn();

        if (readableBtn)
            readable ? readableBtn.show() : readableBtn.hide();
    }

}); 