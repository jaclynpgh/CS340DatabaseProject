function updateStudent(studentID){
  let link = '/update_student/';
  link += studentID;
  $.ajax({
      url: link,
      type: 'PUT',
      data: $('#update_student').serialize(),
      success: function(result){
        window.location.replace("./");
      }
  })
};
  
