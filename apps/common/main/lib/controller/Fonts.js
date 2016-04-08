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
/**
 *  Fonts.js
 *
 *  Created by Alexander Yuzhin on 2/11/14
 *  Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

if (Common === undefined)
    var Common = {};

Common.Controllers = Common.Controllers || {};

define([
    'core',
    'common/main/lib/collection/Fonts'
], function () { 'use strict';
    Common.Controllers.Fonts = Backbone.Controller.extend((function() {
        var FONT_TYPE_USERUSED = 4;

        function isFontSaved(store, rec) {
            var out = rec.get('type') == FONT_TYPE_USERUSED,
                i = -1,
                c = store.length,
                su,
                n = rec.get('name');
            while (!out && ++i < c) {
                su = store.at(i);

                if (su.get('type') != FONT_TYPE_USERUSED)
                    break;

                out = su.get('name') == n;
            }

            return out;
        }

        function onSelectFont(combo, record) {
            if (combo.showlastused && !isFontSaved(combo.store, record)) {
//                var node = combo.picker.getNode(records[0]);
//
//                var data = records[0].data;
//                var font = {
//                    id: data.id,
//                    name: data.name,
//                    imgidx: data.imgidx,
//                    cloneid: node.querySelector('img').id,
//                    type: FONT_TYPE_USERUSED
//                };
//                combo.getStore().insert(0,[font]);
//
//                var separator = combo.picker.getEl().down('.used-fonts-separator');
//                if (!separator) {
//                    separator = document.createElement('div');
//                    separator.setAttribute('class', 'x-menu-item-separator used-fonts-separator');
//                    separator.setAttribute('style', 'padding:0 10px;margin-left: 10px;');
//
//                    node = combo.picker.getNode(combo.getStore().getAt(1));
//                    node.parentNode.insertBefore(separator,node);
//                }
//
//                font = combo.getStore().getAt(5);
//                if (font.data.type==FONT_TYPE_USERUSED) {
//                    combo.getStore().remove(font);
//                } else {
//                    var plugin = combo.getPlugin('scrollpane');
//                    if (plugin){plugin.updateScrollPane();}
//                }
            }
        }

        function onApiFontChange(fontobj) {
            Common.NotificationCenter.trigger('fonts:change', fontobj)
        }

        function onApiLoadFonts(fonts, select) {
            var fontsArray = [];
            _.each(fonts, function(font){
                var fontId = font.asc_getFontId();
                fontsArray.push({
                    id          :_.isEmpty(fontId) ? Common.UI.getId() : fontId,
                    name        : font.asc_getFontName(),
//                    displayValue: font.asc_getFontName(),
                    imgidx      : font.asc_getFontThumbnail(),
                    type        : font.asc_getFontType()
                });
            });

            var store = this.getCollection('Common.Collections.Fonts');

            if (store) {
                store.add(fontsArray);
                store.sort();
            }

            Common.NotificationCenter.trigger('fonts:load', store, select);
        }

        return {
            models: [
                'Common.Models.Fonts'
            ],
            collections: [
                'Common.Collections.Fonts'
            ],
            views: [],

            initialize: function() {
                Common.NotificationCenter.on('fonts:select', _.bind(onSelectFont, this))
            },

            onLaunch: function() {
                //
            },

            setApi: function(api) {
                this.api = api;
                this.api.asc_registerCallback('asc_onInitEditorFonts',  _.bind(onApiLoadFonts, this));
                this.api.asc_registerCallback('asc_onFontFamily',       _.bind(onApiFontChange, this));
            }
        }
    })());
});
