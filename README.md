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

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [ParamsBuilder](#paramsbuilder)
    -   [param](#param)
        -   [Parameters](#parameters)
    -   [\_params](#_params)
        -   [Parameters](#parameters-1)
    -   [\_useActiveClass](#_useactiveclass)
    -   [\_activeClass](#_activeclass)
        -   [Parameters](#parameters-2)
-   [path](#path)
    -   [Parameters](#parameters-3)
-   [Router](#router)
    -   [Parameters](#parameters-4)
    -   [Examples](#examples)
    -   [storage](#storage)
    -   [bindPage](#bindpage)
        -   [Parameters](#parameters-5)
    -   [resolve](#resolve)
    -   [notFound](#notfound)
    -   [navigate](#navigate)
        -   [Parameters](#parameters-6)
    -   [hooks](#hooks)
        -   [Parameters](#parameters-7)
    -   [generate](#generate)
        -   [Parameters](#parameters-8)
        -   [Examples](#examples-1)
-   [RouterStorage](#routerstorage)
    -   [Properties](#properties)

### ParamsBuilder

Helper for build params for href-to directive

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### param

Add param for page

##### Parameters

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Param name
-   `value` **any** Param value

Returns **[ParamsBuilder](#paramsbuilder)** 

#### \_params

Set params

##### Parameters

-   `value` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[ParamsBuilder](#paramsbuilder)** 

#### \_useActiveClass

User active class

Returns **[ParamsBuilder](#paramsbuilder)** 

#### \_activeClass

Set active class

##### Parameters

-   `activeClass` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[ParamsBuilder](#paramsbuilder)** 

### path

Create new ParamsBuilder

#### Parameters

-   `path` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of destination page

Returns **[ParamsBuilder](#paramsbuilder)** 

### Router

Router service

#### Parameters

-   `root` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | null)** Root URL (optional, default `null`)
-   `useHash` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Use hash symbol as delimiter (optional, default `false`)
-   `hash` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Hash symbol (use useHash=true) (optional, default `'#'`)

#### Examples

```javascript
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
    .bindPage( '/bar/:some_param/detail', 'bar', BarPage, {} )
    .resolve();
```

#### storage

Type: [RouterStorage](#routerstorage)

#### bindPage

Bind page component & url

##### Parameters

-   `url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Url for page
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Page name
-   `pageComponent` **Class&lt;Component>** Component for page
-   `componentOptions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for component

Returns **[Router](#router)** 

#### resolve

Resolve current url & run router

#### notFound

-   **See: <https://github.com/krasimir/navigo#not-found-handler>**

Not found handler

#### navigate

Changing the page

##### Parameters

-   `url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Destination url

#### hooks

-   **See: <https://github.com/krasimir/navigo#hooks>**

Hooks

##### Parameters

-   `hooks` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object with hooks

#### generate

-   **See: <https://github.com/krasimir/navigo#named-routes>**

Generate url for page

##### Parameters

-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
-   `params` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** 

##### Examples

```javascript
router
    .bindPage( '/trip/:tripId/edit', 'trip.edit', PageComponent, {} )
    .bindPage( '/trip/save', 'trip.save', PageComponent, {} )
    .bindPage( '/trip/:action/:tripId', 'trip.action', PageComponent, {} );
console.log(router.generate('trip.edit', { tripId: 42 })); // --> /trip/42/edit
console.log(router.generate('trip.action', { tripId: 42, action: 'save' })); // --> /trip/save/42
console.log(router.generate('trip.save')); // --> /trip/save
```

### RouterStorage

-   **See: <https://github.com/sham-ui/sham-ui-data-storage>**

Data storage for router service

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Current page url
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Current page name
-   `params` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Current page params
-   `activePageComponent` **Class&lt;Component>** Current page component class
-   `activePageOptions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options for current page component

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
