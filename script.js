let themes = [ "eclipse", "dracula" ], themeOption = 1;
let done = [ false, false, false, false, false, false, false ]
let questions = [
    {
        id: 1,
        mode: "xml",
        task: "Write something in the <div> tags and see what happens",
        actual: `<style>\n#objective { font-family: 'Poppins'; text-align: start; }\n</style>\n<h4> First HTML Code: </h4>\n<hr>\n<div id="objective">\n<!-- Write anything here -->\n\n</div>`,
        editable: `<!-- Basic HTML Template -->\n<h4> First HTML Code: </h4>\n<hr>\n<div id="objective">\n<!-- Write anything here -->\n\n</div>`,
        build: function(code) {
            return code;
        }
    },
    {
        id: 2,
        mode: "css",
        task: "A valuable ornament is hiding behind the rock. Move to reveal it",
        actual: `<style>
                #msg, #rock {
                    position: absolute;
                }
                #rock {
                    width: 150px;
                    hright: 150px;
                    /* Code */
                }
            </style>
            <div id="msg" class="fw-bold text-success">YOU</div>
            <img id="rock" src="rock.jpg" alt="Rock">`,
        editable: `/* Try making some CSS transitions */\n#rock {\n\t/* Add your CSS here */\n}`,
        build: function(code) {
            code = code.substring(code.indexOf('{') + 1, code.indexOf('}'));
            return this.actual.replace("/* Code */", code);
        }
    },
    {
        id: 3,
        mode: "css",
        task: "The Air Force signal team has reported that a flight is wobbling in mid air. We need your help to stop it. Write your CSS code that will get the job done.",
        actual: `<style>
            #objective {    animation: wobble 2s infinite linear; /* Code */ }
            </style>
            <img id="objective" src="jetplane.jpg" alt="Jetplane">`,
        editable: `#objective {\n\t/* Add your CSS here */\n}`,
        build: function(code) {
            code = code.substring(code.indexOf('{') + 1, code.indexOf('}'));
            return this.actual.replace("/* Code */", code);
        }
    },
    {
        id: 4,
        mode: "css",
        task: "Can't see clear. Can you help me enlarge the content. Then make every character even, It looks clumsy.",
        actual: `<style>
            #objective { text-align: center;\nfont-family: "Poppins", sans-serif;\nfont-size: 5px;\n/* Code */ }
            </style>
            <div id="objective">there iS aLwayS bEtter possIbilities to expLore and eVolVe. <br>Keep learning</div>`,
        editable: `#objective {\n\t/* Add your CSS here */\n}`,
        build: function(code) {
            code = code.substring(code.indexOf('{') + 1, code.indexOf('}'));
            return this.actual.replace("/* Code */", code);
        }
    },
    {
        id: 5,
        mode: "javascript",
        task: "Being a detective, your objective is to find a hidden clue. You have a hint: jQuery makes JS better",
        actual: `<script>
            $("#objective").hide(); /* Code */
            </script>
            <div id="objective" class="fs-4 fw-bold text-center"> Every Bee is Above the Sea </div>`,
        editable: `// If intel is $("#objective")...\n//Then what's your JS\n`,
        build: function(code) {
            return this.actual.replace("/* Code */", code);
        }
    },
    {
        id: 6,
        mode: "javascript",
        task: "Find the answer and Fill in the blank!",
        actual: `<script>
            /* Code */
            </script>
            <div id="objective" class="fs-4 text-muted text-center"> The name of <b>Yash</b> in the movie <b>KGF 2</b> is famously known as &nbsp;<b class="yash-name">____________</b> </div>`,
        editable: `// The blank has a class named "yash-name".\n// Eg: <tag class="yash-name"></tag>\n\n\n// Use JS or jQuery above`,
        build: function(code) {
            return this.actual.replace("/* Code */", code);
        }
    },
    {
        id: 7,
        mode: "css",
        task: "Coding Club is the place where human intellect grows with coding. One logo will flip on the y-axis when hovered, make the other one too to do so.",
        actual: `<style>
            .objective { width: 150px;\nheight: 150px;\ntransition: all 1s linear; }
            .pic1:hover { transform: rotateY(180deg); }
            .pic2:hover { /* Code */ }
            </style>
            <img class="objective pic1" src="clublogo.jpeg" alt="Club Logo">
            <img class="objective pic2" src="clublogo.jpeg" alt="Club Logo">`,
        editable: `#pic2:hover {\n\t/* Add your CSS here */\n}`,
        build: function(code) {
            code = code.substring(code.lastIndexOf('{') + 1, code.lastIndexOf('}'));
            return this.actual.replace("/* Code */", code);
        }
    },
    
]

$(document).ready(() => {
    console.log("Setup Ready!");

    let next = 0;

    // Question Rendering
    renderQuestion(questions[next].id, questions[next].task, questions[next].actual);

    let setmode = questions[next].mode == "css" ? 1 : questions[next].mode == "xml" ? 2 : 3;
    $("#code-mode").text(setmode == 1 ? "CSS" : setmode == 2 ? "HTML" : "JS");
    next == 0 ? $("#back").hide() : $("#back").show();
    next == 4 ? $("#next").hide() : $("#next").show();    
    let cm = applyCodeMirror(questions[next].editable, questions[next].mode, "dracula");

    // Toggle Background
    $(".toggle-bg").on("click", function() {
        themeOption = 1 - themeOption;
        cm.setOption("theme", themes[themeOption]);
    })

    // Reset Code
    $(".reset-code").on("click", function() {
        let setmode = questions[next].mode == "css";
        $("#code-mode").text(setmode ? "CSS" : "JS");
        cm.setOption("mode", questions[next].mode);
        cm.getDoc().setValue(questions[next].editable);
        renderQuestion(questions[next].id, questions[next].task, questions[next].actual);
    })

    // Submit Code
    $("#submit").on("click", function() {
        let latest = questions[next].build(cm.getValue());
        renderQuestion(questions[next].id, questions[next].task, latest);
        done[next] = true;
    })

    // Move Through Questions
    function moveQuestion() {
        next == 0 ? $("#back").hide() : $("#back").show();
        next == 6 ? $("#next").hide() : $("#next").show();
        if(done[next])  $("#q-done").text("DONE");
        cm.setOption("mode", questions[next].mode);
        let setmode = questions[next].mode == "css" ? 1 : questions[next].mode == "javascript" ? 2 : 3;
        $("#code-mode").text(setmode == 1 ? "CSS" : setmode == 2 ? "JS" : "HTML");
        cm.getDoc().setValue(questions[next].editable);
        renderQuestion(questions[next].id, questions[next].task, questions[next].actual);
    }

    // Back Question
    $("#back").on("click", function() {
        next = (next - 1) % 7;
        moveQuestion();
    })

    // Next Question
    $("#next").on("click", function() {
        next = (next + 1) % 7;
        moveQuestion();
    })

});

// Init Code Mirror
let applyCodeMirror = (value, mode, theme) => {

    let myTextArea = $(".code-base")[0];
    myTextArea.innerHTML = value ? value : myTextArea.innerHTML;

    let myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
        lineNumbers: true,
        mode: mode,
        theme: theme
    })

    return myCodeMirror;
}

// Render Question
function renderQuestion(id, task, render)   {
    $("#q-id").text("Q" + id + " .");
    $("#q-val").text(task);
    $("#work-space").html(render);
    $("#q-num").html("&nbsp;&nbsp;&nbsp;Question " + id + " of 7");
}