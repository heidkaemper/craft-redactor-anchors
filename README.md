# Anchors for Redactor in Craft 3

![Image of Craft Redactor Anchors](./preview.jpg)

Add anchor functionality for Reactor in Craft CMS 3

> **Important Note:**
> The name of this package has changed from utakka/redactor-anchors to heidkaemper/redactor-anchors.
> If you already had this plugin installed, please change the package name in your composer.json and run `composer update`.

## Installation

1. Run Composer in your project folder:

```sh
composer require heidkaemper/redactor-anchors
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
