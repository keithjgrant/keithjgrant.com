(function () {
  if (!document.querySelectorAll) {
    return;
  }
  var code = document.querySelectorAll('.post-content pre');
  for (var i = 0; i < code.length; i++) {
    code[i].classList.add('prettyprint');
    code[i].classList.add('linenums');
  }

  prettyPrint();
})();
