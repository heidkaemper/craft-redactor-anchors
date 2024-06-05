# Anchors for Redactor in Craft CMS

![Image of Craft Redactor Anchors](./preview.jpg)

Add anchor functionality for Redactor in Craft CMS

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

---

<p>
<a href="https://packagist.org/packages/utakka/redactor-anchors"><img src="https://img.shields.io/packagist/v/utakka/redactor-anchors?label=Version" alt="Version"></a>
<a href="https://packagist.org/packages/utakka/redactor-anchors/stats"><img src="https://img.shields.io/packagist/dt/utakka/redactor-anchors?label=Downloads" alt="Total Downloads"></a>
</p>
