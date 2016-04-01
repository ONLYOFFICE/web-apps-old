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
Ext.define('DE.controller.tablet.panel.FontStyle', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            fontStylePanel      : 'fontstylepanel',
            fontStylesToggle    : '#id-toggle-fontstyles',
            fontStyleBold       : '#id-btn-fontstyle-bold',
            fontStyleItalic     : '#id-btn-fontstyle-italic',
            fontStyleUnderline  : '#id-btn-fontstyle-underline'
        },

        control: {
            fontStylePanel  : {
                show    : 'onFontStyleShow',
                hide    : 'onFontStyleHide'
            },
            fontStyleBold   : {
                tap     : 'onBoldButtonTap'
            },
            fontStyleItalic : {
                tap     : 'onItalicButtonTap'
            },
            fontStyleUnderline: {
                tap     : 'onUnderlineButtonTap'
            }
        },

        handleApiEvent  : false
    },

    init: function() {
    },

    launch: function() {
    },

    setApi: function(o) {
        this.api = o;

        if (this.api) {
            this.api.asc_registerCallback('asc_onBold',         Ext.bind(this.onApiBold, this));
            this.api.asc_registerCallback('asc_onItalic',       Ext.bind(this.onApiItalic, this));
            this.api.asc_registerCallback('asc_onUnderline',    Ext.bind(this.onApiUnderline, this));
        }
    },

    onFontStyleShow: function(cmp){
        this.setHandleApiEvent(true);

        // update ui data
        this.api && this.api.UpdateInterfaceState();
    },

    onFontStyleHide: function(cmp){
        this.setHandleApiEvent(false);
    },

    _toggleSegmentedButton: function(btn, toggle) {
        var toggler = this.getFontStylesToggle();

        if (toggler && btn) {
            var pressedButtonsOld = toggler.getPressedButtons().slice(),
                pressedButtonsNew = toggler.getPressedButtons(),
                pressedIndex = pressedButtonsNew.indexOf(btn);

            if (toggle) {
                if (pressedIndex < 0)
                    pressedButtonsNew.push(btn)
            } else {
                if (pressedIndex > -1)
                    pressedButtonsNew.splice(pressedIndex, 1);
            }

//            toggler.setPressedButtons(pressedButtons);
            toggler.updatePressedButtons(pressedButtonsNew, pressedButtonsOld);
        }
    },

    onApiBold: function(on) {
        if (this.getHandleApiEvent())
            this._toggleSegmentedButton(this.getFontStyleBold(), on);
    },

    onApiItalic: function(on) {
        if (this.getHandleApiEvent())
            this._toggleSegmentedButton(this.getFontStyleItalic(), on);
    },

    onApiUnderline: function(on) {
        if (this.getHandleApiEvent())
            this._toggleSegmentedButton(this.getFontStyleUnderline(), on);
    },

    onBoldButtonTap: function(btn) {
        var toggler = this.getFontStylesToggle();

        if (toggler && this.api) {
            this.api.put_TextPrBold(toggler.isPressed(btn));

            Common.component.Analytics.trackEvent('ToolBar', 'Bold');
        }
    },

    onItalicButtonTap: function(btn) {
        var toggler = this.getFontStylesToggle();

        if (toggler && this.api) {
            this.api.put_TextPrItalic(toggler.isPressed(btn));

            Common.component.Analytics.trackEvent('ToolBar', 'Italic');
        }
    },

    onUnderlineButtonTap: function(btn) {
        var toggler = this.getFontStylesToggle();
        if (toggler && this.api) {
            this.api.put_TextPrUnderline(toggler.isPressed(btn));

            Common.component.Analytics.trackEvent('ToolBar', 'Underline');
        }
    }
});