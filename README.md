# Use Your Favorite PostCSS-Plugins With Svelte

[Svelte](https://github.com/sveltejs/svelte#readme) plugin for using PostCSS plugins in svelte components

## Install
```
npm install --save-dev svelte-postcss
```
or
```
npm i -D headmad/svelte-postcss
```

## Usage
```javascript
// rollup.config.js

import svelte from 'rollup-plugin-svelte';
import postcss from 'svelte-postcss';
import globalsStyles from 'postcss-svelte-global-styles'
...

export default {
  ...
  plugins: [
    svelte({
      preprocess: [
        postcss([ globalStyles, ...])
      ],
      ...
    })
  ]
}
```
In exemple, all PostCSS plugins will be applied to each svelte-file separately.
<br>If you whant appli PostCSS to all styles of project, you mast add next code

```javascript
// rollup.config.js

import svelte from 'rollup-plugin-svelte';
import postcss from 'svelte-postcss';
import globalsStyles from 'postcss-svelte-global-styles'
import mqPacker from 'css-mqpacker'
...

export default {
  ...
  plugins: [
    svelte({
      preprocess: [
        postcss([ globalStyles ])
      ],
      ...
      css: async (css) => {
        await postcss([	mqPacker() ])
          .run(css.code)
          .then((output) => { css.code = output })
        css.write('public/build/bundle.css');
      },
      ...
    })
  ]
}
```
In exemple used plugins [postcss-svelte-global-styles](https://github.com/HeadMad/postcss-svelte-global-styles#readme) and [css-mqpacker](https://github.com/hail2u/node-css-mqpacker#readme)

## Also
You can use other gonfig sources. Like exemple - section `postcss` in `package.json`
```
{
  ...
  "postcss": {
    "map": false,
    "plugins": {
      "postcss-svelte-global-styles": {},
      ...
    }
  }
}
```

Or `postcss.config.js` file
```javascript
module.exports = {
  map: false,
  plugins: {
    'postcss-svelte-global-styles': {}
    }
  }
}
```

## License
MIT
