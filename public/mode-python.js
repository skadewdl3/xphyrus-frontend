ace.define(
	'ace/mode/python_highlight_rules',
	[
		'require',
		'exports',
		'module',
		'ace/lib/oop',
		'ace/mode/text_highlight_rules',
	],
	function (e, t, n) {
		'use strict'
		var r = e('../lib/oop'),
			i = e('./text_highlight_rules').TextHighlightRules,
			s = function () {
				var e =
						'and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield|async|await|nonlocal',
					t = 'True|False|None|NotImplemented|Ellipsis|__debug__',
					n =
						'abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|binfile|bin|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|apply|delattr|help|next|setattr|set|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|ascii|breakpoint|bytes',
					r = this.createKeywordMapper(
						{
							'invalid.deprecated': 'debugger',
							'support.function': n,
							'variable.language': 'self|cls',
							'constant.language': t,
							keyword: e,
						},
						'identifier'
					),
					i = '[uU]?',
					s = '[rR]',
					o = '[fF]',
					u = '(?:[rR][fF]|[fF][rR])',
					a = '(?:(?:[1-9]\\d*)|(?:0))',
					f = '(?:0[oO]?[0-7]+)',
					l = '(?:0[xX][\\dA-Fa-f]+)',
					c = '(?:0[bB][01]+)',
					h = '(?:' + a + '|' + f + '|' + l + '|' + c + ')',
					p = '(?:[eE][+-]?\\d+)',
					d = '(?:\\.\\d+)',
					v = '(?:\\d+)',
					m = '(?:(?:' + v + '?' + d + ')|(?:' + v + '\\.))',
					g = '(?:(?:' + m + '|' + v + ')' + p + ')',
					y = '(?:' + g + '|' + m + ')',
					b =
						'\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv\'"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})'
				;(this.$rules = {
					start: [
						{ token: 'comment', regex: '#.*$' },
						{ token: 'string', regex: i + '"{3}', next: 'qqstring3' },
						{ token: 'string', regex: i + '"(?=.)', next: 'qqstring' },
						{ token: 'string', regex: i + "'{3}", next: 'qstring3' },
						{ token: 'string', regex: i + "'(?=.)", next: 'qstring' },
						{ token: 'string', regex: s + '"{3}', next: 'rawqqstring3' },
						{ token: 'string', regex: s + '"(?=.)', next: 'rawqqstring' },
						{ token: 'string', regex: s + "'{3}", next: 'rawqstring3' },
						{ token: 'string', regex: s + "'(?=.)", next: 'rawqstring' },
						{ token: 'string', regex: o + '"{3}', next: 'fqqstring3' },
						{ token: 'string', regex: o + '"(?=.)', next: 'fqqstring' },
						{ token: 'string', regex: o + "'{3}", next: 'fqstring3' },
						{ token: 'string', regex: o + "'(?=.)", next: 'fqstring' },
						{ token: 'string', regex: u + '"{3}', next: 'rfqqstring3' },
						{ token: 'string', regex: u + '"(?=.)', next: 'rfqqstring' },
						{ token: 'string', regex: u + "'{3}", next: 'rfqstring3' },
						{ token: 'string', regex: u + "'(?=.)", next: 'rfqstring' },
						{
							token: 'keyword.operator',
							regex:
								'\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|@|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|=',
						},
						{
							token: 'punctuation',
							regex:
								',|:|;|\\->|\\+=|\\-=|\\*=|\\/=|\\/\\/=|%=|@=|&=|\\|=|^=|>>=|<<=|\\*\\*=',
						},
						{ token: 'paren.lparen', regex: '[\\[\\(\\{]' },
						{ token: 'paren.rparen', regex: '[\\]\\)\\}]' },
						{
							token: ['keyword', 'text', 'entity.name.function'],
							regex: '(def|class)(\\s+)([\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w]+)',
						},
						{ token: 'text', regex: '\\s+' },
						{ include: 'constants' },
					],
					qqstring3: [
						{ token: 'constant.language.escape', regex: b },
						{ token: 'string', regex: '"{3}', next: 'start' },
						{ defaultToken: 'string' },
					],
					qstring3: [
						{ token: 'constant.language.escape', regex: b },
						{ token: 'string', regex: "'{3}", next: 'start' },
						{ defaultToken: 'string' },
					],
					qqstring: [
						{ token: 'constant.language.escape', regex: b },
						{ token: 'string', regex: '\\\\$', next: 'qqstring' },
						{ token: 'string', regex: '"|$', next: 'start' },
						{ defaultToken: 'string' },
					],
					qstring: [
						{ token: 'constant.language.escape', regex: b },
						{ token: 'string', regex: '\\\\$', next: 'qstring' },
						{ token: 'string', regex: "'|$", next: 'start' },
						{ defaultToken: 'string' },
					],
					rawqqstring3: [
						{ token: 'string', regex: '"{3}', next: 'start' },
						{ defaultToken: 'string' },
					],
					rawqstring3: [
						{ token: 'string', regex: "'{3}", next: 'start' },
						{ defaultToken: 'string' },
					],
					rawqqstring: [
						{ token: 'string', regex: '\\\\$', next: 'rawqqstring' },
						{ token: 'string', regex: '"|$', next: 'start' },
						{ defaultToken: 'string' },
					],
					rawqstring: [
						{ token: 'string', regex: '\\\\$', next: 'rawqstring' },
						{ token: 'string', regex: "'|$", next: 'start' },
						{ defaultToken: 'string' },
					],
					fqqstring3: [
						{ token: 'constant.language.escape', regex: b },
						{ token: 'string', regex: '"{3}', next: 'start' },
						{ token: 'paren.lparen', regex: '{', push: 'fqstringParRules' },
						{ defaultToken: 'string' },
					],
					fqstring3: [
						{ token: 'constant.language.escape', regex: b },
						{ token: 'string', regex: "'{3}", next: 'start' },
						{ token: 'paren.lparen', regex: '{', push: 'fqstringParRules' },
						{ defaultToken: 'string' },
					],
					fqqstring: [
						{ token: 'constant.language.escape', regex: b },
						{ token: 'string', regex: '\\\\$', next: 'fqqstring' },
						{ token: 'string', regex: '"|$', next: 'start' },
						{ token: 'paren.lparen', regex: '{', push: 'fqstringParRules' },
						{ defaultToken: 'string' },
					],
					fqstring: [
						{ token: 'constant.language.escape', regex: b },
						{ token: 'string', regex: "'|$", next: 'start' },
						{ token: 'paren.lparen', regex: '{', push: 'fqstringParRules' },
						{ defaultToken: 'string' },
					],
					rfqqstring3: [
						{ token: 'string', regex: '"{3}', next: 'start' },
						{ token: 'paren.lparen', regex: '{', push: 'fqstringParRules' },
						{ defaultToken: 'string' },
					],
					rfqstring3: [
						{ token: 'string', regex: "'{3}", next: 'start' },
						{ token: 'paren.lparen', regex: '{', push: 'fqstringParRules' },
						{ defaultToken: 'string' },
					],
					rfqqstring: [
						{ token: 'string', regex: '\\\\$', next: 'rfqqstring' },
						{ token: 'string', regex: '"|$', next: 'start' },
						{ token: 'paren.lparen', regex: '{', push: 'fqstringParRules' },
						{ defaultToken: 'string' },
					],
					rfqstring: [
						{ token: 'string', regex: "'|$", next: 'start' },
						{ token: 'paren.lparen', regex: '{', push: 'fqstringParRules' },
						{ defaultToken: 'string' },
					],
					fqstringParRules: [
						{ token: 'paren.lparen', regex: '[\\[\\(]' },
						{ token: 'paren.rparen', regex: '[\\]\\)]' },
						{ token: 'string', regex: '\\s+' },
						{ token: 'string', regex: "'[^']*'" },
						{ token: 'string', regex: '"[^"]*"' },
						{ token: 'function.support', regex: '(!s|!r|!a)' },
						{ include: 'constants' },
						{ token: 'paren.rparen', regex: '}', next: 'pop' },
						{ token: 'paren.lparen', regex: '{', push: 'fqstringParRules' },
					],
					constants: [
						{ token: 'constant.numeric', regex: '(?:' + y + '|\\d+)[jJ]\\b' },
						{ token: 'constant.numeric', regex: y },
						{ token: 'constant.numeric', regex: h + '[lL]\\b' },
						{ token: 'constant.numeric', regex: h + '\\b' },
						{
							token: ['punctuation', 'function.support'],
							regex: '(\\.)([a-zA-Z_]+)\\b',
						},
						{ token: r, regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b' },
					],
				}),
					this.normalizeRules()
			}
		r.inherits(s, i), (t.PythonHighlightRules = s)
	}
),
	ace.define(
		'ace/mode/folding/pythonic',
		[
			'require',
			'exports',
			'module',
			'ace/lib/oop',
			'ace/mode/folding/fold_mode',
		],
		function (e, t, n) {
			'use strict'
			var r = e('../../lib/oop'),
				i = e('./fold_mode').FoldMode,
				s = (t.FoldMode = function (e) {
					this.foldingStartMarker = new RegExp(
						'([\\[{])(?:\\s*)$|(' + e + ')(?:\\s*)(?:#.*)?$'
					)
				})
			r.inherits(s, i),
				function () {
					this.getFoldWidgetRange = function (e, t, n) {
						var r = e.getLine(n),
							i = r.match(this.foldingStartMarker)
						if (i)
							return i[1]
								? this.openingBracketBlock(e, i[1], n, i.index)
								: i[2]
								? this.indentationBlock(e, n, i.index + i[2].length)
								: this.indentationBlock(e, n)
					}
				}.call(s.prototype)
		}
	),
	ace.define(
		'ace/mode/python',
		[
			'require',
			'exports',
			'module',
			'ace/lib/oop',
			'ace/mode/text',
			'ace/mode/python_highlight_rules',
			'ace/mode/folding/pythonic',
			'ace/range',
		],
		function (e, t, n) {
			'use strict'
			var r = e('../lib/oop'),
				i = e('./text').Mode,
				s = e('./python_highlight_rules').PythonHighlightRules,
				o = e('./folding/pythonic').FoldMode,
				u = e('../range').Range,
				a = function () {
					;(this.HighlightRules = s),
						(this.foldingRules = new o('\\:')),
						(this.$behaviour = this.$defaultBehaviour)
				}
			r.inherits(a, i),
				function () {
					;(this.lineCommentStart = '#'),
						(this.$pairQuotesAfter = { "'": /[ruf]/i, '"': /[ruf]/i }),
						(this.getNextLineIndent = function (e, t, n) {
							var r = this.$getIndent(t),
								i = this.getTokenizer().getLineTokens(t, e),
								s = i.tokens
							if (s.length && s[s.length - 1].type == 'comment') return r
							if (e == 'start') {
								var o = t.match(/^.*[\{\(\[:]\s*$/)
								o && (r += n)
							}
							return r
						})
					var e = { pass: 1, return: 1, raise: 1, break: 1, continue: 1 }
					;(this.checkOutdent = function (t, n, r) {
						if (r !== '\r\n' && r !== '\r' && r !== '\n') return !1
						var i = this.getTokenizer().getLineTokens(n.trim(), t).tokens
						if (!i) return !1
						do var s = i.pop()
						while (
							s &&
							(s.type == 'comment' ||
								(s.type == 'text' && s.value.match(/^\s+$/)))
						)
						return s ? s.type == 'keyword' && e[s.value] : !1
					}),
						(this.autoOutdent = function (e, t, n) {
							n += 1
							var r = this.$getIndent(t.getLine(n)),
								i = t.getTabString()
							r.slice(-i.length) == i &&
								t.remove(new u(n, r.length - i.length, n, r.length))
						}),
						(this.$id = 'ace/mode/python'),
						(this.snippetFileId = 'ace/snippets/python')
				}.call(a.prototype),
				(t.Mode = a)
		}
	)
;(function () {
	ace.require(['ace/mode/python'], function (m) {
		if (typeof module == 'object' && typeof exports == 'object' && module) {
			module.exports = m
		}
	})
})()
