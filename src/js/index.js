import modals from './modals';
import translations from './translations';
import extendLinkPlugin from './link/extend';
import setAnchorToSelection from './helper/setAnchorToSelection';
import getAnchorFromSelection from './helper/getAnchorFromSelection';

(function ($R) {
    $R.add('plugin', 'redactoranchors', {
        modals,
        translations,

        init: function (app) {
            this.app = app;
            this.opts = app.opts;
            this.lang = app.lang;
            this.toolbar = app.toolbar;
            this.selection = app.selection;

            this.opts.stylesClass += ' redactoranchorsWrapper';

            extendLinkPlugin();
        },

        // add button
        start: function () {
            const $button = this.toolbar.addButton('redactoranchors', {
                title: this.lang.get('anchor-add'),
                api: 'plugin.redactoranchors.open',
            });

            $button.setIcon('<i class="re-icon-redactoranchors"></i>');
        },

        // add modal
        open: function () {
            this.app.api('module.modal.build', {
                name: 'redactoranchorsModal',
                title: this.lang.get('anchor'),
                width: '440px',
                handle: 'save',
                commands: {
                    save: { title: this.lang.get('save') },
                    cancel: { title: this.lang.get('cancel') },
                }
            });
        },

        // handle modal
        onmodal: {
            redactoranchorsModal: {
                open: function ($modal, $form) {
                    if (this.selection.isCollapsed()) {
                        this.selection.setAll(this.selection.getElement());
                    }

                    this.selection.save();

                    $form.setData({
                        id: getAnchorFromSelection(this.selection)
                    });
                },
                opened: function ($modal, $form) {
                    $form.getField('id').focus();
                },
                save: function ($modal, $form) {
                    const { id } = $form.getData();

                    if (id && ! id.match(/^[a-zA-Z][a-zA-Z0-9-_.]*$/gi)) {
                        $form.setError('id');

                        return false;
                    }

                    this.app.api('module.modal.close');

                    this.selection.restore();

                    setAnchorToSelection(id, this.app);
                }
            }
        },
    });
})(Redactor);
