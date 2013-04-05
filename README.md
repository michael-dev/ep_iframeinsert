ep\_iframeinsert
================

This plugin receives edit commands from the parent window and executes them on the pad. It is used by
https://github.com/michael-dev/dokuwikietherpadlite to send the toolbar actions to the pad without reimplementing every possible action.

How it works
------------

This plugin listens for messages on the pad frame/window and executes them. Further, it periodically sends messages to the parent window to indicate its existence and hides the markup buttons in the etherpad lite toolbar.

Messages implemented
--------------------

All messages need to be of type Object.
The func attribute describes the method called.

### func = none ###

Send periodically to the parent window with attributes context = ep\_iframeinsert and data = the current pad text. The parent will update its pad text cache and learn that this plugin is running.

### func = insertTagsLn ###

Message has data attribute (Object), which has the attributes tagOpen, tagClose and sampleText. This action will put tagOpen before and tagClose after each line of selection. If the selection is empty, sampleText is used instead.

### func = insertTags ###

Message has data attribute (Object), which has the attributes tagOpen, tagClose, sampleText and trimSpace. This action will put tagOpen before and tagClose after the selection. If the selection is empty, sampleText is used instead. trimSpaces trims spaces from the start+end.

### func = insert ###

Message has data attribute (Object), which has attribute text. This action replaces the current selection (which can be empty) with the given text.

Usage
-----

jQuery('#etherpadiframe').contentWindow.postMessage({"func": "insert", "data": { "text" : "hallo welt"}}, "\*");

Installation
------------

See etherpad lite documentation on how to install this plugin. There is no plugin configuration.

----
Copyright (C) Michael Braun <michael-dev@fami-braun.de>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; version 2 of the License

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

