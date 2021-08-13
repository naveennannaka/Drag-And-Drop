(function (document, window, index) {
  var isAdvancedUpload = (function () {
    var div = document.createElement("div");
    return (
      ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
      "FormData" in window &&
      "FileReader" in window
    );
  })();

  var forms = document.querySelectorAll(".contentbox");
  Array.prototype.forEach.call(forms, function (form) {
    var input = form.querySelector('input[type="file"]'),
      label = form.querySelector("label"),
      droppedFiles = false,
      showFiles = function (files) {},
      triggerFormSubmit = function () {
        var event = document.createEvent("HTMLEvents");
        event.initEvent("submit", true, false);
        form.dispatchEvent(event);
      };

    if (isAdvancedUpload) {
      form.classList.add("-upload");

      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop",
      ].forEach(function (event) {
        form.addEventListener(event, function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
      });
      ["dragover", "dragenter"].forEach(function (event) {
        form.addEventListener(event, function () {
          form.classList.add("is-dragover");
        });
      });
      ["dragleave", "dragend", "drop"].forEach(function (event) {
        form.addEventListener(event, function () {
          form.classList.remove("is-dragover");
        });
      });
      form.addEventListener("drop", function (e) {
        var files = e.dataTransfer.files;
        let dataUri;
        let fileName;
        for (var i = 0, file; (file = files[i]); i++) {
          fileName = file.name;
          var reader = new FileReader();
          reader.onload = function () {
            dataUri = reader.result;
            Email.send({
              Host: "smtp.elasticemail.com",
              Username: "naveennannaka99@gmail.com",
              Password: "BFC34799F2955E6C850065BB0A9D2D305098",
              To: "naveen1.anagha@gmail.com",
              From: "abhilashyerra1020@gmail.com",
              Subject: "Test",
              Body: "Test",
              Attachments: [
                {
                  name: fileName,
                  data: dataUri,
                },
              ],
            }).then(function (message) {
              alert("mail sent successfully");
            });
          };
          reader.readAsDataURL(file);
        }
        showFiles(droppedFiles);
        triggerFormSubmit();
      });
    }
  });
})(document, window, 0);
