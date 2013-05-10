$(document).ready(function() {
  editor = setupAceEditor('editor','editor_text');
  var h = window.location.search;
  function setSrc(msg) {
    if (msg) {
      alert('unable to read URL ' + h + '\n\nusing default R Markdown example');
    }
    $('#editor_text').val(editor.getValue());
    $('#proxy button').trigger('click');
  }
  var w = Math.max($(window).width()/2, 300);
  $('#notebook').width(w - 10);
  $('#outputBlock').css('left', w + 10 + 'px');
    
  if (h) {
    // pass a url as a query string after ? in the url
    h = h.replace('?', '');
    $.get(h, {}, function(res) {
      var data = res.data, str = data.content;
      if (typeof(str) != 'string') return(setSrc(true));
      if (data.encoding == 'base64') {
        str = str.replace(/\n/g, '');
        str = decodeURIComponent(escape(window.atob( str )));
      }
      if (str) {
        editor.setValue(str);
        editor.gotoLine(1);
        setSrc(false);
      } else setSrc(true);
    }, 'jsonp')
    .error(function() {
      setSrc(true);
    });
  } else setSrc(false);
})

// Get source Rmd passed as a query string after ? in the url
function getSrc(){
  var h = window.location.search;
  if (h) {
    h = h.replace('?', '');
    $.get(h, {}, function(res) {
      var data = res.data, str = data.content;
      if (typeof(str) != 'string') return(setSrc(true));
      if (data.encoding == 'base64') {
        str = str.replace(/\n/g, '');
        str = decodeURIComponent(escape(window.atob( str )));
      }
      if (str) {
        editor.setValue(str);
        editor.gotoLine(1);
        setSrc(false);
      } else setSrc(true);
    }, 'jsonp')
    .error(function() {
      setSrc(true);
    });
  } else setSrc(false);
}

function setSrc(msg) {
  if (msg) {
    alert('unable to read URL ' + h + '\n\nusing default R Markdown example');
  }
  $('#nbSrc').val(editor.getValue());
  $('#proxy button').trigger('click');
}

