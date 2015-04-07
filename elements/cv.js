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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oUG9seW1lciwgd2luZG93KSB7XG4gIChmdW5jdGlvbigpIHtcbiAgICB2YXIgZ2xvYmFsO1xuICAgIGdsb2JhbCA9IHtcbiAgICAgIHJlYWR5OiBmYWxzZSxcbiAgICAgIGN2X2RhdGE6IGZhbHNlXG4gICAgfTtcbiAgICBQb2x5bWVyKCdjdi1nbG9iYWwnLCB7XG4gICAgICBnbG9iYWw6IGdsb2JhbFxuICAgIH0pO1xuICB9KSgpO1xuXG4gIChmdW5jdGlvbigpIHtcbiAgICB2YXIgY3ZEYXRhUGFyc2VyID0gZnVuY3Rpb24gKG5ld19jdmRhdGEpIHtcbiAgICAgIHZhciBjdmRhdGEgPSB7fTtcbiAgICAgIHJldHVybiBuZXdfY3ZkYXRhO1xuICAgIH1cbiAgICB2YXIgY3ZEYXRhQXBwbHkgPSBmdW5jdGlvbiAoY3ZkYXRhKSB7XG4gICAgICBpZih0eXBlb2YoY3ZkYXRhLnRpdGxlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LnRpdGxlID0gY3ZkYXRhLnRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgZ2V0RGF0YVVybCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBoYXNoU3RyID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICBpZihoYXNoU3RyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhhc2hTdHIucmVwbGFjZSgvXiMhfF4jLywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdjdi1kYXRhLWV4YW1wbGUuanNvbic7XG4gICAgICB9XG4gICAgfVxuICAgIFBvbHltZXIoJ2N2LXBvbHltZXInLCB7XG4gICAgICByZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZjtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuJC5jdlNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdjb3JlLXJlc3BvbnNlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIGN2ZGF0YSA9IGN2RGF0YVBhcnNlcihldmVudC5kZXRhaWwucmVzcG9uc2UpO1xuICAgICAgICAgIGlmKGN2ZGF0YSkge1xuICAgICAgICAgICAgY3ZEYXRhQXBwbHkoY3ZkYXRhKTtcbiAgICAgICAgICAgIHNlbGYuJC5jdkdsb2JhbC5nbG9iYWwuY3ZfZGF0YSA9IGN2ZGF0YTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgJ2N2ZGF0YSBmcm9tYXQgZXJyb3InO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJC5jdlNvdXJjZS51cmwgPSBnZXREYXRhVXJsKCk7XG4gICAgICAgIHRoaXMuJC5jdlNvdXJjZS5nbygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG4gIFBvbHltZXIoJ2N2LXNpZGUnLCB7XG4gIH0pO1xuXG4gIFBvbHltZXIoJ2N2LWNvbnRlbnQnLCB7XG4gICAgcmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICB9XG4gIH0pO1xuXG59KS5jYWxsKHRoaXMsIFBvbHltZXIsIHdpbmRvdyk7Il0sImZpbGUiOiJjdi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9