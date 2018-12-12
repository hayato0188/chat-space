$(function(){

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>`
  }

  $(".chat-group-user-form__input").on("keyup", function(){
    var input = $(".chat-group-user-form__input").val();

    $.ajax({
      type: 'get',
      url: '/groups/new',
      data: {keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      // $(".").empty();
      if(users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません")
      }
    })
  });
});
