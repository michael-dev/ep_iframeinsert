function iframeinsertReceiveMessage(event)
{
  if (event.source != parent)
    return;
  self.editorInfo.ace_replaceRange(undefined, undefined, event.data);
};

function aceInitialized(hook, context){
  var editorInfo = context.editorInfo;
  self.editorInfo = editorInfo; 
  window.addEventListener("message", iframeinsertReceiveMessage, false);
}
exports.aceInitialized = aceInitialized;

