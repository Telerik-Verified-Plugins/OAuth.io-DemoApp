var OAUTHIO_PUBLIC_API_KEY = "31JvBcEzCcpxmCaX3zHXjf069ZE"; // TODO replace with your own key

document.addEventListener("deviceready", function () {
	OAuth.initialize(OAUTHIO_PUBLIC_API_KEY);
});

(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};
  
    DemoViewModel = kendo.data.ObservableObject.extend({

        loginWithTwitter: function () {
          this.loginWithProvider("twitter");
        },

        loginWithFacebook: function () {
          // note that you need to whitelist graph.facebook.com in config.xml
          this.loginWithProvider("facebook");
        },

        loginWithGitHub: function () {
          this.loginWithProvider("github");
        },

      	loginWithProvider: function (provider) {
          if (!this.checkSimulator()) {
            OAuth.popup(provider, {
              // use this to not ask permission every time the user uses our app
              cache: true
            })
            .done(function(result) {
              alert("Success: " + JSON.stringify(result));
            })
            .fail(function (err) {
              alert(err);
            });
          }
        },

        dataFromTwitter: function () {
          this.dataFromProvider("twitter", "1.1/statuses/user_timeline.json?count=1");
        },

      	dataFromFacebook: function () {
          this.dataFromProvider("facebook", "/me");
        },
      
      	dataFromGitHub: function () {
          this.dataFromProvider("github", "/events");
        },
      
	      dataFromProvider: function(provider, what) {    
          if (!this.checkSimulator()) {
            // note that you need to whitelist api.twitter.com in config.xml
            OAuth.popup(provider, {
              // use this to not ask permission every time the user uses our app
              cache: true
            })
            .done(function(result) {
	            result.get(what)
              .done(function (response) {
              	alert("Response for " + what + ":\n\n" + JSON.stringify(response));
					  	})
            	.fail(function (err) {
	              alert(JSON.stringify(err));
    					});
            })
           	.fail(function (err) {
	            alert(JSON.stringify(err));
   					});
          }
        },

      	checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.screen === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);