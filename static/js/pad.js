function iframeinsertReceiveMessage(event)
{
//  self.ChildAccessibleAce2Editor.registry[1].editor.replaceRange(undefined,undefined,event.data); 
  self.editorInfo.ace_replaceRange(undefined, undefined, event.data);
};

function aceInitialized(hook, context){
  var editorInfo = context.editorInfo;
  self.editorInfo = editorInfo; 
  window.addEventListener("message", iframeinsertReceiveMessage, false);
}
exports.aceInitialized = aceInitialized;

