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
var ApplicationView = new(function(){

    // Initialize view

    function createView(){
        $('#id-btn-share').popover({
            trigger     : 'manual',
            html        : true,
            template    : '<div class="popover share" id="id-popover-share"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>',
            content     : '<div class="share-link">' +
                              '<span class="caption">Link:</span>' +
                              '<input id="id-short-url" class="input-xs form-control" readonly/>' +
                              '<button id="id-btn-copy-short" type="button" class="btn btn-xs btn-primary" style="width: 65px;" data-copied-text="Copied">Copy</button>' +
                          '</div> ' +
                              '<div class="share-buttons" style="height: 25px" id="id-popover-social-container" data-loaded="false">' +
                              '<ul></ul>' +
                          '</div>'
        }).popover('show');

        $('#id-btn-embed').popover({
            trigger     : 'manual',
            html        : true,
            template    : '<div class="popover embed" id="id-popover-embed"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>',
            content     : '<div class="size-manual">' +
                              '<span class="caption">Width:</span>' +
                              '<input id="id-input-embed-width" class="form-control input-xs" type="text" value="400px">' +
                              '<input id="id-input-embed-height" class="form-control input-xs right" type="text" value="600px">' +
                              '<span class="right caption">Height:</span>' +
                          '</div>' +
                          '<textarea id="id-textarea-embed" rows="4" class="form-control" readonly></textarea>' +
                          '<button id="id-btn-copy-embed" type="button" class="btn btn-xs btn-primary" data-copied-text="Copied">Copy</button>'


        }).popover('show');

        $('body').popover({
            trigger     : 'manual',
            html        : true,
            animation   : false,
            template    : '<div class="popover hyperlink" id="id-tip-hyperlink"><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>',
            content     : '<br><b>Press Ctrl and click link</b>'
        }).popover('show');
    }

    return {
        create: createView
    }
})();
