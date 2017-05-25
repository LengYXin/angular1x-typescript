  ! function() {
      if (navigator.appName == "Microsoft Internet Explorer") {
          //   console.log(navigator.appVersion.match(/MSIE -?[1-9]\d*/));
          try {
              if (parseInt((navigator.appVersion.match(/MSIE -?[1-9]\d*/)[0]).match(/[1-9]\d*/)[0]) < 9) {
                  window.location.href = "/error.html"
              }
          } catch (error) {
              window.location.href = "/error.html"
          }
      }
  }();
  //   window.onerror = function name(err) {
  //       console.log("---------------------", err);
  //       if (err.indexOf("addEventListener") != -1 || err.indexOf("module") != -1) {
  //           window.location.href = "/error.html"
  //       }
  //   }