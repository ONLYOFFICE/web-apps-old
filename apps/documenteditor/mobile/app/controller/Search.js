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
Ext.define('DE.controller.Search', (function() {
    return {
        extend: 'Ext.app.Controller',

        config: {
            refs: {
                searchToolbar       : 'searchtoolbar',
                nextResultButton    : '#id-btn-search-down',
                previousResultButton: '#id-btn-search-up',
                searchField         : '#id-field-search'
            },

            control: {
                searchToolbar: {
                    hide        : 'onSearchToolbarHide'
                },
                previousResultButton: {
                    tap         : 'onPreviousResultButtonTap'
                },
                nextResultButton: {
                    tap         : 'onNextResultButtonTap'
                },
                searchField: {
                    keyup       : 'onSearchKeyUp',
                    change      : 'onSearchChange',
                    clearicontap: 'onClearSearch'
                }
            }
        },

        init: function() {
        },

        setApi: function(o) {
            this.api = o;
//            this.api.asc_registerCallback('asc_onSearchEnd',    Ext.bind(this.onApiSearchStop, this));
        },

        updateNavigation: function(){
            var text = this.getSearchField().getValue();

            this.getNextResultButton().setDisabled(!(text.length>0));
            this.getPreviousResultButton().setDisabled(!(text.length>0));
        },

        clearSearchResults: function() {
            if (this.getSearchField()) {
                this.getSearchField().setValue('');
                this.updateNavigation();
            }

            // workaround blur problem in iframe (bug #12685)
            window.focus();
            document.activeElement.blur();
        },

        onSearchToolbarHide: function() {
            this.clearSearchResults();
        },

        onNextResultButtonTap: function(){
            this.api.asc_findText(this.getSearchField().getValue(), true);
        },

        onPreviousResultButtonTap: function(){
            this.api.asc_findText(this.getSearchField().getValue(), false);
        },

        onSearchKeyUp: function(field, e){
            if (e.event.keyCode == 13 && field.getValue().length > 0) {
                this.api.asc_findText(field.getValue(), true);
            }
            this.updateNavigation();
        },

        onSearchChange: function(field, newValue, oldValue){
            this.updateNavigation();
        },

        onClearSearch: function(field, e){
            this.clearSearchResults();
        }

//        onApiSearchStop: function() {
//            Ext.Viewport.unmask();
//            this.updateNavigation();
//        }
    }
})());
