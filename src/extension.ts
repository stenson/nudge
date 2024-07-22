import * as vscode from 'vscode';

export function activate({ subscriptions }: vscode.ExtensionContext) {
	subscriptions.push(vscode.commands.registerCommand('nudge.incrementSelection', function(json:any) {
		incrementSelection(json ? (json["increment"] || 10) : 10, json ? (json["dimension"] || "x") : "x");
	}));

	let saving = false;
	let savingInterval = 500;
	let saver = -1;

	subscriptions.push(vscode.commands.registerCommand('nudge.toggleAutoSaving', function(json:any) {
		if (saving === false) {
			saving = true;
			savingInterval = json ? (json["interval"] || 500) : 500;
		} else {
			saving = false;
		}
	}));

	vscode.workspace.onDidChangeTextDocument(function(e) {
		if (saving) {
			let ate = vscode.window.activeTextEditor;
			if (ate) {
				clearTimeout(saver);
				saver = setTimeout(() => ate?.document.save(), savingInterval);
			}
		}
	});
}

const ARROWS = "↖↑↗→↘↓↙←";

function arrowIncrement(n:number, inc:number) {
	if (inc == 1 || inc == -1) {
		let nx = n + inc;
		if (nx >= ARROWS.length) {
			return 0;
		} else if (nx < 0) {
			return ARROWS.length - 1;
		} else {
			return nx;
		}
	} else if (inc == 100 || inc == -100) {
		let a = ARROWS[n];
		let na = "";
		switch (a) {
			case "←": na = "→"; break;
			case "→": na = "←"; break;
			case "↑": na = "↓"; break;
			case "↓": na = "↑"; break;
			case "↖": na = "↘"; break;
			case "↘": na = "↖"; break;
			case "↗": na = "↙"; break;
			case "↙": na = "↗"; break;
		}
		return ARROWS.indexOf(na);
	}
	return 0;
}

const regexes = [
	[
		"float",
		/[\-0-9]+?\.[0-9]+/,
		(s:string) => [parseFloat(s)],
		(n:number, inc:number) => n + inc/100,
		(ns:Array<number>) => ns.map((n:number) => (n).toFixed(2)),
		(s:string) => `${s}`
	],
	[
		"integer",
		/[\-0-9]+/,
		(s:string) => [parseInt(s)],
		(n:number, inc:number) => n + inc,
		(ns:Array<number>) => ns,
		(s:string) => `${s}`
	],
	[
		"char",
		/[A-Za-z]{1}/,
		(s:string) => [s.charCodeAt(0)],
		(n:number, inc:number) => n + inc,
		(ns:Array<number>) => ns.map((n:number) => String.fromCharCode(n)),
		(s:string) => `${s}`
	],
	[
		"arrows",
		/[↖↑↗→↘↓↙←]{1}/,
		(s:string) => [ARROWS.indexOf(s)],
		arrowIncrement,
		(ns:Array<number>) => ns.map((n:number) => ARROWS[n]),
		(s:string) => `${s}`
	],
]

function incrementSelection(increment: number, dimension: string): void {
	const ate = vscode.window.activeTextEditor;
	if (ate) {
		const n = getActiveSelection(ate);
		if (n) {
			let ated = ate.document;
			regexes.some(lookup => {
				let name = <string>lookup[0];
				let reg = <RegExp>lookup[1];
				let cb = <Function>lookup[2];
				let inccb = <Function>lookup[3];
				let castcb = <Function>lookup[4];
				let wrapcb = <Function>lookup[5];
				let m = ated.getWordRangeAtPosition(n, reg);
				if (m) {
					//console.log("--------------", name);
					//console.log("====", ated.getText(m));
					let ns:Array<number> = cb(ated.getText(m));
					//console.log(">>>>>>>>>>>", ns, "<<<<");
					ns = ns.map((n:number) => inccb(n, increment));
					//.map((n:number) => n + increment);
					// if (dimension == "x") {
					// 	ns[0] += increment;
					// } else if (dimension == "y") {
					// 	ns[ns.length-1] += increment;
					// }
					let ns_str:string = wrapcb(castcb(ns).join(", "));
					//console.log(ns_str);
					ate.edit(editBuilder => {
						editBuilder.replace(m!, ns_str);
					});
					ate.document.save();
					return true;
				}
			});
		}
	}
}

function getActiveSelection(editor: vscode.TextEditor | undefined): (vscode.Position | undefined) {
	if (editor) {
		return editor.selection.active;
	}
}
