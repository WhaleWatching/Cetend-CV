(function(Polymer, window) {

  // Get page url_params
  var url_params = (function () {
    params_string = document.location.search.split("+").join(" ");
    var
      params = {},
      tokens,
      reg = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = reg.exec(params_string)) {
      params[decodeURIComponent(tokens[1])]
        = decodeURIComponent(tokens[2]);
    }
    return params;
  })();

  // Globals
  (function() {
    var global;
    global = {
      resolved: false,
      error_state: null,
      cv_data: null
    };
    Polymer('cv-global', {
      global: global,
      clearState: function () {
        global.resolved = false;
        global.error_state = null;
      },
      resolve: function () {
        global.resolved = true;
      }
    });
  })();

  // Root element
  (function() {
    Polymer('cv-polymer', {
      ready: function () {
        var self = this;
        this.$.cvSource.go();
      }
    });
  })();

  Polymer('cv-side', {
  });

  Polymer('cv-holder', {
  });

  Polymer('cv-content', {
    ready: function () {
    }
  });

  // cvdata source element
  (function () {
    var _cvdata = null;
    var cvDataParser = function (new_cvdata) {
      var cvdata = {};
      return new_cvdata;
    }
    var cvDataApply = function (cvdata) {
      _cvdata = cvdata;
      if(cvdata.info && typeof(cvdata.info.title) === 'string') {
        window.document.title = cvdata.info.title;
      }
    }
    var getDataUrl = function () {
      if(url_params.cvdata) {
        return url_params.cvdata;
      } else {
        return 'cv-data-example.json';
      }
    }
    Polymer('cv-source', {
      ready: function () {
        var self;
        self = this;
        var cvDataResponse = function (event) {
          var cvdata = cvDataParser(event.detail.response);
          if(cvdata) {
            self.$.cvGlobal.resolve();
            cvDataApply(cvdata);
            self.$.cvGlobal.global.cv_data = cvdata;
          } else {
            var error_event = new Event('cv-error');
            error_event.detail = {
              response: 'cvdata fromat error'
            };
            cvDataError(error_event);
          }
        }
        var cvDataError = function (event) {
          console.error(event.detail.response);
        }
        this.$.coreAjax.addEventListener('core-response', cvDataResponse);
        this.$.coreAjax.addEventListener('core-error', cvDataError);
      },
      go: function () {
        this.$.cvGlobal.clearState();
        this.$.coreAjax.url = getDataUrl();
        this.$.coreAjax.go();
      },
      get cvdata() {
        return _cvdata
      }
    });
  })();

})(Polymer, window);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oUG9seW1lciwgd2luZG93KSB7XG5cbiAgLy8gR2V0IHBhZ2UgdXJsX3BhcmFtc1xuICB2YXIgdXJsX3BhcmFtcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgcGFyYW1zX3N0cmluZyA9IGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaC5zcGxpdChcIitcIikuam9pbihcIiBcIik7XG4gICAgdmFyXG4gICAgICBwYXJhbXMgPSB7fSxcbiAgICAgIHRva2VucyxcbiAgICAgIHJlZyA9IC9bPyZdPyhbXj1dKyk9KFteJl0qKS9nO1xuICAgIHdoaWxlICh0b2tlbnMgPSByZWcuZXhlYyhwYXJhbXNfc3RyaW5nKSkge1xuICAgICAgcGFyYW1zW2RlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMV0pXVxuICAgICAgICA9IGRlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMl0pO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9KSgpO1xuXG4gIC8vIEdsb2JhbHNcbiAgKGZ1bmN0aW9uKCkge1xuICAgIHZhciBnbG9iYWw7XG4gICAgZ2xvYmFsID0ge1xuICAgICAgcmVzb2x2ZWQ6IGZhbHNlLFxuICAgICAgZXJyb3Jfc3RhdGU6IG51bGwsXG4gICAgICBjdl9kYXRhOiBudWxsXG4gICAgfTtcbiAgICBQb2x5bWVyKCdjdi1nbG9iYWwnLCB7XG4gICAgICBnbG9iYWw6IGdsb2JhbCxcbiAgICAgIGNsZWFyU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2xvYmFsLnJlc29sdmVkID0gZmFsc2U7XG4gICAgICAgIGdsb2JhbC5lcnJvcl9zdGF0ZSA9IG51bGw7XG4gICAgICB9LFxuICAgICAgcmVzb2x2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBnbG9iYWwucmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG4gIC8vIFJvb3QgZWxlbWVudFxuICAoZnVuY3Rpb24oKSB7XG4gICAgUG9seW1lcignY3YtcG9seW1lcicsIHtcbiAgICAgIHJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy4kLmN2U291cmNlLmdvKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgUG9seW1lcignY3Ytc2lkZScsIHtcbiAgfSk7XG5cbiAgUG9seW1lcignY3YtaG9sZGVyJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1jb250ZW50Jywge1xuICAgIHJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgfVxuICB9KTtcblxuICAvLyBjdmRhdGEgc291cmNlIGVsZW1lbnRcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX2N2ZGF0YSA9IG51bGw7XG4gICAgdmFyIGN2RGF0YVBhcnNlciA9IGZ1bmN0aW9uIChuZXdfY3ZkYXRhKSB7XG4gICAgICB2YXIgY3ZkYXRhID0ge307XG4gICAgICByZXR1cm4gbmV3X2N2ZGF0YTtcbiAgICB9XG4gICAgdmFyIGN2RGF0YUFwcGx5ID0gZnVuY3Rpb24gKGN2ZGF0YSkge1xuICAgICAgX2N2ZGF0YSA9IGN2ZGF0YTtcbiAgICAgIGlmKGN2ZGF0YS5pbmZvICYmIHR5cGVvZihjdmRhdGEuaW5mby50aXRsZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC50aXRsZSA9IGN2ZGF0YS5pbmZvLnRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgZ2V0RGF0YVVybCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmKHVybF9wYXJhbXMuY3ZkYXRhKSB7XG4gICAgICAgIHJldHVybiB1cmxfcGFyYW1zLmN2ZGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnY3YtZGF0YS1leGFtcGxlLmpzb24nO1xuICAgICAgfVxuICAgIH1cbiAgICBQb2x5bWVyKCdjdi1zb3VyY2UnLCB7XG4gICAgICByZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZjtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjdkRhdGFSZXNwb25zZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHZhciBjdmRhdGEgPSBjdkRhdGFQYXJzZXIoZXZlbnQuZGV0YWlsLnJlc3BvbnNlKTtcbiAgICAgICAgICBpZihjdmRhdGEpIHtcbiAgICAgICAgICAgIHNlbGYuJC5jdkdsb2JhbC5yZXNvbHZlKCk7XG4gICAgICAgICAgICBjdkRhdGFBcHBseShjdmRhdGEpO1xuICAgICAgICAgICAgc2VsZi4kLmN2R2xvYmFsLmdsb2JhbC5jdl9kYXRhID0gY3ZkYXRhO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JfZXZlbnQgPSBuZXcgRXZlbnQoJ2N2LWVycm9yJyk7XG4gICAgICAgICAgICBlcnJvcl9ldmVudC5kZXRhaWwgPSB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlOiAnY3ZkYXRhIGZyb21hdCBlcnJvcidcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjdkRhdGFFcnJvcihlcnJvcl9ldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjdkRhdGFFcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXZlbnQuZGV0YWlsLnJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiQuY29yZUFqYXguYWRkRXZlbnRMaXN0ZW5lcignY29yZS1yZXNwb25zZScsIGN2RGF0YVJlc3BvbnNlKTtcbiAgICAgICAgdGhpcy4kLmNvcmVBamF4LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcmUtZXJyb3InLCBjdkRhdGFFcnJvcik7XG4gICAgICB9LFxuICAgICAgZ286IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kLmN2R2xvYmFsLmNsZWFyU3RhdGUoKTtcbiAgICAgICAgdGhpcy4kLmNvcmVBamF4LnVybCA9IGdldERhdGFVcmwoKTtcbiAgICAgICAgdGhpcy4kLmNvcmVBamF4LmdvKCk7XG4gICAgICB9LFxuICAgICAgZ2V0IGN2ZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIF9jdmRhdGFcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxufSkoUG9seW1lciwgd2luZG93KTsiXSwiZmlsZSI6ImN2LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=