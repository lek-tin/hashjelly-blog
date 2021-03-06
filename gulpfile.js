const gulp = require('gulp')
const connect = require('gulp-connect')
const exec = require('child_process').exec
const targetFolder = 'docs'

gulp.task('connect', function() {
  connect.server({
    root: targetFolder,
    livereload: true
  })
})
 
gulp.task('build', function (cb) {
    exec(`hugo && cp 404.html /${targetFolder}`, function (err, stdout, stderr) {
        console.log(stdout)
        console.log(stderr)
        cb(err)
    })
    connect.reload()
})
 
gulp.task('watch', function () {
  gulp.watch(['!./docs/**/*'], ['build'])
})
 
gulp.task('default', ['connect', 'watch'])

// // Gulp modules
// const gulp = require('gulp')
// const watch = require('gulp-watch')
// const sass = require('gulp-sass')
// const autoprefixer = require('gulp-autoprefixer')
// const sourcemaps = require('gulp-sourcemaps')

// // Sources
// const sassSources = './static/css/**/*.scss'
// const sassEntry = './static/css/style.scss'
// let sassStyle = ''
// // Destinations
// const cssDest = './static/css/'
// // ENV 
// const env = process.env.NODE_ENV || 'development'

// if ( env === 'production') {
//     sassStyle = 'compressed'
// } else if ( env === 'production' ) {
//     sassStyle = 'expanded'
// }

// // Sass->CSS Task
// // Minify style.css if ENV === production
// gulp.task('sass', () => {
//     return gulp.src(sassEntry)
//         .pipe(sass.sync().on('error', sass.logError))
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         // For inline sourcemaps 
//         .pipe(sourcemaps.write())
//         // For file sourcemaps 
//         .pipe(sourcemaps.write('', {
//             includeContent: false,
//             sourceRoot: 'source'
//         }))
//         .pipe(gulp.dest(cssDest))
// })

// // Watch for Sass file changes
// gulp.task('watch', () => {
//     gulp.watch(sassSources, ['sass'])
// })

// gulp.task('default', [
//     'sass',
//     'watch',
// ])

// sudo npm i --save-dev gulp gulp-watch gulp-sass gulp-autoprefixer gulp-sourcemaps