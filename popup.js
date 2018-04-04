function submitReadingForm(form) {
  $('#submit_weeklydose').prop('disabled', 'disabled').addClass('disabled');
  $.ajax({
    // url: 'https://weeklydose.coloredcow.com/api/weeklydose',
    url: 'https://ccweeklydose.dev/api/weeklydose',
    method: 'POST',
    data: form.serialize(),
    success: function(res) {
      $('#submit_weeklydose').hide();
      $('#submitted_weeklydose').show();
    },
    error: function(err) {
      $('#submit_weeklydose').hide();
      $('#error_weeklydose').show();
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

function showSettings() {
  $('form').addClass('hidden');
  $('#form_weeklydose_settings, #hide_settings').removeClass('hidden');
  $('#show_settings').addClass('hidden');
}

function hideSettings() {
  $('form').addClass('hidden');
  $('#form_add_weeklydose, #show_settings').removeClass('hidden');
  $('#hide_settings').addClass('hidden');
}

function saveSettings() {
  var settings_form = $('#form_weeklydose_settings');

  if (!settings_form[0].checkValidity()) {
    settings_form[0].reportValidity();
    return false;
  }

  chrome.storage.sync.set({
    'username': $('#settings_recommended_by').val(),
    'weeklydose_service_url': $('#settings_weeklydose_service_url').val()
  }, function(){});
  $('#saved_settings').show();
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['username', 'weeklydose_service_url'], function(items) {
    if (typeof items.username !== undefined) {
      $('#recommended_by, #settings_recommended_by').val(items.username);
    }
     if (typeof items.weeklydose_service_url !== undefined) {
      $('#settings_weeklydose_service_url').val(items.weeklydose_service_url);
    }
  });
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    $('#share_link').text(url);
    $('#url').val(url);
  });
  document.getElementById('show_settings').addEventListener('click', showSettings, false);
  document.getElementById('hide_settings').addEventListener('click', hideSettings, false);
  document.getElementById('save_weeklydose_settings').addEventListener('click', saveSettings, false);
  document.getElementById('submit_weeklydose').addEventListener('click', sendReadingLog, false);
});
