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
      error: function (error_state) {
        global.error_state = error_state;
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

  Polymer('cv-list', {
  });

  Polymer('cv-marked-area', {
  });

  Polymer('cv-special-cover', {
  });

  Polymer('cv-special-overview', {
  });

  Polymer('cv-special-article', {
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
              response: {
                response: 'cvdata fromat error',
                statusCode: 800
              }
            };
            cvDataError(error_event);
          }
        }
        var cvDataError = function (event) {
          self.$.cvGlobal.error(event.detail.response.response);
          console.log(event.detail.response.response);
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
    var time = new Date(input);
    switch(type) {
      case 'date':
        return time.toDateString();
      case 'time':
        return time.toTimeString();
    }
  };

})(Polymer, window);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oUG9seW1lciwgd2luZG93KSB7XG5cbiAgLy8gR2V0IHBhZ2UgdXJsX3BhcmFtc1xuICB2YXIgdXJsX3BhcmFtcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgcGFyYW1zX3N0cmluZyA9IGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaC5zcGxpdChcIitcIikuam9pbihcIiBcIik7XG4gICAgdmFyXG4gICAgICBwYXJhbXMgPSB7fSxcbiAgICAgIHRva2VucyxcbiAgICAgIHJlZyA9IC9bPyZdPyhbXj1dKyk9KFteJl0qKS9nO1xuICAgIHdoaWxlICh0b2tlbnMgPSByZWcuZXhlYyhwYXJhbXNfc3RyaW5nKSkge1xuICAgICAgcGFyYW1zW2RlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMV0pXVxuICAgICAgICA9IGRlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMl0pO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9KSgpO1xuXG4gIC8vIEdsb2JhbHNcbiAgKGZ1bmN0aW9uKCkge1xuICAgIHZhciBnbG9iYWw7XG4gICAgZ2xvYmFsID0ge1xuICAgICAgcmVzb2x2ZWQ6IGZhbHNlLFxuICAgICAgZXJyb3Jfc3RhdGU6IG51bGwsXG4gICAgICBjdmRhdGE6IG51bGxcbiAgICB9O1xuICAgIHdpbmRvdy5nbG9iYWwgPSBnbG9iYWw7XG4gICAgUG9seW1lcignY3YtZ2xvYmFsJywge1xuICAgICAgZ2xvYmFsOiBnbG9iYWwsXG4gICAgICBjbGVhclN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdsb2JhbC5yZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgICBnbG9iYWwuZXJyb3Jfc3RhdGUgPSBudWxsO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3Jfc3RhdGUpIHtcbiAgICAgICAgZ2xvYmFsLmVycm9yX3N0YXRlID0gZXJyb3Jfc3RhdGU7XG4gICAgICB9LFxuICAgICAgcmVzb2x2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBnbG9iYWwucmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG4gIC8vIFJvb3QgZWxlbWVudFxuICAoZnVuY3Rpb24oKSB7XG4gICAgUG9seW1lcignY3YtcG9seW1lcicsIHtcbiAgICAgIG9ic2VydmU6IHtcbiAgICAgICAgJ2RhdGEuY3ZkYXRhJzogJ2N2ZGF0YVVwZGF0ZSdcbiAgICAgIH0sXG4gICAgICByZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuJC5jdlNvdXJjZS5nbygpO1xuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLiQuY3ZHbG9iYWwuZ2xvYmFsO1xuICAgICAgICB0aGlzLmNvbG9yU2NoZW1lVXBkYXRlKCdjb2xvci1zY2hlbWUtbGlnaHQnKTtcbiAgICAgIH0sXG4gICAgICBiYWNrZ3JvdW5kVXBkYXRlOiBmdW5jdGlvbiAoYmFja2dyb3VuZCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRfYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gICAgICB9LFxuICAgICAgY29sb3JTY2hlbWVVcGRhdGU6IGZ1bmN0aW9uIChjb2xvcl9zY2hlbWUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50X2NvbG9yX3NjaGVtZSA9IGNvbG9yX3NjaGVtZTtcbiAgICAgIH0sXG4gICAgICBjdmRhdGFVcGRhdGU6IGZ1bmN0aW9uIChvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kVXBkYXRlKG5ld1ZhbHVlLnNlY3Rpb25zWzBdLmJhY2tncm91bmQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG4gIFBvbHltZXIoJ2N2LXNpZGUnLCB7XG4gIH0pO1xuXG4gIFBvbHltZXIoJ2N2LWhvbGRlcicsIHtcbiAgfSk7XG5cbiAgUG9seW1lcignY3YtYmFja2dyb3VkJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1mb290ZXInLCB7XG4gIH0pO1xuXG4gIFBvbHltZXIoJ2N2LWNvbnRlbnQnLCB7XG4gIH0pO1xuXG4gIFBvbHltZXIoJ2N2LXNlY3Rpb24nLCB7XG4gIH0pO1xuXG4gIFBvbHltZXIoJ2N2LWxpc3QnLCB7XG4gIH0pO1xuXG4gIFBvbHltZXIoJ2N2LW1hcmtlZC1hcmVhJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1zcGVjaWFsLWNvdmVyJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1zcGVjaWFsLW92ZXJ2aWV3Jywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1zcGVjaWFsLWFydGljbGUnLCB7XG4gIH0pO1xuXG4gIC8vIGN2ZGF0YSBzb3VyY2UgZWxlbWVudFxuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBfY3ZkYXRhID0gbnVsbDtcbiAgICB2YXIgY3ZEYXRhUGFyc2VyID0gZnVuY3Rpb24gKG5ld19jdmRhdGEpIHtcbiAgICAgIHZhciBjdmRhdGEgPSB7fTtcbiAgICAgIHJldHVybiBuZXdfY3ZkYXRhO1xuICAgIH1cbiAgICB2YXIgY3ZEYXRhQXBwbHkgPSBmdW5jdGlvbiAoY3ZkYXRhKSB7XG4gICAgICBfY3ZkYXRhID0gY3ZkYXRhO1xuICAgICAgaWYoY3ZkYXRhLmluZm8gJiYgdHlwZW9mKGN2ZGF0YS5pbmZvLnRpdGxlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LnRpdGxlID0gY3ZkYXRhLmluZm8udGl0bGU7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBnZXREYXRhVXJsID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYodXJsX3BhcmFtcy5jdmRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHVybF9wYXJhbXMuY3ZkYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICcvY3YtZGF0YS1leGFtcGxlL2N2LWRhdGEtZXhhbXBsZS5qc29uJztcbiAgICAgIH1cbiAgICB9XG4gICAgUG9seW1lcignY3Ytc291cmNlJywge1xuICAgICAgcmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY3ZEYXRhUmVzcG9uc2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB2YXIgY3ZkYXRhID0gY3ZEYXRhUGFyc2VyKGV2ZW50LmRldGFpbC5yZXNwb25zZSk7XG4gICAgICAgICAgaWYoY3ZkYXRhKSB7XG4gICAgICAgICAgICBzZWxmLiQuY3ZHbG9iYWwucmVzb2x2ZSgpO1xuICAgICAgICAgICAgY3ZEYXRhQXBwbHkoY3ZkYXRhKTtcbiAgICAgICAgICAgIHNlbGYuJC5jdkdsb2JhbC5nbG9iYWwuY3ZkYXRhID0gY3ZkYXRhO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JfZXZlbnQgPSBuZXcgRXZlbnQoJ2N2LWVycm9yJyk7XG4gICAgICAgICAgICBlcnJvcl9ldmVudC5kZXRhaWwgPSB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2U6ICdjdmRhdGEgZnJvbWF0IGVycm9yJyxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiA4MDBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGN2RGF0YUVycm9yKGVycm9yX2V2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN2RGF0YUVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgc2VsZi4kLmN2R2xvYmFsLmVycm9yKGV2ZW50LmRldGFpbC5yZXNwb25zZS5yZXNwb25zZSk7XG4gICAgICAgICAgY29uc29sZS5sb2coZXZlbnQuZGV0YWlsLnJlc3BvbnNlLnJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiQuY29yZUFqYXguYWRkRXZlbnRMaXN0ZW5lcignY29yZS1yZXNwb25zZScsIGN2RGF0YVJlc3BvbnNlKTtcbiAgICAgICAgdGhpcy4kLmNvcmVBamF4LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcmUtZXJyb3InLCBjdkRhdGFFcnJvcik7XG4gICAgICB9LFxuICAgICAgZ286IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kLmN2R2xvYmFsLmNsZWFyU3RhdGUoKTtcbiAgICAgICAgdGhpcy4kLmNvcmVBamF4LnVybCA9IGdldERhdGFVcmwoKTtcbiAgICAgICAgdGhpcy4kLmNvcmVBamF4LmdvKCk7XG4gICAgICB9LFxuICAgICAgZ2V0IGN2ZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIF9jdmRhdGFcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBQb2x5bWVyRXhwcmVzc2lvbnMucHJvdG90eXBlLnV0Y1RvU3RyaW5nID0gZnVuY3Rpb24gKGlucHV0LCB0eXBlKSB7XG4gICAgdmFyIHRpbWUgPSBuZXcgRGF0ZShpbnB1dCk7XG4gICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICByZXR1cm4gdGltZS50b0RhdGVTdHJpbmcoKTtcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICByZXR1cm4gdGltZS50b1RpbWVTdHJpbmcoKTtcbiAgICB9XG4gIH07XG5cbn0pKFBvbHltZXIsIHdpbmRvdyk7Il0sImZpbGUiOiJjdi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9