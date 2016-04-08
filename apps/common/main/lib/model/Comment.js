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
 *  Comments.js
 *
 *  Created by Alexey Musinov on 16.01.14
 *  Copyright (c) 2014 Ascensio System SIA. All rights reserved.
 *
 */

if (Common === undefined)
    var Common = {};

Common.Models = Common.Models || {};

define([
    'underscore',
    'backbone',
    'common/main/lib/component/BaseView'
], function(_, Backbone){
    'use strict';

    Common.Models.Comment = Backbone.Model.extend({
        defaults: {
            uid                 : 0,                        //  asc
            userid              : 0,
            username            : 'Guest',
            date                : undefined,
            quote               : '',
            comment             : '',
            resolved            : false,
            lock                : false,
            lockuserid          : '',
            unattached          : false,

            id                  : Common.UI.getId(),        //  internal
            time                : 0,
            showReply           : false,
            showReplyInPopover  : false,
            editText            : false,
            editTextInPopover   : false,
            last                : undefined,
            replys              : [],
            hideAddReply        : false,
            scope               : null,
            hide                : false,
            hint                : false,
            dummy               : undefined
        }
    });
    Common.Models.Reply = Backbone.Model.extend({
        defaults: {
            time                : 0,                    //  acs
            userid              : 0,
            username            : 'Guest',
            reply               : '',
            date                : undefined,

            id                  : Common.UI.getId(),    //  internal
            editText            : false,
            editTextInPopover   : false,
            scope               : null
        }
    });
});
