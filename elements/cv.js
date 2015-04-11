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
        this.colorSchemeUpdate('color-scheme-light');
      },
      backgroundUpdate: function (background) {
        this.current_background = background;
      },
      colorSchemeUpdate: function (color_scheme) {
        this.current_color_scheme = color_scheme;
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

  Polymer('cv-footer', {
  });

  Polymer('cv-content', {
  });

  Polymer('cv-section', {
  });

  Polymer('cv-special-cover', {
  });

  Polymer('cv-special-overview', {
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

  PolymerExpressions.prototype.utcToString = function (input, type) {
    console.log(input);
    var time = new Date(input);
    switch(type) {
      case 'date':
        return time.toDateString();
      case 'time':
        return time.toTimeString();
    }
  };

})(Polymer, window);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oUG9seW1lciwgd2luZG93KSB7XG5cbiAgLy8gR2V0IHBhZ2UgdXJsX3BhcmFtc1xuICB2YXIgdXJsX3BhcmFtcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgcGFyYW1zX3N0cmluZyA9IGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaC5zcGxpdChcIitcIikuam9pbihcIiBcIik7XG4gICAgdmFyXG4gICAgICBwYXJhbXMgPSB7fSxcbiAgICAgIHRva2VucyxcbiAgICAgIHJlZyA9IC9bPyZdPyhbXj1dKyk9KFteJl0qKS9nO1xuICAgIHdoaWxlICh0b2tlbnMgPSByZWcuZXhlYyhwYXJhbXNfc3RyaW5nKSkge1xuICAgICAgcGFyYW1zW2RlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMV0pXVxuICAgICAgICA9IGRlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMl0pO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9KSgpO1xuXG4gIC8vIEdsb2JhbHNcbiAgKGZ1bmN0aW9uKCkge1xuICAgIHZhciBnbG9iYWw7XG4gICAgZ2xvYmFsID0ge1xuICAgICAgcmVzb2x2ZWQ6IGZhbHNlLFxuICAgICAgZXJyb3Jfc3RhdGU6IG51bGwsXG4gICAgICBjdmRhdGE6IG51bGxcbiAgICB9O1xuICAgIHdpbmRvdy5nbG9iYWwgPSBnbG9iYWw7XG4gICAgUG9seW1lcignY3YtZ2xvYmFsJywge1xuICAgICAgZ2xvYmFsOiBnbG9iYWwsXG4gICAgICBjbGVhclN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdsb2JhbC5yZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgICBnbG9iYWwuZXJyb3Jfc3RhdGUgPSBudWxsO1xuICAgICAgfSxcbiAgICAgIHJlc29sdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2xvYmFsLnJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICAvLyBSb290IGVsZW1lbnRcbiAgKGZ1bmN0aW9uKCkge1xuICAgIFBvbHltZXIoJ2N2LXBvbHltZXInLCB7XG4gICAgICBvYnNlcnZlOiB7XG4gICAgICAgICdkYXRhLmN2ZGF0YSc6ICdjdmRhdGFVcGRhdGUnXG4gICAgICB9LFxuICAgICAgcmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLiQuY3ZTb3VyY2UuZ28oKTtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy4kLmN2R2xvYmFsLmdsb2JhbDtcbiAgICAgICAgdGhpcy5jb2xvclNjaGVtZVVwZGF0ZSgnY29sb3Itc2NoZW1lLWxpZ2h0Jyk7XG4gICAgICB9LFxuICAgICAgYmFja2dyb3VuZFVwZGF0ZTogZnVuY3Rpb24gKGJhY2tncm91bmQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50X2JhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuICAgICAgfSxcbiAgICAgIGNvbG9yU2NoZW1lVXBkYXRlOiBmdW5jdGlvbiAoY29sb3Jfc2NoZW1lKSB7XG4gICAgICAgIHRoaXMuY3VycmVudF9jb2xvcl9zY2hlbWUgPSBjb2xvcl9zY2hlbWU7XG4gICAgICB9LFxuICAgICAgY3ZkYXRhVXBkYXRlOiBmdW5jdGlvbiAob2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFVwZGF0ZShuZXdWYWx1ZS5zZWN0aW9uc1swXS5iYWNrZ3JvdW5kKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBQb2x5bWVyKCdjdi1zaWRlJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1ob2xkZXInLCB7XG4gIH0pO1xuXG4gIFBvbHltZXIoJ2N2LWJhY2tncm91ZCcsIHtcbiAgfSk7XG5cbiAgUG9seW1lcignY3YtZm9vdGVyJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1jb250ZW50Jywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1zZWN0aW9uJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1zcGVjaWFsLWNvdmVyJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1zcGVjaWFsLW92ZXJ2aWV3Jywge1xuICB9KTtcblxuICAvLyBjdmRhdGEgc291cmNlIGVsZW1lbnRcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX2N2ZGF0YSA9IG51bGw7XG4gICAgdmFyIGN2RGF0YVBhcnNlciA9IGZ1bmN0aW9uIChuZXdfY3ZkYXRhKSB7XG4gICAgICB2YXIgY3ZkYXRhID0ge307XG4gICAgICByZXR1cm4gbmV3X2N2ZGF0YTtcbiAgICB9XG4gICAgdmFyIGN2RGF0YUFwcGx5ID0gZnVuY3Rpb24gKGN2ZGF0YSkge1xuICAgICAgX2N2ZGF0YSA9IGN2ZGF0YTtcbiAgICAgIGlmKGN2ZGF0YS5pbmZvICYmIHR5cGVvZihjdmRhdGEuaW5mby50aXRsZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHdpbmRvdy5kb2N1bWVudC50aXRsZSA9IGN2ZGF0YS5pbmZvLnRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgZ2V0RGF0YVVybCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmKHVybF9wYXJhbXMuY3ZkYXRhKSB7XG4gICAgICAgIHJldHVybiB1cmxfcGFyYW1zLmN2ZGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnL2N2LWRhdGEtZXhhbXBsZS9jdi1kYXRhLWV4YW1wbGUuanNvbic7XG4gICAgICB9XG4gICAgfVxuICAgIFBvbHltZXIoJ2N2LXNvdXJjZScsIHtcbiAgICAgIHJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmO1xuICAgICAgICBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGN2RGF0YVJlc3BvbnNlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIGN2ZGF0YSA9IGN2RGF0YVBhcnNlcihldmVudC5kZXRhaWwucmVzcG9uc2UpO1xuICAgICAgICAgIGlmKGN2ZGF0YSkge1xuICAgICAgICAgICAgc2VsZi4kLmN2R2xvYmFsLnJlc29sdmUoKTtcbiAgICAgICAgICAgIGN2RGF0YUFwcGx5KGN2ZGF0YSk7XG4gICAgICAgICAgICBzZWxmLiQuY3ZHbG9iYWwuZ2xvYmFsLmN2ZGF0YSA9IGN2ZGF0YTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGVycm9yX2V2ZW50ID0gbmV3IEV2ZW50KCdjdi1lcnJvcicpO1xuICAgICAgICAgICAgZXJyb3JfZXZlbnQuZGV0YWlsID0ge1xuICAgICAgICAgICAgICByZXNwb25zZTogJ2N2ZGF0YSBmcm9tYXQgZXJyb3InXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3ZEYXRhRXJyb3IoZXJyb3JfZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY3ZEYXRhRXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGV2ZW50LmRldGFpbC5yZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kLmNvcmVBamF4LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcmUtcmVzcG9uc2UnLCBjdkRhdGFSZXNwb25zZSk7XG4gICAgICAgIHRoaXMuJC5jb3JlQWpheC5hZGRFdmVudExpc3RlbmVyKCdjb3JlLWVycm9yJywgY3ZEYXRhRXJyb3IpO1xuICAgICAgfSxcbiAgICAgIGdvOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJC5jdkdsb2JhbC5jbGVhclN0YXRlKCk7XG4gICAgICAgIHRoaXMuJC5jb3JlQWpheC51cmwgPSBnZXREYXRhVXJsKCk7XG4gICAgICAgIHRoaXMuJC5jb3JlQWpheC5nbygpO1xuICAgICAgfSxcbiAgICAgIGdldCBjdmRhdGEoKSB7XG4gICAgICAgIHJldHVybiBfY3ZkYXRhXG4gICAgICB9XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgUG9seW1lckV4cHJlc3Npb25zLnByb3RvdHlwZS51dGNUb1N0cmluZyA9IGZ1bmN0aW9uIChpbnB1dCwgdHlwZSkge1xuICAgIGNvbnNvbGUubG9nKGlucHV0KTtcbiAgICB2YXIgdGltZSA9IG5ldyBEYXRlKGlucHV0KTtcbiAgICBzd2l0Y2godHlwZSkge1xuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgIHJldHVybiB0aW1lLnRvRGF0ZVN0cmluZygpO1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHJldHVybiB0aW1lLnRvVGltZVN0cmluZygpO1xuICAgIH1cbiAgfTtcblxufSkoUG9seW1lciwgd2luZG93KTsiXSwiZmlsZSI6ImN2LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=