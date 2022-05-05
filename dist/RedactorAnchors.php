<?php

namespace heidkaemper\redactoranchors;

use Craft;
use craft\base\Plugin;
use craft\redactor\events\RegisterPluginPathsEvent;
use craft\redactor\Field;
use yii\base\Event;

class RedactorAnchors extends Plugin
{
    public static $plugin;

    public function init()
    {
        parent::init();

        self::$plugin = $this;

        if (Craft::$app->getRequest()->getIsCpRequest()) {
            Event::on(Field::class, Field::EVENT_REGISTER_PLUGIN_PATHS, function (RegisterPluginPathsEvent $event) {
                $event->paths[] = Craft::getAlias('@heidkaemper/redactoranchors/assets');
            });
        }
    }
}
