function submitReadingForm(form) {
  var readingData = {
    "name" : "Pankaj Agarwal",
    "email" : "vaibhav@coloredcow.com",
    "job_title" : "Laravel Developer",
    "resume" : "https://coloredcow.com"
  };
  console.log(readingData);

  $.ajax({
    // url: 'https://ccreading.dev/api/reading-items/create',
    url: 'https://ccemployees.dev/api/hr/applicants/create',
    method: 'POST',
    data: readingData,
    success: function(res) {
      console.log('success');
      $('#submitReadingItem').hide();
      $('#submittedReadingItem').show();
    },
    error: function(err) {
      console.log('error');
    }
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
  document.getElementById('submitReadingItem').addEventListener('click', sendReadingLog, false);
});
