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
Ext.define('DE.controller.tablet.panel.ParagraphAlignment', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            paraAlignPanel          : 'paragraphalignmentpanel',
            paraAlignsToggle        : '#id-toggle-paragraphalignment',
            paragraphAlignmentButton: '#id-tb-btn-align',
            paraAlignLeft           : '#id-btn-paragraphalignment-left',
            paraAlignCenter         : '#id-btn-paragraphalignment-center',
            paraAlignRight          : '#id-btn-paragraphalignment-right',
            paraAlignFill           : '#id-btn-paragraphalignment-fill'
        },

        control: {
            paraAlignPanel  : {
                show    : 'onParaAlignPanelShow',
                hide    : 'onParaAlignPanelHide'
            },
            paraAlignLeft   : {
                tap     : 'onParaAlignLeftTap'
            },
            paraAlignCenter : {
                tap     : 'onParaAlignCenterTap'
            },
            paraAlignRight  : {
                tap     : 'onParaAlignRightTap'
            },
            paraAlignFill   : {
                tap     : 'onParaAlignFillTap'
            }
        },

        handleApiEvent  : false
    },

    init: function() {
    },

    launch: function() {
    },

    onParaAlignPanelShow: function(cmp) {
        this.setHandleApiEvent(true);

        // update ui data
        this.api && this.api.UpdateInterfaceState();
    },

    onParaAlignPanelHide: function(cmp) {
        this.setHandleApiEvent(false);
    },

    setApi: function(o) {
        this.api = o;

        if (this.api) {
            this.api.asc_registerCallback('asc_onPrAlign', Ext.bind(this.onApiParagraphAlign, this));
        }
    },

    onParaAlignLeftTap: function(btn) {
        if (this.api) {
            this.api.put_PrAlign(1);

            Common.component.Analytics.trackEvent('ToolBar', 'Align');
        }
    },

    onParaAlignCenterTap: function(btn) {
        if (this.api) {
            this.api.put_PrAlign(2);

            Common.component.Analytics.trackEvent('ToolBar', 'Align');
        }
    },

    onParaAlignRightTap: function(btn) {
        if (this.api) {
            this.api.put_PrAlign(0);

            Common.component.Analytics.trackEvent('ToolBar', 'Align');
        }
    },

    onParaAlignFillTap: function(btn) {
        if (this.api) {
            this.api.put_PrAlign(3);

            Common.component.Analytics.trackEvent('ToolBar', 'Align');
        }
    },

    toggleSegmentedButton: function(btn) {
        var toggler = this.getParaAlignsToggle();

        if (toggler) {
            var pressedButtonsNew = [];

            if (btn)
                pressedButtonsNew.push(btn);

            toggler.setPressedButtons(pressedButtonsNew);
        }
    },

    onApiParagraphAlign: function(v) {
        var paragraphAlignmentButton = this.getParagraphAlignmentButton();

        if (paragraphAlignmentButton && Ext.isDefined(v)) {
            switch(v) {
                case 0: paragraphAlignmentButton.setIconCls('align-right');  break;
                case 1: paragraphAlignmentButton.setIconCls('align-left');   break;
                case 2: paragraphAlignmentButton.setIconCls('align-center'); break;
                default:
                case 3: paragraphAlignmentButton.setIconCls('align-fill');
            }
        }

        if (this.getHandleApiEvent()) {
            if (!Ext.isDefined(v)) {
                this.toggleSegmentedButton();
                return;
            }

            switch(v) {
                case 0: this.toggleSegmentedButton(this.getParaAlignRight());  break;
                case 1: this.toggleSegmentedButton(this.getParaAlignLeft());   break;
                case 2: this.toggleSegmentedButton(this.getParaAlignCenter()); break;
                default:
                case 3: this.toggleSegmentedButton(this.getParaAlignFill());
            }
        }
    }
});