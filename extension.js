const vscode = require('vscode');

function activate(context) {
    console.log('The "cz-extension" extension is now active.');

    let disposable = vscode.commands.registerCommand('charfinder.showWarning', () => {
        vscode.window.showWarningMessage('charfinder.showWarning opened');

        const editor = vscode.window.activeTextEditor;
        const regex = /\[ch:(.*?)\]/g;

        if (!editor) {
            vscode.window.showErrorMessage('No active editor found');
            return;
        }

        const text = editor.document.getText();
        const names = [];

        let match;
        while ((match = regex.exec(text)) !== null) {
            names.push(match[1]);
        }

        vscode.window.showQuickPick(names).then((selectedName) => {
            if (!selectedName) {
                return;
            }

            editor.edit((editBuilder) => {
                const position = editor.selection.active;
                editBuilder.insert(position, selectedName);
            });
        });
    });

    context.subscriptions.push(disposable);
}

exports.activate = activate;