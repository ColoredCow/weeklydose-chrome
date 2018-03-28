function submitReadingForm(form) {
  chrome.storage.sync.set({'cc_reader': $('#reader').val()}, function(){});
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var readingData = {
      "topic" : $('#topic').val(),
      "url" : tabs[0].url,
      "recommended_by" : $('#reader').val(),
    };
    $.ajax({
      url: 'https://weeklydose.dev/api/reading-items/new',
      method: 'POST',
      data: readingData,
      success: function(res) {
        $('#submitReadingItem').hide();
        $('#submittedReadingItem').show();
      },
      error: function(err) {
        alert('There was an error submitting! Please refresh the page and try again.');
      }
    });
  });
}

function sendReadingLog() {
  var form = $('#formAddReadingLog');
  if (! form[0].checkValidity()) {
    form[0].reportValidity();
  } else {
    submitReadingForm(form);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['cc_reader'], function(items) {
    if (typeof items.cc_reader !== undefined) {
      $('#reader').val(items.cc_reader);
    }
  });
  document.getElementById('submitReadingItem').addEventListener('click', sendReadingLog, false);
});
