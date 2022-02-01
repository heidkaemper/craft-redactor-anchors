export default function setAnchorToSelection(anchor, app) {
    if (! anchor) {
        app.api('module.inline.remove', { attr: 'id' });
    
        return;
    }
    
    app.api('module.inline.format', { attr: { id: anchor }, tag: 'span' });
}
