$(() => {
  $("#category-search").change(function (e) {
    if ($(this).data('options') === undefined) {
      /*Taking an array of all options-2 and kind of embedding it on the select1*/
      $(this).data('options', $('#sub-category-search option').clone());
    }
    const id = $(this).val();
    const options = $(this).data('options').filter('[data-value=' + id + ']');
    $('#sub-category-search').html(options);
  });

  $("#new-listing-btn").click(e => {
    $.get(`/api/users/listing-form`, (data, status) => {
      // if(status == 200) 
        $("#listing-form-container").html(data);
      // else
      //   $("#listing-form-container").html("Oops, loading listing form failed!")
    });
  })
})

$(document).on('change','#category-post', function (e) {
  if ($(this).data('options') === undefined) {
    /*Taking an array of all options-2 and kind of embedding it on the select1*/
    $(this).data('options', $('#sub-category-post option').clone());
  }
  const id = $(this).val();
  const options = $(this).data('options').filter('[data-value=' + id + ']');
  $('#sub-category-post').html(options);
})
// 

