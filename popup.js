function submitReadingForm(form) {
  chrome.storage.sync.set({'cc_reader': $('#recommended_by').val()}, function(){});
  $.ajax({
    url: 'https://weeklydose.coloredcow.com/api/reading-items/new',
    method: 'POST',
    data: form.serialize(),
    success: function(res) {
      $('#submit_weeklydose').hide();
      $('#submitted_weeklydose').show();
    },
    error: function(err) {
      alert('There was an error submitting! Please refresh the page and try again.');
    }
  });
}

function sendReadingLog(form) {
  var form = $('#form_add_weeklydose');
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
  document.getElementById('submit_weeklydose').addEventListener('click', sendReadingLog, false);
});
