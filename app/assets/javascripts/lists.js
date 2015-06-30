// $(function() {
$(document).on("ready", function(){

  $(".notice").hide()

  var errorHandler = function() {
    $(".notice").show().text("Mistakes were made")
  }

  var taskClickHandler = function() {
    $(this).toggleClass("complete")

    // $(this).attr("data-task-id")
    var task_id = $(this).data("task-id")

    // Note: don't actually care about list id here
    $.ajax("/lists/1/tasks/" + task_id + "/complete", {
      method: "PATCH",
      error: errorHandler
    })
  }

  var taskButtonHandler = function(e) {
    var task_id = $(this).data("task-id")
    $(this).parent().remove()

    e.preventDefault()

    $.ajax("/lists/1/tasks/" + task_id, {
      method: "DELETE",
      error: errorHandler,
      success: function() {
        $(this).parent().remove()
      }
    })
    return false
  }

  $("button.delete").on("click", taskButtonHandler)

  $("span.task").on("click", taskClickHandler)

  $("input").on("keyup", function(evt) {
    if (evt.keyCode === 13) { // pressed enter
      var list_id = $(this).data("list-id")

      $.ajax("/lists/" + list_id + "/tasks", {
        method: "POST",
        data: {
          task_name: $(this).val()
        },
        error: errorHandler,
        success: function(data) {
          // deleteButton = $('<button />').addClass('delete').text('Delete')
          var new_item = $("<li><span class='task' data-task-id='" + data.id + "'>" + data.content + "</span><button class='delete' data-task-id='" + data.id + "'> Delete </button>")

          new_item.on("click", taskClickHandler)

          $("ul.task-list").append(new_item)
        }
      })
    }
  })

})