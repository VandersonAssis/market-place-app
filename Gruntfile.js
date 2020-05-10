module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: {
                    "src/components/desktop/css/Desktop.css": "src/components/ui/css/Desktop.less",
                    "src/components/ui/css/LoadingIndicator.css": "src/components/ui/css/LoadingIndicator.less",
                    "src/components/ui/css/ApiAutocomplete.css": "src/components/ui/css/ApiAutocomplete.less",
                    "src/components/products/css/ProductManagement.css": "src/components/products/css/ProductManagement.less"
                }
            }
        },
        watch: {
            styles: {
                files: ['**/*.less'], //Which file extentions grunt will be watching
                tasks: ['less']
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};