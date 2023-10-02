// @ts-nocheck
import 'ace-builds/src-noconflict/ace'


export const getFromLocalStorage = (key: string) => {
	// if (!process.client) return null
	const value = localStorage.getItem(key)
	if (value) {
		return JSON.parse(value)
	}
	return null
}

export const themesArray: {
	[key: string]: { name: string; module: Promise<any>; color: 'light' | 'dark' }
} = {
	chrome: {
		name: 'Light',
		module: import('ace-builds/src-noconflict/theme-chrome'),
		color: 'light',
	},
	twilight: {
		name: 'Dark',
		module: import('ace-builds/src-noconflict/theme-twilight'),
		color: 'dark',
	},
	// tomorrow: {
	// 	name: 'Tomorrow',
	// 	module: import('ace-builds/src-noconflict/theme-tomorrow'),
	// 	color: 'light',
	// },
	// kuroir: {
	// 	name: 'Kuroir',
	// 	module: import('ace-builds/src-noconflict/theme-kuroir'),
	// 	color: 'light',
	// },
	// xcode: {
	// 	name: 'Xcode',
	// 	module: import('ace-builds/src-noconflict/theme-xcode'),
	// 	color: 'light',
	// },
	// textmate: {
	// 	name: 'Textmate',
	// 	module: import('ace-builds/src-noconflict/theme-textmate'),
	// 	color: 'light',
	// },
	// solarized_dark: {
	// 	name: 'Solarized Dark',
	// 	module: import('ace-builds/src-noconflict/theme-solarized_dark'),
	// 	color: 'dark',
	// },
	// solarized_light: {
	// 	name: 'Solarized Light',
	// 	module: import('ace-builds/src-noconflict/theme-solarized_light'),
	// 	color: 'light',
	// },
}

export const modesArray: {
	[key: string]: { name: string; module: Promise<any> }
} = {
	c_cpp: {
		name: 'C/C++',
		module: import('/mode-c_cpp.js?url'),
	},
	python: {
		name: 'Python',
		module: import('/mode-python.js?url'),
	},
	javascript: {
		name: 'Javascript',
		module: import('/mode-javascript.js?url'),
	},
}

export const sampleMarkdown = `
# Your first assignment!
### Introduction
Welcome to your first assignment. Ths assigment is a dummy assignment which will be used to test the capabilties of .xphyrus. This assignment contains no meaningful code, except for a hello world program. Now, let's learn how to write a **Hello World** program in C.

___

### Hello World
Firstly, we will include the header files needed to print something to the standard output. This header file is called \`<stdio.h>\`. Type out the following line in the code editor:

\`\`\`c
#include <stdio.h>
\`\`\`

Now, we will write the main function. The main function is the entry point of every C program. The main function is defined as follows: 
\`\`\`c
int main() {
	// Code goes here
	return 0;
}
\`\`\`

Now, let's combine the two parts of our code together. Type out the following code in the code editor:
\`\`\`c
#include <stdio.h>

int main() {
	return 0;
}
\`\`\`

When you try running this code, you will see that nothing happens. This is because we haven't written any code to print something to the standard output. To print something to the standard output, we will use the \`printf\` function. 
\`\`\`
printf("Hello World!");
\`\`\`

Now, let's combine the all the parts of our code together. Type out the following code in the code editor:
\`\`\`c
#include <stdio.h>

int main() {
	printf("Hello World!");
	return 0;
}
\`\`\`

Now, when you run this code, you will see that the output \`Hello World!\` is printed to the standard output. Congratulations! You have written your first C program. Now, let's learn how to submit this program to .xphyrus.
\n\n\n  
`

export const getAbsoluteHeight = (el: HTMLElement | string): number => {
	// Get the DOM Node if you pass in a string
	el = typeof el === 'string' ? document.querySelector(el) : el

	var styles = window.getComputedStyle(el)
	var margin =
		parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom'])

	return Math.ceil(el.offsetHeight + margin)
}