$(function () {
    fetchTodos();
    createTodo();
});

function createTodo() {
    const todosForm = $("#todos-form");
    const todoText = $("#todo-text");
    todosForm.on("submit", function (e) {
        e.preventDefault();
        if (todoText.val() == "") {
            alert("할일 항목이 비어있습니다.");
            return;
        }
        $.ajax({
            url: 'http://localhost:3000/todos',
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                title: $("#todo-text").val(),
                completed: false
            }),
            success: async function (result) {
                await fetchTodos();
                $("#todo-text").val("");
                clearInputAndFocus()
            }
        })
    })
}

function clearInputAndFocus() {
    $("#todo-text").val("");
    $("#todo-text").focus();
}
async function fetchTodos() {
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: "get",
        success: function (rows) {
            const todoUL = $("#todos");
            let strArr = []; //변수가 초기화 되어서 정의되지 않은 상태가 됨.
            rows.forEach((row) => {
                strArr.push(`<li class="d-flex gap-1" data-id="${row._id}">
                    <input type = "checkbox" ${row.completed ? "checked" : ""}>
   <p>${row.title}</p>
   <input type="button" value="수정" class="modify-btn">
   <input type="button" value="삭제" class="remove-btn">
</li>`)
});
            strArr.reverse();
            strArr.join("")
            todoUL.html(strArr);
            removeTodo();
            callModal();
        },
    });
}

function callModal() {
    const editTodo = $(".modify-btn");
    let todoId; // global var 전역으로 꺼내야만 인식을 한다.
    editTodo.on("click", function () {
        const edit = $(this);
        todoId = edit.parent().attr("data-id");
        const todoTitle = edit.siblings("p").text();
        const modal = $("#modal");
        modal.find("#prev-todo").val(todoTitle);
        modal.fadeIn("fast");
        modal.find("#next-todo").focus();
    });
    $("#edit-form").on("submit", function () {
        // e.preventDefault();
        if ($("#next-todo").val() == "") {
            alert("변경할 내용을 입력해 주세요.")
            $("#next-todo").focus();
            return;
        }
        $.ajax({
            url: `http://localhost:3000/todos/${todoId}`,
            method: 'put',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                title: $("#next-todo").val(),
                completed: $("#next-complete").is(":checked"),
            }),
            success: function () {
                alert("항목이 업데이트 되었습니다.");
                location.reload();
            }
        })
    })
    $("#hide-modal").on("click", function () {
        $("#modal").fadeOut("fast")
    })
}

function removeTodo() {
    const removeBtns = $(".remove-btn");
    removeBtns.on("click", function () {
        const currBtn = $(this); // 현재 누른 버튼이 무엇인지
        $.ajax({
            url: `http://localhost:3000/todos/${currBtn.parent().attr("data-id")}`,
            method: "delete",
            success: function () {
                alert("선택항목을 삭제하였습니다.")
            }
        }).done(() => {
            fetchTodos();
        })
    })
}

//currBtn.parent().attr("data-id")