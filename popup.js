function submitReadingForm(form) {
  chrome.storage.sync.set({'cc_reader': $('#recommended_by').val()}, function(){});
  $.ajax({
    url: 'https://ccweeklydose.dev/api/reading-items/new',
    method: 'POST',
    data: form.serialize(),
    success: function(res) {
      $('#submitReadingItem').hide();
      $('#submittedReadingItem').show();
    },
    error: function(err) {
      alert('There was an error submitting! Please refresh the page and try again.');
    }
  });
}

function sendReadingLog(form) {
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
      $('#recommended_by').val(items.cc_reader);
    }
  });
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    $('#share-link').text(url);
    $('#url').val(url);
  });
  document.getElementById('submitReadingItem').addEventListener('click', sendReadingLog, false);
});
