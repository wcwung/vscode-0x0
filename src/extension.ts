import * as vscode from 'vscode';
import * as FormData from 'form-data';
import fetch from 'node-fetch';

export function activate(context: vscode.ExtensionContext) {
  const post = vscode.commands.registerCommand('0x0.post', async () => {
    const activeEditor = vscode.window.activeTextEditor;

    if (!activeEditor) {
      return;
    }

    const { document, selection } = activeEditor;

    // Post entire document if no selection
    const content = selection.isEmpty
      ? document?.getText()
      : document?.getText(selection);

    const data = new FormData();
    data.append('file', content, 'multipart/form-data');

    const response = await fetch('http://0x0.st', {
      method: 'POST',
      body: data,
    }).then((res, err) => res.text());

    // Copy 0x0.st link to clipboard
    vscode.env.clipboard.writeText(response);

    vscode.window.showInformationMessage(`Copied: ${response}`);
  });

  context.subscriptions.push(post);
}

export function deactivate() {}
