export default function extendLinkPlugin() {
    if (! $R.modals.link || ! $R.modules.link) {
        return;
    }
    
    // extend the link existing modal
    $R.modals.link = $R.modals.link.replace(
        '</form>',
        '<div class="form-item"><label for="modal-link-text">## anchor ##</label><input type="text" id="modal-link-anchor" name="anchor"></div></form>'
    );

    // extend link functions
    $Link = $R.modules.link;

    // clone the 'setLinkData' and 'setFormData' functions
    $Link.prototype._setLinkDataOrigin = $Link.prototype._setLinkData;
    $Link.prototype._setFormDataOrigin = $Link.prototype._setFormData;

    // new 'setLinkData' function with anchor
    $Link.prototype._setLinkData = function (nodes, data, type) {
        // insert anchor into url
        if (data.anchor) {
            data.anchor = '#' + data.anchor.replace('#', '').trim();

            const i = data.url.indexOf("#");

            if (i >= 0) {
                data.url = data.url.slice(0, i) + data.anchor + data.url.slice(i);
            } else {
                data.url += data.anchor;
            }

            data.url = data.url.replace(/#$/, '');
        }

        // call original setLinkData function
        this._setLinkDataOrigin(nodes, data, type);
    };

    // new 'setFormData' function with anchor
    $Link.prototype._setFormData = function ($form, $modal) {
        // call original setFormData function
        this._setFormDataOrigin($form, $modal);

        const formData = $form.getData();

        // split url by anchors
        const pcs = formData.url.match(/^(.*?)(#(?!entry\:[0-9]+).*?)?(#entry\:[0-9]+.*)?$/i);

        // update form
        if (pcs && pcs.length > 2 && pcs[2] !== undefined) {
            formData.url = pcs[1] + (pcs[3] !== undefined ? pcs[3] : '');
            formData.anchor = pcs[2].replace('#', '');
            $form.setData(formData);
        }
    };

    // new validation function
    $Link.prototype._validateData = function ($form, data) {
        if (data.url.trim() === '' && (!data.anchor || data.anchor.trim() === '')) {
            return $form.setError('url');
        }

        return true;
    };
};
