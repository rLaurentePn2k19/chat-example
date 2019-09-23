$(document).ready(function () {
    $("#chat-box").hide();
    $("#submit_user").click(function () {
      $("#setnickname_form").hide();
      $("#chat-box").show();
    })
    $(function () {
      var socket = io();
      $('section').submit(function () {
        socket.emit('chat message', $('#chat_input').val());
        $('#chat_input').val('');
        return false;
      });
      socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, document.body.scrollHeight);
      });
    });

  })
