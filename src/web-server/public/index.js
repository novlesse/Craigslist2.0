const uploadHandler = () =>{
  const fileChooser = document.getElementById('file-chooser');
  const button = document.getElementById('upload-btn');
  const message = document.getElementById('message');
  button.addEventListener('click', function(e) {
    e.preventDefault();
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = "ca-central-1"; 
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "ca-central-1:509094eb-e72d-4426-8174-ef1b58025133" 
    });

    AWS.config.credentials.get(function(err) {
        if (err) alert(err);
        console.log(AWS.config.credentials);
    });

    const bucketName = 'craiglist2'; // Enter your bucket name
    const bucket = new AWS.S3({
        params: {
            Bucket: bucketName
        }
    });

    const files = fileChooser.files;
    console.log(files.length)
    const prefix = Math.round(new Date().getTime()/1000).toString();
    if (files.length > 0) {
      const images = [];
        for(let i = 0; i < files.length; i++) {
          const objKey = prefix + files[i].name;
          const params = {
            Key: objKey,
            ContentType: files[i].type,
            Body: files[i],
            ACL: 'public-read'
          };
          console.log(objKey);
          bucket.putObject(params, function(err, data) {
            if (err) {
              message.innerHTML = 'ERROR: ' + err;
            } else {
              // listObjs(bucket, prefix);
              images.push(objKey);
              message.innerHTML = 'Success to upload ' + files[i].name;
              if(i == files.length -1) {
                const formData = {};
                $("#new-listing-form").serializeArray().forEach(element => {
                  formData[element.name] = element.value
                })
                console.log(formData);
                formData.images = JSON.stringify(images);
                
                $.ajax({
                  type: "POST",
                  url: "/api/users/posts",
                  data: JSON.stringify(formData),
                  contentType: 'application/json',
                  success: result => {
                    $("#message").text('Congratulation! Listing is created successfully');
                  },
                  error: err => {
                    console.log(err.message)
                    $("#message").text('Oops something is wrong.');
                  }
                })    
              }
            }
          });
        }
    } else {
      message.innerHTML = 'No file selected.';
    }
  }, false);
}

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

  $("#new-listing-btn").click(function (e) {
      $.get(`/api/users/listing-form`, (data, status) => {
        if(status == "success") {
          $("#listing-form-container").html(data);
          uploadHandler();
        }
        else
          $("#listing-form-container").html("Oops, loading listing form failed!")
      });
    });
    
  $("#advance-search-btn").click(e => {
    $(e.target).siblings("span").toggleClass("invisible")
  })

})

$(document).on('change','#category-post', function (e) {
  if ($(this).data('options') === undefined) {
    /*Taking an array of all options of sub-category select and embedding it on the category select*/
    $(this).data('options', $('#sub-category-post option').clone());
  }
  const id = $(this).val();
  const options = $(this).data('options').filter('[data-value=' + id + ']');
  $('#sub-category-post').html(options);
})


