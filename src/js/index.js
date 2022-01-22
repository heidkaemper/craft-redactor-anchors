import modals from './modals';
import translations from './translations';
import extendLinkPlugin from './link/extend';
import idFromText from './helper/idFromText';

(function ($R) {
    $R.add('plugin', 'redactoranchors', {
        modals,
        translations,

        init: app => {
            this.app = app;
            this.opts = app.opts;
            this.lang = app.lang;
            this.$body = app.$body;
            this.toolbar = app.toolbar;
            this.selection = app.selection;

            this.opts.stylesClass += ' redactoranchorsWrapper';

            extendLinkPlugin($R);
        },

        // add button
        start: () => {
            const data = {
                title: this.lang.get('anchor-add'),
                api: 'plugin.redactoranchors.open',
            };

            const $button = this.toolbar.addButton('redactoranchors', data);

            $button.setIcon('<i class="re-icon-redactoranchors"></i>');
        },

        // add modal
        open: () => {
            const block = this.selection.getBlock();

            if (! block) {
                return;
            }

            this.$block = $R.dom(block);

            const options = {
                title: this.lang.get('anchor'),
                width: '440px',
                name: 'redactoranchorsModal',
                commands: {
                    save: { title: this.lang.get('save') },
                    cancel: { title: this.lang.get('cancel') }
                }
            };

            this.app.api('module.modal.build', options);
        },

        // handle modal
        onmodal: {
            redactoranchorsModal: {
                open: ($modal, $form) => {
                    if (this.$block) {
                        const blockData = $R.dom(this.$block);
                        $form.setData({ id: blockData.attr('id') ? blockData.attr('id') : idFromText(blockData.text()) });
                    }
                },
                opened: ($modal, $form) => {
                    $form.getField('id').focus();
                },
                save: ($modal, $form) => {
                    const data = $form.getData();

                    if (data.id === '') {
                        this.$block.removeAttr('id');
                    } else {
                        if (! data.id.match(/^[a-zA-Z][a-zA-Z0-9-_.]*$/gi)) {
                            $form.setError('id');

                            return false;
                        }

                        this.$block.attr('id', data.id);
                    }

                    this.app.api('module.modal.close');
                }
            }
        },
    });
})(Redactor);
