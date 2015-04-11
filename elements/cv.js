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

  Polymer('cv-list', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oUG9seW1lciwgd2luZG93KSB7XG5cbiAgLy8gR2V0IHBhZ2UgdXJsX3BhcmFtc1xuICB2YXIgdXJsX3BhcmFtcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgcGFyYW1zX3N0cmluZyA9IGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaC5zcGxpdChcIitcIikuam9pbihcIiBcIik7XG4gICAgdmFyXG4gICAgICBwYXJhbXMgPSB7fSxcbiAgICAgIHRva2VucyxcbiAgICAgIHJlZyA9IC9bPyZdPyhbXj1dKyk9KFteJl0qKS9nO1xuICAgIHdoaWxlICh0b2tlbnMgPSByZWcuZXhlYyhwYXJhbXNfc3RyaW5nKSkge1xuICAgICAgcGFyYW1zW2RlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMV0pXVxuICAgICAgICA9IGRlY29kZVVSSUNvbXBvbmVudCh0b2tlbnNbMl0pO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9KSgpO1xuXG4gIC8vIEdsb2JhbHNcbiAgKGZ1bmN0aW9uKCkge1xuICAgIHZhciBnbG9iYWw7XG4gICAgZ2xvYmFsID0ge1xuICAgICAgcmVzb2x2ZWQ6IGZhbHNlLFxuICAgICAgZXJyb3Jfc3RhdGU6IG51bGwsXG4gICAgICBjdmRhdGE6IG51bGxcbiAgICB9O1xuICAgIHdpbmRvdy5nbG9iYWwgPSBnbG9iYWw7XG4gICAgUG9seW1lcignY3YtZ2xvYmFsJywge1xuICAgICAgZ2xvYmFsOiBnbG9iYWwsXG4gICAgICBjbGVhclN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdsb2JhbC5yZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgICBnbG9iYWwuZXJyb3Jfc3RhdGUgPSBudWxsO1xuICAgICAgfSxcbiAgICAgIHJlc29sdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZ2xvYmFsLnJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICAvLyBSb290IGVsZW1lbnRcbiAgKGZ1bmN0aW9uKCkge1xuICAgIFBvbHltZXIoJ2N2LXBvbHltZXInLCB7XG4gICAgICBvYnNlcnZlOiB7XG4gICAgICAgICdkYXRhLmN2ZGF0YSc6ICdjdmRhdGFVcGRhdGUnXG4gICAgICB9LFxuICAgICAgcmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLiQuY3ZTb3VyY2UuZ28oKTtcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy4kLmN2R2xvYmFsLmdsb2JhbDtcbiAgICAgICAgdGhpcy5jb2xvclNjaGVtZVVwZGF0ZSgnY29sb3Itc2NoZW1lLWxpZ2h0Jyk7XG4gICAgICB9LFxuICAgICAgYmFja2dyb3VuZFVwZGF0ZTogZnVuY3Rpb24gKGJhY2tncm91bmQpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50X2JhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuICAgICAgfSxcbiAgICAgIGNvbG9yU2NoZW1lVXBkYXRlOiBmdW5jdGlvbiAoY29sb3Jfc2NoZW1lKSB7XG4gICAgICAgIHRoaXMuY3VycmVudF9jb2xvcl9zY2hlbWUgPSBjb2xvcl9zY2hlbWU7XG4gICAgICB9LFxuICAgICAgY3ZkYXRhVXBkYXRlOiBmdW5jdGlvbiAob2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZFVwZGF0ZShuZXdWYWx1ZS5zZWN0aW9uc1swXS5iYWNrZ3JvdW5kKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBQb2x5bWVyKCdjdi1zaWRlJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1ob2xkZXInLCB7XG4gIH0pO1xuXG4gIFBvbHltZXIoJ2N2LWJhY2tncm91ZCcsIHtcbiAgfSk7XG5cbiAgUG9seW1lcignY3YtZm9vdGVyJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1jb250ZW50Jywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1zZWN0aW9uJywge1xuICB9KTtcblxuICBQb2x5bWVyKCdjdi1saXN0Jywge1xuICB9KTtcblxuXG4gIFBvbHltZXIoJ2N2LXNwZWNpYWwtY292ZXInLCB7XG4gIH0pO1xuXG4gIFBvbHltZXIoJ2N2LXNwZWNpYWwtb3ZlcnZpZXcnLCB7XG4gIH0pO1xuXG4gIC8vIGN2ZGF0YSBzb3VyY2UgZWxlbWVudFxuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBfY3ZkYXRhID0gbnVsbDtcbiAgICB2YXIgY3ZEYXRhUGFyc2VyID0gZnVuY3Rpb24gKG5ld19jdmRhdGEpIHtcbiAgICAgIHZhciBjdmRhdGEgPSB7fTtcbiAgICAgIHJldHVybiBuZXdfY3ZkYXRhO1xuICAgIH1cbiAgICB2YXIgY3ZEYXRhQXBwbHkgPSBmdW5jdGlvbiAoY3ZkYXRhKSB7XG4gICAgICBfY3ZkYXRhID0gY3ZkYXRhO1xuICAgICAgaWYoY3ZkYXRhLmluZm8gJiYgdHlwZW9mKGN2ZGF0YS5pbmZvLnRpdGxlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgd2luZG93LmRvY3VtZW50LnRpdGxlID0gY3ZkYXRhLmluZm8udGl0bGU7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBnZXREYXRhVXJsID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYodXJsX3BhcmFtcy5jdmRhdGEpIHtcbiAgICAgICAgcmV0dXJuIHVybF9wYXJhbXMuY3ZkYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICcvY3YtZGF0YS1leGFtcGxlL2N2LWRhdGEtZXhhbXBsZS5qc29uJztcbiAgICAgIH1cbiAgICB9XG4gICAgUG9seW1lcignY3Ytc291cmNlJywge1xuICAgICAgcmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGY7XG4gICAgICAgIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY3ZEYXRhUmVzcG9uc2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB2YXIgY3ZkYXRhID0gY3ZEYXRhUGFyc2VyKGV2ZW50LmRldGFpbC5yZXNwb25zZSk7XG4gICAgICAgICAgaWYoY3ZkYXRhKSB7XG4gICAgICAgICAgICBzZWxmLiQuY3ZHbG9iYWwucmVzb2x2ZSgpO1xuICAgICAgICAgICAgY3ZEYXRhQXBwbHkoY3ZkYXRhKTtcbiAgICAgICAgICAgIHNlbGYuJC5jdkdsb2JhbC5nbG9iYWwuY3ZkYXRhID0gY3ZkYXRhO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JfZXZlbnQgPSBuZXcgRXZlbnQoJ2N2LWVycm9yJyk7XG4gICAgICAgICAgICBlcnJvcl9ldmVudC5kZXRhaWwgPSB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlOiAnY3ZkYXRhIGZyb21hdCBlcnJvcidcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjdkRhdGFFcnJvcihlcnJvcl9ldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjdkRhdGFFcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXZlbnQuZGV0YWlsLnJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiQuY29yZUFqYXguYWRkRXZlbnRMaXN0ZW5lcignY29yZS1yZXNwb25zZScsIGN2RGF0YVJlc3BvbnNlKTtcbiAgICAgICAgdGhpcy4kLmNvcmVBamF4LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcmUtZXJyb3InLCBjdkRhdGFFcnJvcik7XG4gICAgICB9LFxuICAgICAgZ286IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kLmN2R2xvYmFsLmNsZWFyU3RhdGUoKTtcbiAgICAgICAgdGhpcy4kLmNvcmVBamF4LnVybCA9IGdldERhdGFVcmwoKTtcbiAgICAgICAgdGhpcy4kLmNvcmVBamF4LmdvKCk7XG4gICAgICB9LFxuICAgICAgZ2V0IGN2ZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIF9jdmRhdGFcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBQb2x5bWVyRXhwcmVzc2lvbnMucHJvdG90eXBlLnV0Y1RvU3RyaW5nID0gZnVuY3Rpb24gKGlucHV0LCB0eXBlKSB7XG4gICAgY29uc29sZS5sb2coaW5wdXQpO1xuICAgIHZhciB0aW1lID0gbmV3IERhdGUoaW5wdXQpO1xuICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgcmV0dXJuIHRpbWUudG9EYXRlU3RyaW5nKCk7XG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgcmV0dXJuIHRpbWUudG9UaW1lU3RyaW5nKCk7XG4gICAgfVxuICB9O1xuXG59KShQb2x5bWVyLCB3aW5kb3cpOyJdLCJmaWxlIjoiY3YuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==