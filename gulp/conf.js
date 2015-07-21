// config

const D = {
  PATH: '/noto',
  SRC: 'src',
  DEST: 'public'
};

export default {
  D,

  serve: {
    notify: false,
    startPath: D.PATH,
    server: {
      baseDir: './',
      index: `${D.DEST}${D.PATH}/`,
      routes: {
        [D.PATH]: `${D.DEST}/`
      }
    }
  },

  scripts: {
    browserifyOpts: {
      entries: [`./${D.SRC}/js/main.jsx`],
      extensions: ['.jsx'],
      transform: ['babelify']
    },
    dest: `${D.DEST}`
  },

  uglify: {
    src: `./${D.DEST}/main.js`,
    dest: `${D.DEST}`
  },

  jade: {
    src: [
      `${D.SRC}/**/*.jade`,
      `!${D.SRC}/**/_**/*.jade`,
      `!${D.SRC}/**/_*.jade`
    ],
    dest: `${D.DEST}`
  },

  stylus: {
    src: [
      `${D.SRC}/**/*.styl`,
      `!${D.SRC}/**/_**/*.styl`,
      `!${D.SRC}/**/_*.styl`
    ],
    dest: `${D.DEST}`
  },

  minifyCss: {
    src: `${D.DEST}/main.css`,
    dest: `${D.DEST}`
  },

  clean: {
    path: [`${D.DEST}`]
  },

  copy: {
    zeroclipboard: {
      src: `./node_modules/zeroclipboard/dist/ZeroClipboard.swf`,
      dest: `${D.DEST}`
    }
  },

  replace: {
    src: `${D.DEST}/index.html`,
    dest: `${D.DEST}`,
    replacements: [
      ['main.js?v', `main.min.js?v${Date.now()}`],
      ['main.css?v', `main.min.css?v${Date.now()}`]
    ]
  }

}
