export default function getAnchorFromSelection(selection) {
    const span = $R.dom(selection.getInline());

    if (span.attr('id')) {
        return span.attr('id');
    }

    return _idFromText(selection.isCollapsed() ? span.text() : selection.getText());
}

function _idFromText(str) {
    return str ? str.substring(0, 50).trim().toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-_.]/g, '') : '';
}
