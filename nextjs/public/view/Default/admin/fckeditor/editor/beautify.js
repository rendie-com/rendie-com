/*jslint onevar: false, plusplus: false */
/*
 JS Beautifier
 ---------------
 Written by Einar Lielmanis, <einar@jsbeautifier.org>
 http://jsbeautifier.org/
 Originally converted to javascript by Vital, <vital76@gmail.com>
 You are free to use this in any way you want, in case you find this useful or working for you.
 Usage:
 js_beautify(js_source_text);
 js_beautify(js_source_text, options);
 The options are:
 indent_size (default 4)          — indentation size,
 indent_char (default space)      — character to indent with,
 preserve_newlines (default true) — whether existing line breaks should be preserved,
 indent_level (default 0)         — initial indentation level, you probably won't need this ever,
 space_after_anon_function (default false) — if true, then space is added between "function ()"
 (jslint is happy about this); if false, then the common "function()" output is used.
 braces_on_own_line (default false) - ANSI / Allman brace style, each opening/closing brace gets its own line.
 e.g
 js_beautify(js_source_text, {indent_size: 1, indent_char: '\t'});
 */



function js_beautify(js_source_text, options)
{
	var input, output, token_text, last_type, last_text, last_last_text, last_word, flags, flag_store, indent_string;
	var whitespace, wordchar, punct, parser_pos, line_starters, digits;
	var prefix, token_type, do_block_just_closed;
	var wanted_newline, just_added_newline, n_newlines;


	// Some interpreters have unexpected results with foo = baz || bar;
	options = options ? options : {};
	var opt_braces_on_own_line = options.braces_on_own_line ? options.braces_on_own_line : false;
	var opt_indent_size = options.indent_size ? options.indent_size : 4;
	var opt_indent_char = options.indent_char ? options.indent_char : ' ';
	var opt_preserve_newlines = typeof options.preserve_newlines === 'undefined' ? true : options.preserve_newlines; //true
	var opt_indent_level = options.indent_level ? options.indent_level : 0; // starting indentation
	var opt_space_after_anon_function = options.space_after_anon_function === 'undefined' ? false : options.space_after_anon_function;
	var opt_keep_array_indentation = typeof options.keep_array_indentation === 'undefined' ? false : options.keep_array_indentation;

	just_added_newline = false;
	// cache the source's length.
	var input_length = js_source_text.length; //=152

	function trim_output()//删除output字符串里的空数组或等于indent_string字符串
	{
		while (output.length && (output[output.length - 1] === ' ' || output[output.length - 1] === indent_string))//false
		{
			output.pop();
			//pop() 方法用于删除并返回数组的最后一个元素。
		}
	}

	function is_array(mode)
	{
		return mode === '[EXPRESSION]' || mode === '[INDENTED-EXPRESSION]';
	}

	function trim(s)
	{
		return s.replace(/^\s\s*|\s\s*$/, '');
	}

	function print_newline(ignore_repeated)//排版output字符串
	{
		//1=undefined
		flags.eat_next_space = false;
		if (opt_keep_array_indentation && is_array(flags.mode))//false
		{
			return;
		}
		ignore_repeated = typeof ignore_repeated === 'undefined' ? true : ignore_repeated;//=true
		flags.if_line = false;
		trim_output();//删除output字符串里的空数组或等于indent_string字符串
		if (!output.length)//false
		{
			return; // no newline on start of file
		}
		if (output[output.length - 1] !== "\n" || !ignore_repeated)//true	在最后一个数组后加换行
		{
			just_added_newline = true;
			output.push("\n");
		}
		for (var i = 0; i < flags.indentation_level; i += 1)//for(i=0; to i<0 i+=1)
		{
			output.push(indent_string);
		}
		if (flags.var_line && flags.var_line_reindented)//false		排版
		{
			if (opt_indent_char === ' ')
			{
				output.push('    '); // var_line always pushes 4 spaces, so that the variables would be one under another
			}
			else
			{
				output.push(indent_string); // skip space-stuffing, if indenting with a tab
			}
		}
	}



	function print_single_space() //不符
	{
		if (flags.eat_next_space) //false
		{
			flags.eat_next_space = false;
			return;
		}
		var last_output = ' ';
		if (output.length) //=false
		{
			last_output = output[output.length - 1];
		}
		if (last_output !== ' ' && last_output !== '\n' && last_output !== indent_string) //false
		{ // prevent occassional duplicate space
			output.push(' ');
		}
	}


	function print_token() //设置属性
	{
		just_added_newline = false;
		flags.eat_next_space = false;
		output.push(token_text);
		//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
	}

	function indent()
	{
		flags.indentation_level += 1;
	}


	function remove_indent()
	{
		if (output.length && output[output.length - 1] === indent_string)
		{
			output.pop();
		}
	}

	function set_mode(mode)//设置模式
	{
		if (flags)
		{
			flag_store.push(flags);
		}
		flags =
		{
			previous_mode: flags ? flags.mode : 'BLOCK',
			mode: mode,
			var_line: false,
			var_line_tainted: false,
			var_line_reindented: false,
			in_html_comment: false,
			if_line: false,
			in_case: false,
			eat_next_space: false,
			indentation_baseline: -1,
			indentation_level: (flags ? flags.indentation_level + ((flags.var_line && flags.var_line_reindented) ? 1 : 0) : opt_indent_level)
		};
	}

	function is_array(mode)
	{
		return mode === '[EXPRESSION]' || mode === '[INDENTED-EXPRESSION]';
	}

	function is_expression(mode)
	{
		return mode === '[EXPRESSION]' || mode === '[INDENTED-EXPRESSION]' || mode === '(EXPRESSION)';
	}

	function restore_mode()
	{
		do_block_just_closed = flags.mode === 'DO_BLOCK';
		if (flag_store.length > 0)
		{
			flags = flag_store.pop();
		}
	}


	function in_array(what, arr) //在(2)字符串中找到(1)则返回true否则false
	{
		for (var i = 0; i < arr.length; i += 1)
		{
			if (arr[i] === what)
			{
				return true;
			}
		}
		return false;
	}

	// Walk backwards from the colon to find a '?' (colon is part of a ternary op)
	// or a '{' (colon is part of a class literal).  Along the way, keep track of
	// the blocks and expressions we pass so we only trigger on those chars in our
	// own level, and keep track of the colons so we only trigger on the matching '?'.


	function is_ternary_op()
	{
		var level = 0,
			colon_count = 0;
		for (var i = output.length - 1; i >= 0; i--)
		{
			switch (output[i])
			{
			case ':':
				if (level === 0)
				{
					colon_count++;
				}
				break;
			case '?':
				if (level === 0)
				{
					if (colon_count === 0)
					{
						return true;
					}
					else
					{
						colon_count--;
					}
				}
				break;
			case '{':
				if (level === 0)
				{
					return false;
				}
				level--;
				break;
			case '(':
			case '[':
				level--;
				break;
			case ')':
			case ']':
			case '}':
				level++;
				break;
			}
		}
	}

	function get_next_token()
	{
		n_newlines = 0;

		if (parser_pos >= input_length) //false
		{
			return ['', 'TK_EOF'];
		}
		wanted_newline = false;
		var c = input.charAt(parser_pos); //="/"
		//charAt() 方法可返回指定位置的字符。
		parser_pos += 1;


		var keep_whitespace = opt_keep_array_indentation && is_array(flags.mode);
		if (keep_whitespace) //false
		{

			//
			// slight mess to allow nice preservation of array indentation and reindent that correctly
			// first time when we get to the arrays:
			// var a = [
			// ....'something'
			// we make note of whitespace_count = 4 into flags.indentation_baseline
			// so we know that 4 whitespaces in original source match indent_level of reindented source
			//
			// and afterwards, when we get to
			//    'something,
			// .......'something else'
			// we know that this should be indented to indent_level + (7 - indentation_baseline) spaces
			//
			var whitespace_count = 0;

			while (in_array(c, whitespace))
			{

				if (c === "\n")
				{
					trim_output();
					output.push("\n");
					just_added_newline = true;
					whitespace_count = 0;
				}
				else
				{
					if (c === '\t')
					{
						whitespace_count += 4;
					}
					else
					{
						whitespace_count += 1;
					}
				}

				if (parser_pos >= input_length)
				{
					return ['', 'TK_EOF'];
				}

				c = input.charAt(parser_pos);
				parser_pos += 1;

			}
			if (flags.indentation_baseline === -1)
			{
				flags.indentation_baseline = whitespace_count;
			}

			if (just_added_newline)
			{
				var i;

				for (i = 0; i < flags.indentation_level + 1; i += 1)
				{
					output.push(indent_string);
				}
				if (flags.indentation_baseline !== -1)
				{
					for (i = 0; i < whitespace_count - flags.indentation_baseline; i++)
					{
						output.push(' ');
					}
				}
			}

		}
		else
		{
			while (in_array(c, whitespace)) //false	
			{ //in_array(1, 2)//在(2)字符串中找到(1)则返回true否则false
				if (c === "\n") //严格相等 === 
				{
					n_newlines += 1;
				}
				if (parser_pos >= input_length)
				{
					return ['', 'TK_EOF'];
				}
				c = input.charAt(parser_pos);
				parser_pos += 1;
			}
			if (opt_preserve_newlines) //true
			{
				if (n_newlines > 1) //false
				{
					for (i = 0; i < n_newlines; i += 1)
					{
						print_newline(i === 0);
						just_added_newline = true;
					}
				}
			}
			wanted_newline = n_newlines > 0;
		}

		if (in_array(c, wordchar)) //false
		{ //in_array(1, 2)//在(2)字符串中找到(1)则返回true否则false
			if (parser_pos < input_length)
			{
				while (in_array(input.charAt(parser_pos), wordchar))
				{
					c += input.charAt(parser_pos);
					parser_pos += 1;
					if (parser_pos === input_length)
					{
						break;
					}
				}
			}

			// small and surprisingly unugly hack for 1E-10 representation
			if (parser_pos !== input_length && c.match(/^[0-9]+[Ee]$/) && (input.charAt(parser_pos) === '-' || input.charAt(parser_pos) === '+')) //false
			{

				var sign = input.charAt(parser_pos);
				parser_pos += 1;

				var t = get_next_token(parser_pos);
				c += sign + t[0];
				return [c, 'TK_WORD'];
			}

			if (c === 'in') //false
			{ // hack for 'in' operator
				return [c, 'TK_OPERATOR'];
			}
			if (wanted_newline && last_type !== 'TK_OPERATOR' && !flags.if_line && (opt_preserve_newlines || last_text !== 'var')) //true
			{
				print_newline();
			}
			return [c, 'TK_WORD'];
		}

		if (c === '(' || c === '[') //false
		{
			return [c, 'TK_START_EXPR'];
		}

		if (c === ')' || c === ']') //false
		{
			return [c, 'TK_END_EXPR'];
		}

		if (c === '{') //false
		{
			return [c, 'TK_START_BLOCK'];
		}

		if (c === '}') //false
		{
			return [c, 'TK_END_BLOCK'];
		}

		if (c === ';') //false
		{
			return [c, 'TK_SEMICOLON'];
		}

		if (c === '/') //true	查找注释并返回数组
		{
			var comment = '';
			// peek for comment /* ... */
			var inline_comment = true;
			if (input.charAt(parser_pos) === '*') //true
			{
				parser_pos += 1;
				if (parser_pos < input_length) //找到"/*...*/"注释
				{
					while (!(input.charAt(parser_pos) === '*' && input.charAt(parser_pos + 1) && input.charAt(parser_pos + 1) === '/') && parser_pos < input_length)
					{
						c = input.charAt(parser_pos);
						comment += c;
						if (c === '\x0d' || c === '\x0a')
						{
							inline_comment = false;
						}
						parser_pos += 1;
						if (parser_pos >= input_length)
						{
							break;
						}
					}
				}
				parser_pos += 2;
				if (inline_comment) //true
				{
					return ['/*' + comment + '*/', 'TK_INLINE_COMMENT'];
				}
				else
				{
					return ['/*' + comment + '*/', 'TK_BLOCK_COMMENT'];
				}
			}
			// peek for comment // ...
			if (input.charAt(parser_pos) === '/')
			{
				comment = c;
				while (input.charAt(parser_pos) !== "\x0d" && input.charAt(parser_pos) !== "\x0a")
				{
					comment += input.charAt(parser_pos);
					parser_pos += 1;
					if (parser_pos >= input_length)
					{
						break;
					}
				}
				parser_pos += 1;
				if (wanted_newline)
				{
					print_newline();
				}
				return [comment, 'TK_COMMENT'];
			}

		}
		if (c === "'" || c === '"' || (c === '/' && ((last_type === 'TK_WORD' && in_array(last_text, ['return', 'do'])) || (last_type === 'TK_START_EXPR' || last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK' || last_type === 'TK_OPERATOR' || last_type === 'TK_EQUALS' || last_type === 'TK_EOF' || last_type === 'TK_SEMICOLON')))) //false
		{ // regexp
			var sep = c;
			var esc = false;
			var resulting_string = c;

			if (parser_pos < input_length)
			{
				if (sep === '/')
				{
					//
					// handle regexp separately...
					//
					var in_char_class = false;
					while (esc || in_char_class || input.charAt(parser_pos) !== sep)
					{
						resulting_string += input.charAt(parser_pos);
						if (!esc)
						{
							esc = input.charAt(parser_pos) === '\\';
							if (input.charAt(parser_pos) === '[')
							{
								in_char_class = true;
							}
							else if (input.charAt(parser_pos) === ']')
							{
								in_char_class = false;
							}
						}
						else
						{
							esc = false;
						}
						parser_pos += 1;
						if (parser_pos >= input_length)
						{
							// incomplete string/rexp when end-of-file reached.
							// bail out with what had been received so far.
							return [resulting_string, 'TK_STRING'];
						}
					}

				}
				else
				{
					//
					// and handle string also separately
					//
					while (esc || input.charAt(parser_pos) !== sep)
					{
						resulting_string += input.charAt(parser_pos);
						if (!esc)
						{
							esc = input.charAt(parser_pos) === '\\';
						}
						else
						{
							esc = false;
						}
						parser_pos += 1;
						if (parser_pos >= input_length)
						{
							// incomplete string/rexp when end-of-file reached.
							// bail out with what had been received so far.
							return [resulting_string, 'TK_STRING'];
						}
					}
				}



			}

			parser_pos += 1;

			resulting_string += sep;

			if (sep === '/')
			{
				// regexps may have modifiers /regexp/MOD , so fetch those, too
				while (parser_pos < input_length && in_array(input.charAt(parser_pos), wordchar))
				{
					resulting_string += input.charAt(parser_pos);
					parser_pos += 1;
				}
			}
			return [resulting_string, 'TK_STRING'];
		}
		if (c === '#')
		{
			// Spidermonkey-specific sharp variables for circular references
			// https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
			// http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
			var sharp = '#';
			if (parser_pos < input_length && in_array(input.charAt(parser_pos), digits))
			{
				do
				{
					c = input.charAt(parser_pos);
					sharp += c;
					parser_pos += 1;
				} while (parser_pos < input_length && c !== '#' && c !== '=');
				if (c === '#')
				{
					//
				}
				else if (input.charAt(parser_pos) === '[' && input.charAt(parser_pos + 1) === ']')
				{
					sharp += '[]';
					parser_pos += 2;
				}
				else if (input.charAt(parser_pos) === '{' && input.charAt(parser_pos + 1) === '}')
				{
					sharp += '{}';
					parser_pos += 2;
				}
				return [sharp, 'TK_WORD'];
			}
		}

		if (c === '<' && input.substring(parser_pos - 1, parser_pos + 3) === '<!--')
		{
			parser_pos += 3;
			flags.in_html_comment = true;
			return ['<!--', 'TK_COMMENT'];
		}

		if (c === '-' && flags.in_html_comment && input.substring(parser_pos - 1, parser_pos + 2) === '-->')
		{
			flags.in_html_comment = false;
			parser_pos += 2;
			if (wanted_newline)
			{
				print_newline();
			}
			return ['-->', 'TK_COMMENT'];
		}

		if (in_array(c, punct))
		{
			while (parser_pos < input_length && in_array(c + input.charAt(parser_pos), punct))
			{
				c += input.charAt(parser_pos);
				parser_pos += 1;
				if (parser_pos >= input_length)
				{
					break;
				}
			}

			if (c === '=')
			{
				return [c, 'TK_EQUALS'];
			}
			else
			{
				return [c, 'TK_OPERATOR'];
			}
		}
		return [c, 'TK_UNKNOWN'];
	}

	//----------------------------------
	indent_string = '';
	while (opt_indent_size > 0)
	{
		indent_string += opt_indent_char;
		opt_indent_size -= 1;
	}

	input = js_source_text; //=内容
	last_word = ''; //最后通过TK_WORD的”
	last_type = 'TK_START_EXPR'; // 最后令牌类型
	last_text = ''; // 最后令牌文本
	last_last_text = ''; //pre-last令牌文本
	output = [];

	do_block_just_closed = false;

	whitespace = "\n\r\t ".split('');
	wordchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
	digits = '0123456789'.split('');

	punct = '+ - * / % & ++ -- = += -= *= /= %= == === != !== >< >= <= >><< >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::'.split(' ');

	// words which should always start on new line.
	line_starters = 'continue,try,throw,return,var,if,switch,case,default,for,while,break,function'.split(',');

	// states showing if we are currently in expression (i.e. "if" case) - 'EXPRESSION', or in usual block (like, procedure), 'BLOCK'.
	// some formatting depends on that.
	flag_store = [];
	set_mode('BLOCK');//设置模式
	parser_pos = 0;
	while (true)
	{
		var t = get_next_token(parser_pos);
		token_text = t[0]; //="/* paste in your code and press Beautify button */"
		token_type = t[1]; //="TK_INLINE_COMMENT"
		if (token_type === 'TK_EOF')
		{
			break;
		}

		switch (token_type)
		{

		case 'TK_START_EXPR':

			if (token_text === '[')
			{

				if (last_type === 'TK_WORD' || last_text === ')')
				{
					// this is array index specifier, break immediately
					// a[x], fn()[x]
					if (in_array(last_text, line_starters))
					{
						print_single_space();
					}
					set_mode('(EXPRESSION)');
					print_token();
					break;
				}

				if (flags.mode === '[EXPRESSION]' || flags.mode === '[INDENTED-EXPRESSION]')
				{
					if (last_last_text === ']' && last_text === ',')
					{
						// ], [ goes to new line
						if (flags.mode === '[EXPRESSION]')
						{
							flags.mode = '[INDENTED-EXPRESSION]';
							if (!opt_keep_array_indentation)
							{
								indent();
							}
						}
						set_mode('[EXPRESSION]');
						if (!opt_keep_array_indentation)
						{
							print_newline();
						}
					}
					else if (last_text === '[')
					{
						if (flags.mode === '[EXPRESSION]')
						{
							flags.mode = '[INDENTED-EXPRESSION]';
							if (!opt_keep_array_indentation)
							{
								indent();
							}
						}
						set_mode('[EXPRESSION]');

						if (!opt_keep_array_indentation)
						{
							print_newline();
						}
					}
					else
					{
						set_mode('[EXPRESSION]');
					}
				}
				else
				{
					set_mode('[EXPRESSION]');
				}



			}
			else
			{
				set_mode('(EXPRESSION)');
			}

			if (last_text === ';' || last_type === 'TK_START_BLOCK')
			{
				print_newline();
			}
			else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || last_text === '.')
			{
				// do nothing on (( and )( and ][ and ]( and .(
			}
			else if (last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR')
			{
				print_single_space();
			}
			else if (last_word === 'function')
			{
				// function() vs function ()
				if (opt_space_after_anon_function)
				{
					print_single_space();
				}
			}
			else if (in_array(last_text, line_starters) || last_text === 'catch')
			{
				print_single_space();
			}
			print_token();

			break;

		case 'TK_END_EXPR':
			if (token_text === ']')
			{
				if (opt_keep_array_indentation)
				{
					if (last_text === '}')
					{
						// trim_output();
						// print_newline(true);
						remove_indent();
						print_token();
						restore_mode();
						break;
					}
				}
				else
				{
					if (flags.mode === '[INDENTED-EXPRESSION]')
					{
						if (last_text === ']')
						{
							restore_mode();
							print_newline();
							print_token();
							break;
						}
					}
				}
			}
			restore_mode();
			print_token();
			break;

		case 'TK_START_BLOCK':

			if (last_word === 'do')
			{
				set_mode('DO_BLOCK');
			}
			else
			{
				set_mode('BLOCK');
			}
			if (opt_braces_on_own_line)
			{
				if (last_type !== 'TK_OPERATOR')
				{
					if (last_text == 'return')
					{
						print_single_space();
					}
					else
					{
						print_newline(true);
					}
				}
				print_token();
				indent();
			}
			else
			{
				if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR')
				{
					if (last_type === 'TK_START_BLOCK')
					{
						print_newline();
					}
					else
					{
						print_single_space();
					}
				}
				else
				{
					// if TK_OPERATOR or TK_START_EXPR
					if (is_array(flags.previous_mode) && last_text === ',')
					{
						print_newline(); // [a, b, c, {
					}
				}
				indent();
				print_token();
			}

			break;

		case 'TK_END_BLOCK':
			restore_mode();
			if (opt_braces_on_own_line)
			{
				print_newline();
				print_token();
			}
			else
			{
				if (last_type === 'TK_START_BLOCK')
				{
					// nothing
					if (just_added_newline)
					{
						remove_indent();
					}
					else
					{
						// {}
						trim_output();
					}
				}
				else
				{
					print_newline();
				}
				print_token();
			}
			break;

		case 'TK_WORD':

			// no, it's not you. even I have problems understanding how this works
			// and what does what.
			if (do_block_just_closed)
			{
				// do {} ## while ()
				print_single_space();
				print_token();
				print_single_space();
				do_block_just_closed = false;
				break;
			}

			if (token_text === 'function')
			{
				if ((just_added_newline || last_text === ';') && last_text !== '{')
				{
					// make sure there is a nice clean space of at least one blank line
					// before a new function definition
					n_newlines = just_added_newline ? n_newlines : 0;

					for (var i = 0; i < 2 - n_newlines; i++)
					{
						print_newline(false);
					}

				}
			}

			if (token_text === 'case' || token_text === 'default')
			{
				if (last_text === ':')
				{
					// switch cases following one another
					remove_indent();
				}
				else
				{
					// case statement starts in the same line where switch
					flags.indentation_level--;
					print_newline();
					flags.indentation_level++;
				}
				print_token();
				flags.in_case = true;
				break;
			}

			prefix = 'NONE';

			if (last_type === 'TK_END_BLOCK')
			{
				if (!in_array(token_text.toLowerCase(), ['else', 'catch', 'finally']))
				{
					prefix = 'NEWLINE';
				}
				else
				{
					if (opt_braces_on_own_line)
					{
						prefix = 'NEWLINE';
					}
					else
					{
						prefix = 'SPACE';
						print_single_space();
					}
				}
			}
			else if (last_type === 'TK_SEMICOLON' && (flags.mode === 'BLOCK' || flags.mode === 'DO_BLOCK'))
			{
				prefix = 'NEWLINE';
			}
			else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode))
			{
				prefix = 'SPACE';
			}
			else if (last_type === 'TK_STRING')
			{
				prefix = 'NEWLINE';
			}
			else if (last_type === 'TK_WORD')
			{
				prefix = 'SPACE';
			}
			else if (last_type === 'TK_START_BLOCK')
			{
				prefix = 'NEWLINE';
			}
			else if (last_type === 'TK_END_EXPR')
			{
				print_single_space();
				prefix = 'NEWLINE';
			}

			if (last_type !== 'TK_END_BLOCK' && in_array(token_text.toLowerCase(), ['else', 'catch', 'finally']))
			{
				print_newline();
			}
			else if (in_array(token_text, line_starters) || prefix === 'NEWLINE')
			{
				if (last_text === 'else')
				{
					// no need to force newline on else break
					print_single_space();
				}
				else if ((last_type === 'TK_START_EXPR' || last_text === '=' || last_text === ',') && token_text === 'function')
				{
					// no need to force newline on 'function': (function
					// DONOTHING
				}
				else if (last_text === 'return' || last_text === 'throw')
				{
					// no newline between 'return nnn'
					print_single_space();
				}
				else if (last_type !== 'TK_END_EXPR')
				{
					if ((last_type !== 'TK_START_EXPR' || token_text !== 'var') && last_text !== ':')
					{
						// no need to force newline on 'var': for (var x = 0...)
						if (token_text === 'if' && last_word === 'else' && last_text !== '{')
						{
							// no newline for } else if {
							print_single_space();
						}
						else
						{
							print_newline();
						}
					}
				}
				else
				{
					if (in_array(token_text, line_starters) && last_text !== ')')
					{
						print_newline();
					}
				}
			}
			else if (is_array(flags.mode) && last_text === ',' && last_last_text === '}')
			{
				print_newline(); // }, in lists get a newline treatment
			}
			else if (prefix === 'SPACE')
			{
				print_single_space();
			}
			print_token();
			last_word = token_text;

			if (token_text === 'var')
			{
				flags.var_line = true;
				flags.var_line_reindented = false;
				flags.var_line_tainted = false;
			}

			if (token_text === 'if' || token_text === 'else')
			{
				flags.if_line = true;
			}

			break;

		case 'TK_SEMICOLON':

			print_token();
			flags.var_line = false;
			flags.var_line_reindented = false;
			break;

		case 'TK_STRING':

			if (last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK' || last_type === 'TK_SEMICOLON')
			{
				print_newline();
			}
			else if (last_type === 'TK_WORD')
			{
				print_single_space();
			}
			print_token();
			break;

		case 'TK_EQUALS':
			if (flags.var_line)
			{
				// just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
				flags.var_line_tainted = true;
			}
			print_single_space();
			print_token();
			print_single_space();
			break;

		case 'TK_OPERATOR':

			var space_before = true;
			var space_after = true;

			if (flags.var_line && token_text === ',' && (is_expression(flags.mode)))
			{
				// do not break on comma, for(var a = 1, b = 2)
				flags.var_line_tainted = false;
			}

			if (flags.var_line)
			{
				if (token_text === ',')
				{
					if (flags.var_line_tainted)
					{
						print_token();
						flags.var_line_reindented = true;
						flags.var_line_tainted = false;
						print_newline();
						break;
					}
					else
					{
						flags.var_line_tainted = false;
					}
					// } else if (token_text === ':') {
					// hmm, when does this happen? tests don't catch this
					// flags.var_line = false;
				}
			}

			if (last_text === 'return' || last_text === 'throw')
			{
				// "return" had a special handling in TK_WORD. Now we need to return the favor
				print_single_space();
				print_token();
				break;
			}

			if (token_text === ':' && flags.in_case)
			{
				print_token(); // colon really asks for separate treatment
				print_newline();
				flags.in_case = false;
				break;
			}

			if (token_text === '::')
			{
				// no spaces around exotic namespacing syntax operator
				print_token();
				break;
			}

			if (token_text === ',')
			{
				if (flags.var_line)
				{
					if (flags.var_line_tainted)
					{
						print_token();
						print_newline();
						flags.var_line_tainted = false;
					}
					else
					{
						print_token();
						print_single_space();
					}
				}
				else if (last_type === 'TK_END_BLOCK' && flags.mode !== "(EXPRESSION)")
				{
					print_token();
					if (flags.mode === 'OBJECT' && last_text === '}')
					{
						print_newline();
					}
					else
					{
						print_single_space();
					}
				}
				else
				{
					if (flags.mode === 'OBJECT')
					{
						print_token();
						print_newline();
					}
					else
					{
						// EXPR or DO_BLOCK
						print_token();
						print_single_space();
					}
				}
				break;
				// } else if (in_array(token_text, ['--', '++', '!']) || (in_array(token_text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS']) || in_array(last_text, line_starters) || in_array(last_text, ['==', '!=', '+=', '-=', '*=', '/=', '+', '-'])))) {
			}
			else if (in_array(token_text, ['--', '++', '!']) || (in_array(token_text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) || in_array(last_text, line_starters))))
			{
				// unary operators (and binary +/- pretending to be unary) special cases

				space_before = false;
				space_after = false;

				if (last_text === ';' && is_expression(flags.mode))
				{
					// for (;; ++i)
					//        ^^^
					space_before = true;
				}
				if (last_type === 'TK_WORD' && in_array(last_text, line_starters))
				{
					space_before = true;
				}

				if (flags.mode === 'BLOCK' && (last_text === '{' || last_text === ';'))
				{
					// { foo; --i }
					// foo(); --bar;
					print_newline();
				}
			}
			else if (token_text === '.')
			{
				// decimal digits or object.property
				space_before = false;

			}
			else if (token_text === ':')
			{
				if (!is_ternary_op())
				{
					flags.mode = 'OBJECT';
					space_before = false;
				}
			}
			if (space_before)
			{
				print_single_space();
			}

			print_token();

			if (space_after)
			{
				print_single_space();
			}

			if (token_text === '!')
			{
				// flags.eat_next_space = true;
			}

			break;

		case 'TK_BLOCK_COMMENT':

			var lines = token_text.split(/\x0a|\x0d\x0a/);

			if (/^\/\*\*/.test(token_text))
			{
				// javadoc: reformat and reindent
				print_newline();
				output.push(lines[0]);
				for (i = 1; i < lines.length; i++)
				{
					print_newline();
					output.push(' ');
					output.push(trim(lines[i]));
				}

			}
			else
			{
				// simple block comment: leave intact
				if (lines.length > 1)
				{
					// multiline comment block starts with a new line
					print_newline();
				}
				else
				{
					// single-line /* comment */ stays where it is
					print_single_space();
				}
				for (i = 0; i < lines.length; i++)
				{
					if (i > 0)
					{
						output.push(' ');
					}
					output.push(trim(lines[i]));
					print_newline();
				}

			}
			print_newline();
			break;

		case 'TK_INLINE_COMMENT':// 块注释排版 如：/*...*/
			print_single_space(); //不符
			print_token(); //设置属性
			if (is_expression(flags.mode)) //false
			{
				print_single_space();
			}
			else
			{
				print_newline();//排版output字符串
			}
			break;
		case 'TK_COMMENT':

			// print_newline();	打印换行符
			if (wanted_newline)
			{
				print_newline();
			}
			else
			{
				print_single_space();
			}
			print_token();
			print_newline();
			break;

		case 'TK_UNKNOWN':
			print_token();
			break;
		}

		last_last_text = last_text;
		last_type = token_type;
		last_text = token_text;
	}
	return output.join('').replace(/[\n ]+$/, '');

}
if (typeof exports !== "undefined") exports.js_beautify = js_beautify;