# Anchors for Redactor in Craft CMS

![Image of Craft Redactor Anchors](./preview.jpg)

Add anchor functionality for Reactor in Craft CMS

## Installation

1. Run Composer in your project folder:

```sh
composer require utakka/redactor-anchors
```

2. Open your Craft Control Panel, navigate to Plugins and click 'Install' for Redactor Anchors.

3. Add `redactoranchors` to plugins array in your Redactor config. Example:
```js
{
    "buttons": ["bold", "italic", "unorderedlist", "link", "redactoranchors", "image"],
    "plugins": ["fullscreen", "redactoranchors"],
    "linkNewTab": true,
    "toolbarFixed": true
}
```
There is a [redactor-config-sample.json](./redactor-config-sample.json), too.
