# Description

This plugin listens for messages on the pad frame/window and inserts them (possibly replacing the currently selected text).
This is useful if the pad is in an iframe and the outer management software (e.g. dokuwiki) has stuff like templates to insert. The management action (e.g. templates) shall not be implemented in etherpad lite, as the management software can be run with any other editor (i.e. no etherpad).

# Usage

$('#etherpadiframe').postMessage("string to be inserted", "*");

