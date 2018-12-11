$(function(){
  function buildHTML(message){
    var image = message.image ? `<div><img src="${massege.image.url}"></div>` : "";
    var html = `<div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.date}
                  </div>
                </div>
                  <div class="lower-meesage">
                      <p class="lower-message__content">
                        ${message.content}
                        ${image}
                      </p>
                  </div>`
    return html;
  }


  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    console.log(this)
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.upper-message__user-name').append(html)
      $('.form-control').val('')
      $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight}, 1000, 'swing');
    })
    .fail(function(){
      alert('error');
    })
    .always(function () {
      $(".input-message__form__submit").removeAttr("disabled");
    });

  })
});




