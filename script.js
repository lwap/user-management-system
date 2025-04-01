$(document).ready(function() {
    let users = [];
    let students = [];

    // Load user data
    $.getJSON("users.json", function(data) {
        users = data;
    });

    // Load student data
    $.getJSON("students.json", function(data) {
        students = data;
        loadStudents();
    });

    // Login functionality
    $("#loginForm").submit(function(event) {
        event.preventDefault();
        let username = $("#username").val();
        let password = $("#password").val();
        
        let user = users.find(u => u.username === username && u.password === password);
        if (user) {
            if (user.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "main.html";
            }
        } else {
            $("#error-message").text("Invalid credentials");
        }
    });

    // Load students into table
    function loadStudents() {
        $("#studentTable").html("");
        students.forEach((s, index) => {
            $("#studentTable").append(`
                <tr>
                    <td>${s.lrn}</td>
                    <td>${s.lastName}</td>
                    <td>${s.firstName}</td>
                    <td>${s.middleName}</td>
                    <td>${s.status}</td>
                    <td>
                        <button onclick="editStudent(${index})">Edit</button>
                        <button onclick="deleteStudent(${index})">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    // Add student
    $("#addStudentBtn").click(function() {
        $("#studentForm").show();
    });

    // Save student
    $("#saveStudent").click(function() {
        let student = {
            lrn: $("#lrn").val(),
            lastName: $("#lastName").val(),
            firstName: $("#firstName").val(),
            middleName: $("#middleName").val(),
            status: $("#status").val()
        };
        students.push(student);
        loadStudents();
        $("#studentForm").hide();
    });

    // Delete student
    window.deleteStudent = function(index) {
        students.splice(index, 1);
        loadStudents();
    };
});
