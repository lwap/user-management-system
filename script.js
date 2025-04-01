// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD03a5To2xGtwk0BpgaGI0J1xa20mKmky8",
    authDomain: "usermanagementsystem-f8d6b.firebaseapp.com",
    databaseURL: "https://usermanagementsystem-f8d6b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "usermanagementsystem-f8d6b",
    storageBucket: "usermanagementsystem-f8d6b.firebasestorage.app",
    messagingSenderId: "1016260423864",
    appId: "1:1016260423864:web:43359690d356b33584444d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// LOGIN FUNCTIONALITY
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    get(child(ref(db), `users/${username}`)).then((snapshot) => {
        if (snapshot.exists()) {
            let user = snapshot.val();
            if (user.password === password) {
                localStorage.setItem("userRole", user.role);
                window.location.href = user.role === "admin" ? "admin.html" : "main.html";
            } else {
                alert("Incorrect password");
            }
        } else {
            alert("User not found");
        }
    }).catch((error) => console.error(error));
});

// LOAD STUDENTS
function loadStudents() {
    get(child(ref(db), "students")).then((snapshot) => {
        if (snapshot.exists()) {
            let students = snapshot.val();
            let tableContent = "";
            Object.keys(students).forEach((key) => {
                let s = students[key];
                tableContent += `<tr>
                    <td>${s.lrn}</td>
                    <td>${s.lastName}</td>
                    <td>${s.firstName}</td>
                    <td>${s.middleName}</td>
                    <td>${s.status}</td>
                    <td>
                        <button onclick="editStudent('${key}')">Edit</button>
                        <button onclick="deleteStudent('${key}')">Delete</button>
                    </td>
                </tr>`;
            });
            document.getElementById("studentTable").innerHTML = tableContent;
        }
    });
}

// ADD STUDENT
document.getElementById("saveStudent").addEventListener("click", function () {
    let newStudent = {
        lrn: document.getElementById("lrn").value,
        lastName: document.getElementById("lastName").value,
        firstName: document.getElementById("firstName").value,
        middleName: document.getElementById("middleName").value,
        status: document.getElementById("status").value
    };
    set(ref(db, `students/${newStudent.lrn}`), newStudent).then(() => {
        alert("Student added successfully");
        loadStudents();
    });
});

// DELETE STUDENT
function deleteStudent(lrn) {
    remove(ref(db, `students/${lrn}`)).then(() => {
        alert("Student deleted");
        loadStudents();
    });
}

// ADMIN: ADD USER
document.getElementById("saveUser").addEventListener("click", function () {
    let newUser = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };
    set(ref(db, `users/${newUser.username}`), newUser).then(() => {
        alert("User added successfully");
    });
});
