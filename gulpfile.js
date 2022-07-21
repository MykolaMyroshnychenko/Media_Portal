const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');/*помогает компилировать в другой файл*/
const browserSync = require('browser-sync').create();

gulp.task('sassToCSS',async function(){
  return gulp.src('app/scss/*.scss') /*выбираем файл*/
  .pipe(sass({  /*преобразование scss в css*/
    errorLogToConsole: true, /*Все ошибки будут выводится в консоль*/
    outputStyle: 'compressed' /*css будет минифицирован*/
  }))
  .on('error', console.error.bind(console)) /*если отследит ошибку обработчик события,
   то мы будем ее выводить в консоль*/
   /*.pipe(rename('style.min.css')) переименовуем файл*/
   .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public/css/')); /*style.min.css помещаем файл в другую папку*/
});

gulp.task('serve', function(){ /*таск для перезагрузки страничек в браузере*/
    browserSync.init({
      server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('watchFiles', function(){
  gulp.watch('app/scss/*.scss', gulp.series('sassToCSS'));
})

gulp.task('default', gulp.parallel('watchFiles', 'serve'));
