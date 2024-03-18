
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';



export default {
  input: './src/index.js',
	output: [
		{
			file: 'dist/index.js',
			format: 'cjs'
		},
		{
			file: 'dist/index.es.js',
			format: 'es',
			exports: 'named'
		}
	],
  plugins:[
    external(),
    resolve({ extensions: ['.js', '.jsx'] }), 
    babel({ 
      exclude:'node_modules/**',
      presets:["@babel/preset-react", "@babel/preset-env"],
      babelHelpers: 'bundled' ,
    }),
    postcss({
      plugins:[],
      minimize:true,
    }),
    terser(),
  ]
}