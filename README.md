# sham-ui-router

[![Build Status](https://travis-ci.com/sham-ui/sham-ui-router.svg?branch=master)](https://travis-ci.com/sham-ui/sham-ui-router)
[![npm version](https://badge.fury.io/js/sham-ui-router.svg)](https://badge.fury.io/js/sham-ui-data-storage)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

Router for sham-ui

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
Bind page component in `component-binder`:
```js
import FooPage from '../components/FooPage.sht';
import BarPage from '../components/BarPage.sht';
import Router from 'sham-ui-router';

const router = new Router();
router
    .bindPage( 
        '/foo', // URL
        'foo', // Name
        FooPage, // Component class
        { componentOption: 1 } // Component options
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

Add [LinkTo](https://github.com/sham-ui/sham-ui-router/blob/master/src/components/LinkTo.js) components in templates:

```html
{% import LinkTo from 'sham-ui-router/link-to' %}
... 
    <LinkTo text="Foo" path="foo" params={{params}} useActiveClass={{true}} className="custom-class-1 custom-class-2"/>
...
```

Or use `hrefto` directive:
```html
...
    <a :hrefto={{ {"path": "foo",  "params": params} }} className="custom-class-1 custom-class-2">
        Foo
    </a>
...
```

Or use `hrefto` directive with `params` helper:
```html
{% import path from 'sham-ui-router/params' %}
...
    <a :hrefto={{path("foo").param("id", 2)}} className="custom-class-1 custom-class-2">
        Foo
    </a>
...
```
