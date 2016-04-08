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
Ext.define('DE.controller.toolbar.Edit', {
    extend: 'Ext.app.Controller',

    requires: ([
        'Ext.MessageBox',
        'Ext.util.Point',
        'Ext.util.Region',
        'DE.view.tablet.panel.Font',
        'DE.view.tablet.panel.FontStyle',
        'DE.view.tablet.panel.Insert',
        'DE.view.tablet.panel.ListStyle',
        'DE.view.tablet.panel.ParagraphAlignment',
        'DE.view.tablet.panel.Spacing',
        'DE.view.tablet.panel.TextColor'
    ]),

    config: {
        refs: {
            doneButton              : '#id-tb-btn-done',
            saveButton              : '#id-tb-btn-save',
            undoButton              : '#id-tb-btn-undo',
            fontButton              : '#id-tb-btn-font',
            fontStyleButton         : '#id-tb-btn-style',
            textColorButton         : '#id-tb-btn-color',
            paragraphAlignmentButton: '#id-tb-btn-align',
            listStyleButton         : '#id-tb-btn-liststyle',
            paragraphButton         : '#id-tb-btn-paragraph',
            tableButton             : '#id-tb-btn-table',
            shareButton             : '#id-tb-btn-share',
            textColorPanel          : '#id-panel-text-color',
            paragraphPanel          : '#id-panel-spacing',
            paragraphAlignmentPanel : '#id-panel-paragraph-alignment',
            fontStylePanel          : '#id-panel-font-style',
            listStylePanel          : '#id-panel-liststyle',
            insertPanel             : '#id-panel-insert',
            fontPanel               : '#id-panel-font'
        },

        control: {
            doneButton: {
                tap     : 'onTapDone'
            },
            saveButton: {
                tap     : 'onTapSave'
            },
            undoButton: {
                tap     : 'onTapUndo'
            },
            fontButton: {
                tap     : 'onTapFont'
            },
            fontStyleButton: {
                tap     : 'onTapFontStyle'
            },
            textColorButton: {
                tap     : 'onTapTextColor'
            },
            paragraphAlignmentButton: {
                tap     : 'onTabParagraphAlignment'
            },
            listStyleButton: {
                tap     : 'onTapListStyle'
            },
            paragraphButton: {
                tap     : 'onTapParagraphButton'
            },
            tableButton: {
                tap     : 'onTapTable'
            },
            shareButton: {
                tap     : 'onTapShare'
            }
        }
    },

    launch: function() {
        this.callParent(arguments);

        Ext.getCmp('id-conteiner-document').on('resize', this.onEditorResize, this);
        var toolbarButtons = Ext.ComponentQuery.query('edittoolbar > button, edittoolbar > toolbar > button');

        Ext.each(Ext.ComponentQuery.query('commonpopoverpanel'), function(panel) {
            var modal = panel.getModal();

            if (modal) {
                modal.on('tap', function(mask, event) {
                    Ext.each(toolbarButtons, function(button) {
                        if (button !== panel.alignByCmp) {
                            var mousePoint = Ext.util.Point.fromEvent(event),
                                buttonRect = Ext.util.Region.from(button.element.getPageBox());

                            if (!buttonRect.isOutOfBound(mousePoint)) {
                                button.fireEvent('tap', button, event);
                            }
                        }
                    }, this);
                }, this);
            }
        }, this);

        Common.Gateway.on('init', Ext.bind(this.loadConfig, this));
    },

    initControl: function() {
        this.callParent(arguments);
    },

    initApi: function() {
        //
    },

    setApi: function(o){
        this.api = o;

        if (this.api) {
            this.api.asc_registerCallback('asc_onCanUndo',                  Ext.bind(this.onApiCanUndo, this));
            this.api.asc_registerCallback('asc_onCoAuthoringDisconnect',    Ext.bind(this.onCoAuthoringDisconnect, this));
            this.api.asc_registerCallback('asc_onDocumentModifiedChanged',  Ext.bind(this.onApiDocumentModified, this));
        }
    },

    loadConfig: function(data) {
        var doneButton = this.getDoneButton();

        if (doneButton && data && data.config && data.config.canBackToFolder !== false &&
            data.config.customization && data.config.customization.goback && data.config.customization.goback.url){
            this.gobackUrl = data.config.customization.goback.url;
            doneButton.show();
        }
    },

    onApiCanUndo: function(can) {
        var undoButton = this.getUndoButton();
        undoButton && undoButton.setDisabled(!can);
    },

    onCoAuthoringDisconnect: function() {
        Ext.each(Ext.ComponentQuery.query('commonpopoverpanel'), function(panel) {
            panel.hide();
        });

        Ext.each(Ext.ComponentQuery.query('edittoolbar > button, edittoolbar > toolbar > button'), function(btn) {
            btn.removeCls('x-button-pressing');
            btn.disable();
        });

        var shareButton = this.getShareButton();
        shareButton && shareButton.enable();
    },

    onApiDocumentModified: function() {
        var isModified = this.api.isDocumentModified();
        if (this.isDocModified !== isModified) {
            if (this.getSaveButton()) {
                this.getSaveButton().setDisabled(!isModified);
            }

            Common.Gateway.setDocumentModified(isModified);
            this.isDocModified = isModified;
        }
    },

    showToolbarPanel: function(panel, button){
        if (panel && button){
            panel.on('hide', Ext.bind(function(){
                button.removeCls('x-button-pressing');
            }, this), this, {single: true});

            button.addCls('x-button-pressing');

            Ext.each(Ext.ComponentQuery.query('popclip'), function(cmp) {
                cmp.hide(true);
            }, this);

            panel.alignByCmp = button;
            panel.setLeft(0);
            panel.setTop(0);
            panel.showBy(button);
        }
    },

    onTapDone: function() {
        var me = this;
        if (this.api.isDocumentModified()) {
            Ext.Msg.show({
                title       : this.dlgLeaveTitleText,
                message     : this.dlgLeaveMsgText,
                buttons     : [
                    {text: this.leaveButtonText, itemId: 'cancel',  ui: 'base'},
                    {text: this.stayButtonText,  itemId: 'ok',      ui: 'base-blue'}
                ],
                promptConfig: false,
                scope       : this,
                fn          : function(button) {
                    if (button == 'cancel') {
                        me.goBack();
                    }
                }
            });
        } else {
            me.goBack();
        }
    },

    goBack: function() {
        if (this.gobackUrl) window.parent.location.href = this.gobackUrl;
    },

    onTapSave: function() {
        this.api && this.api.asc_Save();
        Common.component.Analytics.trackEvent('ToolBar', 'Save');
    },

    onTapUndo: function() {
        this.api && this.api.Undo();
        Common.component.Analytics.trackEvent('ToolBar', 'Undo');
    },

    onTapShare: function() {
        this.api && this.api.asc_Print();
        Common.component.Analytics.trackEvent('ToolBar', 'Share');
    },

    onTapFont: function() {
        this.showToolbarPanel(this.getFontPanel(), this.getFontButton());
    },

    onTapFontStyle: function() {
        this.showToolbarPanel(this.getFontStylePanel(), this.getFontStyleButton());
    },

    onTapTextColor: function() {
        this.showToolbarPanel(this.getTextColorPanel(), this.getTextColorButton());
    },

    onTabParagraphAlignment: function() {
        this.showToolbarPanel(this.getParagraphAlignmentPanel(), this.getParagraphAlignmentButton());
    },

    onTapListStyle: function() {
        this.showToolbarPanel(this.getListStylePanel(), this.getListStyleButton());
    },

    onTapParagraphButton: function() {
        this.showToolbarPanel(this.getParagraphPanel(), this.getParagraphButton());
    },

    onTapTable: function() {
        this.showToolbarPanel(this.getInsertPanel(), this.getTableButton());
    },

    onEditorResize: function(cmp) {
        var overlayPanels = Ext.ComponentQuery.query('commonpopoverpanel');
        Ext.each(overlayPanels, function(panel){
            panel.hide();
        });
    },

    dlgLeaveTitleText   : 'You leave the application',
    dlgLeaveMsgText     : 'You have unsaved changes in this document. Click \'Stay on this Page\' then \'Save\' to save them. Click \'Leave this Page\' to discard all the unsaved changes.',
    leaveButtonText     : 'Leave this Page',
    stayButtonText      : 'Stay on this Page'
});