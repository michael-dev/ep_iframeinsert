// https://github.com/ether/etherpad-lite/blob/master/doc/easysync/easysync-notes.txt
exports.iframeinsertReceiveMessage = function(event)
{
  if (event.source != parent) {
    return;
  }
  if (typeof(event.data) == 'object') {
    var func = event.data.func;
    var data = event.data.data;
    switch (func) {
      case 'none':
      break;
      case 'insertTagsLn':
        // data has tagOpen, tagClose, sampleText
        // put tagOpen before and tagClose after each line of selection. if selection is empty, use sampleText in between.
        var rep = self.editorInfo.ace_getRep();
        var selStart = rep.selStart;
        var selEnd = rep.selEnd;
        var text = data.sampleText;

        if (selStart[0] == selEnd[0] && selStart[1] != selEnd[1]) {
          // there is a selection on a single line
          text = rep.lines.atIndex(selStart[0]).text.substring(selStart[1], selEnd[1]);
        } else if (selStart[0] != selEnd[0] && selStart[1] != selEnd[1]) {
          // there is a selection spanning multiple lines
          text = rep.lines.atIndex(selStart[0]).text.substring(selStart[1]);
          for (var i = selStart[0] + 1; i < selEnd[0]; i++) {
            text += '\n' + rep.lines.atIndex(i).text;
          }
          text += '\n' + rep.lines.atIndex(selStart[0]).text.substring(0, selEnd[1]);
        }
        text = data.tagOpen + text.split("\n").join(data.tagClose + "\n" + data.tagOpen) + data.tagClose;
        self.editorInfo.ace_replaceRange(selStart, selEnd, text);

        break;
      case 'insertTags':
        // data has tagOpen, tagClose, sampleText, trimSpace
        // put tagOpen before and tagClose after selection. if selection is empty, use sampleText in between. trimSpaces trims spaces from the start+end
        var rep = self.editorInfo.ace_getRep();
        var selStart = rep.selStart;
        var selEnd = rep.selEnd;
        var text = data.sampleText;

        if (data.trimSpaces) {
          while (selEnd[0] > selStart[0] || selEnd[1] > selStart[1]) {
            var after = selStart;
            if (after[1] >= rep.lines.atIndex(after[0]).text.length) {
              after[0]++;
              after[1] = 1;
            } else {
              after[1]++;
            }
            if (rep.lines.atIndex(after[0]).text.charAt(after[1]) != ' ') {
              break;
            } else {
              selStart = after;
            }
          }
          while (selEnd[0] > selStart[0] || selEnd[1] > selStart[1]) {
            var before = selEnd;
            if (before[1] <= 1) {
              before[0]--;
              before[1] = rep.linex.atIndex(before[0]).text.length;
            } else {
              before[1]--;
            }
            if (rep.lines.atIndex(before[0]).text.charAt(before[1] - 1) != ' ') {
              break;
            } else {
              selEnd = before;
            }
          }
        }

        if (selStart[0] == selEnd[0] && selStart[1] != selEnd[1]) {
          // there is a selection on a single line
          text = rep.lines.atIndex(selStart[0]).text.substring(selStart[1], selEnd[1]);
        } else if (selStart[0] != selEnd[0] && selStart[1] != selEnd[1]) {
          // there is a selection spanning multiple lines
          text = rep.lines.atIndex(selStart[0]).text.substring(selStart[1]);
          for (var i = selStart[0] + 1; i < selEnd[0]; i++) {
            text += '\n' + rep.lines.atIndex(i).text;
          }
          text += '\n' + rep.lines.atIndex(selStart[0]).text.substring(0, selEnd[1]);
        }
        text = data.tagOpen + text + data.tagClose;
        self.editorInfo.ace_replaceRange(selStart, selEnd, text);

        break;
      case 'insert':
        // replace selection with text (selection can be empty)
        var text = data.text;
        self.editorInfo.ace_replaceRange(undefined, undefined, text);
        break;
      default:
        alert('ep_iframeinsert unterstützt Befehl "' + func + '" nicht.');
        break;
    }
  }
}

exports.iframeNotifyParent = function() {
  var data = new Object();
  data.func = 'none';
  data.context = 'ep_iframeinsert';
  data.text = self.editorInfo.ace_exportText();
  parent.postMessage(data, "*");
}

exports.aceInitialized = function(hook, context){
  var editorInfo = context.editorInfo;
  self.editorInfo = editorInfo;
  self.addEventListener("message", exports.iframeinsertReceiveMessage, false);
  self.setInterval(exports.iframeNotifyParent, 100);
}

exports.disableLists = function() {
  $('#oderedlist').hide();
  $('#unoderedlist').hide();
  $('#indent').hide();
  $('#outdent').hide();
  $('#bold').hide();
  $('#italic').hide();
  $('#underline').hide();
  $('#strikethrough').hide();
  return;
}
