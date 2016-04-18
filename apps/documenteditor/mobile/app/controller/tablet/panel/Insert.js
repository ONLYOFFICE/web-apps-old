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
Ext.define('DE.controller.tablet.panel.Insert', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            insertPanel         : 'insertpanel',
            navigateView        : '#id-insert-navigate',
            insertListView      : '#id-insert-root',
            insertTableView     : '#id-insert-table-container',
            insertPictureView   : '#id-insert-picture-container',
            insertTableButton   : '#id-btn-insert-table',
            tableColumnsSpinner : '#id-spinner-table-columns',
            tableRowsSpinner    : '#id-spinner-table-rows',
            insertImageList     : '#id-insert-picture-container'
        },

        control: {
            insertPanel: {
                hide            : 'onInsertPanelHide'
            },
            navigateView: {
                push            : 'onNavigateViewPush',
                pop             : 'onNavigateViewPop',
                back            : 'onNavigateViewBack'
            },
            insertListView: {
                itemsingletap   : 'onInsertListItemTap'
            },
            insertTableButton: {
                tap             : 'onInsertTableButtonTap'
            },
            insertImageList: {
                itemtap         : 'onInsertImageItemTap'
            }
        }
    },

    init: function() {
    },

    onInsertImageListShow: function(list) {
        var me = this,
            inputInlineMedia = document.querySelector('#id-insert-picture-inline input[type=file]'),
            inputFloatMedia  = document.querySelector('#id-insert-picture-float input[type=file]');

        var onChangeInput = function(input) {
            if (Ext.isDefined(input)) {
                var file = input.files[0];

                if (Ext.isDefined(file)){
                    var panel = me.getInsertPanel(),
                        mpImg = new MegaPixImage(file);

                    mpImg.imageLoadListeners.push(function() {
                        var canvas = document.createElement('canvas'),
                            imgProperty = new Asc.asc_CImgProperty();

                        mpImg.render(canvas, { maxWidth: 1024, maxHeight: 1024 });
                        imgProperty.put_WrappingStyle((input == inputInlineMedia) ? Asc.c_oAscWrapStyle2.Inline : Asc.c_oAscWrapStyle2.Square);

                        me.api.AddImageUrl(canvas.toDataURL(), imgProperty);

                        Ext.Viewport.unmask();
                    });

                    input.value = '';

                    panel && panel.hide();

                    Ext.Viewport.setMasked({
                        xtype   : 'loadmask',
                        message : me.uploadingText + '...'
                    });
                }
            }
        };

        inputInlineMedia && (inputInlineMedia.onchange = Ext.bind(onChangeInput, me, [inputInlineMedia]));
        inputFloatMedia  && (inputFloatMedia.onchange  = Ext.bind(onChangeInput, me, [inputFloatMedia]));
    },

    launch: function() {
        var insertImageList = this.getInsertImageList();

        insertImageList && insertImageList.on('show', Ext.bind(this.onInsertImageListShow, this), this, {
                delay   : 1000,
                single  : true
            }
        );
    },

    setApi: function(o) {
        this.api = o;
    },

    onInsertPanelHide: function(cmp) {
        var navigateView        = this.getNavigateView(),
            tableColumnsSpinner = this.getTableColumnsSpinner(),
            tableRowsSpinner    = this.getTableRowsSpinner();

        if (navigateView) {
            if (Ext.isDefined(navigateView.getLayout().getAnimation().getInAnimation))
                navigateView.getLayout().getAnimation().getInAnimation().stop();

            if (Ext.isDefined(navigateView.getLayout().getAnimation().getOutAnimation))
                navigateView.getLayout().getAnimation().getOutAnimation().stop();

            navigateView.reset();

            var activeItem  = navigateView.getActiveItem(),
                panelHeight = this.getHeightById(activeItem && activeItem.id);

            cmp.setHeight(panelHeight);
        }

        tableColumnsSpinner && tableColumnsSpinner.setValue(tableColumnsSpinner.getMinValue());
        tableRowsSpinner    && tableRowsSpinner.setValue(tableRowsSpinner.getMinValue());
    },

    onInsertListItemTap: function(cmp, index, target, record) {
        var navigateView = this.getNavigateView(),
            cmdId        = record.get('id');

        if (!Ext.isEmpty(cmdId)) {
            if (cmdId == 'id-insert-table-row') {
                this.insertTableObject('row');
                Common.component.Analytics.trackEvent('ToolBar', 'Insert Row');
            } else if (cmdId == 'id-insert-table-column') {
                this.insertTableObject('column');
                Common.component.Analytics.trackEvent('ToolBar', 'Insert Column');
            }
        }

        if (navigateView) {
            var cmpId = record.get('child');

            if (!Ext.isEmpty(cmpId)) {
                var childCmp = Ext.getCmp(cmpId);

                if (childCmp)
                    navigateView.push(childCmp);
            }
        }
    },

    getHeightById: function(id){
        switch(id){
            case 'id-insert-table-container':   return 225;
            case 'id-insert-picture-container': return 174;
            default:
            case 'id-insert-root':              return 283;
        }
    },

    onNavigateViewPush: function(cmp, view) {
        var parentCmp = cmp.getParent();

        if (parentCmp)
            parentCmp.setHeight(this.getHeightById(view && view.id));
    },

    onNavigateViewPop: function(cmp, view) {
        //
    },

    onNavigateViewBack: function(cmp) {
        var parentCmp  = cmp.getParent(),
            activeItem = cmp.getActiveItem();

        if (parentCmp && activeItem) {
            parentCmp.setHeight(this.getHeightById(activeItem && activeItem.id));
        }
    },

    onInsertTableButtonTap: function(btn) {
        var insertPanel         = this.getInsertPanel(),
            tableColumnsSpinner = this.getTableColumnsSpinner(),
            tableRowsSpinner    = this.getTableRowsSpinner();

        if (this.api && tableColumnsSpinner && tableRowsSpinner) {
            this.api.put_Table(tableColumnsSpinner.getValue(), tableRowsSpinner.getValue());
        }

        if (insertPanel)
            insertPanel.hide();

        Common.component.Analytics.trackEvent('ToolBar', 'Table');
    },

    onInsertImageItemTap: function(list) {
        if ((Ext.os.is.iOS && Ext.os.version.lt('6.0')) ||
            (Ext.os.is.Android && Ext.os.version.lt('3.0'))) {
            Ext.Msg.show({
                message     : this.unsupportUploadText,
                promptConfig: false,
                buttons     : [
                    {text: 'OK', itemId: 'ok', ui: 'base'}
                ]
            });
        }
    },

    insertTableObject: function(type) {
        if (this.api) {
            var selectedElements = this.api.getSelectedElements();

            if (selectedElements && selectedElements.length > 0) {
                var elementType = selectedElements[0].get_ObjectType();

                if (Asc.c_oAscTypeSelectElement.Table == elementType) {
                    type === 'row'
                        ? this.api.addRowBelow()
                        : type === 'column'
                            ? this.api.addColumnRight()
                            : this.api.put_Table(1, 1);
                } else {
                    this.api.put_Table(1, 1);
                }
            }
        }
    },

    uploadingText       : 'Uploading',
    unsupportUploadText : 'Feature is not supported on this device.'
});
