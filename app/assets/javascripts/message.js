$(function(){
  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}" class="lower-message__image" />` : "";
    var html = `<dic class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                        ${image}
                      </p>
                  </div>
                </div>`
    return html;
  }
  function buildMESSAGE(message) {
    var html = `<div class="message" data-id='${message.id}'>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                  </div>
                </div>`
    $('.messages').append(html);
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
      $('.messages').append(html)
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

  $(function(){
    setInterval(update,1000);
  });

    function update(){
      var message_id = $('.message:last').data('id');
      if (message_id == undefined){
        $.noop;
      }
      var data = {
        message: {id: message_id}
      };
      console.log(data);
      $.ajax({
        url: location.href,
        type: "GET",
        data: data,
        dataType: 'json'
      })
      .done(function(data){
        $.each(data, function(i,data){
          buildMESSAGE(data);
        $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight}, 1000, 'swing');
        })
        console.log(data)

      })
    }
});




