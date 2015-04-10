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
      cvdata: null
    };
    window.global = global;
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

  Polymer('cv-section', {
    ready: function () {
      console.log(this.data);
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
            self.$.cvGlobal.global.cvdata = cvdata;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oUG9seW1lciwgd2luZG93KSB7XG5cbiAgLy8gR2V0IHBhZ2UgdXJsX3BhcmFtc1xuICB2YXIgdXJsX3BhcmFtcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgcGFyYW1zX3N0cmluZyA9IGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaC5zcGxpdChcIitcIikuam9pbihcIiBcIik7XG4gICAgdmFyXG4gICAgICBwYXJhbXMgPSB7fSxcbiAgICAgIHRva2VucyxcbiAgICAgIHJlZyA9IC9bPyZdPyhbXj1dKyk9KFteJl0qKS9nO1xuICAgIHdoaWxlICh0b2tlbnMgPSByZWcuZXhlYyhwYXJhbXNfc3RyaW5nKSkge1xuICAgICAgcGFyYW1zW2RlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMV0pXVxuICAgICAgICA9IGRlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMl0pO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9KSgpO1xuXG4gIC8vIEdsb2JhbHNcbiAgKGZ1bmN0aW9uKCkge1xuICAgIHZhciBnbG9iYWw7XG4gICAgZ2xvYmFsID0ge1xuICAgICAgcmVzb2x2ZWQ6IGZhbHNlLFxuICAgICAgZXJyb3Jfc3RhdGU6IG51bGwsXG4gICAgICBjdmRhdGE6IG51bGxcbiAgICB9O1xuICAgIHdpbmRvdy5nbG9iYWwgPSBnbG9iYWw7XG4gICAgUG9seW1lcignY3YtZ2xvYmFsJywge1xuICAgICAgZ2xvYmFsOiBnbG9iYWwsXG4gICAgICBjbGVhclN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdsb2JhbC5yZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgICBnbG9iYWwuZXJyb3Jfc3RhdGUgPSBudWxsO1xuICAgICAgfSxcbiAgICAgIHJlc29sdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2xvYmFsLnJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICAvLyBSb290IGVsZW1lbnRcbiAgKGZ1bmN0aW9uKCkge1xuICAgIFBvbHltZXIoJ2N2LXBvbHltZXInLCB7XG4gICAgICByZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuJC5jdlNvdXJjZS5nbygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG4gIFBvbHltZXIoJ2N2LXNpZGUnLCB7XG4gIH0pO1xuXG4gIFBvbHltZXIoJ2N2LWhvbGRlcicsIHtcbiAgfSk7XG5cbiAgUG9seW1lcignY3YtY29udGVudCcsIHtcbiAgICByZWFkeTogZnVuY3Rpb24gKCkge1xuICAgIH1cbiAgfSk7XG5cbiAgUG9seW1lcignY3Ytc2VjdGlvbicsIHtcbiAgICByZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGN2ZGF0YSBzb3VyY2UgZWxlbWVudFxuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBfY3ZkYXRhID0gbnVsbDtcbiAgICB2YXIgY3ZEYXRhUGFyc2VyID0gZnVuY3Rpb24gKG5ld19jdmRhdGEpIHtcbiAgICAgIHZhciBjdmRhdGEgPSB7fTtcbiAgICAgIHJldHVybiBuZXdfY3ZkYXRhO1xuICAgIH1cbiAgICB2YXIgY3ZEYXRhQXBwbHkgPSBmdW5jdGlvbiAoY3ZkYXRhKSB7XG4gICAgICBfY3ZkYXRhID0gY3ZkYXRhO1xuICAgICAgaWYoY3ZkYXRhLmluZm8gJiYgdHlwZW9mKGN2ZGF0YS5pbmZvLnRpdGxlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LnRpdGxlID0gY3ZkYXRhLmluZm8udGl0bGU7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBnZXREYXRhVXJsID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYodXJsX3BhcmFtcy5jdmRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHVybF9wYXJhbXMuY3ZkYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdjdi1kYXRhLWV4YW1wbGUuanNvbic7XG4gICAgICB9XG4gICAgfVxuICAgIFBvbHltZXIoJ2N2LXNvdXJjZScsIHtcbiAgICAgIHJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGN2RGF0YVJlc3BvbnNlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIGN2ZGF0YSA9IGN2RGF0YVBhcnNlcihldmVudC5kZXRhaWwucmVzcG9uc2UpO1xuICAgICAgICAgIGlmKGN2ZGF0YSkge1xuICAgICAgICAgICAgc2VsZi4kLmN2R2xvYmFsLnJlc29sdmUoKTtcbiAgICAgICAgICAgIGN2RGF0YUFwcGx5KGN2ZGF0YSk7XG4gICAgICAgICAgICBzZWxmLiQuY3ZHbG9iYWwuZ2xvYmFsLmN2ZGF0YSA9IGN2ZGF0YTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGVycm9yX2V2ZW50ID0gbmV3IEV2ZW50KCdjdi1lcnJvcicpO1xuICAgICAgICAgICAgZXJyb3JfZXZlbnQuZGV0YWlsID0ge1xuICAgICAgICAgICAgICByZXNwb25zZTogJ2N2ZGF0YSBmcm9tYXQgZXJyb3InXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3ZEYXRhRXJyb3IoZXJyb3JfZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY3ZEYXRhRXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGV2ZW50LmRldGFpbC5yZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kLmNvcmVBamF4LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcmUtcmVzcG9uc2UnLCBjdkRhdGFSZXNwb25zZSk7XG4gICAgICAgIHRoaXMuJC5jb3JlQWpheC5hZGRFdmVudExpc3RlbmVyKCdjb3JlLWVycm9yJywgY3ZEYXRhRXJyb3IpO1xuICAgICAgfSxcbiAgICAgIGdvOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJC5jdkdsb2JhbC5jbGVhclN0YXRlKCk7XG4gICAgICAgIHRoaXMuJC5jb3JlQWpheC51cmwgPSBnZXREYXRhVXJsKCk7XG4gICAgICAgIHRoaXMuJC5jb3JlQWpheC5nbygpO1xuICAgICAgfSxcbiAgICAgIGdldCBjdmRhdGEoKSB7XG4gICAgICAgIHJldHVybiBfY3ZkYXRhXG4gICAgICB9XG4gICAgfSk7XG4gIH0pKCk7XG5cbn0pKFBvbHltZXIsIHdpbmRvdyk7Il0sImZpbGUiOiJjdi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9