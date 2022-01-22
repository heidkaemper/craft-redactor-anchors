export default function getAnchorFromSelection() {
    const span = $R.dom(this.selection.getInline());

    if (span.attr('id')) {
        return span.attr('id');
    }

    return _idFromText(this.selection.isCollapsed() ? span.text() : this.selection.getText());
}

function _idFromText(str) {
    return str ? str.substring(0, 50).trim().toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-_.]/g, '') : '';
}
