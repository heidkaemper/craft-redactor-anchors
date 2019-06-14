<?php

namespace utakka\redactoranchors;

use Craft;
use craft\base\Plugin;
use craft\redactor\events\RegisterPluginPathsEvent;
use craft\redactor\Field;
use yii\base\Event;


class RedactorAnchors extends Plugin {

  public static $plugin;

  public function init() {

    parent::init();
    self::$plugin = $this;

    if( !Craft::$app->request->isConsoleRequest && Craft::$app->request->isCpRequest ) {
      Event::on(Field::class, Field::EVENT_REGISTER_PLUGIN_PATHS, [$this, 'RegisterPluginPath']);
    }
      
  }

  public function RegisterPluginPath(RegisterPluginPathsEvent $event) {
    $event->paths[] = \dirname(__DIR__) . '/src/resources/';
  }
  
}
