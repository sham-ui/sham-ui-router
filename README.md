# sham-ui-router

> Router for sham-ui

## Install

```bash
# npm
npm install sham-ui-router
```

```bash
# yarn
yarn add sham-ui-router
```

## Usage
Bind page widgets in `widget-binder`:
```js
import FooPage from '../widgets/FooPage.sht';
import BarPage from '../widgets/BarPage.sht';
import Router from 'sham-ui-router';

const router = new Router();
router
    .bindPage( 
        '/foo', // URL
        'foo', // Name
        FooPage, // Widget class
        { widgetOption: 1 } // Widget options
    )
    .bindPage( '/bar', 'bar', BarPage, {} );
```

In `App.sht` add `ActivePageContainer`:
```html
{% import ActivePageContainer from 'sham-ui-router/active-page-container' %}
...
    <ActivePageContainer/>
...
```

Add [LinkTo](https://github.com/sham-ui/sham-ui-router/blob/master/src/widgets/LinkTo.js) widgets in templates:

```html
{% import LinkTo from 'sham-ui-router/link-to' %}
... 
    <LinkTo text="Foo" path="foo" params={{params}} useActiveClass={{true}} className="custom-class-1 custom-class-2"/>
...
```

