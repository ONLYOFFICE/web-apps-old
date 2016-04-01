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
Ext.define('SSE.controller.Document', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
        },

        control: {
            '#id-btn-zoom-in': {
                tap: 'onZoomIn'
            },
            '#id-btn-zoom-out': {
                tap: 'onZoomOut'
            }
        }
    },

    _currZoom       : 1,
    _baseZoom       : 1,
    _maxZoom        : 2,
    _incrementZoom  : 0.05,

    init: function() {

    },

    launch: function() {

    },

    setApi: function(o) {
        this.api = o;

        if (this.api) {
            this.api.asc_registerCallback('asc_onDoubleTapEvent',   Ext.bind(this._onDoubleTapDocument, this));
            this.api.asc_registerCallback('asc_onStartAction',      Ext.bind(this._onLongActionBegin, this));
            this.api.asc_registerCallback('asc_onEndAction',        Ext.bind(this._onLongActionEnd, this));

        }
    },

    _onLongActionBegin: function(type, id) {
//        console.log("onStartAction " + arguments[0] + " " + arguments[1]);
    },

    _onLongActionEnd: function(type, id) {
        if (type === c_oAscAsyncActionType['BlockInteraction']) {
            switch (id) {
                case c_oAscAsyncAction['Open']:
                    var i = this.api.asc_getActiveWorksheetIndex();
                    this.api.asc_showWorksheet(i);
                    break;
            }
        }
    },

    _onDoubleTapDocument: function(){
        if (this.api){
            if (this._currZoom != this._baseZoom){
                this._currZoom = this._baseZoom;
            } else {
                this._currZoom = this._maxZoom;
            }

            this.api.asc_setZoom(this._currZoom);
        }
    },

    onZoomIn: function(event, node, opt){
        this._currZoom += this._incrementZoom;

        if (this._currZoom > this._maxZoom)
            this._currZoom = this._maxZoom;

        this.api.asc_setZoom(this._currZoom);
    },

    onZoomOut: function(event, node, opt){
        this._currZoom -= this._incrementZoom;

        if (this._currZoom < this._baseZoom)
            this._currZoom = this._baseZoom;

        this.api.asc_setZoom(this._currZoom);
    }

});
