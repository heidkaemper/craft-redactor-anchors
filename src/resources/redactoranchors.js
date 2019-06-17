(function($R) {

  $R.add('plugin', 'redactoranchors', {


    translations: {
      en: {
        "anchor": "Anchor",
        "anchor-add": "Add anchor",
        "anchor-name": "Name"
      },
      de: {
        "anchor": "Sprungmarke",
        "anchor-add": "Sprungmarke setzen",
        "anchor-name": "Name"
      }
    },


    modals: {
      'redactoranchorsModal':
        '<form action=""> \
          <div class="form-item"> \
            <label for="modal-redactoranchors-name">## anchor-name ##</label> \
            <input type="text" id="modal-redactoranchors-name" name="id"> \
          </div> \
        </form>'
    },



    init: function(app) {

      this.app = app;
      this.opts = app.opts;
      this.lang = app.lang;
      this.$body = app.$body;
      this.toolbar = app.toolbar;
      this.selection = app.selection;

      this.opts.stylesClass += " redactoranchorsWrapper";

      if( this._extendLinkModal() ) {
        this._extendLinkFunctions();
      }

    },


    // add button
    start: function() {
      var data = {
        title: this.lang.get('anchor-add'),
        api: 'plugin.redactoranchors.open'
      };
      var $button = this.toolbar.addButton('redactoranchors', data);
      $button.setIcon('<i class="re-icon-redactoranchors"></i>');
    },


    // add modal
    open: function() {

      var block = this.selection.getBlock();
      if (!block) return;

      this.$block = $R.dom(block);

      var options = {
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

        open: function($modal, $form) {
          if(this.$block) {
            var blockData = $R.dom(this.$block);
            $form.setData({ id: blockData.attr('id') });
          }
        },

        opened: function($modal, $form) {
          $form.getField('id').focus();
        },

        save: function($modal, $form) {

          var data = $form.getData();
          
          if(data.id === '') {
            this.$block.removeAttr('id');
          } else {
            if( data.id.match(/^[a-zA-Z][a-zA-Z0-9-_\.]*$/gi) ) {
              this.$block.attr('id', data.id);
            } else {
              $form.setError('id');
              return false;
            }
          }

          this.app.api('module.modal.close');
        }

      }
    },




    // extend the link plugin modal
    _extendLinkModal: function(){
      if( $R.modals.link ) {

        $R.modals.link = $R.modals.link.replace('</form>', '\
            <div class="form-item"> \
              <label for="modal-link-text">## anchor ##</label> \
              <input type="text" id="modal-link-anchor" name="anchor"> \
            </div> \
          </form>');

        return $R.modals.link.search('id="modal-link-anchor"') >= 0 ? true : false;

      }
      return false;
    },


    // extend the link plugin functions
    _extendLinkFunctions: function(){
      if( $R.modules.link ) {

        $Link = $R.modules.link;

        // clone the 'setLinkData' and 'setFormData' functions
        $Link.prototype._setLinkDataOrigin = $Link.prototype._setLinkData;
        $Link.prototype._setFormDataOrigin = $Link.prototype._setFormData;

        // new 'setLinkData' function with anchor
        $Link.prototype._setLinkData = function(nodes, data, type) {

          // insert anchor into url
          if( data.anchor ) {

            data.anchor = '#' + data.anchor.replace('#','').trim();

            var i = data.url.indexOf("#");
            if( i >= 0 ) {
              data.url = data.url.slice(0,i) + data.anchor + data.url.slice(i);
            } else {
              data.url += data.anchor;
            }

            data.url = data.url.replace(/#$/, '');

          }

          // call original setLinkData function
          this._setLinkDataOrigin(nodes, data, type);

        };

        // new 'setFormData' function with anchor
        $Link.prototype._setFormData = function($form, $modal) {

          // call original setFormData function
          this._setFormDataOrigin($form, $modal);

          var formData = $form.getData();

          // split url by anchors
          var pcs = formData.url.match(/^(.*?)(#(?!entry\:[0-9]+).*?)?(#entry\:[0-9]+.*)?$/i);

          // update form
          if( pcs && pcs.length > 2 && pcs[2] !== undefined ) {
            formData.url = pcs[1] + ( pcs[3] !== undefined ? pcs[3] : '' );
            formData.anchor = pcs[2].replace('#','');
            $form.setData(formData);
          }

        };

        // new validation function
        $Link.prototype._validateData = function($form, data) {
          if( data.url.trim() === '' && ( !data.anchor || data.anchor.trim() === '' ) ) {
            return $form.setError('url');
          } else {
            return true;
          }
        };

      }
    }



  });

})(Redactor);
