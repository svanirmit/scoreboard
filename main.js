let name_of_the_students = [];
var count = [];
var overall_result = [];
var counter = 0;

function removeName(e) {
    var serial_no = e.parentNode.parentNode.rowIndex;
    document.getElementById("myTable").deleteRow(serial_no);
    count.splice(serial_no - 1, 1);
    name_of_the_students.splice(serial_no - 1, 1);
    localStorage.setItem("array", JSON.stringify(name_of_the_students));
    for(var i=serial_no-1;i<count.length;i++){
        count[i] = count[i] - 1;
        console.log(i+1);
        if(document.getElementById("sno"+(i+2))){
            document.getElementById("sno"+(i+2)).innerText = count[i];
            document.getElementById("sno"+(i+2)).id = "sno"+(i+1);
        }
    }
}

function submit() {
    var name = document.getElementById("dropdown").value;
    var find_student = name_of_the_students.indexOf(name);
    if (find_student != -1) {
        alert(name + " is already selected.");
        return;
    }
    counter = counter + 1;
    count.push(counter);
    name_of_the_students.push(name);
    var length = name_of_the_students.length;
    localStorage.setItem("array", JSON.stringify(name_of_the_students));
    localStorage.setItem("length", length);
    var table = document.getElementById("myTable");
    var row = table.insertRow(counter);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(0);
    var cell3 = row.insertCell(0);
    cell1.innerHTML = "<div onclick='removeName(this)'><i style='color: #F5B41A;' class='fa fa-times-circle'></i></div>";
    cell2.innerHTML = name;
    cell3.innerHTML = counter;
    cell3.id = "sno" + counter;
}

function nextPage() {
    window.location = "scoreboardChanges.html";
}

function total(value, row, round) {
    var val2 = parseInt(value);
    var final_value = document.getElementById("input_R" + row + "_sum").value;
    var sum = 0;
    for (var i = 1; i <= 5; i++) {
        var num = document.getElementById("input_R" + row + "_r" + i).value;
        if (num.length > 0) {
            sum = sum + parseInt(num);
        }
    }

    document.getElementById("input_R" + row + "_sum").value = sum;
}

function createBoard() {
    var arr = JSON.parse(localStorage.getItem("array"));
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var div = "<div id='div_" + i + "'><div style='padding-top: 6.5px; height: 40px; background: #F5B41A;' class='col-md-1'><div class='hexagon hexagon1'><div class='hexagon-in1'><div class='hexagon-in2'><p style='color: white; position: absolute; z-index: 1000; width: 100%; text-align: center; margin-top: 3px;'>" + (i + 1) + "</p></div></div></div></div><div style='padding-top: 10px; height: 40px; background: #F5B41A;' class='col-md-5'><label id='name_R" + (i + 1) + "' style='margin-left: -130px; font-size: 18px; width: 50px; text-align: center;'>" + arr[i] + "</label></div><div style='height: 40px; padding-top: 10px; background:#F5B41A' class='col-md-6'><input onchange='total(this.value, " + (i + 1) + ", 1)' id='input_R" + (i + 1) + "_r1' style='font-weight: bold; margin-left: -100px; width: 60px;' type='number'><input onchange='total(this.value, " + (i + 1) + ", 2)' id='input_R" + (i + 1) + "_r2' style='font-weight: bold; margin-left: 17px; width: 60px;' type='number'><input onchange='total(this.value, " + (i + 1) + ", 3)' id='input_R" + (i + 1) + "_r3' style='font-weight: bold; margin-left: 17px; width: 60px;' type='number'><input onchange='total(this.value, " + (i + 1) + ", 4)' id='input_R" + (i + 1) + "_r4' style='font-weight: bold; margin-left: 18px; width: 60px;' type='number'><input onchange='total(this.value, " + (i + 1) + ", 5)' id='input_R" + (i + 1) + "_r5' style='font-weight: bold; margin-left: 20px; width: 60px;' type='number'><input id='" + (i + 1) + "' style='font-weight: bold; margin-left: 20px; width: 60px;' type='text'><input id='input_R" + (i + 1) + "_sum' readonly='true' style='text-align: center; font-weight: bold; margin-left: 20px; width: 100px;' type='number'></div></div>";
        document.getElementById("divs").innerHTML += div;
    }
}

function setValues() {
    var group_name = localStorage.getItem("Group Name");
    var type = localStorage.getItem("Type");
    var first_position_details = JSON.parse(localStorage.getItem("first_position_details"));
    var second_position_details = JSON.parse(localStorage.getItem("second_position_details"));
    if (second_position_details == null) {
        document.getElementById("student_name_1").innerHTML = first_position_details.student_name;
        document.getElementById("div_1_winner").style.display = "block";
        document.getElementById("div_2_winner").style.display = "none";
        document.getElementById("div_1_img_1").src = "images/students/" + first_position_details.student_name + ".PNG";

    } else {
        document.getElementById("student_name_1").innerHTML = first_position_details.student_name;
        document.getElementById("student_name_2").innerHTML = second_position_details.student_name;
        document.getElementById("div_1_winner").style.display = "none";
        document.getElementById("div_2_winner").style.display = "block";
        document.getElementById("div_2_img_1").src = "images/students/" + first_position_details.student_name + ".PNG";
        document.getElementById("div_2_img_2").src = "images/students/" + second_position_details.student_name + ".PNG";
    }
    if (type == "Overall") {
        document.getElementById("set_group").innerHTML = "Winner of the Month";
        document.getElementById("music").src = "images/stand up.mp3";
        document.getElementById("prize").src = "images/rotating trophy.gif";
        document.getElementById("prize").className = "";
    } else {
        document.getElementById("set_group").innerHTML = "Group " + group_name;
        document.getElementById("music").src = "images/clappings.mp4";
        document.getElementById("prize").src = "images/Badge - Student of the month.PNG";
    }
}

function results() {
    localStorage.removeItem("Group Name");
    localStorage.removeItem("first_position_details");
    localStorage.removeItem("second_position_details");
    var arr = JSON.parse(localStorage.getItem("array"));
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var score = document.getElementById("input_R" + (i + 1) + "_sum").value;
        var student_name = document.getElementById("name_R" + (i + 1)).innerHTML;
        overall_result.push({
            score,
            student_name
        });
    }
    overall_result.sort(function (a, b) {
        return b.score - a.score
    });
    var first_position = overall_result[0];
    var second_position = overall_result[1];
    if (Number(first_position.score) == Number(second_position.score)) {
        var first_position_details = {
            score: Number(first_position.score),
            student_name: first_position.student_name
        };
        var second_position_details = {
            score: Number(second_position.score),
            student_name: second_position.student_name
        };
        localStorage.setItem("first_position_details", JSON.stringify(first_position_details));
        localStorage.setItem("second_position_details", JSON.stringify(second_position_details));
    } else {
        var first_position_details = {
            score: Number(first_position.score),
            student_name: first_position.student_name
        };
        localStorage.setItem("first_position_details", JSON.stringify(first_position_details));
    }
    window.location = "results.html";
    localStorage.setItem("Type", "Overall");
}

function resultGroups(group_name) {
    localStorage.removeItem("Group Name");
    localStorage.removeItem("first_position_details");
    localStorage.removeItem("second_position_details");
    var arr = JSON.parse(localStorage.getItem("array"));
    var len = arr.length;
    var students = [];
    for (var i = 0; i < len; i++) {
        if (document.getElementById(i + 1).value == group_name) {
            var row = document.getElementById(i + 1).id;
            var student_name = document.getElementById("name_R" + row).innerHTML;
            var score = document.getElementById("input_R" + row + "_sum").value;
            students.push({
                student_name,
                score
            });
        }
    }
    students.sort(function (a, b) {
        return b.score - a.score
    });
    var first_position = students[0];
    var second_position = students[1];
    if (second_position && (Number(first_position.score) == Number(second_position.score))) {
        var first_position_details = {
            score: Number(first_position.score),
            student_name: first_position.student_name
        };
        var second_position_details = {
            score: Number(second_position.score),
            student_name: second_position.student_name
        };
        localStorage.setItem("first_position_details", JSON.stringify(first_position_details));
        localStorage.setItem("second_position_details", JSON.stringify(second_position_details));
    } else {
        if (first_position) {
            var first_position_details = {
                score: Number(first_position.score),
                student_name: first_position.student_name
            };
            localStorage.setItem("first_position_details", JSON.stringify(first_position_details));
        }
    }
    localStorage.setItem("Group Name", group_name);
    localStorage.setItem("Type", "Group");
    if (first_position) {
        window.location = "results.html";
    } else {
        alert("Student with Group " + group_name + " does not exist.");
    }
}
function login(){
    window.location = "home.html";
}
function logout(){
    localStorage.removeItem("array");
    localStorage.removeItem("Group Name");
    localStorage.removeItem("Type");
    localStorage.removeItem("first_position_details");
    localStorage.removeItem("second_position_details");
    window.location = "index.html";
}
function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }