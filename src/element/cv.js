(function(Polymer, window) {
  (function() {
    var global;
    global = {
      ready: false,
      cv_data: false
    };
    Polymer('cv-global', {
      global: global
    });
  })();

  (function() {
    var cvDataParser = function (new_cvdata) {
      var cvdata = {};
      return new_cvdata;
    }
    var cvDataApply = function (cvdata) {
      if(typeof(cvdata.title) === 'string') {
        window.document.title = cvdata.title;
      }
    }
    var getDataUrl = function () {
      var hashStr = window.location.hash;
      if(hashStr.length > 0) {
        return hashStr.replace(/^#!|^#/, '');
      } else {
        return 'cv-data-example.json';
      }
    }
    Polymer('cv-polymer', {
      ready: function () {
        var self;
        self = this;
        this.$.cvSource.addEventListener('core-response', function (event) {
          var cvdata = cvDataParser(event.detail.response);
          if(cvdata) {
            cvDataApply(cvdata);
            self.$.cvGlobal.global.cv_data = cvdata;
          } else {
            throw 'cvdata fromat error';
          }
        });
        this.$.cvSource.url = getDataUrl();
        this.$.cvSource.go();
      }
    });
  })();

  Polymer('cv-side', {
  });

  Polymer('cv-content', {
    ready: function () {
    }
  });

}).call(this, Polymer, window);