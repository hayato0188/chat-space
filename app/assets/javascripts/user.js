$(function(){
  var searchResult = $('#user-search-result');
  var userForm = $('.chat__group-user_name');
  var preWord;

  function editElement(element) {
    var result = "^" + element;
    return result;
  }

//htm
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

  userForm.on("keyup", function(){
    var input = userForm.val();
    // var inputs = input.split(" ").filter(function(e){ return e;});
    // var newInputs = inputs.map(editElement);
    // var word = newInputs.join("|");
    // var reg = RegExp(word);
    var data = { name: input}
    //   keyword: word,
    //   reg: reg,
    //   preWord: preWord,
    // console.log(name)
    console.log(input)
    // console.log(inputs)
    // console.log(word)
    // console.log(reg)
    console.log(data)
    $.ajax({
      type: 'GET',
      url: '/users',
      data: data,
      dataType: 'json',
      contentType: false
    })

    .done(function(users){
      searchResult.empty();
      // appendUser(users);
      // if (word != preWord) {
      //     if(users.length !== 0) {
      //       $.each(function(user){
      //           appendUser(user);
      //         })
      //     }
      //     else {
      //       appendNoUser("一致するユーザーはいません")
      //     }
      //   preWord = word;
      //   console.log(users)
      // };
            // $(".").empty();
      if(users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません")
      }
      console.log(users)
    })

  });
});
