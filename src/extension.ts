// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "lazygit-vscode" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('lazygit-vscode.openLazygit', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user

        if (!vscode.workspace.workspaceFolders || !vscode.workspace.workspaceFolders[0]) {
            vscode.window.showErrorMessage('No folder or workspace opened');
            return;
        }

        // if .git folder does not exist in workspace show error message
        const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;

        // check if .git folder exists in workspace
        const fs = require('fs');
        const path = require('path');
        const gitPath = path.join(workspacePath, '.git');
        if (!fs.existsSync(gitPath)) {
            vscode.window.showErrorMessage('No .git folder found in workspace');
            return;
        }

        // check if lazygit is installed
        const exec = require('child_process').exec;
        exec('lazygit --version', (error: any, stdout: any, stderr: any) => {
            if (error) {
                vscode.window.showErrorMessage('lazygit is not installed');
                return;
            }
        });

        // open terminal and run lazygit
        const terminal = vscode.window.createTerminal('lazygit-vscode');
        terminal.sendText('lazygit && exit ');

        // move terminal to editor
        vscode.commands.executeCommand('workbench.action.terminal.moveToEditor');
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
