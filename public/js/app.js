function getNotes() {
  $.get('/notes')
    .then(function (data) {
      data.forEach(function (note) {
        $('#notes').append(`
        <div>
          <h3>${note.title}</h3>
          <p>${note.details}</p>
        </div>
      `);
      });
    });
}

function createNote() {

  const title = $('#title').val().trim();
  const details = $('#details').val().trim();

  $.post('/notes', {
    title: title,
    details: details
  }).then(function(res) {
    console.log(res);
    $('form input, form textarea').val('');
    $('#notes').empty();
    getNotes();
  });

  return false;
}

$('#submit').on('click', createNote);
getNotes();