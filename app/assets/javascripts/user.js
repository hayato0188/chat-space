$(document).on("turbolinks:load", function(){
  var formField = $('.chat-group-form__field')
  var searchResult = $('#user-search-result');
  var userForm = $('.chat__group-user_name');
  var addedMembers = $('#chat-group-users')
  var addButton = '.chat-group-user__btn--add'
  var removeButton = '.js-remove-btn'

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    searchResult.append(html)
  }

  function appendNoUser(user) {
    var picked_name = $('')
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">"一致するユーザーはいません"</p>
                </div>`
  }

  function appendMember(member) {
    var html = `<div class='chat-group-user clearfix js-chat-member', id="chat-group-user-${ member.id }">
                  <input name='group[user_ids][]' type='hidden' value='${ member.id }'>
                  <p class='chat-group-user__name'>${ member.name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    addedMembers.append(html);
  }

  userForm.on("keyup", function(){
    var input = userForm.val();
    var data = { name: input}
    $.ajax({
      type: 'GET',
      url: '/users',
      data: data,
      dataType: 'json',
      contentType: false
    })

    .done(function(users){
      searchResult.empty();
      if(users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません")
      }
    })

    $(document).on('click', addButton, function(){
      var member = {};
      member.id = $(this).attr("data-user-id");
      member.name = $(this).attr("data-user-name");
      $(this).parent().remove();
      appendMember(member);
    });


    $(formField).on('click', removeButton, function(){
      $(this).parent().remove();
    });



  });
});
