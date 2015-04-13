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

  var url_origin = location.origin;

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
        return '/cetend-cvdata/cvdata.json';
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