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
      observe: {
        'data.cvdata': 'cvdataUpdate'
      },
      ready: function () {
        var self = this;
        this.$.cvSource.go();
        this.data = this.$.cvGlobal.global;
      },
      backgroundUpdate: function (background_data) {
        this.current_background = background_data;
      },
      cvdataUpdate: function (oldValue, newValue) {
        this.backgroundUpdate(newValue.sections[0].background);
      }
    });
  })();

  Polymer('cv-side', {
  });

  Polymer('cv-holder', {
  });

  Polymer('cv-backgroud', {
  });


  Polymer('cv-content', {
  });

  Polymer('cv-section', {
  });

  Polymer('cv-special-cover', {
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
        return '/cv-data-example/cv-data-example.json';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oUG9seW1lciwgd2luZG93KSB7XG5cbiAgLy8gR2V0IHBhZ2UgdXJsX3BhcmFtc1xuICB2YXIgdXJsX3BhcmFtcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgcGFyYW1zX3N0cmluZyA9IGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaC5zcGxpdChcIitcIikuam9pbihcIiBcIik7XG4gICAgdmFyXG4gICAgICBwYXJhbXMgPSB7fSxcbiAgICAgIHRva2VucyxcbiAgICAgIHJlZyA9IC9bPyZdPyhbXj1dKyk9KFteJl0qKS9nO1xuICAgIHdoaWxlICh0b2tlbnMgPSByZWcuZXhlYyhwYXJhbXNfc3RyaW5nKSkge1xuICAgICAgcGFyYW1zW2RlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMV0pXVxuICAgICAgICA9IGRlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMl0pO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9KSgpO1xuXG4gIC8vIEdsb2JhbHNcbiAgKGZ1bmN0aW9uKCkge1xuICAgIHZhciBnbG9iYWw7XG4gICAgZ2xvYmFsID0ge1xuICAgICAgcmVzb2x2ZWQ6IGZhbHNlLFxuICAgICAgZXJyb3Jfc3RhdGU6IG51bGwsXG4gICAgICBjdmRhdGE6IG51bGxcbiAgICB9O1xuICAgIHdpbmRvdy5nbG9iYWwgPSBnbG9iYWw7XG4gICAgUG9seW1lcignY3YtZ2xvYmFsJywge1xuICAgICAgZ2xvYmFsOiBnbG9iYWwsXG4gICAgICBjbGVhclN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdsb2JhbC5yZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgICBnbG9iYWwuZXJyb3Jfc3RhdGUgPSBudWxsO1xuICAgICAgfSxcbiAgICAgIHJlc29sdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2xvYmFsLnJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICAvLyBSb290IGVsZW1lbnRcbiAgKGZ1bmN0aW9uKCkge1xuICAgIFBvbHltZXIoJ2N2LXBvbHltZXInLCB7XG4gICAgICBvYnNlcnZlOiB7XG4gICAgICAgICdkYXRhLmN2ZGF0YSc6ICdjdmRhdGFVcGRhdGUnXG4gICAgICB9LFxuICAgICAgcmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLiQuY3ZTb3VyY2UuZ28oKTtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy4kLmN2R2xvYmFsLmdsb2JhbDtcbiAgICAgIH0sXG4gICAgICBiYWNrZ3JvdW5kVXBkYXRlOiBmdW5jdGlvbiAoYmFja2dyb3VuZF9kYXRhKSB7XG4gICAgICAgIHRoaXMuY3VycmVudF9iYWNrZ3JvdW5kID0gYmFja2dyb3VuZF9kYXRhO1xuICAgICAgfSxcbiAgICAgIGN2ZGF0YVVwZGF0ZTogZnVuY3Rpb24gKG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRVcGRhdGUobmV3VmFsdWUuc2VjdGlvbnNbMF0uYmFja2dyb3VuZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgUG9seW1lcignY3Ytc2lkZScsIHtcbiAgfSk7XG5cbiAgUG9seW1lcignY3YtaG9sZGVyJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1iYWNrZ3JvdWQnLCB7XG4gIH0pO1xuXG5cbiAgUG9seW1lcignY3YtY29udGVudCcsIHtcbiAgfSk7XG5cbiAgUG9seW1lcignY3Ytc2VjdGlvbicsIHtcbiAgfSk7XG5cbiAgUG9seW1lcignY3Ytc3BlY2lhbC1jb3ZlcicsIHtcbiAgfSk7XG5cbiAgLy8gY3ZkYXRhIHNvdXJjZSBlbGVtZW50XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9jdmRhdGEgPSBudWxsO1xuICAgIHZhciBjdkRhdGFQYXJzZXIgPSBmdW5jdGlvbiAobmV3X2N2ZGF0YSkge1xuICAgICAgdmFyIGN2ZGF0YSA9IHt9O1xuICAgICAgcmV0dXJuIG5ld19jdmRhdGE7XG4gICAgfVxuICAgIHZhciBjdkRhdGFBcHBseSA9IGZ1bmN0aW9uIChjdmRhdGEpIHtcbiAgICAgIF9jdmRhdGEgPSBjdmRhdGE7XG4gICAgICBpZihjdmRhdGEuaW5mbyAmJiB0eXBlb2YoY3ZkYXRhLmluZm8udGl0bGUpID09PSAnc3RyaW5nJykge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQudGl0bGUgPSBjdmRhdGEuaW5mby50aXRsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGdldERhdGFVcmwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZih1cmxfcGFyYW1zLmN2ZGF0YSkge1xuICAgICAgICByZXR1cm4gdXJsX3BhcmFtcy5jdmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJy9jdi1kYXRhLWV4YW1wbGUvY3YtZGF0YS1leGFtcGxlLmpzb24nO1xuICAgICAgfVxuICAgIH1cbiAgICBQb2x5bWVyKCdjdi1zb3VyY2UnLCB7XG4gICAgICByZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZjtcbiAgICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjdkRhdGFSZXNwb25zZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHZhciBjdmRhdGEgPSBjdkRhdGFQYXJzZXIoZXZlbnQuZGV0YWlsLnJlc3BvbnNlKTtcbiAgICAgICAgICBpZihjdmRhdGEpIHtcbiAgICAgICAgICAgIHNlbGYuJC5jdkdsb2JhbC5yZXNvbHZlKCk7XG4gICAgICAgICAgICBjdkRhdGFBcHBseShjdmRhdGEpO1xuICAgICAgICAgICAgc2VsZi4kLmN2R2xvYmFsLmdsb2JhbC5jdmRhdGEgPSBjdmRhdGE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBlcnJvcl9ldmVudCA9IG5ldyBFdmVudCgnY3YtZXJyb3InKTtcbiAgICAgICAgICAgIGVycm9yX2V2ZW50LmRldGFpbCA9IHtcbiAgICAgICAgICAgICAgcmVzcG9uc2U6ICdjdmRhdGEgZnJvbWF0IGVycm9yJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGN2RGF0YUVycm9yKGVycm9yX2V2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN2RGF0YUVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihldmVudC5kZXRhaWwucmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJC5jb3JlQWpheC5hZGRFdmVudExpc3RlbmVyKCdjb3JlLXJlc3BvbnNlJywgY3ZEYXRhUmVzcG9uc2UpO1xuICAgICAgICB0aGlzLiQuY29yZUFqYXguYWRkRXZlbnRMaXN0ZW5lcignY29yZS1lcnJvcicsIGN2RGF0YUVycm9yKTtcbiAgICAgIH0sXG4gICAgICBnbzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiQuY3ZHbG9iYWwuY2xlYXJTdGF0ZSgpO1xuICAgICAgICB0aGlzLiQuY29yZUFqYXgudXJsID0gZ2V0RGF0YVVybCgpO1xuICAgICAgICB0aGlzLiQuY29yZUFqYXguZ28oKTtcbiAgICAgIH0sXG4gICAgICBnZXQgY3ZkYXRhKCkge1xuICAgICAgICByZXR1cm4gX2N2ZGF0YVxuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG59KShQb2x5bWVyLCB3aW5kb3cpOyJdLCJmaWxlIjoiY3YuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==