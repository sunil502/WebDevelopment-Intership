const STORAGE_KEY = "students";


const studentForm =
    document.getElementById("studentForm");

const studentName =
    document.getElementById("studentName");

const rollNo =
    document.getElementById("rollNo");

const email =
    document.getElementById("email");

const course =
    document.getElementById("course");

const marks =
    document.getElementById("marks");

const studentTableBody =
    document.getElementById("studentTableBody");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const courseFilter =
    document.getElementById("courseFilter");

const performanceFilter =
    document.getElementById("performanceFilter");

const submitBtn =
    document.getElementById("submitBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const formTitle =
    document.getElementById("formTitle");

const toast =
    document.getElementById("toast");

const totalStudents =
    document.getElementById("totalStudents");

const averageMarks =
    document.getElementById("averageMarks");

const passedStudents =
    document.getElementById("passedStudents");

const topPerformer =
    document.getElementById("topPerformer");



let students = [];

let editingStudentId = null;



function loadStudents() {

    const storedStudents =
        localStorage.getItem(STORAGE_KEY);

    if (storedStudents) {

        students =
            JSON.parse(storedStudents);

    } else {

        students = [];

    }

    renderStudents();

    updateDashboard();

}



function saveStudents() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(students)
    );

}



function generateId() {

    return Date.now();

}

function getPerformance(studentMarks) {

    if (studentMarks >= 80) {

        return "Excellent";

    }

    if (studentMarks >= 40) {

        return "Pass";

    }

    return "Fail";

}


function getPerformanceBadge(studentMarks) {

    const performance =
        getPerformance(studentMarks);

    if (performance === "Excellent") {

        return `
            <span class="badge badge-excellent">
                Excellent
            </span>
        `;

    }

    if (performance === "Pass") {

        return `
            <span class="badge badge-pass">
                Pass
            </span>
        `;

    }

    return `
        <span class="badge badge-fail">
            Fail
        </span>
    `;

}



function renderStudents() {

    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedCourse =
        courseFilter.value;

    const selectedPerformance =
        performanceFilter.value;


    
    const filteredStudents =
        students.filter(function(student) {

            const matchesSearch =

                student.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                student.rollNo
                    .toLowerCase()
                    .includes(searchText)

                ||

                student.email
                    .toLowerCase()
                    .includes(searchText);


            const matchesCourse =

                selectedCourse === "all"

                ||

                student.course === selectedCourse;


            const performance =
                getPerformance(student.marks);


            let matchesPerformance = true;


            if (
                selectedPerformance === "pass"
            ) {

                matchesPerformance =
                    performance === "Pass"
                    ||
                    performance === "Excellent";

            }


            if (
                selectedPerformance === "fail"
            ) {

                matchesPerformance =
                    performance === "Fail";

            }


            if (
                selectedPerformance === "excellent"
            ) {

                matchesPerformance =
                    performance === "Excellent";

            }


            return (
                matchesSearch
                &&
                matchesCourse
                &&
                matchesPerformance
            );

        });


    // ========================================
    // CLEAR TABLE
    // ========================================

    studentTableBody.innerHTML = "";


   
    if (filteredStudents.length === 0) {

        emptyState.classList.add("show");

        return;

    }


    emptyState.classList.remove("show");


    filteredStudents.forEach(
        function(student, index) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    <strong>
                        ${escapeHTML(student.name)}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(student.rollNo)}
                </td>

                <td>
                    ${escapeHTML(student.email)}
                </td>

                <td>
                    ${escapeHTML(student.course)}
                </td>

                <td>
                    <strong>
                        ${student.marks}
                    </strong>
                </td>

                <td>
                    ${getPerformanceBadge(student.marks)}
                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn edit-btn"
                            onclick="editStudent(${student.id})"
                        >
                            Edit
                        </button>

                        <button
                            class="action-btn delete-btn"
                            onclick="deleteStudent(${student.id})"
                        >
                            Delete
                        </button>

                    </div>

                </td>

            `;


            studentTableBody.appendChild(row);

        }
    );

}

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}



studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        
        const name =
            studentName.value.trim();

        const roll =
            rollNo.value.trim();

        const studentEmail =
            email.value.trim();

        const selectedCourse =
            course.value;

        const studentMarks =
            Number(marks.value);


        
        if (
            name === ""
            ||
            roll === ""
            ||
            studentEmail === ""
            ||
            selectedCourse === ""
        ) {

            showToast(
                "Please fill all fields."
            );

            return;

        }


        if (
            studentMarks < 0
            ||
            studentMarks > 100
        ) {

            showToast(
                "Marks must be between 0 and 100."
            );

            return;

        }


        
        const duplicate =
            students.find(function(student) {

                return (
                    student.rollNo.toLowerCase()
                    === roll.toLowerCase()
                    &&
                    student.id !== editingStudentId
                );

            });


        if (duplicate) {

            showToast(
                "Roll number already exists."
            );

            return;

        }


        
        if (editingStudentId !== null) {

            const student =
                students.find(function(student) {

                    return (
                        student.id
                        ===
                        editingStudentId
                    );

                });


            if (student) {

                student.name = name;

                student.rollNo = roll;

                student.email = studentEmail;

                student.course = selectedCourse;

                student.marks = studentMarks;

            }


            saveStudents();

            renderStudents();

            updateDashboard();

            showToast(
                "Student updated successfully."
            );


        }


        
        else {

            const newStudent = {

                id: generateId(),

                name: name,

                rollNo: roll,

                email: studentEmail,

                course: selectedCourse,

                marks: studentMarks

            };


            students.push(newStudent);


            saveStudents();

            renderStudents();

            updateDashboard();

            showToast(
                "Student added successfully."
            );

        }


        
        resetForm();

    }
);



function editStudent(id) {

    const student =
        students.find(function(student) {

            return student.id === id;

        });


    if (!student) {

        return;

    }


    editingStudentId =
        student.id;


    studentName.value =
        student.name;

    rollNo.value =
        student.rollNo;

    email.value =
        student.email;

    course.value =
        student.course;

    marks.value =
        student.marks;


    formTitle.textContent =
        "Edit Student";

    submitBtn.textContent =
        "Update Student";


    cancelBtn.style.display =
        "inline-block";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



function deleteStudent(id) {

    const student =
        students.find(function(student) {

            return student.id === id;

        });


    if (!student) {

        return;

    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${student.name}?`
        );


    if (!confirmed) {

        return;

    }


    students =
        students.filter(function(student) {

            return student.id !== id;

        });


    saveStudents();

    renderStudents();

    updateDashboard();


    showToast(
        "Student deleted successfully."
    );

}



function resetForm() {

    studentForm.reset();

    editingStudentId = null;

    formTitle.textContent =
        "Add New Student";

    submitBtn.textContent =
        "Add Student";

}



cancelBtn.addEventListener(
    "click",
    function() {

        resetForm();

    }
);



searchInput.addEventListener(
    "input",
    function() {

        renderStudents();

    }
);



courseFilter.addEventListener(
    "change",
    function() {

        renderStudents();

    }
);



performanceFilter.addEventListener(
    "change",
    function() {

        renderStudents();

    }
);




function updateDashboard() {


    totalStudents.textContent =
        students.length;



    if (students.length === 0) {

        averageMarks.textContent = "0";

        passedStudents.textContent = "0";

        topPerformer.textContent = "-";

        return;

    }



    const totalMarks =
        students.reduce(
            function(total, student) {

                return (
                    total
                    +
                    student.marks
                );

            },
            0
        );


    const average =
        totalMarks
        /
        students.length;


    averageMarks.textContent =
        average.toFixed(1);


  

    const passed =
        students.filter(
            function(student) {

                return student.marks >= 40;

            }
        ).length;


    passedStudents.textContent =
        passed;


    
    const topStudent =
        students.reduce(
            function(top, student) {

                if (
                    student.marks
                    >
                    top.marks
                ) {

                    return student;

                }

                return top;

            }
        );


    topPerformer.textContent =
        topStudent.name;

}




function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add("show");


    setTimeout(
        function() {

            toast.classList.remove("show");

        },
        2500
    );

}



loadStudents();