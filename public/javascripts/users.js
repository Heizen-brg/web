$("#add_user").click(function () {
  $.ajax({
    url: "/users",
    type:'post',
    data: {
      username: $('#add_name').val(),
      email: $('#add_email').val(),
      address:$('#add_address').val(),
      gender: $('#add_gender').val(),
    }
  })
  .then(function (data) {
    alert("Add successful")
    window.location.href = '/users'
    $('.name').append( $('#add_name').val())
    $('.email').append( $('#add_email').val())
    $('.address').append($('#add_address').val())
    $('.gender').append( $('#add_gender').val())
  })
  .fail(err => {
    console.log(err);
    
  })
})


$(".edit").click(function () {
  let id = $(this).attr('data-id')
  $('#edit_user').html(id)
})

$("#edit_user").click(function () {
  let id = $('#edit_user').html()
  $.ajax({
    url: "/users/"+id,
    type:'put',
    data: {
      username: $('#edit_name').val(),
      email: $('#edit_email').val(),
      address:$('#edit_address').val(),
      gender: $('#edit_gender').val(),
    }
  }).done(function(data){
    alert('Save successful')
    $(`#row-${id} .name`).html($('#edit_name').val())
    $(`#row-${id} .email`).html($('#edit_email').val())
    $(`#row-${id} .address`).html($('#edit_address').val())
    $(`#row-${id} .gender`).html($('#edit_gender').val())
    $('#editEmployeeModal').modal('hide');
    })
    .fail(function(err){
      alert('Retry')
    })
  
})

$(".delete").click(function () {
  let id = $(this).attr('data-id')
  $('#delete-user').html(id)
})

$("#delete-user").click(function () {
  let id = $('#delete-user').html()
  $.ajax({
    url:"/users/"+id,
    type:'delete'
  }).done(function (data) {
    alert('Delete successful')
    $(`#row-${id}`).remove()
    $('#deleteEmployeeModal').modal('hide');
  }) .fail(function(err){
      alert('Retry')
    })
})
