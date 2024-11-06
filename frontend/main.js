$(function () {
    $.ajax({
        url: 'http://localhost:3000/todos',
        method: "get",
        success: function (rows) {
            const todoUL = $("#todos");
            let str = ""; //변수가 초기화 되어서 정의되지 않은 상태가 됨.
            rows.forEach((row) => {
                str += `<li class="d-flex gap-1">
                    <input type = "checkbox" ${row.completed ? "checked" : ""}>
   <p>${row.title}</p>
   <input type="button" value="modify">
   <input type="button" value="remove">
</li>`});
            todoUL.html(str);
        },
    });
});