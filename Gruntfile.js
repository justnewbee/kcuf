module.exports = function(grunt) {
	grunt.initConfig({
		less: {
			development: {
				options: {
					paths: ["assets/less"],
					sourceMap: true,
					sourceMapFilename: "build/assets/css/source"
				},
				files: {
					"build/assets/css/common.css": "assets/less/common.less",
					"build/assets/css/dialog.css": "assets/less/dialog.less"
				}
//			},
//			production: {
//				options: {
//					paths: ["assets/less"],
//					cleancss: true
//				},
//				files: {
//					"build/assets/common.css": "assets/less/common.less"
//				}
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.registerTask("default", ["less"]);
};