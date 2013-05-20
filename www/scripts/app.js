// namespace
window.application = {
  editor: "",
  apiLimit:1500,
  enabeAutoReload:false,
  enableShortcut:false,
  md:"",
  viewer:"",
  db:localStorage,
  converter:"marked", // default converter is `marked`
  isRendering:false,
  rmdfile: "example.Rmd"
};
window.URL = window.URL || window.webkitURL;


// Dom Ready
$(function(){
  
  // initialize ace editor
  application.editor = setupAceEditor('editor','editor_text');
  

  });
  

// Setup ace editor and tie it to a textarea
// Author: Yihui Xie, Ramnath Vaidyanathan
function setupAceEditor(aceEl, textEl){
  var editor = ace.edit(aceEl);
  
  editor.setTheme("ace/theme/solarized_light");
  editor.getSession().setMode('ace/mode/markdown');
  editor.getSession().setUseWrapMode(true);
  editor.getSession().setTabSize(2);
  editor.getSession().setFoldStyle('markbegin');
  
  editor.getSession().on('change', function(e) {
    $('#' + textEl).val(editor.getValue()).change();
  });
  
  editor.getSession().selection.on('changeSelection', function(e) {
    var s = editor.session.getTextRange(editor.getSelectionRange());
    if (s == '') s = editor.getValue();
    $('#' + textEl).val(s).change();
  });
  
  editor.commands.addCommand({
    name: 'insertChunk',
    bindKey: 'Ctrl-Alt-I',
    exec: function(editor) {
      editor.insert('```{r}\n\n```\n');
      editor.navigateUp(2);
    }
  });
  
  editor.commands.addCommand({
    name: 'compileNotebook',
    bindKey: 'F4|Ctrl-Shift-H',
    exec: function(editor) {
      $('#btnConv2 button').trigger('click');
    }
  });
  
  return(editor)
}


