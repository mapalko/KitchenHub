/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "0.0.0.0",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
									// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "192.168.1.35", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
									// or add a specific IPv4 of 192.168.1.5 :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
									// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "MMM-Wallpaper",
			classes: "fixed_page",
			position: "fullscreen_below",
			config: { // See "Configuration options" for more information.
			  source: "chromecast",
			  slideInterval: 60 * 1000, // Change slides every minute
			  caption: "false",
			  nsfw: "false"
			}
		  },
		{
			module: "MMM-pages",
			config: {
				rotationTime: 0,
				rotationHomePage: 1000 * 300, 
				modules : [
					["homescreen"],
					["pageWeekCal"],
					["pageMonthCal"],
					["pageMealPlanning"]
				],
				fixed: ["fixed_page"],
			}
		},
		{
			module: "clock",
			classes: "fixed_page",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "US Holidays",
			config: {
				broadcastPastEvents: true,
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						name: "us_holiday",
						url: "https://ics.calendarlabs.com/76/mm3137/US_Holidays.ics",
						color: "LightSkyBlue"
					}
				]
			}
		},
		{
			module: "calendar",
			header: "Matthew and Hannah Schedule",
			config: {
				broadcastPastEvents: true,
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-week",
						name: "mh_joint",
						url: "https://calendar.google.com/calendar/ical/krrlhnfvg5a60oscp7uu4ho9a0%40group.calendar.google.com/private-9adad24f72727d6636deb46aaaa1005c/basic.ics",
						color: "LightSteelBlue"
					}
				]
			}
		},
		{
			module: "MMM-CalendarExt3Journal",
			classes: "pageWeekCal",
			position: "top_right",
			header: "Weekly Calendar",
			config: {
		      width: "100%",
  			  height: "725px",
			  locale: 'en-GB',
			  staticWeek: true,
			  staticTime: true,
			  hourLength: 17,
			  beginHour:  7,
			  calendarSet: ['us_holiday', 'mh_joint']
			}
		  },
		{
			module: "MMM-CalendarExt3",
			classes: "pageMonthCal",
			position: "top_right",
			config: {
				width: "100%",
  			    height: "600px",
				mode: "month",
				instanceId: "basicCalendar",
				locale: 'en-US',
				calendarSet: ['us_holiday', 'mh_joint'],
				weekIndex: '-1',
				weeksInView: "4",
				useMarquee: "true"
			  }
		  },
		{
			module: "weather",
			classes: "fixed_page",
			position: "bottom_left",
			config: {
				weatherProvider: "openmeteo",
				type: "current",
				units: "imperial",
				tempUnits: "imperial",
				windUnits: "imperial",
				lat: 47.826911,
				lon: -122.205772
			}
		},
		{
			module: "weather",
			classes: "fixed_page",
			position: "bottom_left",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openmeteo",
				type: "forecast",
				units: "imperial",
				tempUnits: "imperial",
				windUnits: "imperial",
				lat: 47.826911,
				lon: -122.205772
			}
		},
		// Google Tasks Commented out - https://github.com/spydersoft-consulting/MMM-GoogleTasks
//		{
//            module: 'MMM-GoogleTasks',
//            header: "Meal Plan",
//			classes: "pageMealPlanning",
//          position: "top_right",
//          config: {
//              listID: "aXhETUFvZUxGSkxPNnZJNQ", //Meal Plan
//				ordering: "myorder",
//				updateInterval: 1000 * 300
//            }
//        },
//		{
//            module: 'MMM-GoogleTasks',
//            header: "Shopping List",
//			classes: "pageMealPlanning",
//            position: "top_right",
//            config: {
//                listID: "b1VCbTNGb2owSUJOVjZYVA", //Meal Plan
//				ordering: "myorder",
//				updateInterval: 1000 * 300
//            }
//        },
		// Todoist -- https://github.com/dirtylimerix/MMM-Todoist?tab=readme-ov-file
		{
			module: 'MMM-Todoist',
			position: 'top_right',	
			classes: "pageMealPlanning",
			header: 'Meal Planning', // This is optional
			config: { // See 'Configuration options' for more information.
				hideWhenEmpty: false,
				accessToken: 'f2d8b500bfe1ad3dd470d1046b221b5f118077d8',
				maximumEntries: 60,
				updateInterval: 10*60*1000, // Update every 10 minutes
				fade: false,      
				// projects and/or labels is mandatory:
				//projects: [ 2345758501, 2345759128 ],
				// labels: [  "Meals" ]
				sections: [ "177477805" ]
			}
		},
		{
			module: 'MMM-Todoist',
			position: 'top_right',	
			classes: "pageMealPlanning",
			header: 'Groceries', // This is optional
			config: { // See 'Configuration options' for more information.
				hideWhenEmpty: false,
				accessToken: 'f2d8b500bfe1ad3dd470d1046b221b5f118077d8',
				maximumEntries: 60,
				updateInterval: 10*60*1000, // Update every 10 minutes
				fade: false,      
				// projects and/or labels is mandatory:
				projects: [ 2345781206 ],
				useSectionNameLabel: true,
			}
		},
		{
			module: 'MMM-Todoist',
			position: 'top_right',	
			classes: "pageMealPlanning",
			header: 'To-Do', // This is optional
			config: { // See 'Configuration options' for more information.
				hideWhenEmpty: false,
				accessToken: 'f2d8b500bfe1ad3dd470d1046b221b5f118077d8',
				maximumEntries: 60,
				updateInterval: 10*60*1000, // Update every 10 minutes
				fade: false,      
				// projects and/or labels is mandatory:
				//projects: [ 2345758501, 2345759128 ],
				sections: [ "177486808" ]
				//labels: [  "Todo" ]
			}
		},
		{
			module: 'MMM-page-indicator',
			classes: "fixed_page",
			position: 'bottom_bar',
			config: {
				pages: 3,
			}
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
