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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oUG9seW1lciwgd2luZG93KSB7XG4gIChmdW5jdGlvbigpIHtcbiAgICB2YXIgZ2xvYmFsO1xuICAgIGdsb2JhbCA9IHtcbiAgICAgIHJlYWR5OiBmYWxzZSxcbiAgICAgIGN2X2RhdGE6IGZhbHNlXG4gICAgfTtcbiAgICBQb2x5bWVyKCdjdi1nbG9iYWwnLCB7XG4gICAgICBnbG9iYWw6IGdsb2JhbFxuICAgIH0pO1xuICB9KSgpO1xuXG4gIChmdW5jdGlvbigpIHtcbiAgICB2YXIgY3ZEYXRhUGFyc2VyID0gZnVuY3Rpb24gKG5ld19jdmRhdGEpIHtcbiAgICAgIHZhciBjdmRhdGEgPSB7fTtcbiAgICAgIHJldHVybiBuZXdfY3ZkYXRhO1xuICAgIH1cbiAgICB2YXIgY3ZEYXRhQXBwbHkgPSBmdW5jdGlvbiAoY3ZkYXRhKSB7XG4gICAgICBpZih0eXBlb2YoY3ZkYXRhLnRpdGxlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LnRpdGxlID0gY3ZkYXRhLnRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICBQb2x5bWVyKCdjdi1wb2x5bWVyJywge1xuICAgICAgcmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLiQuY3ZTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignY29yZS1yZXNwb25zZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHZhciBjdmRhdGEgPSBjdkRhdGFQYXJzZXIoZXZlbnQuZGV0YWlsLnJlc3BvbnNlKTtcbiAgICAgICAgICBpZihjdmRhdGEpIHtcbiAgICAgICAgICAgIGN2RGF0YUFwcGx5KGN2ZGF0YSk7XG4gICAgICAgICAgICBzZWxmLiQuY3ZHbG9iYWwuZ2xvYmFsLmN2X2RhdGEgPSBjdmRhdGE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93ICdjdmRhdGEgZnJvbWF0IGVycm9yJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiQuY3ZTb3VyY2UuZ28oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBQb2x5bWVyKCdjdi1zaWRlJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1jb250ZW50Jywge1xuICAgIHJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgfVxuICB9KTtcblxufSkuY2FsbCh0aGlzLCBQb2x5bWVyLCB3aW5kb3cpOyJdLCJmaWxlIjoiY3YuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==