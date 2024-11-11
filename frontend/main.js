$(function () {
    fetchTodos();
    createTodo();
});

function createTodo() {
    const todosForm = document.querySelector("#todos-form")
    todosForm.addEventListener("submit", function () {
        // e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/todos',
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                title: todosForm.querySelector("#todo-text").value,
                completed: false
            }),
            success: async function (result) {
                console.log(result);
                await fetchTodos();
                todosForm.querySelector("#todo-text").value = "";
                clearInputAndFocus()
            }
        })
    })
}

function clearInputAndFocus() {
    todosForm.querySelector("#todo-text").value = "";
    todosForm.querySelector("#todo-text").focus();
}
async function fetchTodos() {
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: "get",
        success: function (rows) {
            const todoUL = $("#todos");
            let str = ""; //변수가 초기화 되어서 정의되지 않은 상태가 됨.
            rows.forEach((row) => {
                str += `<li class="d-flex gap-1" data-id="${row._id}">
                    <input type = "checkbox" ${row.completed ? "checked" : ""}>
   <p>${row.title}</p>
   <input type="button" value="수정" class="modify-btn">
   <input type="button" value="삭제" class="remove-btn">
</li>`});
            todoUL.html(str);
            removeTodo();
        },
    });
}

function removeTodo() {
    const removeBtns = $(".remove-btn");
    removeBtns.on("click", function(){
        const currBtn = $(this); // 현재 누른 버튼이 무엇인지
        $.ajax({
            url: `http://localhost:3000/todos/${currBtn.parent().attr("data-id")}`,
            method: "delete",
            success: function() {
                alert("선택항목을 삭제하였습니다.")
            }
        }).done(() => {
            fetchTodos();
        })
    })
}

//currBtn.parent().attr("data-id")