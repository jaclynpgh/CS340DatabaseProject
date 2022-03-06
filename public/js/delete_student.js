function deleteStudent(studentID) {
    let link = '/delete-student/';
    link += studentID;
    $.ajax({
      url: link,
      type: 'DELETE',
      success: function(result) {
        window.location.reload(true);
      }
    })
  }
  
