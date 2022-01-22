export default function setAnchorToSelection(anchor) {
    if (! anchor) {
        this.app.api('module.inline.remove', { attr: 'id' });
    
        return;
    }
    
    this.app.api('module.inline.format', { attr: { id: anchor }, tag: 'span' });
}
